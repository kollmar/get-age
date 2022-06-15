"use strict";

export class HowOld {
	constructor(date, timeFormat = { timeZone: 'Europe/Berlin', hours12: false }) {
		this.timeFormat = {
			lang: 'en-US',
			options: {
				timeZone: timeFormat.timeZone || 'Europe/Berlin',
				year: 'numeric', month: 'numeric', day: 'numeric',
				hour: 'numeric', minute: 'numeric', second: 'numeric',
				hour12: timeFormat.hours12 || false,
			}
		};
		try {
			this.seperator  = '-';
			this.date       = this.changeSeperator(date);
			this.dateNow    = new Date(Date.now());
			this.parsedDate = this.dateStringtoDateFormat();
			this.dateDiff   = this.compareDateFromNow();
			
			this.ageData();
		} catch (error) {
			console.log(error.stack);
		}
	}
	
	isDateNaN(date = this.date) {
		return isNaN(Date.parse(date))
	}
	
	reverseDateString(dateString) {		
		return dateString
			.split(this.seperator)
			.reverse()
			.join(this.seperator);
	}

	changeSeperator(date, seperatorStr = this.seperator) {
		return date.replace(/\./g, seperatorStr);
	}	

	dateStringtoDateFormat(timeFormat = this.timeFormat) {
		if (this.date.match(/^\d{4}/) === null) {
			this.date = this.reverseDateString(this.date);
		}

		if (this.isDateNaN(this.date)) {
			throw { stack: 'Date is not a number' }
		}
		
		try {
			this.date = new Date(Intl.DateTimeFormat(this.timeFormat.lang, this.timeFormat.options)
				.format(new Date(this.date)));			
		} catch (error) {
			throw { stack: 'Date is not a number' }			
		}		

		return this.date;
	}

	compareDateFromNow() {
		return this.dateNow - this.parsedDate;
	}

	ageData(compareTimeInMs = this.dateDiff) {
		this.inMinutes = Math.floor(compareTimeInMs / 60_000);
		this.days = Math.floor(this.inMinutes / 1_440);

		this.years = Math.floor(this.days / 365);
		this.months = Math.floor((this.days - this.years * 365) / 30);
		this.d = Math.floor(this.days - this.years * 365 - this.months * 30);
	}

	getObject() {
		return {
			years: this.years,
			months: this.months,
			days: this.d
		}
	}

	getString() {
		const years = `${this.years} ${this.years === 1 ? 'Jahr' : 'Jahre'}`; 
		const months = `${this.months} ${this.months === 1 ? 'Monat' : 'Monate'}`; 
		const d = `${this.d} ${this.d === 1 ? 'Tag' : 'Tage'}`;
		return `${years}, ${months} und ${d}`;
	}
}