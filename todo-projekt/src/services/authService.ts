import type {  AxiosResponse } from "axios";
import {instance} from "../services/api";
import type { Token, UserResponse } from "../types/user";



export function register(username: string, password: string): Promise<AxiosResponse<UserResponse>> {
    return instance.post("/auth/register", { username, password });
}


export function login(username: string, password: string) : Promise<AxiosResponse<Token>> {
    return instance.post("/auth/login", { username, password });
}