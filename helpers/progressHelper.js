import {
  DIRECTION_UP,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
} from "./directionsHelper";

export const progressReducer = (state, action) => {
  switch (action.type) {
    case DIRECTION_UP:
      return {
        up: action.payload,
        down: 0,
        left: 0,
        right: 0,
      };
    case DIRECTION_DOWN:
      return {
        up: 0,
        down: action.payload,
        left: 0,
        right: 0,
      };
    case DIRECTION_LEFT:
      return {
        up: 0,
        down: 0,
        left: action.payload,
        right: 0,
      };
    case DIRECTION_RIGHT:
      return {
        up: 0,
        down: 0,
        left: 0,
        right: action.payload,
      };
    default:
      return {
        up: 0,
        down: 0,
        left: 0,
        right: 0,
      };
  }
};

export const initialProgress = {
  up: 0,
  down: 0,
  left: 0,
  right: 0,
};

export const getProgress = (startTime, currentTime, delay) =>
  (currentTime - startTime) / delay;
