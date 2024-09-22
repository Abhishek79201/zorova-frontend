import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { REACT_APP_BASE_URL } from '../../config';
import moment from 'moment';
const base_url = REACT_APP_BASE_URL;
const session_url = localStorage.getItem("auth-token");

export const getNewOrders = createAsyncThunk("getNewOrders", async (data, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/employee/newOrders`, {
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

export const getAssignedOrders = createAsyncThunk("getAssignedOrders", async (data, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/employee/assignedOrders`, {
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

export const getActiveProviders = createAsyncThunk("getActiveProviders", async (data, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/employee/getActiveProviders`, {
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

export const getClients = createAsyncThunk("getClients", async (data, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/employee/getClients`, {
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

export const statData = createAsyncThunk("statData", async (date, { rejectWithValue }) => {
  try {
    // console.log(moment(date).format('YYYY-MM-DD'));
    // const date=moment(date, 'YYYY-MM-DD').toDate();
    const response = await fetch(`${base_url}/employee/statData/${moment(date).format('YYYY-MM-DD')}`, {
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

export const getBodyguards = createAsyncThunk("getBodyguards", async (data, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/employee/getBodyguards`, {
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


export const assignProvider = createAsyncThunk("assignProvider", async (data, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/employee/assignProvider`, {
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

export const getProviders = createAsyncThunk("getProviders", async (args, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/provider/getProviders`, {
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




const initialState = {
  newOrders: [],
  assignedOrders: [],
  activeProviders: [],
  bodyGuards: [],
  providers: [],
  loading: false,
  error: null,
  stats: {},
  clients: [],

  // isLoggedIn:false,
  step: 0,
  // isSignup:true
};

const employeeSlicer = createSlice({
  name: 'Partner',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getNewOrders.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getNewOrders.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.newOrders = action.payload;
      })
      .addCase(getNewOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      .addCase(getAssignedOrders.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getAssignedOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.assignedOrders = action.payload;
      })
      .addCase(getAssignedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      .addCase(getActiveProviders.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getActiveProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.activeProviders = action.payload;
      })
      .addCase(getActiveProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      .addCase(getProviders.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.providers = action.payload;
      })
      .addCase(getProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      .addCase(getBodyguards.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getBodyguards.fulfilled, (state, action) => {
        state.loading = false;
        state.bodyGuards = action.payload;
      })
      .addCase(getBodyguards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
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

      .addCase(getClients.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      .addCase(assignProvider.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(assignProvider.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: action.payload.message
        });
      })
      .addCase(assignProvider.rejected, (state, action) => {
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


export default employeeSlicer.reducer;