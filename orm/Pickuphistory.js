import { ORMbase } from './base/ORMbase.js';
export class Pickuphistory extends ORMbase {
	static props = { id: 'id', name: 'Pickuphistory', prop: ['id', 'createTime', 'user'] };
	static ia = null;
	constructor(id = '', createTime = Date.now(), user = 'root') {
		super(Pickuphistory);
		this.id = id;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static init = async () => await ORMbase.init(Pickuphistory);
	static getAll = async (conf) => await ORMbase.getAll(Pickuphistory, conf);
	static loads = async (ids) => await ORMbase.loads(Pickuphistory, ids);
	static delete = async (id) => await ORMbase.delete(Pickuphistory, id);
	static update = async (id, createTime = Date.now(), user = 'root') =>
		await ORMbase.update(Pickuphistory, { id, createTime, user }, true);
	static load = async (id) => await new Pickuphistory(id).loadToSelf(id);
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
