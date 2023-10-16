import axios from '../axios';
import { DOWNLOAD_FILES } from "../URI_CONFIG";

export const getDownloadedFiles = async (serviceProviderId) => {
    await axios({
        url: `${DOWNLOAD_FILES}?serviceProviderId=${serviceProviderId}`,
        method: 'GET',
        responseType: 'blob',
    }).then((response) => {
        const href = URL.createObjectURL(response.data);
    
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', serviceProviderId+'-docs.zip'); 
        document.body.appendChild(link);
        link.click();
    
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    });
};