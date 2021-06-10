import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  initWebGazer,
  resumeDataCollection,
  pauseDataCollection,
  resetData,
  resetListener,
  showPredictionPoints,
  showPreview,
} from "../helpers/webGazerHelper";

const StyledWrapper = styled.div`
  position: relative;
  height: 5vh;
  min-height: 3em;
  display: flex;
  justify-content: flex-end;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledWaitImg = styled.img`
  animation: ${rotate} 2s linear infinite;
  height: 90%;
`;

const StyledButton = styled.button`
  background: #f0f0f0;
  border: none;
  border-right: 1px solid #ffffff;
  box-shadow: 0.25em 0.25em 0.25em rgba(0, 0, 0, 0.1);

  cursor: pointer;
  display: ${({ isHidden }) => (isHidden ? "none" : "block")};
  width: 5vh;
  height: 5vh;
  min-width: 3em;
  min-height: 3em;

  &:hover {
    background: #dddddd;
  }

  img {
    height: 50%;
  }
`;

// const resetListener = (lookPoint) => {
//   webgazer.clearGazeListener();
//   webgazer.setGazeListener((data, timestamp) => {
//     if (data != null && lookPoint != null) {
//       lookPoint(data.x, data.y, timestamp);
//     }
//   });
// };

// const resetData = () => {
//   if (webgazer) {
//     webgazer.clearData();
//   }
// };

const WebGazer = ({ lookPoint, book, chapter, className, preview = false }) => {
  const [isReady, setIsReady] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [predictionPoint, setPredictionPoint] = useState(true);

  useEffect(() => {
    initWebGazer(setIsReady);
    // const scriptId = WEBGAZER_SCRIPT_ID;
    // const currentScript = document.getElementById(scriptId);

    // currentScript
    //   ? handleScriptLoad(setIsReady, true, preview)
    //   : loadScript(setIsReady);

    return () => pauseDataCollection(setIsRunning);
  }, []);

  useEffect(() => {
    isReady && resetListener(lookPoint);
  }, [book, chapter, isReady]);

  // const loadScript = (setIsReady) => {
  //   const script = document.createElement("script");
  //   script.src = "https://webgazer.cs.brown.edu/webgazer.js";
  //   script.id = WEBGAZER_SCRIPT_ID;
  //   script.async = true;
  //   script.onload = () => handleScriptLoad(setIsReady, false, false );
  //   document.body.appendChild(script);
  // };

  // const handleScriptLoad = (resume = false) => {
  //   window.saveDataAcrossSessions = true;

  //   let readinessCounter = 0;
  //   webgazer.setGazeListener((data, timestamp) => {
  //     readinessCounter++;
  //     if (readinessCounter > 5) setIsReady(true);
  //   });

  //   resume ? webgazer.resume() : webgazer.begin();

  //   webgazer.showVideoPreview(preview).showPredictionPoints(true);
  // };

  // const pauseDataCollection = () => {
  //   if (webgazer) {
  //     webgazer.clearGazeListener();
  //     webgazer.showPredictionPoints(false);
  //     webgazer.pause();
  //     setIsRunning(false);
  //   }
  // };
  // const resumeDataCollection = () => {
  //   if (webgazer) {
  //     webgazer.resume();
  //     setIsRunning(true);
  //   }
  // };

  const changePointVisibility = () => {
    showPredictionPoints(!predictionPoint);
    setPredictionPoint(!predictionPoint);
  };
  
  return (
    <StyledWrapper className={className}>
      {!isReady && <StyledWaitImg src="/assets/wait-icon.svg" />}

      {isReady && (
        <>
          <StyledButton
            isHidden={isRunning}
            onClick={() => resumeDataCollection(setIsRunning, predictionPoint)}
            title="Rozpocznij śledzenie"
          >
            <img src="/assets/play-icon.svg" />
          </StyledButton>

          <StyledButton
            isHidden={!isRunning}
            onClick={() => pauseDataCollection(setIsRunning)}
            title="Wstrzymaj śledzenie"
          >
            <img src="/assets/pause-icon.svg" />
          </StyledButton>
          <StyledButton
            onClick={changePointVisibility}
            title={predictionPoint ? "Ukryj wskaźnik" : "Pokaż wskaźnik"}
          >
            <img
              src={
                predictionPoint
                  ? "/assets/track-dot-icon.svg"
                  : "/assets/track-icon.svg"
              }
            />
          </StyledButton>
          <StyledButton
            onClick={resetData}
            title="Resetuj dane algorytmu śledzenia"
          >
            <img src="/assets/delete-icon.svg" />
          </StyledButton>
        </>
      )}
    </StyledWrapper>
  );
};

export default WebGazer;
