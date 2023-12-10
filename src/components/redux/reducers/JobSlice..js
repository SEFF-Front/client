import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../../utils/Api';
import { toast } from 'react-toastify';

export const createJob = createAsyncThunk(
	'jobSlice/createJob',
	async (jobData, { rejectWithValue }) => {
		try {
			const response = await Api.post('/jobs/create-job', jobData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		} catch (error) {
			throw rejectWithValue(error.response.data.error);
		}
	}
);

export const fetchAllJobs = createAsyncThunk(
	'jobSlice/fetchAllJobs',
	async (_, { rejectWithValue }) => {
		try {
			const response = await Api.get('/jobs/get-all-jobs');
			// return response.data.data;
			return response.data;
		} catch (error) {
			throw rejectWithValue(error.response.data.error);
		}
	}
);

export const fetchAllJobsUsers = createAsyncThunk(
	'jobSlice/fetchAllJobsUsers',
	async (queries, { rejectWithValue }) => {
		const { filter = {}, page = 1, limit = 10 } = queries;
		try {
			const response = await Api.get(`/jobs/get-all-jobs?page=${page}`, {
				params: { filter },
			});
			// const response = await Api.get('/jobs/get-all-jobs');
			return response.data;
		} catch (error) {
			throw rejectWithValue(error.response.data.error);
		}
	}
);

export const fetchOneJobUsers = createAsyncThunk(
	'jobSlice/fetchOneJobUsers',
	async (jobId, { rejectWithValue }) => {
		try {
			const response = await Api.get(`/jobs/get-job/${jobId}`);
			return response.data;
		} catch (error) {
			throw rejectWithValue(error.response.data.error);
		}
	}
);


export const fetchOneJob = createAsyncThunk(
	'jobSlice/fetchOneJob',
	async (jobId, { rejectWithValue }) => {
		try {
			const response = await Api.get(`/jobs/get-job/${jobId}`);
			return response.data;
		} catch (error) {
			throw rejectWithValue(error.response.data.error);
		}
	}
);

export const deleteJob = createAsyncThunk(
	'jobSlice/deleteJob',
	async (jobId, { rejectWithValue }) => {
		try {
			const response = await Api.delete(`/jobs/delete-job/${jobId}`);
			return response.data.data;
		} catch (error) {
			throw rejectWithValue(error.response.data.error);
		}
	}
);

export const updateJob = createAsyncThunk(
	'jobSlice/updateJob',
	async ({ updatedData, jobId }, { rejectWithValue }) => {
		try {
			const response = await Api.patch(`/jobs/update-job/${jobId}`, updatedData, {
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

export const jobSlice = createSlice({
	name: 'jobSlice',
	initialState: {
		all: [],
		job: null,
		loading: false,
		error: null,
		pagination: null,

		locations: [],
		jobsUsers: [],
		jobUsers: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createJob.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createJob.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(createJob.rejected, (state, { payload }) => {
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
			.addCase(fetchAllJobs.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchAllJobs.fulfilled, (state, action) => {
				state.all = action?.payload?.data;
				state.loading = false;
				state.pagination = action.payload?.pagination;
				state.locations = action.payload?.locations;
			})
			.addCase(fetchAllJobs.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(fetchOneJob.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchOneJob.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
				state.job = payload.data;
			})
			.addCase(fetchOneJob.rejected, (state, { payload }) => {
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
			.addCase(deleteJob.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteJob.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(deleteJob.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(updateJob.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateJob.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
				state.job = payload.data;
			})
			.addCase(updateJob.rejected, (state, { payload }) => {
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
			})

			.addCase(fetchAllJobsUsers.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchAllJobsUsers.fulfilled, (state, action) => {
				state.all = action?.payload?.data;
				state.loading = false;
				state.pagination = action.payload?.pagination;
				state.locations = action.payload?.locations;
				state.jobsUsers = action.payload?.data;

			})
			.addCase(fetchAllJobsUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(fetchOneJobUsers.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchOneJobUsers.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
				state.jobUsers = payload.data;
			})
			.addCase(fetchOneJobUsers.rejected, (state, { payload }) => {
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
	},
});

export default jobSlice.reducer;
