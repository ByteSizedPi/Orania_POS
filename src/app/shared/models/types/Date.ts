declare global {
  interface Date {
    addDays: (days: number) => Date;
    addMonths: (months: number) => Date;
    addYears: (years: number) => Date;
    isSameDay: (date: Date) => boolean;
    dayBegin: () => Date;
    monthBegin: () => Date;
    yearBegin: () => Date;
  }
}

Date.prototype.addDays = function (days: number) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

Date.prototype.addMonths = function (months: number) {
  return new Date(
    `${this.getMonth() + 2}-${this.getDate()}-${this.getFullYear()} 00:00:00`
  );
};

Date.prototype.addYears = function (months: number) {
  return new Date(
    `${this.getMonth() + 1}-${this.getDate()}-${
      this.getFullYear() + 1
    } 00:00:00`
  );
};

Date.prototype.isSameDay = function (date: Date) {
  return date.toDateString() === this.toDateString();
};

Date.prototype.dayBegin = function () {
  return new Date(
    `${this.getMonth() + 1}-${this.getDate()}-${this.getFullYear()} 00:00:00`
  );
};

Date.prototype.monthBegin = function () {
  return new Date(`${this.getMonth() + 1}-1-${this.getFullYear()} 00:00:00`);
};

Date.prototype.yearBegin = function () {
  return new Date(`1-1-${this.getFullYear()} 00:00:00`);
};

const dateToString = (date: string) =>
  `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}`;

const dateToDays = (date: number) => Math.floor(date / (1000 * 60 * 60 * 24));

const daysBetween = (dateFrom: Date, dateTo: Date) =>
  dateToDays(dateFrom.getTime() - dateTo.getTime());

const loopDays = (dateFrom: Date, dateTo: Date, fn: (date: Date) => any) => {
  const daysCount = daysBetween(dateTo, dateFrom);
  for (let i = 0; i < daysCount; i++) fn(dateFrom.addDays(i));
};

export { dateToString, dateToDays, loopDays };
