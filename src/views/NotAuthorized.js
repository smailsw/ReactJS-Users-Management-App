// ** React Imports
import { Link } from "react-router-dom"

// ** Reactstrap Imports
import { Button } from "reactstrap"

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin"

// ** Utils
import {} from "@utils"

// ** Styles
import "@styles/base/pages/page-misc.scss"

const NotAuthorized = () => {
  // ** Hooks
  const { skin } = useSkin()

  const illustration =
      skin === "dark" ? "not-authorized-dark.svg" : "not-authorized.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default
  return (
    <div className="misc-wrapper">
      <Link className="brand-logo" to="/">
        <h2 className="brand-text text-primary ms-1">NESTJS Users Management Tool</h2>
      </Link>
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">You are not authorized! 🔐</h2>
          <p className="mb-2">
            This page is only available for user with Admin role
            you account doesn't have the Admin Role.
          </p>
          <Button
            tag={Link}
            color="primary"
            className="btn-sm-block mb-1"
            to={"/"}
          >
            Back to Home
          </Button>
          <img className="img-fluid" src={source} alt="Not authorized page" />
        </div>
      </div>
    </div>
  )
}
export default NotAuthorized
