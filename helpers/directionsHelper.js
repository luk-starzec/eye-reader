export function pointToDirection(x, y, boundaries) {
  const { up, down, left, right } = boundaries;

  if (y >= up.y1 && y <= up.y2) return DIRECTION_UP;

  if (y >= down.y1 && y <= down.y2) return DIRECTION_DOWN;

  if (y >= left.y1 && y <= left.y2 && x >= left.x1 && x <= left.x2)
    return DIRECTION_LEFT;

  if (y >= right.y1 && y <= right.y2 && x >= right.x1 && x <= right.x2)
    return DIRECTION_RIGHT;

  return null;
}

export const DIRECTION_UP = "UP";
export const DIRECTION_DOWN = "DOWN";
export const DIRECTION_LEFT = "LEFT";
export const DIRECTION_RIGHT = "RIGHT";
export const DIRECTION_STOP = "STOP";

export const ARROW_DIRECTIONS = [
  DIRECTION_UP,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
];
