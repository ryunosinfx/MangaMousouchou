import { ORMbase } from './base/ORMbase.js';
export class DataVersion extends ORMbase {
	static props = { id: 'id', name: 'DataVersion', prop: ['id', 'data', 'createTime', 'user'] };
	static ia = null;
	constructor(id = '', data, createTime = Date.now(), user = 'root') {
		super(DataVersion);
		this.id = id;
		this.data = data;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static init = async () => await ORMbase.init(DataVersion);
	static getAll = async (conf) => await ORMbase.getAll(DataVersion, conf);
	static loads = async (ids) => await ORMbase.loads(DataVersion, ids);
	static delete = async (id) => await ORMbase.delete(DataVersion, id);
	static update = async (id, data, createTime = Date.now(), user = 'root') =>
		await ORMbase.update(DataVersion, { id, data, createTime, user }, true);
	static load = async (id) => await new DataVersion(id).loadToSelf(id);
	getId() {
		return this.id;
	}
	getCreateTime() {
		return this.createTime;
	}
	getUser() {
		return this.user;
	}
}
