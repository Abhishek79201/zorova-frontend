import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { REACT_APP_BASE_URL } from '../../config';
const base_url = REACT_APP_BASE_URL;
const session_url = localStorage.getItem("auth-token");


export const getServicePricing = createAsyncThunk("getServicePricing", async (args, { rejectWithValue }) => {

  try {

    const response = await fetch(`${base_url}/settings/service-pricing`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authrization":`Bearer ${session_url}`
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


export const createServicePricing = createAsyncThunk("createServicePricing", async (prices, { rejectWithValue }) => {

    try {
  
      const response = await fetch(`${base_url}/settings/service-pricing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authrization":`Bearer ${session_url}`
        },
        body: JSON.stringify(prices)
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


  export const updateServicePricing = createAsyncThunk("updateServicePricing", async (prices, { rejectWithValue }) => {

    try {
  
      const response = await fetch(`${base_url}/settings/service-pricing`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authrization":`Bearer ${session_url}`
        },
        body: JSON.stringify(prices)
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

  export const deleteServicePricing = createAsyncThunk("deleteServicePricing", async (id, { rejectWithValue }) => {

    try {
  
      const response = await fetch(`${base_url}/settings/service-pricing`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authrization":`Bearer ${session_url}`
        },
        body: JSON.stringify({id})
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


  // locations Apis


export const getLocations = createAsyncThunk("getLocations", async (args, { rejectWithValue }) => {

  try {

    const response = await fetch(`${base_url}/settings/locations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authrization":`Bearer ${session_url}`
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


export const createLocations = createAsyncThunk("createLocations", async (locations, { rejectWithValue }) => {

    try {
  
      const response = await fetch(`${base_url}/settings/locations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authrization":`Bearer ${session_url}`
        },
        body: JSON.stringify(locations)
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


  export const updateLocations = createAsyncThunk("updateLocations", async (locations, { rejectWithValue }) => {

    try {
  
      const response = await fetch(`${base_url}/settings/locations`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authrization":`Bearer ${session_url}`
        },
        body: JSON.stringify(locations)
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

  export const deleteLocations = createAsyncThunk("deleteLocations", async (id, { rejectWithValue }) => {

    try {
  
      const response = await fetch(`${base_url}/settings/locations`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authrization":`Bearer ${session_url}`
        },
        body: JSON.stringify({id})
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
  
//  Offers Apis


export const getOffers = createAsyncThunk("getOffers", async (args, { rejectWithValue }) => {

  try {

    const response = await fetch(`${base_url}/settings/offers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authrization":`Bearer ${session_url}`
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


export const createOffers = createAsyncThunk("createOffers", async (offers, { rejectWithValue }) => {

    try {
  
      const response = await fetch(`${base_url}/settings/offers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authrization":`Bearer ${session_url}`
        },
        body: JSON.stringify(offers)
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


  export const updateOffers = createAsyncThunk("updateOffers", async (offers, { rejectWithValue }) => {

    try {
  
      const response = await fetch(`${base_url}/settings/offers`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authrization":`Bearer ${session_url}`
        },
        body: JSON.stringify(offers)
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

  export const deleteOffers= createAsyncThunk("deleteOffers", async (id, { rejectWithValue }) => {

    try {
  
      const response = await fetch(`${base_url}/settings/offers`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authrization":`Bearer ${session_url}`
        },
        body: JSON.stringify({id})
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

//  Packages Apis


export const getPackages = createAsyncThunk("getPackages", async (args, { rejectWithValue }) => {

  try {

    const response = await fetch(`${base_url}/settings/member-package`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authrization":`Bearer ${session_url}`
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


export const createPackages = createAsyncThunk("createPackages", async (packages, { rejectWithValue }) => {

    try {
  
      const response = await fetch(`${base_url}/settings/member-package`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authrization":`Bearer ${session_url}`
        },
        body: JSON.stringify(packages)
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


  export const updatePackages = createAsyncThunk("updatePackages", async (packages, { rejectWithValue }) => {

    try {
  
      const response = await fetch(`${base_url}/settings/member-package`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authrization":`Bearer ${session_url}`
        },
        body: JSON.stringify(packages)
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

  export const deletePackages= createAsyncThunk("deletePackages", async (id, { rejectWithValue }) => {

    try {
  
      const response = await fetch(`${base_url}/settings/member-package`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authrization":`Bearer ${session_url}`
        },
        body: JSON.stringify({id})
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
  prices: [],
  locations:[],
  packages:[],
  offers:[],
  data: {},
  loading: false,
  error: null,

};

const partnerSlicer = createSlice({
  name: 'pricing',
  initialState,
  extraReducers: (builder) => {
    builder

// Pricing Reducers

      // getServicePricing
      .addCase(getServicePricing.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getServicePricing.fulfilled, (state, action) => {
        state.loading = false;
        state.prices=action.payload;
      })
      .addCase(getServicePricing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      // createServicePricing
      .addCase(createServicePricing.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(createServicePricing.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Price Added Successfully!"
          });
      })
      .addCase(createServicePricing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      // updateServicePricing
      .addCase(updateServicePricing.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(updateServicePricing.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Price Updated Successfully!"
          });
      })
      .addCase(updateServicePricing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      // deleteServicePricing
      .addCase(deleteServicePricing.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(deleteServicePricing.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Price Deleted Successfully!"
          });
      })
      .addCase(deleteServicePricing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

// Locations Reducers

      // getLocations
      .addCase(getLocations.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations=action.payload;
      })
      .addCase(getLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      // createLocations
      .addCase(createLocations.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(createLocations.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Location Record Added Successfully!"
          });
      })
      .addCase(createLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      // updateLocations
      .addCase(updateLocations.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(updateLocations.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Location Record Updated Successfully!"
          });
      })
      .addCase(updateLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      // deleteLocations
      .addCase(deleteLocations.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(deleteLocations.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

// Offers Reducers

      // getOffers
      .addCase(getOffers.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers=action.payload;
      })
      .addCase(getOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      // createOffers
      .addCase(createOffers.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(createOffers.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Offer Record Added Successfully!"
          });
      })
      .addCase(createOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      // updateLocations
      .addCase(updateOffers.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(updateOffers.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Offer Record Updated Successfully!"
          });
      })
      .addCase(updateOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      // deleteOffers
      .addCase(deleteOffers.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(deleteOffers.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

// membership Packages Reducers

      // getPackages
      .addCase(getPackages.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages=action.payload;
      })
      .addCase(getPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      // createPackages
      .addCase(createPackages.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(createPackages.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Membership Package Record Added Successfully!"
          });
      })
      .addCase(createPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      // updatePackages
      .addCase(updatePackages.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(updatePackages.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Membership Package Record Updated Successfully!"
          });
      })
      .addCase(updatePackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      // deletePackages
      .addCase(deletePackages.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(deletePackages.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deletePackages.rejected, (state, action) => {
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


export default partnerSlicer.reducer;