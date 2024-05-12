export class Util {
	static sleep = (s = 100) => new Promise((r) => setTimeout(() => r(), s));
	static random = (multiple) => Math.floor(Math.random() * multiple);
}
