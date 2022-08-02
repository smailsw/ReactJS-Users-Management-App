// ** React Imports
import { Link } from 'react-router-dom'

// ** Icons Imports
import { ChevronLeft } from 'react-feather'

// ** Custom Components
import InputPassword from '@components/input-password-toggle'

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Form, Label, Button } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

import { useState } from 'react'

export const ResetPassword = ({getNewPassword}) => {
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('')
  return (
        <Card className='mb-0'>
          <CardBody>
            <CardTitle tag='h4' className='mb-1'>
              Reset Password 🔒
            </CardTitle>
            <CardText className='mb-2'>Please use a strong password that has minimum of 8 characters</CardText>
            <Form className='auth-reset-password-form mt-2' onSubmit={e => e.preventDefault()}>
              <div className='mb-1'>
                <Label className='form-label' for='new-password'>
                  New Password
                </Label>
                <InputPassword onChange={(e) => setNewPassword(e.target.value)} className='input-group-merge' id='new-password' autoFocus />
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='confirm-password'>
                  Confirm Password
                </Label>
                <InputPassword onChange={(e) => setNewPasswordConfirmation(e.target.value)} className='input-group-merge' id='confirm-password' />
              </div>
              <Button onClick={() => getNewPassword(newPassword, newPasswordConfirmation)} color='primary' block>
                Set New Password
              </Button>
            </Form>

          </CardBody>
        </Card>
  )
}
