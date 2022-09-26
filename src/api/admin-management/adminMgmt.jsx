import axios from '../axios';
import { DOWNLOAD_FILES } from "../URI_CONFIG";

export const getDownloadedFiles = async (serviceProviderId) => {
    const response = await axios.get(DOWNLOAD_FILES, {
        params: {
            serviceProviderId
        }
    });
    return response.data;
};