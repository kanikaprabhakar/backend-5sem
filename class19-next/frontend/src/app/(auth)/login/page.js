"use client"
import React from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Cookies from "js-cookie"
const Page = () => {
    const router = useRouter();
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const submitHandler = async (e) => {
        e.preventDefault();
        let payload = { email, password };
        let res = await axios.post("http://localhost:4000/auth/login", payload);
        if(res.status ==200){
          Cookies.set("token", res.data.token, { expires: 7 })
            router.push("/");
        }
    }
  return (
    <>
      <style jsx>{`
        body {
          background: #f5f5f5;
          font-family: Arial, sans-serif;
        }
        h1 {
          text-align: center;
          color: #333;
          margin-top: 2rem;
        }
        form {
          background: #fff;
          max-width: 400px;
          margin: 2rem auto;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        label {
          font-weight: bold;
          color: #555;
        }
        input[type="email"],
        input[type="password"] {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }
        button {
          background: #007bff;
          color: #fff;
          border: none;
          padding: 0.7rem;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        button:hover {
          background: #0056b3;
        }
      `}</style>
      <h1>Login</h1>
      <form onSubmit={(e)=>{submitHandler(e)}}>
        <label htmlFor="email" >Email:</label>
          
          <input
          onChange={(e)=>{setEmail(e.target.value)}} id="email" type="email" placeholder="Enter your email" required />

        <label htmlFor="password">Password:</label>

          <input
          onChange={(e)=>{setPassword(e.target.value)}} id="password" type="password" placeholder="Enter your password" required />

        <button>Login</button>
      </form>
    </>
  )
}

export default Page
