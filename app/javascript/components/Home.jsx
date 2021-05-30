import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Github Profiles</h1>
        <p className="lead">
          Search for, and compare, different Github profiles
        </p>
        <hr className="my-4" />
        <Link
          to="/profiles"
          className="btn btn-lg custom-button"
          role="button"
        >
          Saved Profiles
        </Link>
      </div>
    </div>
  </div>
);
