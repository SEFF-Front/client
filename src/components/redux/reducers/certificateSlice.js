import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../../utils/Api';
import { toast } from 'react-toastify';

const apiOption = { headers: { 'Content-Type': 'multipart/form-data' } };

export const fetchCertificates = createAsyncThunk(
	'CertificateSlice/fetchCertificates',
	async ({ role, filter = {} }, { rejectWithValue }) => {
		try {
			const response = await Api.get(`/certificates/${'student'}`);
			return response.data;
		} catch (error) {
			const errorMes = error.response?.data?.error || error.response?.data?.message;
			toast.error(errorMes);
			return rejectWithValue(error.response.data.error);
		}
	}
);

export const createCertificate = createAsyncThunk(
	'CertificateSlice/createCertificate',
	async (data, { rejectWithValue }) => {
		try {
			const response = await Api.post('certificates/admin', data, apiOption);
			if (response.data?.message) {
				toast.success(response.data?.message);
			}
			return response.data;
		} catch (error) {
			if (Array.isArray(error.response?.data?.error)) {
				toast.error(error.response.data.error.map((e) => e.message));
			}else{
				const errorMes = error.response?.data?.error || error.response?.data?.message;
				toast.error(errorMes);
			}
			return rejectWithValue(error.response.data.error);
		}
	}
);

export const getCertificate = createAsyncThunk(
	'CertificateSlice/getCertificate',
	async (id, { rejectWithValue }) => {
		try {
			const response = await Api(`certificates/admin/${id}`);
			return response.data;
		} catch (error) {
			const errorMes = error.response?.data?.error || error.response?.data?.message;
			toast.error(errorMes);
			return rejectWithValue(error.response.data.error);
		}
	}
);


// export const getStudentCertificates = createAsyncThunk(
// 	'CertificateSlice/getStudentCertificates',
// 	async ({ role, filter = {} }, { rejectWithValue }) => {
// 		try {
// 			const response = await Api.get(`/certificates/${role}`);
// 			console.log('response.data', response.data);
// 			return response.data;
// 		} catch (error) {
// 			console.log('error', error);
// 			console.log('error.response.data', error.response.data?.message);
// 			toast.error(error.response?.data?.message);
// 			return rejectWithValue(error.response.data);
// 		}
// 	}
// );



// export const updateCertificate = createAsyncThunk(
// 	'CertificateSlice/updateCertificate',
// 	async ({ id, data }, { rejectWithValue }) => {
// 		try {
// 			const response = await Api.patch(`certificates/admin/${id}`, data, {
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
// 			if (Array.isArray(error.response?.data?.error)) {
// 				console.log('its array');
// 				error.response.data.error.map((e) => e.message);
// 				toast.error(error.response.data.error.map((e) => e.message));
// 			}
// 			return rejectWithValue(error.response.data.error);
// 		}
// 	}
// );

// export const deleteCertificate = createAsyncThunk(
// 	'CertificateSlice/deleteCertificate',
// 	async (id, { rejectWithValue }) => {
// 		try {
// 			const response = await Api.delete(`certificates/admin/${id}`);
// 			console.log('response.data', response.data);
// 			toast.success(response.data?.message);
// 			fetchCertificates();
// 			return response.data;
// 		} catch (error) {
// 			console.log('error', error);
// 			console.log('error.response.data', error.response.data.error);
// 			toast.error(error.response?.data?.error);
// 			return rejectWithValue(error.response.data.error);
// 		}
// 	}
// );

export const CertificateSlice = createSlice({
	name: 'CertificateSlice',
	initialState: {
		loading: false,
		errors: '',
		success: '',
		message: '',
		certificate: null,
		certificates: [],
	},

	extraReducers: (builder) => {
		builder.addCase(fetchCertificates.pending, (state, action) => {
			state.loading = true;
			state.errors = '';
			state.message = '';
			state.certificates = [];
		});
		builder.addCase(fetchCertificates.fulfilled, (state, action) => {
			state.loading = false;
			state.errors = '';
			state.message = action.payload.message;
			state.certificates = action.payload.data;
		});
		builder.addCase(fetchCertificates.rejected, (state, action) => {
			state.loading = false;
			state.errors = action.payload;
			state.message = '';
			state.certificates = [];
		});


		builder.addCase(createCertificate.pending, (state, action) => {
			state.loading = true;
			state.errors = '';
			state.message = '';
			state.certificate = {};
		});
		builder.addCase(createCertificate.fulfilled, (state, action) => {
			state.loading = false;
			state.errors = '';
			state.message = action.payload.message;
			state.certificate = action.payload.data;
		});
		builder.addCase(createCertificate.rejected, (state, action) => {
			state.loading = false;
			state.message = '';
			state.errors = action.error.message;
			state.certificate = {};
		});

		builder.addCase(getCertificate.pending, (state, action) => {
			state.loading = true;
			state.errors = '';
			state.message = '';
			state.certificate = {};
		});
		builder.addCase(getCertificate.fulfilled, (state, action) => {
			state.loading = false;
			state.errors = '';
			state.success = action.payload.success;
			state.message = '';
			state.certificate = action.payload.data;
		});
		builder.addCase(getCertificate.rejected, (state, action) => {
			state.loading = false;
			state.message = '';
			state.errors = action.error.message;
			state.certificate = {};
		});

		
		// builder.addCase(getStudentCertificates.pending, (state, action) => {
		// 	state.loading = true;
		// 	state.errors = '';
		// 	state.message = '';
		// 	state.certificates = [];
		// });
		// builder.addCase(getStudentCertificates.fulfilled, (state, action) => {
		// 	state.loading = false;
		// 	state.errors = '';
		// 	state.message = action.payload.message;
		// 	state.certificates = action.payload.data;
		// 	console.log('fulfilled', action.payload);
		// });
		// builder.addCase(getStudentCertificates.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.errors = action.payload;
		// 	state.message = '';
		// 	state.certificates = [];
		// });

		

		// builder.addCase(updateCertificate.pending, (state, action) => {
		// 	state.loading = true;
		// 	state.errors = '';
		// 	state.message = '';
		// 	state.certificate = {};
		// });
		// builder.addCase(updateCertificate.fulfilled, (state, action) => {
		// 	state.loading = false;
		// 	state.errors = '';
		// 	state.message = action.payload.message;
		// 	state.certificate = action.payload.data;
		// 	console.log('fulfilled', action.payload);
		// });
		// builder.addCase(updateCertificate.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.message = '';
		// 	state.errors = action.error.message;
		// 	state.certificate = {};
		// 	console.log('rejected', action);
		// });
	},
});

export default CertificateSlice.reducer;
