import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { REACT_APP_BASE_URL } from '../../config';
const base_url = REACT_APP_BASE_URL;
const session_url = localStorage.getItem("auth-token");

export const becomeAPartner = createAsyncThunk("becomeAPartner", async (data, { rejectWithValue }) => {
  console.log(data, "slicer")
  try {

    const response = await fetch(`${base_url}/franchise/become-a-partner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session_url}`
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



const initialState = {
  partner: [],
  data: {},
  loading: false,
  error: null,

  // isLoggedIn:false,
  step: 0,
  // isSignup:true
};

const partnerSlicer = createSlice({
  name: 'Partner',
  initialState,
  reducers: {
    setPartnerField: (state, action) => {
      // Merge action payload into Provider data
      state.data = { ...state.data, ...action.payload };
    },
    setStep: (state, action) => {
      // Merge action payload into Provider data
      state.step = action.payload;
    },
    resetPartnerState: (state) => {
      state.data = {};
      state.step = 0;
      // state.isLoggedIn=false;
      // state.isSignup=false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(becomeAPartner.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(becomeAPartner.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: action.payload.message
        });
        window.location.href = "/"
      })
      .addCase(becomeAPartner.rejected, (state, action) => {
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

export const {
  setPartnerField,
  resetPartnerState,
  setStep
} = partnerSlicer.actions;
export default partnerSlicer.reducer;