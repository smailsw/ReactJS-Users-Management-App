import { Users, Home } from "react-feather"

export default [
  {
    id: "home",
    title: "My Profile",
    icon: <Home size={20} />,
    navLink: "/home"
  },
  {
    id: "usersList",
    title: "Users",
    icon: <Users size={20} />,
    navLink: "/usersList"
  }
]
