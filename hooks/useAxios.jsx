import { useContext } from "react";
import { BASE_URL } from "../constants/api";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export default function useAxios() {
	const [auth] = useContext(AuthContext);

	const axiosInstance = axios.create({
		baseURL: BASE_URL,
	});

	axiosInstance.interceptors.request.use((config) => {
		const token = auth.token;
		config.headers.Authorization = token ? `Bearer ${token}` : "";
		return config;
	});

	return axiosInstance;
}
