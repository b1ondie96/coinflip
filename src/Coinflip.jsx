import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  useContext,
} from "react";
import "./coinflip.css";

import Switch from '@mui/material/Switch';
import SingleCoin from "./SingleCoin";
import { Slider, ThemeProvider } from "@mui/material";

import { AiFillEuroCircle, AiOutlinePoundCircle } from "react-icons/ai";
import { IoStatsChartSharp } from "react-icons/io5";
import { BiHistory } from "react-icons/bi";


import { createTheme } from "@mui/material/styles";

function Coinflip() {
  const divRef = useRef();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#E8E6E3",
      },
      secondary: {
        main: "#000",
      },
    },
  });
  const [buttonDisabled, setButtonDisabled] = useState();

  const [headsCount, setheadsCount] = useState(0);
  const [flipped, setFlipped] = useState(0);
  const [history, setHistory] = useState([]);
  const [fastFlip, setFastFlip] = useState(false);
  const [duration, setDuration] = useState(0);
  const [children, setChildren] = useState(1);
  const [childRefs, setChildRefs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
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
    if(JSON.parse(window.localStorage.getItem("headsCount"))){
    setFlipped(JSON.parse(window.localStorage.getItem("flipped")));
    setheadsCount(JSON.parse(window.localStorage.getItem("headsCount")));
}}, []);

  useEffect(() => {
    window.localStorage.setItem("flipped", JSON.stringify(flipped));
    window.localStorage.setItem("headsCount", JSON.stringify(headsCount));
  }, [flipCount]);

  useEffect(() => {
    setHistory((prev) => {
      return [...prev, { flipNumber: flipCount, flip: currentState }];
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

  const historyNumberSuffix = (num) => {
    let suffix = "th";

    if (num % 10 == 1 && num % 100 !== 11) suffix = "st";
    if (num % 10 == 2 && num % 100 !== 12) suffix = "nd";
    if (num % 10 == 3 && num % 100 !== 13) suffix = "rd";

    return suffix;
  };
  return (
    <div className={`content ${darkmode()}`}>
      <div className="stats">
        
            <ul>
              <li> coins flipped: {flipped}</li>
              <li>heads: {headsCount}</li>
              <li>tails: {flipped - headsCount}</li>
            </ul>
         
          <button
            type="
          button"
          >
            <IoStatsChartSharp />
          </button>
        
        <button type="button" onClick={() => setModalOpen(true)}>
          <BiHistory />
        </button>
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
        <ThemeProvider theme={theme}>
          <Slider
            size="large"
            defaultValue={1}
            onChange={handleMultiChange}
            aria-label="Small"
            step={1}
            min={1}
            max={6}
            valueLabelDisplay="auto"
            className="slider"
            disabled={buttonDisabled}
            color={darkMode ? "primary" : "secondary"}
          />
        </ThemeProvider>

        <div className="switch">
          <label htmlFor="switch">Fast flip:&nbsp;</label>
          <Switch
            onChange={handleFastFlip}
            checked={fastFlip}
            disabled={buttonDisabled}
            offColor="#000"
            onColor="#000"
            id="switch"
          />
        </div>
        <button
          className="flipbtn"
          onClick={() => {
            handleClick();
          }}
          disabled={buttonDisabled}
        >
          flip
        </button>
      </div>

      
        <div
          onClick={() => setModalOpen(!modalOpen)}
          className="modal"
          id="modal"
        >
          {history.map((item, index) => {
            return (
              <div key={index} className="history--item">
                <h3>
                  {item.flipNumber > 0 &&
                    item.flipNumber +
                      historyNumberSuffix(item.flipNumber) +
                      " flip"}
                </h3>
                <div className="iconholder">
                  {item.flip.map((o, p) => {
                    return o ? (
                      <AiFillEuroCircle key={p} className="history--icon" />
                    ) : (
                      <AiOutlinePoundCircle key={p} className="history--icon" />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      
    </div>
  );
}

export default Coinflip;
