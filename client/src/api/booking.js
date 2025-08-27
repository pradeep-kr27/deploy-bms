import { axiosInstance } from "./index";

export const makePayment = async (paymentMethod, amount) => {
  try {
    const response = await axiosInstance.post("/api/bookings/make-payment", {
      paymentMethod,
      amount,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const bookShow = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/bookings/book-show",
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBookings = async (payload) => {
  try {
    const response = await axiosInstance.get(
      `/api/bookings/get-all-bookings/${payload.userId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
