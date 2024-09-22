import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { REACT_APP_BASE_URL } from '../../config';
const base_url = REACT_APP_BASE_URL;
const session_url = localStorage.getItem("auth-token");

export const addService = createAsyncThunk("addService", async (data, { rejectWithValue }) => {
  try {
    console.log("iorder detail", data);
    const response = await fetch(`${base_url}/services`, {
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


export const checkPaymentPaid = createAsyncThunk("checkPaymentPaid", async (id, { rejectWithValue }) => {
  try {

    console.log("iorder detail", id);
    const response = await fetch(`${base_url}/api/checkPaymentPaid?id=${id}`, {
      method: "POST",
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

export const cancelService = createAsyncThunk("cancelService", async (serviceId, { rejectWithValue }) => {
  try {
    console.log("Canceling service with ID:", serviceId);

    const response = await fetch(`${base_url}/services/${serviceId}/cancel`, {
      method: "PATCH",  // Assuming PATCH is the correct method for canceling a service
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session_url}`
      },
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

export const getPrice = createAsyncThunk("getPrice", async (data, { rejectWithValue }) => {
  try {
    // console.log(data);
    const response = await fetch(`${base_url}/price/getPrice`, {
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

export const sendConfirmationEmail = createAsyncThunk("sendConfirmationEmail", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/mail/sendConfirmationEmail`, {
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

export const addFitness = createAsyncThunk("addFitness", async (data, { rejectWithValue }) => {
  try {

    console.log("iorder detail", data);
    const response = await fetch(`${base_url}/fitness`, {
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

export const getDiscount = createAsyncThunk("getDiscount", async (code, { rejectWithValue }) => {

  try {

    const response = await fetch(`${base_url}/settings/offers`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authrization": `Bearer ${session_url}`
      },
      body: JSON.stringify({ code })
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
  Users: [],
  data: {},
  priceData: {},
  loading: false,
  error: null,
  auth_token: null,
  isOrderPlaced: false,
  isFitnessOrderPlaced: false,
  step: 0,
  isRegister: false
};

const bookingSlicer = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setMassageField: (state, action) => {
      // Merge action payload into user data
      state.data = { ...state.data, ...action.payload };
      console.log(state.data);
    },
    setFitnessField: (state, action) => {
      // Merge action payload into user data
      state.data = { ...state.data, ...action.payload };
      console.log(state.data);
    },
    setStep: (state, action) => {
      // Merge action payload into user data
      state.step = action.payload;
      console.log(state.step);
    },
    resetMassageState: (state) => {
      state.data = {};
      state.priceData = {};
      state.step = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addService.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.loading = false;
        state.isOrderPlaced = true;
        // state.step=state.step+1;
      })
      .addCase(addService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.error}`
        });
      })

      .addCase(getPrice.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.priceData = action.payload;
        // let person=state.data.peoples;
        // state.price=price*person;
      })
      .addCase(getPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
        state.price = {};
      })

      .addCase(sendConfirmationEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendConfirmationEmail.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendConfirmationEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      .addCase(addFitness.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(addFitness.fulfilled, (state, action) => {
        state.loading = false;
        state.isFitnessOrderPlaced = true;
        // state.step=state.step+1;
      })
      .addCase(addFitness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.error}`
        });
      })
  }
});
export const {
  setMassageField,
  resetMassageState,
  setFitnessField,
  setStep
} = bookingSlicer.actions;
export default bookingSlicer.reducer;
