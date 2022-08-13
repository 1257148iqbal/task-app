import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { user: currentUser } = useSelector((state) => state.authReducer);

  return (
    <div className="container">
      <header
        className="jumbotron gap-3"
        style={{ textAlign: "center", gap: 5 }}
      >
        {currentUser && (
          <div style={{ jestifyContent: "space-around" }}>
            <Link className="btn btn-primary mt-2" role="button" to="/members">
              Member Page
            </Link>
            <div></div>
            <Link className="btn btn-primary mt-2" role="button" to="/tasks">
              Task Page
            </Link>
          </div>
        )}
      </header>
    </div>
  );
};

export default Home;
