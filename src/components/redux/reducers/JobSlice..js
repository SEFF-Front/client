import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../utils/Api";
import { toast } from "react-toastify";

export const createJob = createAsyncThunk(
  "jobSlice/createJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await Api.post('/jobs/create-job', jobData ,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });
    } catch (error) {
            throw rejectWithValue(error.response.data.error);
    }
  }
);

export const fetchAllJobs = createAsyncThunk(
  "jobSlice/fetchAllJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Api.get('/jobs/get-all-jobs');
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
            throw rejectWithValue(error.response.data.error);
    }
  }
);
export const fetchOneJob = createAsyncThunk(
    "jobSlice/fetchOneJob",
    async (jobId, { rejectWithValue }) => {
      try {
        const response = await Api.patch(`/jobs/get-job/${jobId}`);
        return response.data;
      } catch (error) {
              throw rejectWithValue(error.response.data.error);
      }
    }
  );

export const deleteJob = createAsyncThunk(
  "jobSlice/deleteJob",
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
    "jobSlice/updateJob",
    async ({ updatedData, jobId }, { rejectWithValue }) => {
      try {
        const response = await Api.update(`/jobs/update-job/${jobId}`, updatedData ,{
          headers:{
            "Content-Type":"multipart/form-data"
          }
        });
        return response.data.data;
      } catch (error) {
              throw rejectWithValue(error.response.data.error);
      }
    }
  );
  

export const jobSlice = createSlice({
  name: "jobSlice",
  initialState: {
    all: [],
    loading: false,
    error: null,
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
            console.log(payload.error);
            payload.error.map((err) => toast.error(err[err].message));
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
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.all = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        // Add logic to update state based on successful delete if needed
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        // Add logic to update state based on successful update if needed
        state.loading = false;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  
});

export default jobSlice.reducer;
