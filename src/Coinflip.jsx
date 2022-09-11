import React, { useState, useEffect, useRef } from "react";
import "./coinflip.css";
import SingleCoin from "./SingleCoin";
import {
  Slider,
  Switch,
  Button,
  IconButton,
  Popper,
  Box,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import History from "./History";


function Coinflip() {
  document.title = 'Coinflip'
  const divRef = useRef();

  const [buttonDisabled, setButtonDisabled] = useState();
  const [headsCount, setheadsCount] = useState(0);
  const [flipped, setFlipped] = useState(0);
  const [history, setHistory] = useState([]);
  const [fastFlip, setFastFlip] = useState(false);
  const [duration, setDuration] = useState(0);
  const [children, setChildren] = useState(1);
  const [childRefs, setChildRefs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [popperOpen, setPopperOpen] = useState(null);
  const [flipCount, setFlipCount] = useState(0);
  const [currentState, setcurrentState] = useState([]);

  const [darkMode, setdarkMode] = useState(false);
  const darkmode = () => {
    return darkMode ? "dark" : "";
  };

  const endParent = (c) => {
    setButtonDisabled(false);
    setDuration(0);
    setFlipped((num) => num + 1);
    currentState.push(c);

    if (c) {
      setheadsCount((h) => h + 1);
    }
    setFlipCount(flipCount + 1);
  };
  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem("headsCount"))) {
      setFlipped(JSON.parse(window.localStorage.getItem("flipped")));
      setheadsCount(JSON.parse(window.localStorage.getItem("headsCount")));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("flipped", JSON.stringify(flipped));
    window.localStorage.setItem("headsCount", JSON.stringify(headsCount));
  }, [flipCount]);

  useEffect(() => {
    setHistory((prev) => {
      return [{ flipNumber: flipCount, flip: currentState }, ...prev];
    });
  }, [flipCount]);

  useEffect(() => {
    setChildRefs([...Array(children).keys()].map(() => React.createRef()));
  }, [children]);
  const handleFastFlip = () => {
    setFastFlip(!fastFlip);
  };
  const handleMultiChange = (e) => {
    setChildren(e.target.value);
  };

  const handleClick = () => {
    setcurrentState([]);

    if (fastFlip) {
      setDuration(0.75);
    } else {
      setDuration(Math.floor(Math.random() * (4 - 1) + 1));
    }
    setButtonDisabled(true);

    childRefs.forEach((c) => c.current.flipCoin());
  };

  const open = Boolean(popperOpen);
  const id = open ? "simple-popper" : undefined;
  const handlePopperClick = (e) => {
    setPopperOpen(popperOpen ? null : e.currentTarget);
  };
 
  return (
    <>
      <div className="stats">
        <Popper id={id} open={open} anchorEl={popperOpen}>
          <Box
            sx={{
              border: 1,
              borderRadius: "15px",
              p: 1,
              backgroundColor: "white",
            }}
            onClick={(e) => handlePopperClick(e)}
          >
            <ul>
              <li>Coins flipped: {flipped}</li>
              <li>Heads: {headsCount}</li>
              <li>Tails: {flipped - headsCount}</li>
            </ul>
          </Box>
        </Popper>

        <IconButton
          aria-describedby={id}
          aria-label="stats"
          size="large"
          onClick={(e) => handlePopperClick(e)}
        >
          <LeaderboardIcon />
        </IconButton>
        <IconButton
          aria-label="stats"
          size="large"
          onClick={() => setModalOpen(true)}
        >
          <HistoryIcon />
        </IconButton>
      </div>
      <div ref={divRef} className="scene">
        {[...Array(children).keys()].map((e, index) => (
          <SingleCoin
            num={e}
            childRef={childRefs[e]}
            fastFlip={fastFlip}
            duration={duration}
            key={index}
            endParent={endParent}
          />
        ))}{" "}
      </div>
      <div className="cfcontrols">
        <Slider
          size="large"
          defaultValue={1}
          onChange={(e) => handleMultiChange(e)}
          aria-label="Small"
          step={1}
          min={1}
          max={6}
          valueLabelDisplay="auto"
          className="slider"
          disabled={buttonDisabled}
        />

        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                onChange={() => handleFastFlip()}
                checked={fastFlip}
                disabled={buttonDisabled}
                id="switch"
               
              />
            }
            label="Fast flip"
            labelPlacement="start"
          />
        </FormGroup>

        <Button
          variant="contained"
          onClick={() => handleClick()}
          disabled={buttonDisabled}
        >
          Flip
        </Button>
      </div>
      <History setModalOpen={setModalOpen} modalOpen={modalOpen} history={history}/>
    </>
  );
}

export default Coinflip;
