import React, { useEffect, useState } from "react";

const GRID_ROW_HEADER = 5;
const GRID_ROW_BUTTON = 10;
const GRID_ROW_CONTENT = 75;

const pauseDataCollection = () => {
  if (webgazer) {
    webgazer.clearGazeListener();
    webgazer.showPredictionPoints(false);
    webgazer.pause();
  }
};

const resetListener = (getPoint) => {
  webgazer.clearGazeListener();
  webgazer.setGazeListener((data, timestamp) => {
    if (data != null && getPoint != null) {
      getPoint(data.x, data.y, timestamp);
    }
  });
};

const resetData = () => {
  if (webgazer) {
    webgazer.clearData();
  }
};
const WebGazer = ({ getPoint, book, chapter, className, preview = false }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const scriptId = "webGazerScript";
    const currentScript = document.getElementById(scriptId);

    currentScript ? handleScriptLoad(true) : loadScript(scriptId);

    return () => pauseDataCollection();
  }, []);

  useEffect(() => {
    isReady && resetListener(getPoint);
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
      if (readinessCounter > 5) {
        setIsReady(true);
      }
    });

    resume ? webgazer.resume() : webgazer.begin();

    webgazer.showVideoPreview(preview).showPredictionPoints(true);
  };

  return (
    <div className={className}>
      {isReady ? "Gotowy" : "Czekaj..."}
      <button onClick={resetData}>Reset</button>
    </div>
  );
};

export default WebGazer;
