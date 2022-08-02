// ** React Imports
import { Link } from "react-router-dom"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power
} from "react-feather"

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap"

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg"
import React, { useState,useEffect } from "react"
import { getUserData, getUserRole, isUserLoggedIn, logout } from "../../../../utility/Utils"

const UserDropdown = () => {
  const [email,setEmail]=useState('')
  const [role,setRole]=useState('')

  useEffect(()=>{
    const userLogged= isUserLoggedIn()
    if(userLogged){
      const getRoleAndEmail=async()=>{
        const role = await getUserRole()
        const userData = await getUserData()
        setRole(role);
        setEmail(userData.email)
      }
      getRoleAndEmail().catch(console.error);
    }
  })

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">{email}</span>
          <span className="user-status">{role}</span>
        </div>
        <Avatar
          img={defaultAvatar}
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/login" onClick={()=>logout()}>
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
