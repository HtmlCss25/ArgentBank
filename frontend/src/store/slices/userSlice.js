import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

export const getUserData = createAsyncThunk(
    'log/getUserData',
    async(token,{dispatch, rejectWithValue})=>{
      try{
        const response = await fetch("http://localhost:3001/api/v1/user/profile",{
          method: "POST",
          headers: {
              "Authorization" : `Bearer ${token}`,
              "Content-Type" : "application/json"
          }
        })
  
        if(!response.ok){
          if (!response.ok) {
            const error = {
              code: response.status,
              message: response.statusText
            };
            return rejectWithValue(error);
          }
        }
  
        const data = await response.json();
        dispatch(setUser(data.body));
        return data.body
  
      }
      catch(error){
        console.error(error)
      }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {
      user: null,
      loading: false, 
      error: null, 
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
          },
        clearUser(state) {
            state.user = null;
          },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getUserData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getUserData.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(getUserData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });

export const userNameSelect = (state)=> state.user?.user?.userName;
export const firstNameSelect = (state)=> state.user?.user?.firstName;
export const lastNameSelect = (state)=> state.user?.user?.lastName;
export const emailSelect = (state)=> state.user?.user?.email;
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;