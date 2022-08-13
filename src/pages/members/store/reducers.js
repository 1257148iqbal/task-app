
import {
  ADD_MEMBER,
  DELETE_MEMBER,
  FETCH_MEMBER,
  FETCH_MEMBER_BY_ID,
  FETCH_MEMBER_DETAILS,
  LOADING,
  TOGGLE_MEMBER_SIDEBAR,
  UPDATE_MEMBER,
  UPDATE_MEMBER_FROM_TASK,
  UPDATE_MEMBER_TASK_EDIT_FORM
} from './actionType';
import {v4 as uuid} from 'uuid';

 const membersData = [
  { id: uuid(), name: "Md. Rakubul Islam", email: "rakib@gmail.com", tasks: {title: "Style", description: "Use Bootstrap"} },
  { id: uuid(), name: "Md. Iqbal Hossain", email: "iqbal@gmail.com", tasks: {title: "UI", description: "Use React"} },
];

const initialState = {
  loading: false,
  items: [...membersData],
  selectedItem: null,
  isOpenSidebar: false,
};

export const memberReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOADING:
      return { ...state, loading: payload };

    case FETCH_MEMBER:
      return { ...state};

    case FETCH_MEMBER_BY_ID:
      return { ...state, selectedItem: state.items.find(member=>member.id === payload), isOpenSidebar: true };
  
      case FETCH_MEMBER_DETAILS:
      return { ...state, selectedItem: state.items.find(member=>member.id === payload)};
  
    case TOGGLE_MEMBER_SIDEBAR: {
      const _updatedState = { ...state, isOpenSidebar: payload };
      if (!payload) _updatedState.selectedItem = null;
      return _updatedState;
    }
    case ADD_MEMBER:
      return { ...state, items: [...state.items, payload] };

    case UPDATE_MEMBER:
      return { ...state, items: state.items.map(member=>
          member.id === payload.id ? {
            ...member, 
            name: payload.name,
            email: payload.email
          }: member
        ) };
        
    case UPDATE_MEMBER_FROM_TASK:
      return { ...state, items: state.items.map(member=>
          member.id === payload.id ? {
            ...member, 
            name: payload.name,
            email: payload.email,
            tasks:{
              title: payload.tasks.title,
              description: payload.tasks.description
            }
          }: member
        ) };

    case UPDATE_MEMBER_TASK_EDIT_FORM:
      return { ...state, items: state.items.map(member=>
          member.id === payload.id ? {
            ...member, 
            name: payload.name,
            email: payload.email,
            tasks:{
              title: payload.tasks.title,
              description: payload.tasks.description
            }
          }: member
        ) };

    case DELETE_MEMBER:
      return { ...state, items: state.items.filter(member=>member.id !== payload) };
    
    default:
      return state;
  }
};
