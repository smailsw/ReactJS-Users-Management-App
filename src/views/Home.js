import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink
} from "reactstrap"
import { useNavigate } from "react-router-dom"

import {ResetPassword} from "./components/ResetPassword"
import toast, { Toaster } from 'react-hot-toast'
import axiosURI from "../configs/axios.config"
import { useEffect, useState } from "react"
import { getToken, getUserData, isUserLoggedIn, logout, validateToken } from "../utility/Utils"
import { boolean } from "yup"
const axios = require('axios').default

const Home = () => {
  const navigate = useNavigate()
  const[token,setToken] = useState('')

  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  const AxiosConfig= {headers: {
    Authorization: 'Bearer ' + token
  }}

  useEffect(()=>{
    const validateTokenAsync=async()=>{
      const validToken=await validateToken()
      if(!validToken) {
        navigate('/login')
      }else{
        setToken(getToken())
      }
    }
    validateTokenAsync().catch(console.error)
  })

  const changePassword = async(newPassword) => {
    try {
      const response = await axios.patch(`${axiosURI}/users/assoualma.i@gmail.com`, {password: newPassword},AxiosConfig)
      console.log('response')
      console.log(response)
      return response
    } catch (err) {
      console.log('exception')
      console.error(err.response.data.message)
      return err.response
    }
  }

  const getNewPassword = async (newPass, newPassConfirm) => {
    if (newPass !== newPassConfirm) return toast.error("Password and confirm password does not match")
    if (newPass === '') return toast.error("Password cannot be empty")
    const toastLoading = toast.loading("Changing Password...")
    const result = await changePassword(newPass)
    if (result.status === 200) {
      toast.dismiss(toastLoading)
      toast.success('Password has been changed successfully')
      setTimeout(() => {
        navigate('/')
      }, 1000)
    } else {
      toast.dismiss(toastLoading)
      toast.error(result.data.message)
      logout()
    }
  }


  return (
    <div>
        <ResetPassword getNewPassword={getNewPassword}/>
    </div>
  )
}

export default Home
