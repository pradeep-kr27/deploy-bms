const { axiosInstance } = require(".");

//Register new User

export const RegisterUser = async (value) => {
  try {
    const response = await axiosInstance.post("api/users/register", value);
    return response.data;
  } catch (err) {
    console.log(err);
    // If the server returns an error response, return the error data
    if (err.response && err.response.data) {
      return err.response.data;
    }
    // If it's a network error or other issue, return a generic error
    return { success: false, message: err.message || "An error occurred" };
  }
};

export const LoginUser = async (value) => {
  try {
    const response = await axiosInstance.post("/api/users/login", value);
    return response.data;
  } catch (error) {
    console.log(error);
    // If the server returns an error response, return the error data
    if (error.response && error.response.data) {
      return error.response.data;
    }
    // If it's a network error or other issue, return a generic error
    return { success: false, message: error.message || "An error occurred" };
  }
};

export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("api/users/get-current-user");
    return response.data;
  } catch (error) {
    console.log(error);
    // If the server returns an error response, return the error data
    if (error.response && error.response.data) {
      return error.response.data;
    }
    // If it's a network error or other issue, return a generic error
    return { success: false, message: error.message || "An error occurred" };
  }
};

export const ForgetPassword = async (value) => {
  try {
    const response = await axiosInstance.patch(
      "/api/users/forgetpassword",
      value
    );
    return response.data;
  } catch (err) {
    console.log(err);
    // If the server returns an error response, return the error data
    if (err.response && err.response.data) {
      return err.response.data;
    }
    // If it's a network error or other issue, return a generic error
    return { success: false, message: err.message || "An error occurred" };
  }
};

export const ResetPassword = async (value, id) => {
  try {
    const response = await axiosInstance.patch(
      `/api/users/resetpassword/${id}`,
      value
    );
    console.log('***', response);
    return response.data;
  } catch (err) {
    console.log(err);
    // If the server returns an error response, return the error data
    if (err.response && err.response.data) {
      return err.response.data;
    }
    // If it's a network error or other issue, return a generic error
    return { success: false, message: err.message || "An error occurred" };
  }
};
