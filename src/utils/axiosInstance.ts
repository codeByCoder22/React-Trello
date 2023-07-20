import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
    baseURL: apiUrl, // Set your API base URL
    headers: {
        // Authorization:
        Authorization: localStorage.getItem("token") || "",
        // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0NzI0MjUxLWRiMjQtNDEzMS1iODE0LTRmODYyNmQzY2ZkMSIsImVtYWlsIjoiMTIzNDU2QDEyMzQ1Ni5jb20iLCJpYXQiOjE2ODUxODk5OTB9.vkT_emcEMtrmcSkNzNGGVna6E49B5XP2pbM-2akPzuc",
    },
    timeout: 4000,
});

export default axiosInstance;
