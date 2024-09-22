import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { REACT_APP_BASE_URL } from '../../config';
const base_url = REACT_APP_BASE_URL;

const session_url = localStorage.getItem("auth-token");

export const sendSosRequest = createAsyncThunk("sendSosRequest", async (appointmentId, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/sos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session_url}`
      },
      body: JSON.stringify({ appointmentId })
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      return rejectWithValue(responseData);
    }
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

export const getSosRequest = createAsyncThunk("getSosRequest", async (args, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/sos`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${session_url}`,
      }
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      return rejectWithValue(responseData);
    }
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

export const deleteSosRequest = createAsyncThunk("deleteSosRequest", async (sosId, { rejectWithValue }) => {
  try {
    console.log(sosId);
    const response = await fetch(`${base_url}/sos`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session_url}`,
      },
      body: JSON.stringify({ sosId })
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      return rejectWithValue(responseData);
    }
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const initialState = {
  sosRequests: [],
  loading: false,
  error: null,
};

const sosSlicer = createSlice({
  name: 'Sos',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(sendSosRequest.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(sendSosRequest.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendSosRequest.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(getSosRequest.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getSosRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.sosRequests = action.payload;
      })
      .addCase(getSosRequest.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(deleteSosRequest.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(deleteSosRequest.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'SOS Request Deleted Successfully!'
        });
      })
      .addCase(deleteSosRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error}`
        });
      })
  }
});


export default sosSlicer.reducer;