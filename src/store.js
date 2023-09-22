import {createStore, action, thunk, computed} from "easy-peasy";
import api from './api/posts';
import {format} from "date-fns";

export default createStore({
    posts: [],
    setPosts: action((state, payload) => { // state is the current state of post, which is []
        state.posts = payload; // payload is the new value assigned to the state
    }),
    postTitle: '',
    setPostTitle: action((state, payload) => {
        state.postTitle = payload;  // this is how you modify the postTitle state in the store
        // When this action is called, whatever data is passed as the payload will replace the current contents of postTitle
    }),
    postBody: '',
    setPostBody: action((state, payload) => {
        state.postBody = payload;
    }),
    postImage: '',
    setPostImage: action((state, payload) => {
        state.postImage = payload;
    }),
    editTitle: '',
    setEditTitle: action((state, payload) => {
        state.editTitle = payload;
    }),
    editBody: '',
    setEditBody: action((state, payload) => {
        state.editBody = payload;
    }),
    search: '',
    setSearch: action((state, payload) => {
        state.search = payload;
    }),
    searchResults: [],
    setSearchResults: action((state, payload) => {
        state.searchResults = payload;
    }),
    fileName: '',
    setFileName: action((state, payload) => {
        state.fileName = payload;
    }),
    postCount: computed((state) => state.posts.length),
    getPostById: computed((state) => {
        return (id) => state.posts.find(post => (post.id).toString() === id); // toString to use ===
    }),
    savePost: thunk(async (actions, newPost, helpers) => {
        const {posts} = helpers.getState();
        try {
            const response = await api.post('/posts', newPost);
            actions.setPosts([...posts, response.data]);
            actions.setPostTitle('');
            actions.setPostBody('');
            actions.setPostImage(null);
            actions.setFileName('');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }),
    deletePost: thunk(async (actions, id, helpers) => {
        const {posts} = helpers.getState();
        try {
            await api.delete(`/posts/${id}`);
            actions.setPosts(posts.filter(post => post.id !== id));
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }),
    editPost: thunk(async (actions, updatedPost, helpers) => {
        const {posts} = helpers.getState();
        const {id} = updatedPost;
        try {
            const response = await api.put(`/posts/${id}`, updatedPost);
            actions.setPosts(posts.map(post => post.id === id ? {...response.data} : post));
            actions.setEditTitle('');
            actions.setEditBody('');
            actions.setPostImage(null);
            actions.setFileName('');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }),
    uploadFile: thunk(async (actions, e) => {
        if (e && e.target && e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();

            if (file) {
                reader.readAsDataURL(file);
            }

            reader.onloadend = () => {
                actions.setPostImage(reader.result);
                actions.setFileName(file.name);
            };
        }
    })
});