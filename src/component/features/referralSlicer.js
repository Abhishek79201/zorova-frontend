import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { REACT_APP_BASE_URL } from '../../config';
const base_url = REACT_APP_BASE_URL;

const session_url = localStorage.getItem("auth-token");
export const getUserReferralData = createAsyncThunk("getUserReferralData", async (email, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/referral/getUserReferrals`, {
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

export const getAllReferrals = createAsyncThunk("getAllReferrals", async (email, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/referral`, {
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

export const updatePaymentStatus = createAsyncThunk('updatePaymentStatus', async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/referral/updatePaymentStatus`, {
      method: 'PUT',
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

export const requestReferralPayment = createAsyncThunk('requestReferralPayment', async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/referral/requestPayment`, {
      method: 'POST',
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

export const getReferralData = createAsyncThunk("getReferralData", async (email, { rejectWithValue }) => {
  if (session_url) {
    try {
      const response = await fetch(`${base_url}/users/one`, {
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

  }
});

const initialState = {
  referrals: [],
  allreferrals: [],
  loading: false,
  error: null,
};

const referralSlicer = createSlice({
  name: 'Referral',
  initialState,
  extraReducers: (builder) => {
    builder


      //Get Referral Data
      .addCase(getUserReferralData.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getUserReferralData.fulfilled, (state, action) => {
        state.loading = false;
        state.referrals = action.payload;
      })
      .addCase(getUserReferralData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: state.error.message
        })
      })

      //Get Referral Data
      .addCase(getAllReferrals.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getAllReferrals.fulfilled, (state, action) => {
        state.loading = false;
        state.allreferrals = action.payload;
      })
      .addCase(getAllReferrals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: state.error.message
        })
      })


      .addCase(updatePaymentStatus.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Status Updated Successfully!'
        });
      })
      .addCase(updatePaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      .addCase(requestReferralPayment.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(requestReferralPayment.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Request Sent Successfully!'
        });
      })
      .addCase(requestReferralPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

  }
});


export default referralSlicer.reducer;