import { reimmutifyTimeOfDay } from './time-of-day.transformers';

// Define the TIME_OF_DAY for the cloudStyle Object
export const INITIAL_STATE = reimmutifyTimeOfDay({
    cloudBrightness: 'brightness(30%)',
    skySvg: 'assets/night-sky.svg',
    mountainGoatSvg: 'assets/night-mountain-goat.svg',
    islandSvg: 'assets/night-island.svg',
    oceanFrontSvg: 'assets/day-ocean.svg',
    whaleSvg: 'assets/night-whale.svg',
    sunMoonGlow: '0px 0px 100px 12px purple',
    sunMoonBorder: 'rgba(102,51,153, 0.3)'
});
