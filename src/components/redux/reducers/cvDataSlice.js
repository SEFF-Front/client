import {  createSlice } from "@reduxjs/toolkit";

export const CvDataSlice= createSlice({
    name:"CvDataSlice",
    initialState:{
        mainData:{},
        aboutData:[],
        links:[],
        skills:[],
        experience:[],
        education:[],
        awards:[],
        hobbies:[],
        companyLogo:'',
        personalPhoto:'',
    },
    reducers:{
        addMainData:(state,action)=>{
                state.mainData=({...action.payload})
        },addAboutData:(state,action)=>{
            state.aboutData=([...action.payload])
        },addSkills:(state,action)=>{
            state.skills=([...action.payload])
        },addLinks:(state,action)=>{
            state.links=([...action.payload])
        },addExperience:(state,action)=>{
            state.experience=([...action.payload])
        },addEducation:(state,action)=>{
            state.education=([...action.payload])
        },addHobbies:(state,action)=>{
            state.hobbies=([...action.payload])
        },addAwards:(state,action)=>{
            state.awards=([...action.payload])
        },addCompanyLogo:(state,action)=>{
            state.companyLogo=(action.payload)
        },addPersonalPhoto:(state,action)=>{
            state.personalPhoto=(action.payload)
        },
        }
})

export const {addPersonalPhoto,addMainData, addCompanyLogo, addAwards,addLinks,addSkills,addAboutData,
    addHobbies,addEducation,addExperience} = CvDataSlice.actions;
export default CvDataSlice.reducer;