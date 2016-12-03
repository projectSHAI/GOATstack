import { reimmutifyTimeOfDay } from './time-of-day.transformers';

// Define the TIME_OF_DAY for the cloudStyle Object
export const INITIAL_STATE = reimmutifyTimeOfDay({
	titleColor:      'white',
	nightTime:       true,
    cloudBrightness: 'brightness(30%)',
    skyColor:        '#140f28',
    mountainGoatSvg: 'assets/night-mountain-goat.svg',
    islandSvg:       'assets/night-island.svg',
    oceanFrontSvg:   'assets/night-ocean.svg',
    whaleSvg:        'assets/night-whale.svg',
    sunMoonGlow:     '0px 0px 100px 12px #7c4dff',
    sunMoonBorder:   'rgba(102,51,153, 0.3)'
});
