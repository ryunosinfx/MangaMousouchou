import { ORMbase } from './ORMbase.js';
export class Pickuphistory extends ORMbase {
	static props = { id: 'id', prop: ['id', 'createTime', 'user'] };
	constructor(id = '', createTime = Date.now(), user = 'root') {
		super('Pickuphistory', Pickuphistory.props);
		this.id = id;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static async load(id) {
		return await new Pickuphistory(id).loadToSelf(id);
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
