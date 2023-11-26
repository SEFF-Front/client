import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const fetchJobs = createAsyncThunk(
//     "JobSlice/fetchJobs",
//     async () => {
//       const response = await api('/products/categories'
//       );
//       return response.data;
//     }
//   );

export const JobSlice= createSlice({
    name:"JobSlice",
    initialState:[
        {
            companyName:'this is companyName',
            position:'tech',
            status:true,
            date:'monday June 5th',
            time:'12:30 PM',
            id:0,
            application:12,
        },
        {
            companyName:'this is companyName',
            position:'tech',
            status:true,
            date:'monday June 5th',
            time:'12:30 PM',
            id:1,
            application:12,
        },
        {
            companyName:'this is companyName',
            position:'Education',
            status:false,
            date:'sunday June 5th',
            time:'12:30 PM',
            id:2,
            application:12,
        },
    ],
    reducers:{
        addJob:(state,action)=>{
                state.push({...action.payload,id:state.length})
        },
        removeJob:(state,action)=>{
            return state.filter(article=>article.id!==action.payload.id)
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchJobs.fulfilled, (state, action) => {
    //     state.all = action.payload;
    //     })}
})

export const {addJob , removeJob} = JobSlice.actions;
export default JobSlice.reducer;