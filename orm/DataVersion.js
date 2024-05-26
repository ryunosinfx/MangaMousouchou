import { ORMbase } from './base/ORMbase.js';
export class DataVersion extends ORMbase {
	static props = { id: 'id', prop: ['id', 'data', 'createTime', 'user'] };
	constructor(id = '', data, createTime = Date.now(), user = 'root') {
		super('DataVersion', DataVersion.props);
		this.id = id;
		this.data = data;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static async load(id) {
		return await new DataVersion(id).loadToSelf(id);
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
