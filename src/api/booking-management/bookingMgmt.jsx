import axios from "../axios";
import { GET_ALL_BOOKING } from "../URI_CONFIG";

export const getAllBookingDetails = async () => {
    const response = await axios.get(GET_ALL_BOOKING, {});
    return response.data;
};

export const cancelBookings = async (payload) => {
    const { bookingStatus } = payload;
    const response = await axios.post(`${GET_ALL_BOOKING}/${bookingStatus}`, {
       
    });
    return response.data;
};
