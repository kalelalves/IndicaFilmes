import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000",
});

export async function login(email: string, password: string) {
    const response = await api.post('/login', { email, password });
    return response.data;
}

export async function register(name: string, email: string, password: string) {
    const response = await api.post('/register', { name, email, password });
    return response.data;
}