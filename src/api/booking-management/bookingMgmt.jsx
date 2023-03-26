import axios from "../axios";
import { GET_ALL_BOOKING, CANCEL_BOOKINGS } from "../URI_CONFIG";

export const getAllBookingDetails = async () => {
    const response = await axios.get(GET_ALL_BOOKING, {});
    return response.data;
};

export const cancelBookings = async (payload) => {
    const { bookingStatus, bookingIds } = payload;
    const response = await axios.post(`${CANCEL_BOOKINGS}/${bookingStatus}`, undefined ,{
       params: {
        filters: `id==${bookingIds}`
            }
    });
    return response.data;
};
