export const toCurrency = (val: number) =>
	new Intl.NumberFormat('en-ZA', {
		style: 'currency',
		currency: 'ZAR',
	}).format(val);

export const prePad = (s: string, len: number, char = '0'): string =>
	s.length >= len ? s : prePad(char + s, len, char);

export const postPad = (s: string, len: number, char = ' '): string =>
	s.length >= len ? s : postPad(s + char, len, char);

export const Id = (s: string) => <HTMLElement>document.getElementById(s);
export const query = (s: string) => <HTMLElement>document.querySelector(s);
export const queryAll = (s: string) =>
	<HTMLElement[]>Array.from(document.querySelectorAll(s));
