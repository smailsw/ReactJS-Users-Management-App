// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import axios from 'axios'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import axiosURI from "../configs/axios.config"

// ** Vars
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

const roleType = {
  0: { title: 'User' },
  2: { title: 'Admin' },
}

export let data

// ** Get initial Data
axios.get(`${axiosURI}/users/all`).then(response => {
  data = response.data
})


// ** Table Common Column
export const columns = [
  {
    name: 'ID',
    sortable: true,
    minWidth: '150px',
    selector: row => row.id
  },
  {
    name: 'Email',
    minWidth: '250px',
    sortable: row => row.full_name,
    cell: row => (
      <div className='d-flex align-items-center'>
        {row.avatar === '' ? (
          <Avatar color={`light-${states[row.status]}`} content={row.email} initials />
        ) : (
          <Avatar img={require(`@src/assets/images/portrait/small/avatar-s-11.jpg`).default} />
        )}
        <div className='user-info text-truncate ms-1'>
          <span className='d-block fw-bold text-truncate'>{row.email}</span>
          <small>{row.post}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Role',
    sortable: true,
    minWidth: '150px',
    selector: row => roleType[row.role].title
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: () => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pe-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Edit size={15} />
                <span className='align-middle ms-50'>Role</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Trash size={15} />
                <span className='align-middle ms-50'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  }
]

