import React, { useState } from "react";
import { Button } from "reactstrap";

import EditTask from "../form/EditTask";

const Card = (props) => {
  const { taskObj, index, deleteTask, updateListArray } = props;
  //#region State
  const [modal, setModal] = useState(false);
  //#endregion
  
  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC",
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1",
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1",
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1",
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD",
    },
  ];

  //#region Events
  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj) => {
    updateListArray(obj, index);
  };

  const handleDelete = () => {
    deleteTask(index);
  };
  //#endregion

  return (
    <div className="card-wrapper mr-5">
      <div
        className="card-top"
        style={{ backgroundColor: colors[index % 5].primaryColor }}
      ></div>
      <div className="task-holder">
        <span
          className="card-header"
          style={{
            backgroundColor: colors[index % 5].secondaryColor,
            borderRadius: "10px",
          }}
        >
          {taskObj.Name}
        </span>
        <p className="mt-1">{`Create Date: ${taskObj.Date}`}</p>
        <p>{` Assign Member: ${taskObj.AssignMember}`}</p>

        <div style={{right: "20px", bottom: "20px" }}>
          <Button color="primary" onClick={() => setModal(true)}>
            Edit
          </Button>
          <Button color="secondary" onClick={()=>handleDelete()}>
            Delete
          </Button>
        </div>
      </div>
      <EditTask
        modal={modal}
        toggle={toggle}
        updateTask={updateTask}
        taskObj={taskObj}
      />
    </div>
  );
};

export default Card;
