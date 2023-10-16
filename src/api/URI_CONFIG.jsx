//export const BASE_URL = 'https://www.crossdimension.in';
export const BASE_URL = 'https://www.soshealth.club';
export const ADMIN_ENDPOINT = '/sosAdminManagement/v1/';
export const NOTIFICATION_ENDPOINT = '/sosNotificationManagement/v1/';

export const ADMIN_LOGIN = ADMIN_ENDPOINT + 'login';
export const RESET_PASSWORD = ADMIN_ENDPOINT + 'update/password'
export const IS_VALID_ADMIN = ADMIN_ENDPOINT + 'validAdmin';
export const GET_DOCUMENTS_DOWNLOADED = ADMIN_ENDPOINT + 'downloadDocuments';
export const DOWNLOAD_FILES =ADMIN_ENDPOINT + 'downloadDocuments';

export const SEND_OTP = NOTIFICATION_ENDPOINT + 'sms';

export const GET_SERVICE_PROVIDER_ALL= '/sosDataManagement/v1/serviceProvider';
export const CREATE_PRICE_PROVIDER = '/sosPriceManagement/v1/pricing';
export const UPDATE_SERVICE_PROVIDER_DETAILS= '/sosDataManagement/v1/serviceProvider/update';
export const GET_ALL_BOOKING = '/sosBookingManagement/v1/booking';
export const GET_ALL_CUSTOMER = '/sosDataManagement/v1/customer';
export const CANCEL_BOOKINGS = '/sosBookingManagement/v1/cancelBooking';
export const OTP_AUTHENTICATION = NOTIFICATION_ENDPOINT + 'validation';
