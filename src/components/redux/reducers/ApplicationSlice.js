import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const ApplicationSlice = createSlice({
  name: "ApplicationSlice",
  initialState: [
    {
      title: 'this is title',
      experience: "2 years",
      email: 'thursday.june 5',
      phone: '12:30 PM',
      id: 0,
    },
    {
      title: 'this is title',
      experience: "2 years",
      email: 'thursday.june 5',
      phone: '12:30 PM',
      id: 1,
    },
    {
      title: 'this is title',
      experience: "2 years",
      email: 'thursday.june 5',
      phone: '12:30 PM',
      id: 2,
    },
  ],
  reducers: {
    addApplication: (state, action) => {
      state.push(action.payload); // Assuming payload is a new application object
    },
    removeApplication: (state, action) => {
      const idToRemove = action.payload;
      return state.filter(app => app.id !== idToRemove);
    },
  },
  // extraReducers: (builder) => {
  //     builder.addCase(fetchApplication.fulfilled, (state, action) => {
  //     state.all = action.payload;
  //     })}
});

export const { removeApplication, addApplication } = ApplicationSlice.actions;
export default ApplicationSlice.reducer;
