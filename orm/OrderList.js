import { ORMbase } from './ORMbase.js';
export class OrderList extends ORMbase {
	static props = { id: 'id', prop: ['id', 'tweetIdList', 'orderType', 'createTime', 'user'] };
	constructor(id = '', tweetIdList = [], orderType, createTime = Date.now(), user = 'root') {
		super('OrderList', OrderList.props);
		this.id = id;
		this.data = data;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static async load(id) {
		return await new OrderList(id).loadToSelf(id);
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
