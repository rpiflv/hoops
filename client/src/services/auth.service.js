import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || '';



const signup = (email, password, username) => {
    return axios
        .post(BASE_URL + "/api/signup/", {
            email,
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const login = (email, password) => {
    // console.log(email, password)
    return axios
        .post(BASE_URL + "/api/login", {
            email,
            password,
        })
        .then((response) => {
            console.log(response)
            if (response.data.accessToken) {
                console.log(response.data)
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const authService = { signup, login, logout, getCurrentUser }

export default authService;