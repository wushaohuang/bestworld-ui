import axios from "axios";
import router from "./router";
import Element from "element-ui";

const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': "application/json;charset=UTF-8"
    }
})

request.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem("token")
    return config
})

request.interceptors.response.use(response => {
        let res = response.data
        if (res.code === 200) {
            return response
        }
    },
    error => {
        if (error.response.data) {
            error.massage = error.response.data.msg
        }
        if (error.response.status === 401) {
            router.push("/login")
        }
        Element.Message.error(error.massage, {duration: 3000})
        return Promise.reject(error)
    })

export default request
