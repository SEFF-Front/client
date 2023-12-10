import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../../utils/Api';
import { toast } from 'react-toastify';
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
	'ArticleSlice/createArticle',
	async (articleData, { rejectWithValue }) => {
		try {
			const response = await Api.post('/articles', articleData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			return response.data.data;
		} catch (error) {
			throw rejectWithValue(error.response.data.error);
		}
	}
);

export const fetchAllArticles = createAsyncThunk(
	'ArticleSlice/fetchAllArticles',
	async (_, { rejectWithValue }) => {
		try {
			const response = await Api.get('/articles');
			return response.data.data;
		} catch (error) {
			throw rejectWithValue(error.response.data.message);
		}
	}
);
export const getArticle = createAsyncThunk(
	'ArticleSlice/getArticle',
	async (articleId, { rejectWithValue }) => {
		try {
			const response = await Api.get(`/articles/${articleId}`);
			return response.data;
		} catch (error) {
			throw rejectWithValue(error.response.data.error);
		}
	}
);

export const deleteArticle = createAsyncThunk(
	'ArticleSlice/deleteArticle',
	async (articleId, { rejectWithValue }) => {
		try {
			const response = await Api.delete(`/articles/${articleId}`);
			return response.data.data;
		} catch (error) {
			throw rejectWithValue(error.response.data.error);
		}
	}
);

export const updateArticle = createAsyncThunk(
	'ArticleSlice/updateArticle',
	async ({ updatedData, articleId }, { rejectWithValue }) => {
		try {
			const response = await Api.patch(`/articles/${articleId}`, updatedData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			return response.data.data;
		} catch (error) {
			throw rejectWithValue(error.response.data.error);
		}
	}
);

export const ArticleSlice = createSlice({
	name: 'ArticleSlice',
	initialState: {
		all: [],
		getArticle: null,
		pagination: [],
		loading: false,
		error: null,
		success: true,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createArticle.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createArticle.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(createArticle.rejected, (state, { payload }) => {
				state.loading = false;
				if (payload) {
					if (Array.isArray(payload.error)) {
						payload.error.map((err) => toast.error(err[err].message));
					} else if (payload.success === false && payload.error) {
						state.error = payload.error;
						state.success = payload.success;
					} else {
						state.error = 'An unknown error occurred';
					}
				} else {
					state.error = 'Network error occurred';
				}
			})
			.addCase(fetchAllArticles.pending, (state, { payload }) => {
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

			.addCase(getArticle.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getArticle.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
				state.getArticle = payload.data;
			})
			.addCase(getArticle.rejected, (state, { payload }) => {
				state.loading = false;
				if (payload) {
					if (payload.success === false && payload.error) {
						state.error = payload.error;
						state.success = payload.success;
					} else {
						state.error = 'An unknown error occurred';
					}
				} else {
					state.error = 'Network error occurred';
				}
			})
			.addCase(updateArticle.pending, (state, { payload }) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateArticle.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
				state.getArticle = payload.data;
			})
			.addCase(updateArticle.rejected, (state, { payload }) => {
				state.loading = false;
				if (payload) {
					if (Array.isArray(payload.error)) {
						payload.error.map((err) => toast.error(err.message));
					} else if (payload.success === false && payload.error) {
						state.error = payload.error;
						state.success = payload.success;
					} else {
						state.error = 'An unknown error occurred';
					}
				} else {
					state.error = 'Network error occurred';
				}
			});
	},
});

export const { addArticle, removeArticle } = ArticleSlice.actions;
export default ArticleSlice.reducer;