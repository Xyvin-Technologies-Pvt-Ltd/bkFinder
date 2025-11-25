import axios from "axios";
import useLoadingStore from "../store/loadingStore";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});


// Request Interceptor
API.interceptors.request.use((config) => {
  const { setLoading } = useLoadingStore.getState();
  setLoading(true);
  return config;
});

// Response Interceptor
API.interceptors.response.use(
  (response) => {
    const { setLoading } = useLoadingStore.getState();
    setLoading(false);
    return response;
  },
  (error) => {
    const { setLoading } = useLoadingStore.getState();
    setLoading(false);
    return Promise.reject(error);
  }
);


// registration
export const registerUser = (data) => {
  return API.post("/api/users/register", data);
};

//get list
export const getUsers = () => API.get("/api/users/list");

//login
export const loginAdmin = (data) => API.post("/api/auth/login", data);

// Stall registration
export const registerStall = (data) => {
  return API.post("/api/stall/register", data);
};

// Get all stalls
export const getStalls = () => {
  return API.get("/api/stall/list");
};

// get single user by id
export const getUserById = (id) => API.get(`/api/users/${id}`);


export default API;