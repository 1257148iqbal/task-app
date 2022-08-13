import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { fetchMemberDetails, toggleMemberSidebar } from "../store/actions";

const MemberDetails = () => {

  //#region Hooks
  const { selectedItem,isOpenSidebar } = useSelector(({ memberReducer }) => memberReducer);
  const history = useHistory();
  const dispatch = useDispatch();
//#endregion

//#region Effect
  useEffect(() => {
    fetchMemberDetails();
  }, [selectedItem]);
//#endregion


//#region Events
  const onCancel = ()=>{
    dispatch(toggleMemberSidebar(!isOpenSidebar));
    history.goBack()
  }
  //#endregion
  
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag="h2">Member Details</CardTitle>
          
            <Row>
            <Col xs={6}>
              <div className="h4">{`Member Name: ${selectedItem?.name}`}</div>
            </Col>

            <Col xs={6}>
              <div className="h4">{`Email: ${selectedItem?.email}`}</div>
            </Col>
            </Row>

        </CardHeader>

        <CardBody>
          {selectedItem?.tasks ? 
            <div>
               <div className="h4">Task Title: </div> <span>{selectedItem.tasks?.title}</span>
               <div className="h4">Descriptions: </div> <span>{selectedItem.tasks?.description}</span>
           </div>
           : 
            <div>{"There have no task"}</div>
          }
         
        </CardBody>
        <Button className="w-200" type="cancel" color="danger" outline onClick={() =>onCancel() }>
          Cancel
        </Button>
      </Card>
    </div>
  );
};

export default MemberDetails;
