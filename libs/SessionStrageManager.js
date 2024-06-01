import { Util } from './Util.js';
import { VERSION } from '../parts/Version.js';
const delimiter = '/';
export class SessonStorageManager {
	static currentKey = 'SSM_' + VERSION;
	static a = [];

	static register(id, value) {
		const k = SessonStorageManager.currentKey;
		const json = sessionStorage.getItem(k);
		if (!json) return sessionStorage.setItem(k, JSON.stringify({ id: { value, d: Util.getNowAsU() } }));
		try {
			const obj = JSON.parse(json);
			obj[id] = { value, d: Util.getNowAsU() };
			let s = JSON.stringify(obj);
			let l = s.length;
			while (!SessonStorageManager.registerExec(s)) {
				s = JSON.stringify(SessonStorageManager.removeOldestOne(obj));
				if (l === s.length) {
					break;
				}
				l = s.length;
			}
		} catch (e) {
			console.warn('SessonStorageManager regist JSON.parse error', e);
		}
	}
	static get(id) {
		const k = SessonStorageManager.currentKey;
		const json = sessionStorage.getItem(k);
		if (!json) return null;
		try {
			const obj = JSON.parse(json);

			console.warn('SessonStorageManager get id:' + id, obj);
			return obj[id];
		} catch (e) {
			console.warn('SessonStorageManager get JSON.parse error', e);
		}
	}
	static removeOldestOne(obj) {
		const a = SessonStorageManager.a;
		a.splice(0, a.length);
		for (const id in obj) {
			const v = obj[id];
			a.push(v.d + delimiter + id);
		}
		a.sort();
		const target = a.shift();
		const b = target.split(delimiter);
		b.shift();
		const delId = b.join(delimiter);
		delete obj[delId];
		a.splice(0, a.length);
		return obj;
	}
	static removeOne(id) {
		const k = SessonStorageManager.currentKey;
		const json = sessionStorage.getItem(k);
		if (!json) return;
		try {
			const obj = JSON.parse(json);
			delete obj[id];
			let s = JSON.stringify(obj);
			while (!SessonStorageManager.registerExec(s)) {
				s = JSON.stringify(SessonStorageManager.removeOldestOne(obj));
			}
		} catch (e) {
			console.warn('SessonStorageManager removeOne JSON.parse error', e);
		}
	}
	static clear() {
		sessionStorage.removeItem(SessonStorageManager.currentKey);
	}
	static registerExec(s) {
		try {
			sessionStorage.setItem(SessonStorageManager.currentKey, s);
			return true;
		} catch (e) {
			console.warn('SessonStorageManager registerExec sessionStorage.setItem error', e);
		}
		return false;
	}
	static clearAll() {
		sessionStorage.clear();
	}
}
