import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.authReducer);

  if (!currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Profile/UserName: {currentUser.username}</strong>
        </h3>
      </header>
 
    </div>
  );
};

export default Profile;
