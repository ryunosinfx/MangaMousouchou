import { idbw } from '../../libs/ESIndexeddbWrapper.js';
import { Util } from '../../libs/Util.js';
export const nullList = [];
export class ORMbase {
	static prop = ['data'];
	static idbw = new idbw();
	static a = [];
	static d = {};
	static defaultConf = {};
	constructor(c = { ia: null, props: { name: '', id: 'key', props: [] } }) {
		const props = c.props;
		this.ia = c.ia;
		this.name = props.name;
		this._pkn = props.id;
		this._props = props.prop;
	}
	setSelf(self) {
		this.self = self;
	}
	static flatenDataExec = (r) => {
		if (!r || !r.data) return r;
		const d = r.data;
		if (d && typeof d === 'object' && d.buffer) return;
		delete r.data;
		for (const k in d) {
			const v = d[k];
			r[k] = v;
			delete d[k];
		}
	};
	static flatenData = (r) => {
		if (Array.isArray(r)) for (const c of r) ORMbase.flatenDataExec(c);
		else ORMbase.flatenDataExec(r);
		return r;
	};

	static init = async (c) => (c.ia = await ORMbase.idbw.getAccessor(c.props.name, c.props.id));
	async init() {
		this.ia = this.ia ? this.ia : await ORMbase.idbw.getAccessor(this.name, this._pkn);
	}
	static update = async (c, obj, isClear = false) => {
		const v = {};
		for (const key in obj) if (key !== 'id') v[key] = obj[key];
		const result = await c.ia.put(obj.id, v);
		if (isClear && typeof obj === 'object') for (const key in obj) delete obj[key];
		return result;
	};
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
		await this.init();
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
		console.log('load id:' + id);
		const d = ORMbase.flatenData(await this.get(id));
		console.log('load d:' + d);
		if (!d) return console.log('load id:' + id);
		d.id = id;
		for (const key of this._props) this[key] = d[key];
		return d;
	}
	async loadToSelf(id) {
		this.id = id;
		console.log('loadToSelf id:' + id);
		const a = await this.load(id);
		console.log('loadToSelf a:' + a);
		if (a) Util.clearObj(a);
		return this;
	}
	static loads = async (c, ids) => ORMbase.flatenData(await c.ia.getAll(0, undefined, false, ids));
	async put(id, data) {
		await this.init();
		return await this.ia.put(id, data);
	}
	async puts(map = {}) {
		await this.init();
		return await this.ia.putByMap(map);
	}
	async get(id) {
		console.log('get id:' + id);
		await this.init();
		console.log('get id:' + id);
		return ORMbase.flatenData(await this.ia.get(id));
	}
	static getAll = async (c, conf = ORMbase.defaultConf) =>
		ORMbase.flatenData(
			await c.ia.getAll(conf.offset, conf.count, conf.isKeyOnly, conf.prefix, conf.withGetPropName)
		);
	async getAll() {
		await this.init();
		return ORMbase.flatenData(await this.ia.getAll());
	}
	async getAllKeys(prefix = '') {
		return ORMbase.flatenData(await this.ia.getAll(undefined, undefined, true, prefix));
	}
	static async delete(c, id) {
		console.log(c.ia);
		return await c.ia.delete(id);
	}
	async del(id) {
		await this.init();
		return await this.ia.delete(id);
	}
	async truncate() {
		await this.init();
		return await this.ia.truncate();
	}
	async gets(ids = []) {
		await this.init();
		return ORMbase.flatenData(await this.ia.getAsMap(ids));
	}
	async selectOffsetLimit(offset = 0, count, isKeyOnly) {
		await this.init();
		return ORMbase.flatenData(await this.ia.getAll(offset, count, isKeyOnly));
	}
	async selectByPrefix(prefix, isKeyOnly, offset, count) {
		await this.init();
		return ORMbase.flatenData(await this.ia.getAll(offset, count, isKeyOnly, prefix));
	}
	async getOsNames() {
		await this.init();
		return await this.ia.getOsNames();
	}
}
