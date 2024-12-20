import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const apiUrl = "https://90690f4f-a1df-42fe-bfeb-2fd576c2422e-dev.e1-us-east-azure.choreoapis.dev/djangoreactnotes/backend/v1"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
})

api.interceptors.request.use(
(config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
},

(error) => {
    return Promise.reject(error)
}


)

export default api