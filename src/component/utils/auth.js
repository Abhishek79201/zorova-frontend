// utils/auth.js
export const isUserAuthenticated = () => {
    const token = localStorage.getItem('auth-token');
    const role = localStorage.getItem('auth-role');
    return token !== null && role === "user";
  };
  
  export const isProviderAuthenticated = () => {
    const token = localStorage.getItem('auth-token');
    const role = localStorage.getItem('auth-role');
    return token !== null && role === "provider";
  };

  export const isEmployeeAuthenticated = () => {
    const token = localStorage.getItem('auth-token');
    const role = localStorage.getItem('auth-role');
    return token !== null && role === "employee";
  };

  export const isAdminAuthenticated = () => {
    const token = localStorage.getItem('auth-token');
    const role = localStorage.getItem('auth-role');
    return token !== null && role === "admin";
  };