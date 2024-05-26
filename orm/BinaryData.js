import { ORMbase } from './base/ORMbase.js';
export class BinaryData extends ORMbase {
	static props = { id: 'id', prop: ['id', 'data', 'meta', 'createTime', 'user'] };
	constructor(id = '', data, meta, createTime = Date.now(), user = 'root') {
		super('BinaryData', BinaryData.props);
		this.id = id;
		this.data = data;
		this.meta = meta;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static async load(id) {
		return await new BinaryData(id).loadToSelf(id);
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
