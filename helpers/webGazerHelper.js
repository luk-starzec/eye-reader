const WEBGAZER_SCRIPT_ID = "webGazerScript";

export function initWebGazer(setIsReady) {
  const currentScript = document.getElementById(WEBGAZER_SCRIPT_ID);
  currentScript ? handleScriptLoad(setIsReady, true) : loadScript(setIsReady);
}

const loadScript = (setIsReady) => {
  const script = document.createElement("script");
  script.src = "https://webgazer.cs.brown.edu/webgazer.js";
  script.id = WEBGAZER_SCRIPT_ID;
  script.async = true;
  script.onload = () => handleScriptLoad(setIsReady, false);
  document.body.appendChild(script);
};

const handleScriptLoad = (setIsReady, resume) => {
  window.saveDataAcrossSessions = true;

  let readinessCounter = 0;
  webgazer.setGazeListener((data, timestamp) => {
    readinessCounter++;
    if (readinessCounter > 5) setIsReady(true);
  });

  resume ? webgazer.resume() : webgazer.begin();

  webgazer.showVideoPreview(false).showPredictionPoints(true);
};

export function pauseDataCollection(setIsRunning) {
  if (webgazer) {
    webgazer.clearGazeListener();
    webgazer.showPredictionPoints(false);
    webgazer.pause();
    setIsRunning(false);
  }
}

export function resumeDataCollection(setIsRunning, showPoints) {
  if (webgazer) {
    webgazer.resume();
    showPredictionPoints(showPoints);
    setIsRunning(true);
  }
}

export function resetListener(lookPoint) {
  webgazer.clearGazeListener();
  webgazer.setGazeListener((data, timestamp) => {
    if (data != null && lookPoint != null) {
      lookPoint(data.x, data.y, timestamp);
    }
  });
}

export function resetData() {
  if (webgazer) {
    webgazer.clearData();
  }
}

export function showPredictionPoints(showPoints) {
  webgazer.showPredictionPoints(showPoints);
}

export function showPreview(preview) {
  webgazer.showVideoPreview(preview);
}
