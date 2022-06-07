declare global {
	interface Date {
		addDays: (days: number) => Date;
		isSameDay: (date: Date) => boolean;
	}
}

Date.prototype.addDays = function (days: number) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
};

Date.prototype.isSameDay = function (date: Date) {
	return date.toDateString() === this.toDateString();
};

const dateToString = (date: string) => {
	console.log(`${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}`);
	return `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}`;
};

const dateToDays = (date: number) => Math.floor(date / (1000 * 60 * 60 * 24));

const daysBetween = (dateFrom: Date, dateTo: Date) =>
	dateToDays(dateFrom.getTime() - dateTo.getTime());

const loopDays = (dateFrom: Date, dateTo: Date, fn: (date: Date) => any) => {
	const daysCount = daysBetween(dateTo, dateFrom);
	for (let i = 0; i < daysCount; i++) fn(dateFrom.addDays(i));
};

export { dateToString, dateToDays, loopDays };
