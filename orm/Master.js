import { ORMbase } from './base/ORMbase.js';
export class Master extends ORMbase {
	static props = { id: 'id', name: 'Master', prop: ['id', 'name', 'data', 'type', 'createTime', 'user'] };
	static ia = null;
	constructor(id = '', name, data, type, createTime = Date.now(), user = 'root') {
		super(Master);
		this.id = id;
		this.name = name;
		this.data = data;
		this.type = type;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static init = async () => await ORMbase.init(Master);
	static getAll = async (conf) => await ORMbase.getAll(Master, conf);
	static update = async (id, name = '', data, type = '', createTime = Date.now(), user = 'root') =>
		await ORMbase.update(Master, { id, name, data, type, createTime, user }, true);
	static load = async (id) => await new Master(id).loadToSelf(id);
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
