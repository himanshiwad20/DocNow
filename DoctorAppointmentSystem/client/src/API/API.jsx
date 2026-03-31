import axios from 'axios'

const API = axios.create({baseURL: process.env.REACT_APP_BASEURL})

API.interceptors.request.use(
    async(config) => {
        try {
            const localData = localStorage.getItem('appData')
            const appData = JSON.parse(localData)
            if(appData) {
                config.headers.Authorization=`${appData?.token}`
            }
        } catch (error) {
            console.log(error)
        }
        return config
    }, 
    (error) => {
        return Promise.reject(error)
    }
)

export default API;