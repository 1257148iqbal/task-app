
import React from 'react';
import { Edit, FileText, MoreVertical, Trash2 } from 'react-feather';
import { Link } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import  store  from '../../../store';
import { deleteMember, fetchMemberById, fetchMemberDetails } from '../store/actions';

export const MemberTableColumn = [
  {
    name: 'Member Name',
    minWidth: '170px',
    selector: 'name',
    sortable: true,
    cell: row => <Link  onClick={() => store.dispatch(fetchMemberDetails(row.id))} to={"/member-details"}>{row.name}</Link>
  },
  {
    name: 'Email',
    minWidth: '150px',
    selector: 'email',
    sortable: true,
    cell: row => row.email
  },
  {
    name: 'Task',
    minWidth: '150px',
    selector: 'tasks',
    cell: row => row.tasks?.title
  },
  {
    name: 'Actions',
    maxWidth: '100px',
    cell: row => (
      <UncontrolledDropdown>
        <DropdownToggle tag="div" className="btn btn-sm">
          <MoreVertical size={14} className="cursor-pointer" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem tag={Link} to={"/member-details"} 
            onClick={() => store.dispatch(fetchMemberDetails(row.id))} 
            className="w-100"
          >
            <FileText color="skyBlue" size={14} className="mr-50" />
            <span color="primary" className="align-middle">
              Details
            </span>
          </DropdownItem>
          <DropdownItem className="w-100" onClick={() => store.dispatch(fetchMemberById(row.id))}>
            <Edit color="green" size={14} className="mr-50" />
            <span className="align-middle">Edit</span>
          </DropdownItem>
          <DropdownItem
            className="w-100"
            onClick={() => {
              store.dispatch(deleteMember(row.id));
            }}
          >
            <Trash2 color="red" size={14} className="mr-50" />
            <span className="align-middle">Delete</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
];
