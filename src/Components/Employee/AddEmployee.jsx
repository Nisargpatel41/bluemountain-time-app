import React, { Component } from "react";

import "./AddEmployee.css";

class AddEmployee extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="empFormContainer mt-3 text-center ml-auto mr-auto">
          <h3 className="mb-2">Add New Employee</h3>

          <form>
            <div class="form-group">
              <label for="exampleInputUserName">Enter User Name: </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputUserName"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password:</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <div class="form-group">
              <label for="exampleInputMobileNo">Enter Mobile Number: </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputMobileNo"
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AddEmployee;
