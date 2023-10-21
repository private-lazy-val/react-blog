import {createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api/posts";

const USERS_URL = api.getUri() + '/users';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const response = await axios.get(USERS_URL);
        if (response.data && response.data.length > 0) {
            return response.data;
        } else {
            throw new Error('Data format is incorrect or array is empty');
        }
    })

export const addNewUser = createAsyncThunk(
    'users/addNewUser',
    async (newUser) => {
        const response = await axios.post(USERS_URL, newUser);
        if (response.data && response.status === 201) {
            return response.data;
        } else {
            throw new Error('Failed to add new user');
        }
    }
);

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (userId) => {
        const response = await axios.delete(`${USERS_URL}/${userId}`);
        if (response.data && response.status === 200) {
            return { id: userId };
        } else {
            throw new Error('Failed to delete user');
        }
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(
                fetchUsers.fulfilled, (state, action) => {
                    usersAdapter.setAll(state, action.payload);
                }
            )
            .addCase(
                addNewUser.fulfilled, (state, action) => {
                    usersAdapter.addOne(state, action.payload);
                }
            )
            .addCase(
                deleteUser.fulfilled, (state, action) => {
                    if (!action.payload?.id) {
                        console.log('Could not delete the user');
                        return;
                    }
                    const {id} = action.payload; // action.payload is initialPost returned by async thunk
                    usersAdapter.removeOne(state, id);
                }
            )
    }
});

export default usersSlice.reducer;

// || SELECTORS ||
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById
} = usersAdapter.getSelectors(state => state.users);

// without adapter
// export const selectAllUsers = (state) => state.users;
// export const selectUserById = (state, userId) => state.users.find(user => user.id === userId);

export const selectUserByName = (state, userName) =>
    selectAllUsers(state).find(user => user.name === userName);