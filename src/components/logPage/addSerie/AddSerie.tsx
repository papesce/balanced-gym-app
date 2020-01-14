import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TimerOffIcon from "@material-ui/icons/TimerOff";
import TimerIcon from "@material-ui/icons/Timer";
import { Tooltip } from "@material-ui/core";
import "./AddSerie.css";

const DEFAULT_TIMER_LIMIT: number = 10 * 60; //10 minutes

interface AddSerieProps {
  timerStarted?: boolean;
  handleLogNewSerie?: () => void;
  timerLimit?: number;
  initialTimerTime?: number;
  startTime?: number;
}

interface AddSerieState {
  timerTime: number;
  startTime: number;
  timerPaused: boolean;
}

const formatTime = (min: number, sec: number) => {
  const minutes: string = `${min}`;
  const seconds: string = `${sec < 10 ? "0" : ""}${sec}`;
  return minutes + ":" + seconds;
};

const millisToMinutesAndSeconds = (millis: number) => {
  const minutes: number = Math.floor(millis / 60000);
  const seconds: number = Math.trunc((millis % 60000) / 1000);
  return formatTime(minutes, seconds);
};



export default class RestTime extends Component<AddSerieProps, AddSerieState> {
  timer: any;
  constructor(props: AddSerieProps) {
    super(props);
    const {
      initialTimerTime = 0,
      startTime = Date.now(),
      timerStarted = false
    } = this.props;
    this.state = {
      timerTime: initialTimerTime * 1000,
      startTime,
      timerPaused: !timerStarted
    };
    this.timer = null;
  }
  stopTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  };
  createTimer = () => {
    if (!this.timer) this.timer = setInterval(this.increaseTimerTime, 1000);
  };
  increaseTimerTime = () => {
    const { timerLimit = DEFAULT_TIMER_LIMIT } = this.props;
    this.setState(prevState => {
      const { startTime } = prevState;
      const timerTime = Date.now() - startTime;
      if (timerTime >= timerLimit * 1000) {
        this.stopTimer();
        return {...prevState, timerTime, timerPaused: true };
       } else 
        return {...prevState, timerTime }
    })
  };
  componentDidMount = () => {
    const { timerPaused = false } = this.state;
    if (!timerPaused) this.createTimer();
  };
  handleAddSerie = () => {
    const { handleLogNewSerie } = this.props;
    handleLogNewSerie && handleLogNewSerie();
  };
  handleTimerClick = () => {
    this.setState(prevState => {
      const { timerPaused } = prevState;
      if (timerPaused) this.createTimer();
      else this.stopTimer();
      return { timerPaused: !timerPaused };
    });
  };
  render() {
    const stopTimer = (
      <Tooltip title="Stop Timer">
        <TimerOffIcon />
      </Tooltip>
    );
    const resumeTimer = (
      <Tooltip title="Resume Timer">
        <TimerIcon />
      </Tooltip>
    );
    const { initialTimerTime = 0, timerLimit = DEFAULT_TIMER_LIMIT } = this.props;
    const { timerTime, timerPaused } = this.state;
    const hasTimer = timerTime > 0 || !timerPaused;
    const canBePaused = initialTimerTime === 0 && timerTime <= timerLimit * 1000;
    return (
      <div className="add-serie-contianer">
        {hasTimer && (
          <>
            <span className="action-panel-timer">
              Rest Time: <span>{millisToMinutesAndSeconds(timerTime)}</span>
            </span>
            {canBePaused && (
              <span className="add-serie-timer-button">
                <Button
                variant="contained"
                color="primary"
                onClick={this.handleTimerClick}
              >
                {timerPaused ? resumeTimer : stopTimer}
              </Button>
              </span>
            )}
          </>
        )}
        {timerPaused && (
          <span className="add-serie-log-button">
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleAddSerie}
            >
              Log New Serie
            </Button>
          </span>
        )}
      </div>
    );
  }
}
