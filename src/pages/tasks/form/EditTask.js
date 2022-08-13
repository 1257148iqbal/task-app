import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import CreateableSelect from "react-select/creatable";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import {
  addMember,
  updateMemberTaskEditForm,
} from "../../members/store/actions";

const EditTask = (props) => {
  const { modal, toggle, updateTask, taskObj } = props;

  //#region Hooks
  const dispatch = useDispatch();
  const { items } = useSelector(({ memberReducer }) => memberReducer);
  const { register, errors, handleSubmit } = useForm();
  //#endregion

  //#region state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState(null);
  const [members, setMembers] = useState([]);
  //#endregion

  //#region Effect
  useEffect(() => {
    setTitle(taskObj.Name);
    setDescription(taskObj.Description);
    const memberDDl = {
      label: taskObj.AssignMember,
      value: taskObj.AssignMember,
    };
    setMember(memberDDl);
  }, [taskObj.AssignMember, taskObj.Description, taskObj.Name]);

  useEffect(() => {
    const membersDDL = items.map((m) => ({
      label: m.name,
      value: m.id,
    }));
    setMembers(membersDDL);
  }, [items]);
  //#endregion

  //#region Events
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else {
      setDescription(value);
    }
  };

  //#region UDF's
  const updateMemberInfo = () => {
    const memberInfo = items.find((m) => m.id === member?.value);
    const memberTasks = {
      id: memberInfo?.id,
      name: memberInfo?.name,
      email: memberInfo?.email,
      tasks: {
        title: title ? title : taskObj.Name,
        description: description ? description : taskObj.Description,
      },
    };
    dispatch(updateMemberTaskEditForm(memberTasks));
  };
  //#endregion

  //#region Events
  const handleUpdate = (e) => {
    let tempObj = {};
    tempObj["Name"] = title;
    tempObj["Description"] = description;
    tempObj["AssignMember"] = member.label;
    updateTask(tempObj);
    updateMemberInfo();
  };

  //Instant Member Create
  const onCreateMember = async (newMember) => {
    setLoading(true);
    try {
      const payload = {
        id: uuid(),
        name: newMember,
        email: "",
        tasks: {
          title: title ? title : taskObj.Name,
          description: description ? description : taskObj.Description,
        },
      };
      dispatch(addMember(payload));
      setLoading(false);
    } catch (error) {
      alert("Something went wrong!!! Please try again");
    }
  };
  //#endregion

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Task</ModalHeader>
      <Form onSubmit={handleSubmit(handleUpdate)} className="p-3">
        <FormGroup>
          <Label for="title"> Task Title</Label>
          <Input
            id="title"
            placeholder="Task Title"
            value={title}
            onChange={handleChange}
            name="title"
            innerRef={register({ required: true })}
            invalid={errors.name && true}
            className={classnames({ "is-invalid": errors["title"] })}
          />
          {errors && errors.name && (
            <FormFeedback>Task Title is Required!</FormFeedback>
          )}
        </FormGroup>

        <FormGroup>
          <Label for="description">Description</Label>
          <textarea
            rows="3"
            className="form-control"
            value={description}
            onChange={handleChange}
            name="description"
          ></textarea>
        </FormGroup>

        <FormGroup>
          <Label for="AssignMember"> Assign to Member</Label>
          <CreateableSelect
            name="AssignMember"
            id="AssignMember"
            isSearchable
            isClearable
            isLoading={loading}
            classNamePrefix="select"
            options={members}
            value={member}
            onChange={(data) => setMember(data)}
            onCreateOption={onCreateMember}
          />
        </FormGroup>

        <Button type="submit" className="mr-1" color="primary">
          Update
        </Button>
        <Button type="cancel" color="danger" outline onClick={toggle}>
          Cancel
        </Button>
      </Form>
    </Modal>
  );
};

export default EditTask;
