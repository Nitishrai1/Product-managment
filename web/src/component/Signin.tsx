"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext" 
import axios from "axios"

export default function Signin() {
  const { login } = useAuth() // Use the login function from context
  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    
    const token=await loginuser(formData);
    login(token);

    console.log("Form submitted:", formData)
    navigate("/") 
  }

  const loginuser=async (formData)=>{
    try{
        const response=await axios.post("http://localhost:3000/api/admin/signin",
            formData, 
        )
        if(!response){
            console.log("user not exist");
        }
        return response.data.token

    }catch(err){
        console.log("error in logging in")
    }
  }

  const handleNavigate = () => {
    navigate("/signup")
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
      <div className="p-6 space-y-1.5">
        <h2 className="text-2xl font-bold text-center text-gray-900">Welcome Back</h2>
        <p className="text-center text-gray-500 text-sm">Sign in to your account</p>
      </div>

      <div className="p-6 pt-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-end">
            <a href="/forgot-password" className="text-sm cursor-pointer text-blue-600 hover:text-blue-800 underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full mt-6 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>

      <div className="p-6 pt-0 flex justify-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <a onClick={handleNavigate} className="text-blue-600 cursor-pointer hover:text-blue-800 underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  )
}
