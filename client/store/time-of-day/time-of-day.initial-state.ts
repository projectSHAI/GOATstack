import { reimmutifyTimeOfDay } from './time-of-day.transformers';

// Define the TIME_OF_DAY for the cloudStyle Object
export const INITIAL_STATE = reimmutifyTimeOfDay({
	titleColor:      'white',
	nightTime:       true,
    cloudBrightness: 'brightness(30%)',
    skyColor:        '#140f28',
    mountainGoatSvg: 'public/assets/night-mountain-goat.svg',
    islandSvg:       'public/assets/night-island.svg',
    whaleSvg:        'public/assets/night-whale.svg',
    sunMoonGlow:     '0px 0px 100px 12px #7c4dff',
    sunMoonBorder:   'rgba(102,51,153, 0.3)'
});
