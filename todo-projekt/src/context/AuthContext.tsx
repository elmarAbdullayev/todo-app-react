import { createContext, useEffect, useState } from "react";
import type { UserResponse } from "../types/user";
import {login as LoginApi} from "../services/authService";
import { register as RegisterApi } from "../services/authService";


type AuthContextType = {
  user: UserResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  register: (username: string, password: string) => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children } : { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);


useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    setToken(token);
  }
  setLoading(false);
}, []);


    const isAuthenticated = !!token;


const login = async (username: string, password: string) => {
    try {
        const response = await LoginApi(username, password);
        const token = response.data.access_token;
        
        localStorage.setItem("token", token);
        setToken(token);
        setUser(username ? { username } : null);

    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const register = async (username: string, password: string) => {
    try {
      await RegisterApi(username, password);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, register,loading  }}>
      {children}
    </AuthContext.Provider> 
  )

}


export default AuthContext;