import React, { Component } from "react";
import Hr from "../Common/Hr/Hr";
import "./TimePage.css";

class TimePage extends Component {
  state = {};
  //   currentTime = () => {
  //     const date = new Date();
  //     console.log(date);
  //   };
  render() {
    return (
      <div className="timePageMain">
        <p className="todayDate">Today's Date: 10/12/2020</p>
        <button className="btn btn-danger ">On Leave!</button>

        <h5 className="helloUser">Hey User!</h5>
        <Hr />
        <div className="fillInfoDiv">
          <button className="btn btn-success">Enter</button>
          <button className="btn btn-danger ml-4">Exit</button>

          <h6 className="break">Break</h6>
          <Hr />
          <form className="formStyles">
            <div className="form-group pt-4">
              <label htmlFor="startingTime">From</label>

              <input
                type="button"
                className="form-control"
                value="Current Time"
                // onClick={this.currentTime}
              />
            </div>
            <div className="form-group pt-3">
              <label htmlFor="endingTime">To</label>

              <input
                type="time"
                className="form-control"
                placeholder="Break Ending Time"
              />
            </div>
            <div className="form-group pt-3 loginButtonDiv">
              <button type="submit" className="btn btn-success">
                Start Break
              </button>
              <button className="btn btn-danger ml-4">End Break</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TimePage;
