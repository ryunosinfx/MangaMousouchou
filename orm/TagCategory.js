import { ORMbase } from './ORMbase.js';
export class TagCategory extends ORMbase {
	static props = { id: 'id', prop: ['id', 'name', 'order', 'detail', 'createTime', 'user'] };
	constructor(id = '', name, order = 0, detail, createTime = Date.now(), user = 'root') {
		super('TagCategory', TagCategory.props);
		this.id = id;
		this.name = name;
		this.order = order;
		this.detail = detail;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static async load(id) {
		return await new TagCategory(id).loadToSelf(id);
	}
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
