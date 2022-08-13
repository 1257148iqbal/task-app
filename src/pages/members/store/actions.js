
import {
  ADD_MEMBER,
  DELETE_MEMBER,
  FETCH_MEMBER,
  FETCH_MEMBER_BY_ID,
  TOGGLE_MEMBER_SIDEBAR,
  UPDATE_MEMBER,
  UPDATE_MEMBER_FROM_TASK,
  UPDATE_MEMBER_TASK_EDIT_FORM
} from './actionType';
import {v4 as uuid} from 'uuid';


export const membersData = [
  { id: uuid(), name: "Md. Rakubul Islam", email: "rakib@gmail.com", tasks: {} },
  { id: uuid(), name: "Minhaj Uddin", email: "minhaj@gmail.com", tasks: {} },
  { id: uuid(), name: "Md. Iqbal Hossain", email: "iqbal@gmail.com", tasks: {} },
  { id: uuid(), name: "Mahdi Hasan", email: "mahdi@gmail.com", tasks: {} },
];

export const fetchMember = () => dispatch => {
  dispatch({
    type: FETCH_MEMBER
  });
};


//Get by id
export const fetchMemberById = id => {
  return async dispatch => {
    try {
      dispatch({
        type: FETCH_MEMBER_BY_ID,
        payload: id
      });
    } catch (err) {
      alert('error', 'Something went wrong!!! Please try again');
    }
  };
};

//Get member Details
export const fetchMemberDetails = data => {
  return async dispatch => {
    try {
      dispatch({
        type: FETCH_MEMBER_BY_ID,
        payload: data
      });
    } catch (err) {
      alert('error', 'Something went wrong!!! Please try again');
    }
  };
};


//Add new
export const addMember = (data) => {
  return dispatch => {
    try {
      dispatch({
        type: ADD_MEMBER,
        payload: data
      });
      alert("Member Add Successfully!!");
    } catch (err) {
      alert('Something went wrong!!! Please try again');
    }
  };
};

//Update
export const updateMember = (data) => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_MEMBER,
        payload: data
      });
      alert('success', 'Data Updated');
    } catch (err) {
      alert('Something went wrong!!! Please try again');
    }
  };
};

//Update Member Task
export const updateMemberFromTask = (data) => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_MEMBER_FROM_TASK,
        payload: data
      });
      alert('success');
    } catch (err) {
      alert('Something went wrong!!! Please try again');
    }
  };
};

//Update Member Task EDIT Form
export const updateMemberTaskEditForm = (data) => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_MEMBER_TASK_EDIT_FORM,
        payload: data
      });
      alert('success');
    } catch (err) {
      alert('Something went wrong!!! Please try again');
    }
  };
};


//Delete
export const deleteMember = id => {
  return async dispatch => {   
      try {
        dispatch({
          type: DELETE_MEMBER,
          payload: id
        });
        alert('Member Delete Successfully!!');
      } catch (err) {
        alert('error', 'Something went wrong!!! Please tyr again');
      }
    
  };
};


//Open Sidebar
export const toggleMemberSidebar = condition => dispatch => {
  dispatch({
    type: TOGGLE_MEMBER_SIDEBAR,
    payload: condition
  });
};
