import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { REACT_APP_BASE_URL } from '../../config';
const base_url = REACT_APP_BASE_URL;

const session_url = localStorage.getItem("auth-token");
export const statusUpdate = createAsyncThunk("statusUpdate", async (status, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/provider`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session_url}`
      },
      body: JSON.stringify({ status })
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

export const providerStatusUpdateByAdmin = createAsyncThunk("providerStatusUpdateByAdmin", async (data, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/provider/providerStatusUpdateByAdmin`, {
      method: "PUT",
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

export const getLiveLocation = createAsyncThunk("getLiveLocation", async (args, { rejectWithValue }) => {
  try {
    const {
      providerId
    } = args;

    const response = await fetch(`${base_url}/provider/getLiveLocation?providerId=${providerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export const StoreLocation = createAsyncThunk("StoreLocation", async (provider, { rejectWithValue }) => {
  try {
    const {
      providerId,
      latitude,
      longitude,
      altitude,
      heading,
      speed,

    } = provider

    const formData = new FormData()
    formData.append('latitude', latitude)
    formData.append('longitude', longitude)
    formData.append('altitude', altitude)
    formData.append('heading', heading)
    formData.append('speed', speed)
    formData.append('providerId', providerId)
    // Log the values to the console
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
    console.log('Altitude:', altitude);
    console.log('Heading:', heading);
    console.log('Speed:', speed);
    console.log('Provider ID:', providerId);

    // Now you can also log the entire FormData object if needed
    console.log('FormData:', formData);
    console.log('Slicer');

    const response = await fetch(`${base_url}/provider/Livelocation`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      //   "Authorization": `Bearer ${session_url}`
      // },
      headers: {
        "Authorization": `Bearer ${session_url}`
      },
      body: formData
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

export const checkProviderDuplicateRequest = createAsyncThunk("checkProviderDuplicateRequest", async (userId, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/provider/check-request`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${session_url}`
      },
      body: JSON.stringify({ userId })
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

export const registerProvider = createAsyncThunk("registerProvider", async (provider, { rejectWithValue }) => {
  try {
    const {
      userId,
      certificate,
      yearsOfExperience,
      areasOfSpecialization,
      services,
      areas,
      aadharCard,
      photo,
      professionalRefrence1,
      professionalRefrence2 } = provider

    const formData = new FormData()
    formData.append('userId', userId)
    formData.append('certificate', certificate)
    formData.append('yearsOfExperience', yearsOfExperience)
    formData.append('areasOfSpecialization', areasOfSpecialization)
    formData.append('services', services)
    formData.append('areas', areas)
    formData.append('aadharCard', aadharCard)
    formData.append('professionalRefrence1', professionalRefrence1)
    formData.append('professionalRefrence2', professionalRefrence2)
    formData.append('photo', photo)


    const response = await fetch(`${base_url}/provider`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${session_url}`
      },
      body: formData
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

export const getAssignedOrders = createAsyncThunk("getAssignedOrders", async (args, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/provider`, {
      method: "GET",
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


export const addProviderReviews = createAsyncThunk("addProviderReviews", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/review/customer`, {
      method: "PUT",
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

export const statData = createAsyncThunk("/provider/statData", async (date, { rejectWithValue }) => {
  try {
    // console.log(moment(date).format('YYYY-MM-DD'));
    // const date=moment(date, 'YYYY-MM-DD').toDate();
    const response = await fetch(`${base_url}/provider/statData`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export const sendOtp = createAsyncThunk("sendOtp", async (data, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/otp`, {
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

export const verifyOtp = createAsyncThunk("verifyOtp", async (data, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/otp`, {
      method: "PUT",
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

export const getAllProviders = createAsyncThunk("getAllProviders", async (args, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/provider/getAllProviders`, {
      method: "GET",
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

export const getOneProvider = createAsyncThunk("getOneProvider", async (args, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/provider/getOneProvider`, {
      method: "GET",
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

export const requestProviderPayment = createAsyncThunk('requestProviderPayment', async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/provider/requestPayment`, {
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

const initialState = {
  provider: [],
  oneProviderData: {},
  isDuplicate: false,
  data: {},
  assignedOrders: [],
  stats: {},
  loading: false,
  error: null,
  status: "Available",
  // isLoggedIn:false,
  step: 0,
  // isSignup:true
};

const providerSlicer = createSlice({
  name: 'Provider',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setProviderField: (state, action) => {
      // Merge action payload into Provider data
      state.data = { ...state.data, ...action.payload };
    },
    setStep: (state, action) => {
      // Merge action payload into Provider data
      state.step = action.payload;
    },
    resetProviderState: (state) => {
      state.data = {};
      state.step = 0;
      // state.isLoggedIn=false;
      // state.isSignup=false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(StoreLocation.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(StoreLocation.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Location change: ", action.payload.message)
      })
      .addCase(StoreLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Error',
        //   text: `${state.error.message}`
        // });
      })
      .addCase(registerProvider.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(registerProvider.fulfilled, (state, action) => {
        state.loading = false;

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: action.payload.message
        });
        window.reload()
      })
      .addCase(registerProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Error',
        //   text: `${state.error.message}`
        // });
      })
      .addCase(checkProviderDuplicateRequest.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(checkProviderDuplicateRequest.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false;

        state.isDuplicate = action.payload.isDuplicate; // Set state to indicate duplicate

      })
      .addCase(checkProviderDuplicateRequest.rejected, (state, action) => {
        state.loading = false;
        state.isDuplicate = action.payload.isDuplicate
        state.error = action.payload;
      })
      .addCase(getLiveLocation.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getLiveLocation.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.loading = false;
        state.provider = action.payload; // Set state to indicate duplicate
      })
      .addCase(getLiveLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAssignedOrders.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getAssignedOrders.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.loading = false;
        state.assignedOrders = action.payload; // Set state to indicate duplicate
      })
      .addCase(getAssignedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(statData.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(statData.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(statData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          // text: `${state.error.message}`
        });
      })

      .addCase(addProviderReviews.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(addProviderReviews.fulfilled, (state, action) => {
        state.loading = false;
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Success',
        //   text: 'Data Get Successfully!'
        // });
      })
      .addCase(addProviderReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error}`
        });
      })

      .addCase(sendOtp.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: action.payload.message
        });
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: action.payload.message
        });
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      .addCase(getAllProviders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.provider = action.payload;
      })
      .addCase(getAllProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getOneProvider.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.oneProviderData = action.payload;
      })
      .addCase(getOneProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(providerStatusUpdateByAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(providerStatusUpdateByAdmin.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(providerStatusUpdateByAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      .addCase(requestProviderPayment.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(requestProviderPayment.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Request Sent Successfully!'
        });
      })
      .addCase(requestProviderPayment.rejected, (state, action) => {
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
  setProviderField,
  resetProviderState,
  setStep,
  setStatus
} = providerSlicer.actions;

export default providerSlicer.reducer;