export const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().auth.token;
  
    const config = {
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': token,
      },
    };
  
    return config;
  };