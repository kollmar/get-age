import { HowOld } from './HowOld.js';

export function getAge(timeFormat) {	
	return new HowOld(this, timeFormat);
}

String.prototype.getAge = getAge;