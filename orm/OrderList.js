import { ORMbase, nullList } from './base/ORMbase.js';
import { TweetOrderTypes } from '../const/TweetOrderTypes.js';
export class OrderList extends ORMbase {
	static props = { id: 'id', name: 'OrderList', prop: ['id', 'tweetIdList', 'orderType', 'createTime', 'user'] };
	static ia = null;
	constructor(
		id = '',
		tweetIdList = [],
		orderType = TweetOrderTypes.createTimeDESC,
		createTime = Date.now(),
		user = 'root'
	) {
		super(OrderList);
		this.id = id;
		this.tweetIdList = tweetIdList;
		this.orderType = orderType;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static init = async () => await ORMbase.init(OrderList);
	static getAll = async (conf) => await ORMbase.getAll(OrderList, conf);
	static loads = async (ids) => await ORMbase.loads(OrderList, ids);
	static delete = async (id) => await ORMbase.delete(OrderList, id);
	static update = async (
		id,
		tweetIdList = nullList,
		orderType = TweetOrderTypes.createTimeDESC,
		createTime = Date.now(),
		user = 'root'
	) => await ORMbase.update(OrderList, { id, tweetIdList, orderType, createTime, user }, true);
	static load = async (id) => await new OrderList(id).loadToSelf(id);
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
