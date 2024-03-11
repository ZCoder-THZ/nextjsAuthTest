'use client'
import Image from "next/image";
import   { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
 "next/router";
export default function Home() {
  const [user,setUser]=useState({})
  const router=useRouter()
  if(!localStorage.getItem('token')) {
    router.push('/auth/register')
  }

  useEffect(()=>{
      const token=localStorage.getItem('token')
      fetchUsers(token)
  },[])

  const fetchUsers=async (token)=>{
    try {
      try {
        const data = await axios.get('http://localhost:4001/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(data.data.user);
        if(!data.data.user){
          localStorage.removeItem('token')
          router.push('/auth/register')
        }
        
        setUser(data.data.user);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token')
          router.push('/auth/register')
        } else {
          alert('An error occurred while fetching user data');
        }
      }
    } catch (error) {
      alert('An error occurred: ' + error);
    }
    
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-center">Ur logged in</h1>
      <div className="">
      {
       user?user.email:''
      }
      </div>


      <button onClick={()=>{
        localStorage.removeItem('token')
       router.push('/auth/register')
        
    }}>Logout</button>
    </main>
  );
}
