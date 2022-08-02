import { useSkin } from "@hooks/useSkin"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Facebook, Twitter, Mail, GitHub } from "react-feather"
import InputPasswordToggle from "@components/input-password-toggle"
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
import "@styles/react/pages/page-authentication.scss"
import { useForm, Controller } from 'react-hook-form'
import axiosURI from "../configs/axios.config"
const axios = require('axios').default
import toast, { Toaster } from 'react-hot-toast'
import { adminRoleSec, userRoleSec } from "../configs/userRole.config"
import { cryptWithBcrypt, getToken, getUserData, setToken, setUserData } from "../utility/Utils"

const Login = () => {
  const { skin } = useSkin()
  const navigate = useNavigate()
  const [loginProgress, setLoginProgress] = useState(false)
  const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default

    const {
      control,
      //setError,
      handleSubmit,
      formState: { errors }
    } = useForm()

    async function loginUser(email, password) {
      try {
        const response = await axios.post(`${axiosURI}/users/login`, {email, password})
        //console.log('response')
        console.log(response)
        return response
      } catch (err) {
        console.log('exception')
        //console.error(err.response.data.message)
        return err.response
      }
    }

    const onSubmit = async (data) => {
      setLoginProgress(true)
      

      const toastLoading = toast.loading("Please wait...")

      const result = await loginUser(data.loginEmail, data.loginPassword)
      console.log(result)
    

      if (result.status === 201) {
        const userRole=result.data.userData.role==0 ? userRoleSec : adminRoleSec
        const hashedRole=await cryptWithBcrypt(userRole)
        console.log(hashedRole)
        const userDatacustom={email:result.data.userData.email,role: hashedRole}
        //console.log(decodedToken.exp)
        setToken(result.data.token);
        setUserData(JSON.stringify(userDatacustom));
     
        console.log(getUserData())
        console.log(getToken())
        console.log('ok')

        toast.dismiss(toastLoading)
        toast.success('You are successfully logged in')
        setTimeout(() => {
          navigate('/')
        }, 1000)
      } else {
        console.log('not ok')
        setLoginProgress(false)
        toast.dismiss(toastLoading)
        try{
          toast.error(result.data.message)
        }catch(err){
          console.log(err)
          toast.error('Server Error, please contact server administrator')
        }
        
      }
    }

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
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              NESTJS User Management Login! 👋
            </CardTitle>
            <CardText className="mb-2">
              Please sign-in to your user account
            </CardText>

             <Form action='/' className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  Email
                </Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input type='email' placeholder='john@example.com' invalid={errors.loginEmail && true} {...field} />
                  )}
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="register-password">
                  Password
                </Label>
                <Controller
                  id='loginPassword'
                  name='loginPassword'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.loginPassword && true} {...field} />
                  )}
                />
              </div>
              <Button disabled={loginProgress} color="primary" block>
                Sign in
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">New to the platform?</span>
              <Link to="/register">
                <span>Create an account</span>
              </Link>
            </p>

          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
