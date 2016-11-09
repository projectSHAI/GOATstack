import { reimmutifyTimeOfDay } from './time-of-day.transformers';

// Define the TIME_OF_DAY for the cloudStyle Object
export const INITIAL_STATE = reimmutifyTimeOfDay({
  styles: {
    cloudBrightness: '100%',
    skySvg: '../assets/day-sky.svg',

    goatSvg: '../assets/awake-goat.svg',
    mountainSvg: '../assets/day-mountain.svg',
    islandSvg: '../assets/day-island.svg',
    treeSvg: '../assets/day-trees.svg',

    oceanSvg: '../assets/day-ocean.svg',
    whaleSvg: '../assets/day-whale.svg'
  }
});
