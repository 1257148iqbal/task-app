
import React, { useEffect } from 'react';
import { ChevronDown } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardTitle, Col, Row } from 'reactstrap';
import {PlusIcon} from '../../../components/icons/CustomIcons'; 
import {fetchMember, toggleMemberSidebar } from '../store/actions';
import { MemberTableColumn } from './membersTableColumn';
import DataTable from 'react-data-table-component';
import MemberForm from '../form/MemberForm';


const MembersList = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const { items, isOpenSidebar, selectedItem, loading } = useSelector(({ memberReducer }) => memberReducer);
  //#endregion
  
  //#region States

  //#endregion
  
  //#region Effects
  useEffect(() => {
    dispatch(fetchMember());
  }, [dispatch]);
  //#endregion

  //#region Events

  const handleSort = (column) => {
    const { selector } = column;
  };

  //#endregion

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag="h2">Members</CardTitle>
         <Row style={{justifyContent: "center"}} >
          <Col xs={12}>
              <PlusIcon onClick={() => dispatch(toggleMemberSidebar(!isOpenSidebar))} />
          </Col>
         </Row>
        </CardHeader>
      
        <DataTable
          onSort={handleSort}
          progressPending={loading}
          columns={MemberTableColumn}
          sortIcon={<ChevronDown />}
          data={items}
        />
      </Card>
      {isOpenSidebar && <MemberForm selectedItem={selectedItem}/>}
    </div>
  );
};

export default MembersList;
