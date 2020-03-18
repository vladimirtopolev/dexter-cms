import axios from 'axios';
import config from '../../../../../../config/config.json';

export function uploadImage(body: any) {
    return axios.post(`${config.path}/api/cloudinary/image-upload`, body);
}
