/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import authAxios from "../api/api";
import toast from "react-hot-toast";


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true); 

    useEffect(()=>{
        const storedUser = localStorage.getItem("userId")
        const token = localStorage.getItem("token");
        if(storedUser  && token){
            setUser(storedUser)
        } else {
            setUser(null)
            console.error("No user data found in localStorage")
        }
        setLoading(false);
    },[])


    const loginAPI = async (email, password) => {
        try{
            const response = await authAxios.post('/user/login', {email,password})
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            const userData = response.data
            setUser(userData.userId);
            toast.success('Login successful.');
        } catch(error){
            console.error('Login failed', error)
            throw error.response
        }
    }

    const registerAPI = async (username, email, password) =>{
        try{
            const response = await authAxios.post('/user/register', {
                username, email, password})
            const userData = response.data
            setUser(userData)
            toast.success('Registration successful. Please log in.');
        } catch(error){
            console.error('Registration failed', error)
            throw error
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("userId");
        localStorage.removeItem("token");   
    }


    return (
        <AuthContext.Provider value={{ user, loginAPI, registerAPI, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    const context = useContext(AuthContext)
    if(context === undefined){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context
}