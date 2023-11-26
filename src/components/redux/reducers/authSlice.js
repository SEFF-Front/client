import { createAsyncThunk } from "@reduxjs/toolkit"
import Api from "../../../utils/Api";
import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
export const loginUser = createAsyncThunk('auth/login',async(userData,{rejectWithValue})=>{
  try {
    const response =await Api.post('/auth/login',userData)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})
export const currentUser = createAsyncThunk('auth/current-user',async(userData,{rejectWithValue})=>{
  try {
    const response =await Api.post('/auth/current-user')
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})
const authSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        error: null,
        success: true,
        isAuthenticated : false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false
                state.success = true
                state.isAuthenticated = true
                state.user= payload.data
            })
            .addCase(currentUser.fulfilled, (state, { payload }) => {
                // console.log("currentUser",payload);
                state.loading = false
                state.success = true
                state.isAuthenticated = true
                state.user= payload.data
            })
            .addCase(loginUser.rejected, (state,{payload} ) => {
                state.loading = false;
                if (payload) {
                    if (Array.isArray(payload.error)) {
                        console.log(payload.error);
                        payload.error.map(err => toast.error(err.message));
                    } else if (payload.success === false && payload.error) {
                        state.error = payload.error;
                        state.success = payload.success;
                    } else {
                        state.error = "An unknown error occurred";
                    }
                } else {
                    state.error = "Network error occurred";
                }
            })
            .addCase(currentUser.rejected,(state,{payload})=>{
                console.log("currentUser error",payload);
                state.error = payload.error;
                state.success = payload.success;
            })

    }
})
export default authSlice.reducer