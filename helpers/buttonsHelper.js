export function getBoundaries(topMargin, buttonWidth, buttonHeight) {
  const vh = window.innerHeight / 100;
  const vw = window.innerWidth / 100;

  const upBottom = (topMargin + buttonHeight) * vh;
  const downTop = window.innerHeight - buttonHeight * vh;

  return {
    up: {
      y1: topMargin * vh,
      y2: upBottom,
    },
    down: {
      y1: downTop,
      y2: window.innerHeight,
    },
    left: {
      x1: 0,
      x2: buttonWidth * vw,
      y1: upBottom,
      y2: downTop,
    },
    right: {
      x1: window.innerWidth - buttonWidth * vw,
      x2: window.innerWidth,
      y1: upBottom,
      y2: downTop,
    },
  };
}
