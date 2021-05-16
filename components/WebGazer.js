import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const StyledWrapper = styled.div`
  height: 100%;
  display: flex;
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
  img {
    height: 90%;
  }
`;

const pauseDataCollection = () => {
  if (webgazer) {
    webgazer.clearGazeListener();
    webgazer.showPredictionPoints(false);
    webgazer.pause();
  }
};
const resumeDataCollection = () => {
  if (webgazer) {
    webgazer.resume();
  }
};

const resetListener = (lookPoint) => {
  webgazer.clearGazeListener();
  webgazer.setGazeListener((data, timestamp) => {
    if (data != null && lookPoint != null) {
      lookPoint(data.x, data.y, timestamp);
    }
  });
};

const resetData = () => {
  if (webgazer) {
    webgazer.clearData();
  }
};

const WebGazer = ({ lookPoint, book, chapter, className, preview = false }) => {
  const [isReady, setIsReady] = useState(false);
  const [predictionPoint, setPredictionPoint] = useState(true);

  useEffect(() => {
    const scriptId = "webGazerScript";
    const currentScript = document.getElementById(scriptId);

    currentScript ? handleScriptLoad(true) : loadScript(scriptId);

    return () => pauseDataCollection();
  }, []);

  useEffect(() => {
    isReady && resetListener(lookPoint);
  }, [book, chapter, isReady]);

  const loadScript = (scriptId) => {
    const script = document.createElement("script");
    script.src = "https://webgazer.cs.brown.edu/webgazer.js";
    script.id = scriptId;
    script.async = true;
    script.onload = () => handleScriptLoad();
    document.body.appendChild(script);
  };

  const handleScriptLoad = (resume = false) => {
    window.saveDataAcrossSessions = true;

    let readinessCounter = 0;
    webgazer.setGazeListener((data, timestamp) => {
      readinessCounter++;
      if (readinessCounter > 5) setIsReady(true);
    });

    resume ? webgazer.resume() : webgazer.begin();

    webgazer.showVideoPreview(preview).showPredictionPoints(true);
  };

  return (
    <StyledWrapper className={className}>
      {!isReady && <StyledWaitImg src="/assets/wait-icon.svg" />}

      {isReady && (
        <>
          <StyledButton
            onClick={resumeDataCollection}
            title="Rozpocznij śledzenie"
          >
            <img src="/assets/play-icon.svg" />
          </StyledButton>

          <StyledButton
            onClick={pauseDataCollection}
            title="Wstrzymaj śledzenie"
          >
            <img src="/assets/pause-icon.svg" />
          </StyledButton>

          <StyledButton onClick={() => setPredictionPoint(!predictionPoint)}>
            <img src="/assets/track-icon.svg" />
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
