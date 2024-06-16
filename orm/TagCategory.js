import { ORMbase } from './base/ORMbase.js';
export class TagCategory extends ORMbase {
	static props = { id: 'id', name: 'TagCategory', prop: ['id', 'name', 'order', 'detail', 'createTime', 'user'] };
	static ia = null;
	constructor(id = '', name, order = 0, detail, createTime = Date.now(), user = 'root') {
		super(TagCategory);
		this.id = id;
		this.name = name;
		this.order = order;
		this.detail = detail;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static init = async () => await ORMbase.init(TagCategory);
	static getAll = async (conf) => await ORMbase.getAll(TagCategory, conf);
	static loads = async (ids) => await ORMbase.loads(TagCategory, ids);
	static delete = async (id) => await ORMbase.delete(TagCategory, id);
	static update = async (id, name = '', order = 0, detail = '', createTime = Date.now(), user = 'root') =>
		await ORMbase.update(TagCategory, { id, name, order, detail, createTime, user }, true);
	static load = async (id) => await new TagCategory(id).loadToSelf(id);
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
