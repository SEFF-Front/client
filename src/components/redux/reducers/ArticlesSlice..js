import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import moment from 'moment';
// const currentTime = moment().format('hh:mm A');
// export const fetchArticles = createAsyncThunk(
//     "ArticleSlice/fetchArticles",
//     async () => {
//       const response = await api('/products/categories'
//       );
//       return response.data;
//     }
//   );

export const ArticleSlice= createSlice({
    name:"ArticleSlice",
    initialState:[
        {
            articleTitle:'this is articleTitle',
            category:'tech',
            status:true,
            content: '',
            publishingDate: 'monday June 5th',
            // publishingTime:currentTime,
            uploadedFile: null ,
            id:0,
        },
        {
            articleTitle:'this is articleTitle',
            category:'tech',
            status:true,
            content: '',
            publishingDate: 'monday June 5th',
            // publishingTime:currentTime,
            uploadedFile: null ,
            id:1,
        },
        {
            articleTitle:'this is articleTitle',
            category:'Education',
            status:false,
            content: '',
            publishingDate: 'monday June 5th',
            // publishingTime:currentTime,
            uploadedFile: null ,
            id:2,
        },
    ],
    reducers:{
        addArticle:(state,action)=>{
                // state.push({...action.payload,id:state.length})
                // const ids = state.map((article=>article.id))
                // let index = state.findIndex(action.payload.id)
                // if(index){
                    // ids?.includes(action.payload.id) ? state[index] = ({...action.payload,id:action.payload.id})
                // :
                 state.push({...action.payload,id:state.length})
                    // ;console.log(state)
                // }
        },
        removeArticle:(state,action)=>{
            return state.filter(article=>article.id!==action.payload.id)
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchArticles.fulfilled, (state, action) => {
    //     state.all = action.payload;
    //     })}
})

export const {addArticle , removeArticle} = ArticleSlice.actions;
export default ArticleSlice.reducer;