
import Sidebar from '../../../components/Sidebar';
import classnames from 'classnames';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import FormFeedback from 'reactstrap/lib/FormFeedback';
import { isObjEmpty} from '../../../Utility';
import { addMember, toggleMemberSidebar, updateMember } from '../store/actions';
import {v4 as uuid} from 'uuid';

const MemberForm = props => { 
  //#region Props
  const { selectedItem } = props;
  //#endregion

  //#region Hooks
  const { isOpenSidebar } =  useSelector(({ memberReducer }) => memberReducer);

  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  //#endregion


  //#region Events

  const onSubmit = values => {
    if (isObjEmpty(errors)) {
      const { name, email } = values;
      const payload = {
        id: uuid(),
        name,
        email
      };
      if (selectedItem) {
        dispatch(updateMember({ ...payload, id: selectedItem.id }));
      } else {
        dispatch(addMember(payload));
      }
      dispatch(toggleMemberSidebar(!isOpenSidebar));
    }
  };
  //#endregion

  return (
    <Sidebar
      size="lg"
      open={isOpenSidebar}
      title={selectedItem ? 'Edit Member' : 'New Member'}
      style={{ transition: '0.5s all ease' }}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={() => dispatch(toggleMemberSidebar(!isOpenSidebar))}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="name">
            <span>Member Name</span>
          </Label>
          <Input
            name="name"
            id="name"
            placeholder="Member Name"
            defaultValue={selectedItem ? selectedItem.name : ''}
            innerRef={register({ required: true })}
            invalid={errors.name && true}
            className={classnames({ 'is-invalid': errors['name'] })}
          />
          {errors && errors.name && <FormFeedback>Member Name is Required!</FormFeedback>}
        </FormGroup>

        <FormGroup>
          <Label for="email">
            <span>Email</span>
          </Label>
          <Input
            name="email"
            id="email"
            placeholder="email"
            defaultValue={selectedItem ? selectedItem.email : ''}
            innerRef={register({ required: true })}
            invalid={errors.email && true}
            className={classnames({ 'is-invalid': errors['email'] })}
          />
          {errors && errors.email && <FormFeedback>email is Required!</FormFeedback>}
        </FormGroup>

        <Button type="submit" className="mr-1" color="primary">
          Submit
        </Button>
        <Button type="reset" className="mr-1" outline color="secondary">
          Reset
        </Button>
        <Button type="cancel" color="danger" outline onClick={() => dispatch(toggleMemberSidebar(!isOpenSidebar))}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  );
};

export default MemberForm;
