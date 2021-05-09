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

export function getDirection(x, y, boundaries) {
  const { up, down, left, right } = boundaries;

  if (y >= up.y1 && y <= up.y2) {
    return DIRECTION_UP;
  } else if (y >= down.y1 && y <= down.y2) {
    return DIRECTION_DOWN;
  } else if (y >= left.y1 && y <= left.y2 && x >= left.x1 && x <= left.x2) {
    return DIRECTION_LEFT;
  } else if (y >= right.y1 && y <= right.y2 && x >= right.x1 && x <= right.x2) {
    return DIRECTION_RIGHT;
  } else {
    return null;
  }
}

export const DIRECTION_UP = "UP";
export const DIRECTION_DOWN = "DOWN";
export const DIRECTION_LEFT = "LEFT";
export const DIRECTION_RIGHT = "RIGHT";
export const DIRECTION_STOP = "STOP";
