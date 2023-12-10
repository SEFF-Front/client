import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../../utils/Api';
import { toast } from 'react-toastify';

const apiOption = { headers: { 'Content-Type': 'multipart/form-data' } };

export const fetchApplications = createAsyncThunk(
	'ApplicationSlice/fetchApplications',
	async (queries, { rejectWithValue }) => {
		const {
			// role,
			filter = {},
			page,
			searchBy = '',
			searchValue = '',
			limit = 10,
		} = queries;
		try {
			const response = await Api.get(
				`/applications/?page=${page}&limit=${limit}&searchBy=${searchBy}&searchValue=${searchValue}`,
				{ params: { filter } }
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

// export const getApplication = createAsyncThunk(
// 	'ApplicationSlice/getApplication',
// 	async ({ role, id }, { rejectWithValue }) => {
// 		// console.log('role', role);
// 		console.log('id', id);
// 		try {
// 			const response = await Api.get(`/applications/${role}/${id}`);
// 			console.log('api', `/applications/${role}/${id}`);
// 			console.log('idddd', id);
// 			console.log('response.data', response.data);
// 			return response.data;
// 		} catch (error) {
// 			console.log('error', error);
// 			console.log('error.response.data', error.response.data.error);
// 			toast.error(error.response?.data?.message || error.response?.data?.error);
// 			return rejectWithValue(error.response.data.error);
// 		}
// 	}
// );

export const createApplication = createAsyncThunk(
	'ApplicationSlice/createApplication',
	async (data, { rejectWithValue }) => {
		try {
			const response = await Api.post('/applications', data, apiOption);
			console.log('response.data', response.data);
			if (response.data?.message) {
				toast.success(response.data?.message);
			}
			return response.data;
		} catch (error) {
			if (Array.isArray(error.response?.data?.error)) {
				error.response.data.error.map((e) => toast.error(e.message));
			}else{
				const errorMes =error.response?.data?.error || error.response?.data?.message;
				toast.error(errorMes);
			}
			return rejectWithValue(error.response.data.error);
		}
	}
);

// export const updateApplication = createAsyncThunk(
// 	'ApplicationSlice/updateApplication',
// 	async ({ id, data }, { rejectWithValue }) => {
// 		console.log('hhhh id', id);
// 		console.log('hhhh data', data);
// 		try {
// 			const response = await Api.patch(`/applications/admin/${id}`, data, {
// 				...apiOption,
// 			});
// 			console.log('response.data', response.data);
// 			if (response.data?.message) {
// 				toast.success(response.data?.message);
// 			}
// 			return response.data;
// 		} catch (error) {
// 			console.log('error', error);
// 			console.log('error.response.data', error.response.data.error);
// 			error.response?.data?.error?.map((error) => toast.error(error?.message));
// 			toast.error(error.response?.data?.error);
// 			return rejectWithValue(error.response.data.error);
// 		}
// 	}
// );

// export const deleteApplication = createAsyncThunk(
// 	'ApplicationSlice/deleteApplication',
// 	async (id, { rejectWithValue }) => {
// 		try {
// 			const response = await Api.delete(`/applications/admin/${id}`);
// 			console.log('response.data', response.data);
// 			toast.success(response.data?.message);
// 			// fetchApplications({ role: 'admin', filter, ...queries, page: 1 })
// 			return response.data;
// 		} catch (error) {
// 			console.log('error', error);
// 			console.log('error.response.data', error.response.data.error);
// 			toast.error(error.response?.data?.error);
// 			return rejectWithValue(error.response.data.error);
// 		}
// 	}
// );

export const ApplicationSlice = createSlice({
	name: 'ApplicationSlice',
	initialState: {
		loading: false,
		success: false,
		errors: '',
		message: '',
		application: null,
		applications: [],
		pagination: {},
	},

	extraReducers: (builder) => {
		builder.addCase(fetchApplications.pending, (state, action) => {
			state.loading = true;
			state.errors = '';
			state.message = '';
			state.applications = [];
			state.pagination = {};
		});
		builder.addCase(fetchApplications.fulfilled, (state, action) => {
			state.loading = false;
			state.errors = '';
			state.message = action.payload.message;
			state.applications = action.payload.data;
			state.pagination = action.payload?.pagination;
		});
		builder.addCase(fetchApplications.rejected, (state, action) => {
			state.loading = false;
			state.errors = action.payload;
			state.message = '';
			state.applications = [];
			state.pagination = {};
		});

		// builder.addCase(getApplication.pending, (state, action) => {
		// 	state.loading = true;
		// 	state.errors = '';
		// 	// state.success = action.error.success;
		// 	state.message = '';
		// 	state.application = {};
		// });
		// builder.addCase(getApplication.fulfilled, (state, action) => {
		// 	state.loading = false;
		// 	state.errors = '';
		// 	state.success = action.payload.success;
		// 	state.message = '';
		// 	state.application = action.payload.data;
		// 	console.log(' action.payload', action);
		// });
		// builder.addCase(getApplication.rejected, (state, action) => {
		// 	state.loading = false;
		// 	// state.success = action.error.success;
		// 	state.message = '';
		// 	state.errors = action.error.message;
		// 	state.application = {};
		// 	console.log(' action.payload', action);
		// });

		builder.addCase(createApplication.pending, (state, action) => {
			state.loading = true;
			state.errors = '';
			// state.success = action.error.success;
			state.message = '';
			state.application = {};
			state.success = false;
		});
		builder.addCase(createApplication.fulfilled, (state, action) => {
			state.loading = false;
			state.errors = '';
			// state.success = action.error.success;
			state.message = action.payload.message;
			state.application = action.payload.data;
			state.success = true;
		});
		builder.addCase(createApplication.rejected, (state, action) => {
			state.loading = false;
			state.message = '';
			// state.success = action.error.success;
			state.errors = action.error.message;
			state.application = {};
			state.success = false;
		});

		// builder.addCase(updateApplication.pending, (state, action) => {
		// 	state.loading = true;
		// 	state.errors = '';
		// 	state.message = '';
		// 	state.application = {};
		// 	state.success = false;
		// });
		// builder.addCase(updateApplication.fulfilled, (state, action) => {
		// 	state.loading = false;
		// 	state.errors = '';
		// 	// state.success = action.error.success;
		// 	state.message = action.payload.message;
		// 	state.application = action.payload.data;
		// 	state.success = true;
		// 	console.log('fulfilled', action.payload);
		// });
		// builder.addCase(updateApplication.rejected, (state, action) => {
		// 	state.loading = false;
		// 	// state.success = action.error.success;
		// 	state.errors = action.error.message;
		// 	state.message = '';
		// 	state.application = {};
		// 	state.success = false;
		// 	console.log('rejected', action);
		// });
	},
});

export default ApplicationSlice.reducer;
