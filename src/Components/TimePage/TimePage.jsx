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
          <div className="row">
            <div className="formContainer text-center col-sm-12 col-lg-6">
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

            <div className="TimingDetail col-sm-12 col-lg-6">
              <div>
                <h4>CountDown</h4>
                <p>2:30:43</p>
              </div>

              <div>
                <h4>Remaining Time</h4>
                <p>2:30:43</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimePage;
