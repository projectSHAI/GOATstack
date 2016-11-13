import { reimmutifyTimeOfDay } from './time-of-day.transformers';

// Define the TIME_OF_DAY for the cloudStyle Object
export const INITIAL_STATE = reimmutifyTimeOfDay({
  styles: {
    cloudBrightness: 'brightness(100%)',
    skySvg:          '../assets/day-sky.svg',
    mountainGoatSvg: '../assets/day-mountain-goat.svg',
    islandSvg:       '../assets/day-island.svg',
    oceanFrontSvg:   '../assets/day-ocean.svg',
    whaleSvg:        '../assets/day-whale.svg',
    sunMoonGlow:     '0px 0px 100px 12px yellow',
    sunMoonBorder:   'rgba(255,255,0, 0.3)'
  }
});
