import axios from 'axios';

const axiosUrl = axios.create({
    baseURL: 'https://api-74ym.onrender.com',
});

export default axiosUrl;
