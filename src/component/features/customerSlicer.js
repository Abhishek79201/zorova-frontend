import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { REACT_APP_BASE_URL } from '../../config';
const base_url = REACT_APP_BASE_URL;
const session_url = localStorage.getItem("auth-token");
export const getAppointments = createAsyncThunk("getAppointments", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/appointment`, {
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


export const getCustomerReviews = createAsyncThunk("getCustomerReviews", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/review/customer`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${session_url}`
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

export const addCustomerReviews = createAsyncThunk("addCustomerReviews", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/review/customer`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${session_url}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
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

export const toggleStatus = createAsyncThunk('appointmentToggleStatus', async ({ id, status }, { rejectWithValue }) => {
  try {
    console.log({ id, status });
    const response = await fetch(`${base_url}/appointment`, {
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${session_url}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, status })
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
  Customers: [],
  Reviews: [],
  loading: false,
  error: null,
};

const customerSlicer = createSlice({
  name: 'Customers',
  initialState,
  reducers: {
    setUserField: (state, action) => {
      // Merge action payload into user data
      state.data = { ...state.data, ...action.payload };
      console.log(state.data);
    },
    setStep: (state, action) => {
      // Merge action payload into user data
      state.step = action.payload;
    },
    resetUserState: (state) => {
      state.data = {};
      state.step = 0;
      state.isLoggedIn = false;
      state.isSignup = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppointments.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.Customers = action.payload;
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Success',
        //   text: 'Data Get Successfully!'
        // });
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      .addCase(getCustomerReviews.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getCustomerReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.Reviews = action.payload;
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Success',
        //   text: 'Data Get Successfully!'
        // });
      })
      .addCase(getCustomerReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })


      .addCase(addCustomerReviews.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(addCustomerReviews.fulfilled, (state, action) => {
        state.loading = false;
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Success',
        //   text: 'Data Get Successfully!'
        // });
      })
      .addCase(addCustomerReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      .addCase(toggleStatus.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Success',
        //   text: 'Status Updated Successfully!'
        // });
      })
      .addCase(toggleStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })
  },
});
export const {
  setUserField,
  resetUserState,
  setStep
} = customerSlicer.actions;
export default customerSlicer.reducer;
