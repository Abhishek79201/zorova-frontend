import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { REACT_APP_BASE_URL } from '../../config';
const base_url = REACT_APP_BASE_URL;
const session_url = localStorage.getItem("auth-token");

export const registerUser = createAsyncThunk("registerUser", async (user, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
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

export const allUsers = createAsyncThunk("allUsers", async (args, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/users`, {
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

export const sendRegistrationEmail = createAsyncThunk("sendRegistrationEmail", async ({ email }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/mail/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
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

export const sendResetEmail = createAsyncThunk("sendResetEmail", async (email, { rejectWithValue }) => {
  try {

    const response = await fetch(`${base_url}/mail/sendResetMail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
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


export const loginUser = createAsyncThunk("loginUser", async ({ email, password }, { rejectWithValue }) => {

  try {
    const response = await fetch(`${base_url}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
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

export const findUser = createAsyncThunk("findUser", async (email, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/users/findUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session_url}`
      },
      body: JSON.stringify({ email })
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

export const getUserData = createAsyncThunk("getUserData", async (email, { rejectWithValue }) => {
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


export const updateUserData = createAsyncThunk("updateUserData", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/users`, {
      method: "PATCH",
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

export const userLogout = createAsyncThunk("userLogout", async (role, { rejectWithValue }) => {
  try {
    const swalResult = await Swal.fire({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout'
    });

    if (swalResult.isConfirmed) {
      const response = await fetch(`${base_url}/users/logout`, {
        method: "POST"
      });
      const responseData = await response.json();
      if (response.ok) {
        return responseData;
      } else {
        return rejectWithValue(responseData);
      }
    } else {
      // User clicked Cancel or closed the dialog
      return rejectWithValue({ message: 'Logout canceled by user' });
    }
  } catch (error) {
    return rejectWithValue(error.response);
  }
});
export const passwordReset = createAsyncThunk("passwordReset", async ({ email, password, token }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/mail/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, token, password })
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

export const sendContactMail = createAsyncThunk("sendContactMail", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/mail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
  Users: [],
  data: {},
  loading: false,
  error: null,
  auth_token: null,
  isLoggedIn: false,
  step: 0,
  isSignup: true
};

const userSlicer = createSlice({
  name: 'Users',
  initialState,
  reducers: {
    setUserField: (state, action) => {
      // Merge action payload into user data
      state.data = { ...state.data, ...action.payload };
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
      .addCase(registerUser.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.auth_token = action.payload;
        state.step = state.step + 1;
        state.isSignup = true;
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Success',
        //   text: `${action.payload.message}`
        // });
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      // get all users
      .addCase(allUsers.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.Users = action.payload;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        })
      })

      // send mail for contact
      .addCase(sendContactMail.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(sendContactMail.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Email Sent Successfully!'
        });
      })
      .addCase(sendContactMail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })

      // send mail for reset verification
      .addCase(sendRegistrationEmail.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(sendRegistrationEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.isSignup = true;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Verification Email Sent Successfully, Please check your inbox or spam emails!'
        });
      })
      .addCase(sendRegistrationEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error in sending verification mail!`
        });
      })

      // send mail for reset password validations
      .addCase(sendResetEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendResetEmail.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Email Sent Successfully!'
        });
      })
      .addCase(sendResetEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.auth_token = action.payload;
        localStorage.setItem('auth-token', state.auth_token.token);
        localStorage.setItem('auth-role', state.auth_token.role);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Login Successfully!'
        }).then((result) => {

          if (result.isConfirmed || result.isDismissed) {
            if (action.payload.data.role === "user") {
              window.location.href = "/";
            } else if (action.payload.data.role === "provider") {
              window.location.href = "/provider/dashboard";
            } else if (action.payload.data.role === "employee") {
              window.location.href = "/employee/dashboard";
            } else if (action.payload.data.role === "admin") {
              window.location.href = "/admin/dashboard";
            }
          }
        });
        state.isLoggedIn = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })
      //  Find User Validations
      .addCase(findUser.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(findUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(findUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })
      //  password Reset Validations
      .addCase(passwordReset.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(passwordReset.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Password Reset Successfully!'
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {  // Check if the alert was either confirmed or dismissed
            window.location.href = "/";
          }
        });
      })
      .addCase(passwordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        });
      })
      //Get Login User Record
      .addCase(getUserData.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Session Expired Please Login-In Again!`
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            localStorage.clear();
            localStorage.clear();
            window.location.href = "/";
          }
        });
      })

      //Update Login User Record
      .addCase(updateUserData.pending, (state) => {
        state.loading = true;  // Corrected the state property name
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.userData;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User Record Updated Successfully!'
        })
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${state.error.message}`
        })
      })

      //User Logout
      .addCase(userLogout.pending, (state) => {
        // state.loading = true;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        // state.loading = false;
        state.data = action.payload.userData;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User Logout Successfully!'
        });

        localStorage.clear();
        localStorage.clear();
        window.location.href = "/";


      })
      .addCase(userLogout.rejected, (state, action) => {
        // state.loading = false;
        if (action.payload.message === 'Logout canceled by user') {
          // Handle cancellation appropriately (e.g., do nothing or show a message)
        } else {
          state.error = action.payload;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${state.error.message}`
          });
        }
      });


  },
});
export const {
  setUserField,
  resetUserState,
  setStep
} = userSlicer.actions;
export default userSlicer.reducer;
