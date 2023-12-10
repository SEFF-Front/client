import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../../utils/Api';
import { toast } from 'react-toastify';

const apiOption = { headers: { 'Content-Type': 'multipart/form-data' } };

export const fetchCourses = createAsyncThunk(
	'CourseSlice/fetchCourses',
	async (queries, { rejectWithValue }) => {
		const { role, filter = {}, page, limit = 10 } = queries;
		try {
			const response = await Api.get(
				`/courses/${role}?page=${page}&limit=${limit}`,
				// `/courses/${role}?page=${page}&limit=${limit}&searchBy=${searchBy}&searchValue=${searchValue}`,
				{ params: { filter } }
			);
			return response.data;
		} catch (error) {
			const errorMes = error.response?.data?.error || error.response?.data?.message;
			toast.error(errorMes);
			return rejectWithValue(error.response.data);
		}
	}
);

export const getCourse = createAsyncThunk(
	'CourseSlice/getCourse',
	async ({ role, id }, { rejectWithValue }) => {
		try {
			const response = await Api.get(`/courses/${role}/${id}`);
			return response.data;
		} catch (error) {
			const errorMes = error.response?.data?.error || error.response?.data?.message;
			toast.error(errorMes);
			return rejectWithValue(error.response.data.error);
		}
	}
);

export const createCourse = createAsyncThunk(
	'CourseSlice/createCourse',
	async (data, { rejectWithValue }) => {
		try {
			const response = await Api.post('/courses/admin', data, apiOption);
			if (response.data?.message) {
				toast.success(response.data?.message);
			}
			return response.data;
		} catch (error) {
			if (Array.isArray(error.response?.data?.error)) {
				error.response.data.error.map((e) => toast.error(e.message));
			} else {
				const errorMes = error.response?.data?.error || error.response?.data?.message;
				toast.error(errorMes);
			}
			// if (typeof error.response?.data?.error == 'string'){
			// 	console.log('error.response.data', error.response.data.error || error.response.data.message);
			// 		toast.error(error.response.data.error || error.response.data.message);
			// }else{
			// 	error.response.data.error.map((e) => toast.error(e.message));
			// }

			return rejectWithValue(error.response.data.error);
		}
	}
);

export const updateCourse = createAsyncThunk(
	'CourseSlice/updateCourse',
	async ({ id, data }, { rejectWithValue }) => {
		try {
			const response = await Api.patch(`/courses/admin/${id}`, data, { ...apiOption });
			if (response.data?.message) {
				toast.success(response.data?.message);
			}
			return response.data;
		} catch (error) {
			if (Array.isArray(error.response?.data?.error)) {
				error.response.data.error.map((e) => toast.error(e.message));
			} else {
				const errorMes = error.response?.data?.error || error.response?.data?.message;
				toast.error(errorMes);
			}
			return rejectWithValue(error.response.data.error);
		}
	}
);

export const deleteCourse = createAsyncThunk(
	'CourseSlice/deleteCourse',
	async (id, { rejectWithValue }) => {
		try {
			const response = await Api.delete(`/courses/admin/${id}`);
			toast.success(response.data?.message);
			return response.data;
		} catch (error) {
			const errorMes = error.response?.data?.error || error.response?.data?.message;
			toast.error(errorMes);
			return rejectWithValue(error.response.data.error);
		}
	}
);

export const CourseSlice = createSlice({
	name: 'CourseSlice',
	initialState: {
		loading: false,
		success: false,
		errors: '',
		message: '',
		course: null,
		courses: [],
		pagination: {},
	},

	extraReducers: (builder) => {
		builder.addCase(fetchCourses.pending, (state, action) => {
			state.loading = true;
			state.errors = '';
			state.message = '';
			state.courses = [];
			state.pagination = {};
		});
		builder.addCase(fetchCourses.fulfilled, (state, action) => {
			state.loading = false;
			state.errors = '';
			state.message = action.payload.message;
			state.courses = action.payload.data;
			state.pagination = action.payload?.pagination;
		});
		builder.addCase(fetchCourses.rejected, (state, action) => {
			state.loading = false;
			state.errors = action.payload;
			state.message = '';
			state.courses = [];
			state.pagination = {};
		});

		builder.addCase(getCourse.pending, (state, action) => {
			state.loading = true;
			state.errors = '';
			// state.success = action.error.success;
			state.message = '';
			state.course = {};
		});
		builder.addCase(getCourse.fulfilled, (state, action) => {
			state.loading = false;
			state.errors = '';
			state.success = action.payload.success;
			state.message = '';
			state.course = action.payload.data;
		});
		builder.addCase(getCourse.rejected, (state, action) => {
			state.loading = false;
			// state.success = action.error.success;
			state.message = '';
			state.errors = action.error.message;
			state.course = {};
		});

		builder.addCase(createCourse.pending, (state, action) => {
			state.loading = true;
			state.errors = '';
			// state.success = action.error.success;
			state.message = '';
			state.course = {};
			state.success = false;
		});
		builder.addCase(createCourse.fulfilled, (state, action) => {
			state.loading = false;
			state.errors = '';
			// state.success = action.error.success;
			state.message = action.payload.message;
			state.course = action.payload.data;
			state.success = true;
		});
		builder.addCase(createCourse.rejected, (state, action) => {
			state.loading = false;
			state.message = '';
			// state.success = action.error.success;
			state.errors = action.error.message;
			state.course = {};
			state.success = false;
		});

		builder.addCase(updateCourse.pending, (state, action) => {
			state.loading = true;
			state.errors = '';
			state.message = '';
			state.course = {};
			state.success = false;
		});
		builder.addCase(updateCourse.fulfilled, (state, action) => {
			state.loading = false;
			state.errors = '';
			// state.success = action.error.success;
			state.message = action.payload.message;
			state.course = action.payload.data;
			state.success = true;
		});
		builder.addCase(updateCourse.rejected, (state, action) => {
			state.loading = false;
			// state.success = action.error.success;
			state.errors = action.error.message;
			state.message = '';
			state.course = {};
			state.success = false;
		});
	},
});

export default CourseSlice.reducer;
