import { HowOld } from './HowOld.js';

const getAge = (timeFormat) => {
	return new HowOld(this, timeFormat);
}

String.prototype.getAge = getAge;

export { getAge };