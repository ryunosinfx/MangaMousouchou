import { ORMbase } from './ORMbase.js';
export class Master extends ORMbase {
	static props = { id: 'id', prop: ['id', 'name', 'data', 'type', 'createTime', 'user'] };
	constructor(id = '', name, data, type, createTime = Date.now(), user = 'root') {
		super('Master', Master.props);
		this.id = id;
		this.name = name;
		this.data = data;
		this.type = type;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static async load(id) {
		return await new Master(id).loadToSelf(id);
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
