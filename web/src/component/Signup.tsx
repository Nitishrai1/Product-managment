"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

export default function Signup() {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
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
   
    const response=signup(formData);
    console.log("User data:", formData)
    if(response){

        navigate("/signin")
    }
  }

   const signup=async(formData)=>{
    try{
        const response=await axios.post("http://localhost:3000/api/admin/signup",formData);
        const data=response.data;
        console.log(data);
        return data;

    }catch(err){
        console.log("error in signup")

    }
  }

  const handleNavigate = () => {
    navigate("/signin")
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
      <div className="p-6 space-y-1.5">
        <h2 className="text-2xl font-bold text-center text-gray-900">Create an Account</h2>
        <p className="text-center text-gray-500 text-sm">Enter your information to sign up</p>
      </div>

      <div className="p-6 pt-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">
                Middle Name <span className="text-gray-500 text-sm">(optional)</span>
              </label>
              <input
                id="middleName"
                name="middleName"
                type="text"
                placeholder="David"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

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

          <button
            type="submit"
            className="w-full mt-6 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>

      <div className="p-6 pt-0 flex justify-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <a onClick={handleNavigate} className="text-blue-600 cursor-pointer hover:text-blue-800 underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  )
}
