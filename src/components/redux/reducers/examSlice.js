import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../../utils/Api';
import { toast } from 'react-toastify';

export const fetchExams = createAsyncThunk(
	'ExamSlice/fetchExams',
	async ({ filter }, { rejectWithValue }) => {
		try {
			const response = await Api.get('exams/', { params: { filter } });
			return response.data;
		} catch (error) {
			const errorMes = error.response?.data?.error || error.response?.data?.message;
			toast.error(errorMes);
			return rejectWithValue(error.response.data.error);
		}
	}
);

export const createExam = createAsyncThunk(
	'ExamSlice/createExam',
	async (data, { rejectWithValue }) => {
		try {
			const response = await Api.post('/exams', data);
			if (response.data?.message) {
				toast.success(response.data?.message);
			}
			return response.data;
		} catch (error) {
			if (Array.isArray(error.response?.data?.error)) {
				console.log('its array');
				error.response.data.error.map((e) => e.message);
				toast.error(error.response.data.error.map((e) => e.message));
			} else {
				const errorMes = error.response?.data?.error || error.response?.data?.message;
				toast.error(errorMes);
			}
			return rejectWithValue(error.response.data.error);
		}
	}
);

export const getExam = createAsyncThunk(
	'ExamSlice/getExam',
	async (id, { rejectWithValue }) => {
		try {
			const response = await Api(`exams/${id}`);
			return response.data;
		} catch (error) {
			const errorMes = error.response?.data?.error || error.response?.data?.message;
			toast.error(errorMes);
			return rejectWithValue(error.response.data.error);
		}
	}
);

export const updateExam = createAsyncThunk(
	'ExamSlice/updateExam',
	async ({ id, data }, { rejectWithValue }) => {
		try {
			const response = await Api.patch(`exams/${id}`, data);
			if (response.data?.message) {
				toast.success(response.data?.message);
			}
			fetchExams({ filter: { status: 'up coming' } });
			return response.data;
		} catch (error) {
			if (Array.isArray(error.response?.data?.error)) {
				error.response.data.error.map((e) => e.message);
				toast.error(error.response.data.error.map((e) => e.message));
			}else{
				const errorMes = error.response?.data?.error || error.response?.data?.message;
				toast.error(errorMes);
			}
			return rejectWithValue(error.response.data.error);
		}
	}
);

// export const deleteExam = createAsyncThunk(
// 	'ExamSlice/deleteExam',
// 	async (id, { rejectWithValue }) => {
// 		try {
// 			const response = await Api.delete(`exams/admin/${id}`);
// 			console.log('response.data', response.data);
// 			toast.success(response.data?.message);
// 			fetchExams();
// 			return response.data;
// 		} catch (error) {
// 			console.log('error', error);
// 			console.log('error.response.data', error.response.data.message);
// 			toast.error(error.response?.data?.message);
// 			return rejectWithValue(error.response.data.error);
// 		}
// 	}
// );

export const ExamSlice = createSlice({
	name: 'ExamSlice',
	initialState: {
		loading: false,
		errors: '',
		success: '',
		message: '',
		exam: null,
		exams: [],
	},

	extraReducers: (builder) => {
		builder.addCase(fetchExams.pending, (state, action) => {
			state.loading = true;
			state.errors = '';
			state.message = '';
			state.exams = [];
		});
		builder.addCase(fetchExams.fulfilled, (state, action) => {
			state.loading = false;
			state.errors = '';
			state.message = action.payload.message;
			state.exams = action.payload.data;
		});
		builder.addCase(fetchExams.rejected, (state, action) => {
			state.loading = false;
			state.errors = action.payload;
			state.message = '';
			state.exams = [];
		});

		builder.addCase(createExam.pending, (state, action) => {
			state.loading = true;
			state.errors = '';
			state.message = '';
			state.exam = {};
		});
		builder.addCase(createExam.fulfilled, (state, action) => {
			state.loading = false;
			state.errors = '';
			state.message = action.payload.message;
			state.exam = action.payload.data;
		});
		builder.addCase(createExam.rejected, (state, action) => {
			state.loading = false;
			state.message = '';
			state.errors = action.error.message;
			state.exam = {};
		});

		builder.addCase(getExam.pending, (state, action) => {
			state.loading = true;
			state.errors = '';
			state.message = '';
			state.exam = {};
		});
		builder.addCase(getExam.fulfilled, (state, action) => {
			state.loading = false;
			state.errors = '';
			state.success = action.payload.success;
			state.message = '';
			state.exam = action.payload.data;
		});
		builder.addCase(getExam.rejected, (state, action) => {
			state.loading = false;
			state.message = '';
			state.errors = action.error.message;
			state.exam = {};
		});

		builder.addCase(updateExam.pending, (state, action) => {
			state.loading = true;
			state.errors = '';
			state.message = '';
			state.exam = {};
		});
		builder.addCase(updateExam.fulfilled, (state, action) => {
			state.loading = false;
			state.errors = '';
			state.message = action.payload.message;
			state.exam = action.payload.data;
		});
		builder.addCase(updateExam.rejected, (state, action) => {
			state.loading = false;
			state.message = '';
			state.errors = action.error.message;
			state.exam = {};
		});
	},
});

export default ExamSlice.reducer;
