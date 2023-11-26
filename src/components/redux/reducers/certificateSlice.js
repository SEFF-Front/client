import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import moment from 'moment';
// const currentTime = moment().format('hh:mm A');
// export const fetchcertificates = createAsyncThunk(
//     "CertificateSlice/fetchcertificates",
//     async () => {
//       const response = await api('/products/categories'
//       );
//       return response.data;
//     }
//   );

export const CertificateSlice= createSlice({
    name:"CertificateSlice",
    initialState:[
        {
            studentname: "sssss",
            date_acquired: "dddddd",
            upload_date: "ddddd",
            course: "dddddd",
            uploadedFile:null,
            id:0,
        },
        {
            studentname: "",
            date_acquired: "",
            upload_date: "",
            course: "",
            uploadedFile:null,
            id:1,
        },
        {
            studentname: "",
            date_acquired: "",
            upload_date: "",
            course: "",
            uploadedFile:null,
            uploadedFile: null ,
            id:2,
        },
    ],
    reducers:{
        addCertificate:(state,action)=>{
                // state.push({...action.payload,id:state.length})
                // const ids = state.map((certificate=>certificate.id))
                // let index = state.findIndex(action.payload.id)
                // if(index){
                    // ids?.includes(action.payload.id) ? state[index] = ({...action.payload,id:action.payload.id})
                // :
                 state.push({...action.payload,id:state.length})
                    // ;console.log(state)
                // }
        },
        remoceCertificate:(state,action)=>{
            return state.filter(certificate=>certificate.id!==action.payload.id)
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchcertificates.fulfilled, (state, action) => {
    //     state.all = action.payload;
    //     })}
})

export const {addCertificate , remoceCertificate} = CertificateSlice.actions;
export default CertificateSlice.reducer;