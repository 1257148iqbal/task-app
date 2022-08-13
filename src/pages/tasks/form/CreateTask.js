import React, { useEffect, useState } from "react";
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
import { addMember, updateMemberFromTask } from "../../members/store/actions";
import { v4 as uuid } from "uuid";
import { formattedDate } from "../../../helpers/dateHelper";

const CreateTask = (props) => {
  const { modal, toggle, save } = props;

  //#region Hooks
  const { items } = useSelector(({ memberReducer }) => memberReducer);
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm();
  //#endregion

  //#region State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState(null);
  const [members, setMembers] = useState([]);
  //#endregion

  //#region Effect
  useEffect(() => {
    const membersDDL = items.map((m) => ({
      label: m.name,
      value: m.id,
    }));
    setMembers(membersDDL);
  }, [items]);
  //#endregion

  //#region UDF's
  const updateMemberInfo = () => {
    const memberInfo = items.find((m) => m.id === member?.value);
    const memberTasks = {
      id: memberInfo?.id,
      name: memberInfo?.name,
      email: memberInfo?.email,
      tasks: {
        title,
        description,
      },
    };
    dispatch(updateMemberFromTask(memberTasks));
  };
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

  //Instant Member Create
  const onCreateMember = async (newMember) => {
    setLoading(true);
    try {
      const payload = {
        id: uuid(),
        name: newMember,
        email: "",
        tasks: {
          title,
          description,
        },
      };
      dispatch(addMember(payload));
      setLoading(false);
    } catch (error) {
      alert("Something went wrong!!! Please try again");
    }
  };

  const handleSave = (e) => {
    let taskObj = {};
    taskObj["Name"] = title;
    taskObj["Description"] = description;
    taskObj["Date"] = formattedDate(new Date());
    taskObj["AssignMember"] = member.label;
    save(taskObj);
    updateMemberInfo();
  };
  //#endregion

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Task</ModalHeader>

      <Form onSubmit={handleSubmit(handleSave)} className="p-3">
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
          <Label for="member"> Assign to Member</Label>
          <CreateableSelect
            name="member"
            id="member"
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
          Submit
        </Button>
        <Button type="cancel" color="danger" outline onClick={toggle}>
          Cancel
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateTask;
