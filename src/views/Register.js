// ** React Imports
import { Link, useNavigate } from "react-router-dom"

import React, { useEffect } from 'react'

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin"

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from "react-feather"

import { useForm, Controller } from 'react-hook-form'

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle"

// axios import 
//import axios from 'axios'

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button
} from "reactstrap"

// ** Styles
import "@styles/react/pages/page-authentication.scss"
import axiosURI from "../configs/axios.config"
import toast, { Toaster } from 'react-hot-toast'

const axios = require('axios').default
//const notify = () => toast('Here is your toast.')

const Register = () => {
  // ** Hooks
  const { skin } = useSkin()
  const navigate = useNavigate()

  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  const {
    control,
    //setError,
    handleSubmit,
    formState: { errors }
    } = useForm()

  useEffect(() => {

  }, [])

  async function saveUser(email, password) {
    try {
      const response = await axios.post(`${axiosURI}/users/new`, {email, password})
      console.log('response')
      console.log(response)
      return response
    } catch (err) {
      console.log('exception')
      console.error(err.response.data.message)
      return err.response
    }
  }

  const onSubmit = async (data) => {
    //notify()
    console.log(data.registerEmail)
    console.log(data.registerPassword)
    const toastLoading = toast.loading("Registring user...")
    const result = await saveUser(data.registerEmail, data.registerPassword)
    console.log(result)
    if (result.status === 201) {
      toast.dismiss(toastLoading)
      toast.success('User has been successfully registered')
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    } else {
      toast.dismiss(toastLoading)
      toast.error(result.data.message)
    }
  }

  const illustration =
      skin === "dark" ? "register-v2-dark.svg" : "register-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>

          <h2 className="brand-text text-primary ms-1">NESTJS Users Management Tool</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" xs="12" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              NESTJS Users mini project 🚀
            </CardTitle>
            <CardText className="mb-2">
              you can register an user using this form
            </CardText>
            <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-1">
                <Label className="form-label" for="register-email">
                  Email
                </Label>

                <Controller
                  id='registerEmail'
                  name='registerEmail'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input type='email' placeholder='john@example.com' invalid={errors.registerEmail && true} {...field} />
                  )}
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="register-password">
                  Password
                </Label>
                <Controller
                  id='registerPassword'
                  name='registerPassword'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.registerPassword && true} {...field} />
                  )}
                />
              </div>

              <Button color="primary" block type="submit">
                Sign up
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">Already have an account?</span>
              <Link to="/login">
                <span>Sign in instead</span>
              </Link>
            </p>

          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Register
