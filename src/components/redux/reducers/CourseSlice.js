import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const fetchCourses = createAsyncThunk(
//     "CourseSlice/fetchCourses",
//     async () => {
//       const response = await api('/products/categories'
//       );
//       return response.data;
//     }
//   );

export const CourseSlice= createSlice({
    name:"CourseSlice",
    initialState:[
        {
            courseName:'this is courseName',
            status:true,
            instructor:"ahmed ali",
            level:1,
            startDate:'thursday.june 5',
            date:'monday June 5th',
            time:'12:30 PM',
            id:0,
        },
        {
            courseName:'this is courseName',
            status:true,
            instructor:"ahmed ali",
            level:1,
            startDate:'thursday.june 5',
            date:'monday June 5th',
            time:'12:30 PM',
            id:1,
        },
        {
            courseName:'this is courseName',
            status:false,
            instructor:"ahmed ali",
            level:1,
            startDate:'thursday.june 5',
            date:'sunday June 5th',
            time:'12:30 PM',
            id:2,
        },
    ],
    reducers:{
        addCourse:(state,action)=>{
            const ids = state.map((course=>course.id))
            let index = state.findIndex(action.payload.id)
            ids?.includes(action.payload.id) ? state[index] = ({...action.payload,id:action.payload.id})
            : state.push({...action.payload,id:state.length})
                
        },
        removeCourse:(state,action)=>{
            return state.filter(article=>article.id!==action.payload.id)
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchCourses.fulfilled, (state, action) => {
    //     state.all = action.payload;
    //     })}
})

export const {addCourse , removeCourse} = CourseSlice.actions;
export default CourseSlice.reducer;