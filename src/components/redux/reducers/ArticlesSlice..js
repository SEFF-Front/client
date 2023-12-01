import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../utils/Api";
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

export const createArticle = createAsyncThunk(
  "ArticleSlice/createArticle",
  async (articleData, { rejectWithValue }) => {
    try {
      const response = await Api.post("/articles", articleData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });
      return response.data.data;
    } catch (error) {
      const errorMessages = error.response.data.error.map((err) => err.message);

      console.log(errorMessages);
      throw rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllArticles = createAsyncThunk(
  "ArticleSlice/fetchAllArticles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Api.get("/articles");
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);
export const fetchOneArticle = createAsyncThunk(
  "ArticleSlice/fetchOneArticle",
  async (articleId, { rejectWithValue }) => {
    try {
      const response = await Api.patch(`/articles/${articleId}` );
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  "ArticleSlice/deleteArticle",
  async (articleId, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`/articles/${articleId}`);
      return response.data.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

export const updateArticle = createAsyncThunk(
  "ArticleSlice/updateArticle",
  async ({ updatedData, articleId }, { rejectWithValue }) => {
    try {
      const response = await Api.update(`/articles/${articleId}`, updatedData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

export const ArticleSlice = createSlice({
  name: "ArticleSlice",
  initialState: {
    all: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllArticles.fulfilled, (state, action) => {
        state.all = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.loading = false;
        // Add logic to update state based on successful delete if needed
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        // Add logic to update state based on successful update if needed
        state.loading = false;
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addArticle, removeArticle } = ArticleSlice.actions;
export default ArticleSlice.reducer;
