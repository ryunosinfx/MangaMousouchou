import { idbw } from '../../libs/ESIndexeddbWrapper.js';
export class ORMbase {
	static prop = ['data'];
	static idbw = new idbw();
	static a = [];
	static d = {};
	constructor(name, pkn = 'key') {
		this.name = name;
		if (typeof pkn === 'object') {
			this._pkn = pkn.id;
			this._props = pkn.prop;
		} else {
			this._pkn = pkn;
			this._props = ORMbase.prop;
		}
	}
	setSelf(self) {
		thid.self = self;
	}
	async init() {
		this.ia = await ORMbase.idbw.getAccessor(this.name, this._pkn);
	}
	async update(data) {
		if (data && typeof data === 'object') for (const key of this._props) this.self[key] = data[key];
		return await this.updateExec(this);
	}
	serialize() {
		const d = ORMbase.d;
		for (const key in d) delete d[key];
		for (const key of this._props) d[key] = this.self[key];
		const json = JSON.stringify(d);
		for (const key in d) delete d[key];
		return json;
	}
	async updateExec(data = {}) {
		const a = ORMbase.a;
		a.splice(0, a.length);
		for (const key of this._props) {
			a.push(data[key]);
		}
		const id = data[this._pkn];
		const json = JSON.stringify(a);
		a.splice(0, a.length);
		if (id === undefined) return;
		await this.put(id, json);
	}
	async load(id) {
		const d = await this.get(id);
		for (const key of this._props) {
			this[key] = d[key];
		}
		return d;
	}
	async loadToSelf(id) {
		await this.load(id);
		return this;
	}
	async put(id, data) {
		return await this.ia.put(id, data);
	}
	async puts(map = {}) {
		return await this.ia.putByMap(map);
	}
	async get(id) {
		return await this.ia.get(id);
	}
	async getAll() {
		return await this.ia.getAll();
	}
	async getAllKeys(prefix = '') {
		return await this.ia.getAll(undefined, undefined, true, prefix);
	}
	async del(id) {
		return await this.ia.delete(id);
	}
	async truncate() {
		return await this.ia.truncate();
	}
	async gets(ids = []) {
		return await this.ia.getAsMap(ids);
	}
	async selectOffsetLimit(offset = 0, count, isKeyOnly) {
		return await this.ia.getAll(offset, count, isKeyOnly);
	}
	async selectByPrefix(prefix, isKeyOnly, offset, count) {
		return await this.ia.getAll(offset, count, isKeyOnly, prefix);
	}
	async getOsNames() {
		return await this.ia.getOsNames();
	}
}
