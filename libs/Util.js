import { BinUtil } from './BinaryUtil.js';
const u32a1 = new Uint32Array(2);
const u32 = Math.pow(2, 32);
export class Util {
	static sleep = (s = 100) => new Promise((r) => setTimeout(() => r(), s));
	static random = (multiple) => Math.floor(Math.random() * multiple);
	static mkUUID = () => self.crypto.randomUUID();
	static getNowAsU = () => {
		const now = Date.now();
		u32a1[0] = Math.floor(now / u32);
		u32a1[1] = now % u32;
		return BinUtil.a2U(u32a1.buffer);
	};
	static convertTimeToFromat(unixtime, format = 'yyyy/MM/dd hh:mm:ss.SSS') {
		const d = new Date(unixtime);
		const a = format.replace(/[y]{1,4}/, `${d.getFullYear()}`.padStart(4, '0'));
		const b = a.replace(/[M]{1,2}/, `${d.getMonth() + 1}`.padStart(2, '0'));
		const c = b.replace(/[d]{1,2}/, `${d.getDate()}`.padStart(2, '0'));
		const e = c.replace(/[h]{1,2}/, `${d.getHours()}`.padStart(2, '0'));
		const f = e.replace(/[m]{1,2}/, `${d.getMinutes()}`.padStart(2, '0'));
		const g = f.replace(/[s]{1,2}/, `${d.getSeconds()}`.padStart(2, '0'));
		return g.replace(/[S]{1,3}/, `${d.getMilliseconds()}`.padStart(3, '0'));
	}
	static getCurrentPath = () => {
		const path = location.pathname;
		const l = path.split('/');
		l.pop();
		return l.join('/');
	};
}
