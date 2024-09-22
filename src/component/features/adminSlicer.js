import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { REACT_APP_BASE_URL } from '../../config';
const base_url = REACT_APP_BASE_URL;
const session_url = localStorage.getItem("auth-token");
// Franchise Apis
export const getPartners = createAsyncThunk("getPartners", async (args, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/franchise`, {
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

export const updatePartner = createAsyncThunk("updatePartner", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/franchise`, {
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

export const deletePartner = createAsyncThunk("deletePartner", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/franchise`, {
      method: "DELETE",
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

export const sendMail = createAsyncThunk("sendMail", async (data, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/mail`, {
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

// Membership Apis
export const getMembers = createAsyncThunk("getMembers", async (args, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/membership`, {
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

export const updateMember = createAsyncThunk("updateMember", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/membership`, {
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

export const deleteMember = createAsyncThunk("deleteMember", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/membership`, {
      method: "DELETE",
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

// Employee Apis
export const createEmployee = createAsyncThunk("createEmployee", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/employee`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${session_url}`
      },
      body: data
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

export const updateEmployee = createAsyncThunk("updateEmployee", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/employee`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${session_url}`
      },
      body: data
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

export const deleteEmployee = createAsyncThunk("deleteEmployee", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/employee?id=${id}`, {
      method: "DELETE",
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

export const getStaffData = createAsyncThunk("getStaffData", async (args, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/employee`, {
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

export const getUserDataForMail = createAsyncThunk("getUserDataForMail", async (args, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/admin/userstomail`, {
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

export const getAllOrders = createAsyncThunk("getAllOrders", async (args, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/admin/allOrders`, {
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

export const getAllClients = createAsyncThunk("getAllClients", async (args, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/admin/allClients`, {
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

export const getStatistics = createAsyncThunk("getStatistics", async (args, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/admin/dashboard`, {
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


export const getChartData = createAsyncThunk("getChartData", async (args, { rejectWithValue }) => {
  console.log(args);
  try {

    const response = await fetch(`${base_url}/admin/chart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session_url}`
      },
      body: JSON.stringify(args)
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
  admin: [],
  orders: [],
  clients: [],
  chart: {},
  partners: [],
  members: [],
  Users: [],
  stats: {},
  data: {},
  loading: false,
  error: null,
};

const adminSlicer = createSlice({
  name: 'Admin',
  initialState,
  reducers: {
    // setPartnerField: (state, action) => {
    //   // Merge action payload into Provider data
    //   state.data = { ...state.data, ...action.payload };
    // }
  },
  extraReducers: (builder) => {
    builder

      // Franchise Cases
      .addCase(getPartners.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.partners = action.payload;
      })
      .addCase(getPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        })
      })

      .addCase(updatePartner.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(updatePartner.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: action.payload.message
        });
      })
      .addCase(updatePartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      .addCase(deletePartner.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(deletePartner.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: action.payload.message
        });
      })
      .addCase(deletePartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      // Membership Cases
      .addCase(getMembers.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        })
      })

      .addCase(updateMember.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: action.payload.message
        });
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      .addCase(deleteMember.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: action.payload.message
        });
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })


      .addCase(sendMail.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(sendMail.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: action.payload.message
        });
      })
      .addCase(sendMail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      .addCase(createEmployee.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: action.payload.message
        });
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: action.payload.message
        });
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: action.payload.message
        });
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      // get all employee and bodyguards
      .addCase(getStaffData.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getStaffData.fulfilled, (state, action) => {
        state.loading = false;
        state.Users = action.payload;
      })
      .addCase(getStaffData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        })
      })

      // get all users
      .addCase(getUserDataForMail.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getUserDataForMail.fulfilled, (state, action) => {
        state.loading = false;
        state.Users = action.payload;
      })
      .addCase(getUserDataForMail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        })
      })

      // get all orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        })
      })

      // get all clients
      .addCase(getAllClients.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getAllClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(getAllClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        })
      })

      // get Stats
      .addCase(getStatistics.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        })
      })

      // get Chart data
      .addCase(getChartData.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.chart = action.payload;
      })
      .addCase(getChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        })
      })
  }
});


export default adminSlicer.reducer;