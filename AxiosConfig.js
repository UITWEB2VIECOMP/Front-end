import axios from 'axios'

const axiosUrl = axios.create({
    baseUrl: 'https://api-74ym.onrender.com'
})

export default axiosUrl