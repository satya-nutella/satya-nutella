import twemoji from "twemoji";

function hoursToSeconds(h: number) {
  return h * 60 * 60;
}

export const CONSTANTS = {
  THIRTY_MINUTES: hoursToSeconds(0.5),
  TWO_HOURS: hoursToSeconds(2),
  FOUR_HOURS: hoursToSeconds(4),
  ONE_DAY: hoursToSeconds(24),
};

export function clampValue(number: number, min: number, max: number) {
  return Math.max(min, Math.min(number, max));
}

export function emojify(text: string) {
  const twOptions = {
    folder: "svg",
    ext: ".svg",
  };

  return twemoji.parse(text, twOptions);
}
