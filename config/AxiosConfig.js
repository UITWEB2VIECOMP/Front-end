import axios from 'axios';

const axiosUrl = axios.create({
    baseURL: 'http://localhost:5001',
});

export default axiosUrl;
