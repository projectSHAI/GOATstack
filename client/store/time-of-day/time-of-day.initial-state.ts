import { reimmutifyTimeOfDay } from './time-of-day.transformers';

// Define the TIME_OF_DAY for the cloudStyle Object
export const INITIAL_STATE = reimmutifyTimeOfDay({
	titleColor:       '',
	time:             '',
    cloudBrightness: 'brightness(30%)',
    skyColor:        'rgb(15, 12, 30)',
    mountainGoatSvg: '',
    islandSvg:       '',
    whaleSvg:        '',
    capSvg:			 '',
    sunMoonGlow:     '0px 0px 100px 12px #7c4dff',
    sunMoonBorder:   'rgba(102,51,153, 0.3)'
});
