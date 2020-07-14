import React, { Component } from "react";
import Hr from "../Common/Hr/Hr";
import { Redirect } from "react-router-dom";
import axios from "axios";
// import schedule from "node-schedule";
import { toast } from "react-toastify";

import "./TimePage.css";

import FormatTodayDate from "../../utils/dateFormater";
import To12 from "../../utils/24to12";

class TimePage extends Component {
  state = {
    empName: sessionStorage.getItem("empName"),
    currentTime: new Date().toLocaleTimeString(),
    isEnterBtn: true,
    isStartBreak: true,
    printHours: 0,
    printMinutes: 0,
    printSeconds: 0,
  };

  // schedule.scheduleJob('0 0 * * *', () => {

  //  })

  openModal() {
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Are You Sure, You want a Leave?
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">This action can't be undone.</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={this.onLeave}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onLeave = () => {
    axios
      .post("https://bluemountain-api.herokuapp.com/api/time/leave", {
        time: new Date().toLocaleTimeString(),
        empName: this.state.empName,
        todayDate: new Date().toLocaleDateString(),
      })
      .then((result) => {
        toast("Your Leave is Approved! Enjoy :)");
        this.props.logoutHandler();
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  enterTime = () => {
    const d = new Date().toLocaleDateString();
    const t = new Date().toLocaleTimeString();

    this.setState({ isEnterBtn: false });
    localStorage.setItem("isEnterBtn", false);

    axios
      .put("https://bluemountain-api.herokuapp.com/api/time/start", {
        todayDate: d,
        enterTime: t,
        empName: this.state.empName,
      })
      .then((result) => {
        toast(`Hi ${this.state.empName} Your Working Time is Started...`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  exitTime = () => {
    const d = new Date().toLocaleDateString();
    const t = new Date().toLocaleTimeString();
    axios
      .put("https://bluemountain-api.herokuapp.com/api/time/end", {
        todayDate: d,
        exitTime: t,
        empName: this.state.empName,
      })
      .then((result) => {
        toast(`Hi ${this.state.empName} Your Working Time is Ended...`);
      })
      .catch((err) => {
        console.log(err);
      });
    this.props.logoutHandler();
    this.props.history.push("/");
  };

  breakEntry = (e) => {
    e.preventDefault();
    localStorage.setItem("isBreakStartBtn", false);

    if (e.currentTarget.elements.formBtn.value === "endBreak")
      return this.endBreak();

    this.setState({ isStartBreak: false });
    // console.log("To Time: ", e.target.elements.toTime.value);

    const d = new Date().toLocaleDateString();

    const startTimeTemp = new Date().toLocaleTimeString().split(":");

    const startHours = startTimeTemp[0];

    const startMinutes = startTimeTemp[1];

    const startTimeAP = startTimeTemp[2].split(" ")[1];

    const startTime = `${startHours} : ${startMinutes} ${startTimeAP}`;

    const endTimeValue = e.target.elements.toTime.value;
    const endTimeTemp = e.target.elements.toTime.value.split(":");
    // e.target.elements.toTime.value = "";
    const endHours = parseInt(endTimeTemp[0]);

    const endMinutes = parseInt(endTimeTemp[1]);

    const endTime = To12(endHours, endMinutes);

    const breakEndTime = new Date(`${d} ${endTimeValue}`).getTime();
    localStorage.setItem("breakEndTime", breakEndTime);
    this.timeCountDown();

    axios
      .put("https://bluemountain-api.herokuapp.com/api/time/start-break", {
        date: d,
        startTime: startTime,
        endTime: endTime,
        empName: this.state.empName,
      })
      .then((result) => {
        toast("You are on a break!");
      })
      .catch((error) => {
        console.log("The Error!");
      });
  };

  timing;
  timeCountDown = () => {
    // console.log(endTime, d, endTimeValue);
    // const breakEndTime1 = new Date(`${d} ${endTimeValue}`).getTime();

    this.timing = setInterval(() => {
      const breakEndTime = parseInt(localStorage.getItem("breakEndTime"));
      const currentTime = new Date().getTime();

      let totDistance = breakEndTime - currentTime;

      if (totDistance <= 0) {
        clearInterval(this.timing);
        // alert("Your Break Time is Finished....");
        return;
      }

      let printHours = Math.floor(
        (totDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let printMinutes = Math.floor(
        (totDistance % (1000 * 60 * 60)) / (1000 * 60)
      );
      let printSeconds = Math.floor((totDistance % (1000 * 60)) / 1000);

      this.setState({ printHours, printMinutes, printSeconds });
    });
  };

  endBreak = (e) => {
    localStorage.setItem("isBreakStartBtn", true);
    clearInterval(this.timing);
    const currentTime = new Date().getTime();
    localStorage.setItem("breakEndTime", currentTime);
    this.setState({ printHours: 0, printMinutes: 0, printSeconds: 0 });

    const d = new Date().toLocaleDateString();

    const cameTimeTemp = new Date().toLocaleTimeString().split(":");

    const cameHours = cameTimeTemp[0];

    const cameMinutes = cameTimeTemp[1];

    const cameTimeAP = cameTimeTemp[2].split(" ")[1];

    const cameTime = `${cameHours} : ${cameMinutes} ${cameTimeAP}`;

    axios
      .put("https://bluemountain-api.herokuapp.com/api/time/came-time", {
        date: d,
        cameTime: cameTime,
        empName: this.state.empName,
      })
      .then((res) => {
        toast("Welcome Back :)");

        this.setState({ isStartBreak: true });
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({ isStartBreak: true });
  };

  render() {
    // schedule.scheduleJob("11 58 * * *", () => {
    //   this.exitTime();
    // });

    const isBreakStartBtn = localStorage.getItem("isBreakStartBtn");
    if (isBreakStartBtn === "false") {
      this.timeCountDown();
    }

    const isEnterBtn = localStorage.getItem("isEnterBtn");

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "false" || isLoggedIn === null) {
      return <Redirect from={this.props.location.pathname} to="/" />;
    }

    const loginLogoutBtn = () => {
      if (this.state.isEnterBtn && isEnterBtn === "true") {
        return (
          <button className="btn btn-success" onClick={this.enterTime}>
            Enter
          </button>
        );
      } else if (!this.state.isStartBreak || isBreakStartBtn === "false") {
        return null;
      } else {
        return (
          <button className="btn btn-danger" onClick={this.exitTime}>
            Exit
          </button>
        );
      }
    };

    const breakButtons = () => {
      if (this.state.isStartBreak && isBreakStartBtn === "true") {
        return (
          <button
            type="submit"
            className="btn btn-success"
            value="startBreak"
            name="formBtn"
          >
            Start Break
          </button>
        );
      } else {
        return (
          <button
            type="submit"
            className="btn btn-danger"
            value="endBreak"
            name="formBtn"
          >
            End Break
          </button>
        );
      }
    };

    const dateInputRender = () => {
      if (this.state.isStartBreak && isBreakStartBtn === "true")
        return (
          <input
            type="time"
            name="toTime"
            className="form-control"
            placeholder="Break Ending Time"
            required
          />
        );
      else {
        return (
          <input
            type="time"
            name="toTime"
            className="form-control"
            placeholder="Break Ending Time"
          />
        );
      }
    };

    const breakPartRender = () => {
      if (!this.state.isEnterBtn || isEnterBtn === "false") {
        return (
          <React.Fragment>
            <h6 className="break">Break</h6>
            <Hr />
            <div className="row">
              <div className="formContainer text-center col-sm-12 col-lg-6">
                <form className="formStyles" onSubmit={this.breakEntry}>
                  <p>From Now</p>
                  {/* <div className="form-group pt-4">
              <label htmlFor="startingTime" className="mb-3">
                From 
              </label>

              <input
                type="button"
                className="form-control"
                value={currentTimeBtn}
                onClick={this.currentTime}
              />
            </div> */}
                  <div className="form-group pt-3">
                    <label htmlFor="endingTime" className="mb-3">
                      To
                    </label>

                    {dateInputRender()}
                  </div>
                  <div className="form-group pt-3 loginButtonDiv">
                    {breakButtons()}
                  </div>
                </form>
              </div>

              <div className="TimingDetail col-sm-12 col-lg-6">
                <div>
                  <h4>Count Down</h4>
                  <div id="clockdiv">
                    <div>
                      <span className="hours">{this.state.printHours}</span>
                      <div className="smalltext">Hours</div>
                    </div>
                    <div>
                      <span className="minutes">{this.state.printMinutes}</span>
                      <div className="smalltext">Minutes</div>
                    </div>
                    <div>
                      <span className="seconds">{this.state.printSeconds}</span>
                      <div className="smalltext">Seconds</div>
                    </div>
                  </div>
                </div>

                {/* <div>
                  <h4 className="remainTime">Remaining Time</h4>
                  <div id="clockdiv">
                    <div>
                      <span className="hours">02</span>
                      <div className="smalltext">Hours</div>
                    </div>
                    <div>
                      <span className="minutes">30</span>
                      <div className="smalltext">Minutes</div>
                    </div>
                    <div>
                      <span className="seconds">43</span>
                      <div className="smalltext">Seconds</div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </React.Fragment>
        );
      }
    };

    return (
      <div className="timePageMain">
        <p className="todayDate">Date : {FormatTodayDate()}</p>
        <button
          className="btn btn-danger "
          data-toggle="modal"
          data-target="#exampleModal"
        >
          On Leave!
        </button>

        <h5 className="helloUser">Hey {this.state.empName}!</h5>
        <Hr />
        <div className="fillInfoDiv">
          {loginLogoutBtn()}
          {breakPartRender()}
        </div>
        {this.openModal()}
      </div>
    );
  }
}

export default TimePage;
