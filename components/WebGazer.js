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

const WebGazer = ({ getPoint }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const scriptId = "webGazerScript";
    const currentScript = document.getElementById(scriptId);

    currentScript ? handleScriptLoad(true) : loadScript(scriptId);

    return () => pauseDataCollection();
  }, []);

  const loadScript = (scriptId) => {
    const script = document.createElement("script");
    script.src = "https://webgazer.cs.brown.edu/webgazer.js?";
    script.id = scriptId;
    script.async = true;
    script.onload = () => handleScriptLoad();
    document.body.appendChild(script);
  };
  const handleScriptLoad = (resume = false) => {
    console.log("script loaded");

    window.saveDataAcrossSessions = true;

    webgazer.setGazeListener((data, timestamp) => {
      if (data == null) return;

      if (!isReady) setIsReady(true);

      getPoint(data.x, data.y, timestamp);
    });

    resume ? webgazer.resume() : webgazer.begin();

    webgazer.showVideoPreview(false).showPredictionPoints(true);
  };
  return <div>{isReady ? "OK" : "Loading..."}</div>;
};

export default WebGazer;
