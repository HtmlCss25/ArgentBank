import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";



export const setTokenAsync = createAsyncThunk(
  'log/setTokenAsync',
  async (userInfo, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo)
      });

      if (!response.ok) {
        const error = {
          code: response.status,
          message: response.statusText
        };
        return rejectWithValue(error);
      }

      const data = await response.json();

      if (data.body && data.body.token) {
        localStorage.setItem("token", data.body.token);
        dispatch(setToken(data.body.token));
        return {code:200, token:data.body.token};
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

const logSlice = createSlice({
  name: "log",
  initialState: {
    token: null,
    loading: false,
    error: null, 
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setTokenAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setTokenAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(setTokenAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setToken, clearToken } = logSlice.actions;

export default logSlice.reducer;