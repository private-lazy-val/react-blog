import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector, createSlice, nanoid
} from '@reduxjs/toolkit';
import api from '../../api/posts';
import axios from "axios";
import {format} from "date-fns";
import {addNewUser, deleteUser, selectUserByName} from "../users/usersSlice";

// NORMALIZING DATA
// createEntityAdapter API provides a standardized way to store your data in a slice by taking a collection of items
// and putting them into the shape of { ids: [], entities: {} }
// createEntityAdapter returns an object that contains a set of generated reducer functions for adding, updating,
// and removing items from an entity state object.
// sortComparer function is used to keep the post IDs array in sorted order
// When you use methods provided by createEntityAdapter, you're only modifying the Redux state on the FRONTEND.
const postsAdapter = createEntityAdapter({});

// the adapter object has a getInitialState function that returns an empty {ids: [], entities: { post.id: {post}} normalized state object.
// You can pass in more fields to getInitialState, and those will be merged in

const initialState = postsAdapter.getInitialState({
        // posts: [], don't need with entity adapter
        isLoading: false,
        hasError: false,
        error: null
    }
)

const POSTS_URL = api.getUri() + '/posts';

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await axios.get(POSTS_URL);
        if (response.data && response.data.length > 0) {
            return response.data;
        } else {
            throw new Error('Data format is incorrect or array is empty');
        }
    })

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async (newPost, {dispatch, getState}) => {
        const userName = newPost.user_name;
        // Check if the user already exists using a selector
        let user = selectUserByName(getState(), userName);

        // If the user doesn't exist, add them
        if (!user) {
            const userId = nanoid();
            const newUser = {id: userId, name: userName};
            await dispatch(addNewUser(newUser));
            user = newUser;
        }

        const updatedPost = {
            ...newPost,
            date: format(new Date(), 'MMMM dd, yyyy'),
            user_id: user.id,
            reactions: {
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                starStruck: 0
            }
        };
        const response = await axios.post(POSTS_URL, updatedPost);
        if (response.data && response.status === 201) {
            return response.data;
        } else {
            throw new Error('Failed to add new post');
        }
    })

export const editPost = createAsyncThunk('posts/editePost',
    async (editedPost) => {
        const {id} = editedPost;
        const updatedPost = {
            ...editedPost,
            date: format(new Date(), 'MMMM dd, yyyy')
        };
        const response = await axios.put(`${POSTS_URL}/${id}`, updatedPost);
        if (response.data && response.status === 200) return response.data;
    })

export const deletePost = createAsyncThunk('posts/deletePost',
    async (initialPost, {dispatch, getState}) => {
        const {id, user_id} = initialPost;
        const response = await axios.delete(`${POSTS_URL}/${id}`);
        if (!response.data || response.status !== 200) {
            throw new Error('Failed to delete post');
        }

        // Check if the user has any other posts
        const userPosts = selectPostsByUser(getState(), user_id);
        if (userPosts.length === 1) { // Only the current post
            // Delete the user
            dispatch(deleteUser(user_id));
        }
        return initialPost;
    })

export const updateReaction = createAsyncThunk(
    'posts/updateReaction',
    async (payload, {getState}) => {
        const {postId, reaction} = payload;
        const existingPost = getState().posts.entities[postId];
        const existingReactions = existingPost.reactions;

        let updatedReaction;
        if (existingPost) {
            updatedReaction = {
                ...existingPost,
                reactions: {
                    ...existingReactions,
                    [reaction]: existingReactions[reaction] + 1
                }
            }
        }
        const response = await axios.put(`${POSTS_URL}/${postId}`, updatedReaction);
        if (response.data && response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to update post reactions');
        }
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                postsAdapter.upsertMany(state, action.payload);
                // without entity adapter – state.posts = state.posts.concat(action.payload);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
                state.error = action.error.message;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                postsAdapter.addOne(state, action.payload);
                // without entity adapter – state.posts.push(action.payload);
            })
            .addCase(editPost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not be completed');
                    return;
                }
                postsAdapter.upsertOne(state, action.payload);
                // without entity adapter
                // const {id} = action.payload;
                // const posts = state.posts.filter(post => post.id !== id);
                // state.posts = [...posts, action.payload];
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not be completed');
                    return;
                }
                const {id} = action.payload; // action.payload is initialPost returned by async thunk
                postsAdapter.removeOne(state, id);
                // without entity adapter – state.posts = state.posts.filter(post => post.id !== id);
            })
            .addCase(updateReaction.fulfilled, (state, action) => {
                // Update the local state with the server response
                postsAdapter.upsertOne(state, action.payload);
            })
    }
})

export default postsSlice.reducer;

// || SELECTORS ||

// The adapter object has a getSelectors function.
// getSelectors creates these 3 selectors, and we rename them with aliases using destructuring
// You can pass in a selector that returns this particular slice of state from the Redux root state,
// and it will generate selectors like selectAll and selectById.
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
    // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(state => state.posts);

// without adapter
// export const selectPostById = (state, postId) =>
//     state.posts.posts.find(post => post.id === postId);
// export const selectAllPosts = (state) => state.posts.posts;

export const selectPostsIsLoading = (state) => state.posts.isLoading;
export const selectPostsHasError = (state) => state.posts.hasError;
export const selectPostError = (state) => state.posts.error;
export const selectPostsByUser = createSelector(
    // The component will re-render only if selectAllPosts or the anonymous func (user) changes
    [selectAllPosts, (state, userId) => userId], // dependencies provide input params (below) for the output func
    (posts, userId) => posts.filter(post => post.user_id === userId));

