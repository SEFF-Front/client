import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../utils/Api";
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
export const updateUserProfile = createAsyncThunk('user/update-profile',async(userData,{rejectWithValue})=>{
  try {
    const response =await Api.patch(`/users/update-profile`,userData,{
     headers: {
      'Content-Type': 'multipart/form-data'
    }})
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const userSlice = createSlice({
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
            .addCase(updateUserProfile.pending,(state)=>{
              state.loading = true
                state.error = null
            })
            .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
              state.loading = false
              state.success = true
              state.user= payload.data
          })
            .addCase(updateUserProfile.rejected, (state,{payload} ) => {
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
           
    }
})
export default userSlice.reducer


// export const UsersSlice= createSlice({
//     name:"UsersSlice",
//     initialState:[
//         {
//         fName: 'ahmed',
//         lName: 'ahmed',
//         status: 'inActive',
//         email: 'ahmed@gmail',
//         role: 'instructor',
//         mobNum: '01090251773',
//         userId: 0,
//         password: '123456',
//         passwordConfirmation: '123456',
//         score: 20,
//         online:false,
//         },
//         {
//         fName: 'ahmed',
//         lName: 'ahmed',
//         status: 'Active',
//         email: 'ahmed1@gmail',
//         role: 'Admin',
//         mobNum: '01090251773',
//         userId: 1,
//         password: '123456',
//         passwordConfirmation: '123456',
//         score: 20,
//         online:false,
//         },
//         {
//         fName: 'ahmed',
//         lName: 'ahmed',
//         status: 'Active',
//         email: 'ahmed2@gmail',
//         role: 'Student',
//         mobNum: '01090251773',
//         userId: 2,
//         password: '123456',
//         passwordConfirmation: '123456',
//         score: 20,
//         online:false,
//       }
//     ],
//     reducers:{
//         addUser:(state,action)=>{
//             const userExists = state.find((user) => user.userId === action.payload.userId);
//             if (userExists) {
//               return state.map((user) =>
//                 user.userId === action.payload.userId ? { ...user, ...action.payload } : user
//               );
//             } else {
//               state.push({ ...action.payload, userId: state.length });
//             }
//         },
//         setOnline:(state,action)=>{
//             const index = state.findIndex(user=>user.userId == action.payload.userId)
            
//             state[index] = {...action.payload,online:true}
//             return state
             
//         },
//         logOut:(state,action)=>{
//             const index = state.findIndex(user=>user.userId == action.payload)
//             state[index].online = false;
//         },
//         removeUser:(state,action)=>{
//             return state.filter(user=>user.userId!==action.payload.userId)
//         }
//     },
//     // extraReducers: (builder) => {
//     //     builder.addCase(fetchUsers.fulfilled, (state, action) => {
//     //     state.all = action.payload;
//     //     })}
// })

// export const {addUser,setOnline,logOut , removeUser} = UsersSlice.actions;
// export default UsersSlice.reducer;