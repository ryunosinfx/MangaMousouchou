import { ORMbase, nullList } from './base/ORMbase.js';
export class TweetTag extends ORMbase {
	static props = { id: 'id', name: 'TweetTag', prop: ['id', 'name', 'order', 'categories', 'createTime', 'user'] };
	static ia = null;
	constructor(id = '', name, order = 0, categories = [], createTime = Date.now(), user = 'root') {
		super(TweetTag);
		this.id = id;
		this.name = name;
		this.order = order;
		this.categories = categories;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static init = async () => await ORMbase.init(TweetTag);
	static getAll = async (conf) => await ORMbase.getAll(TweetTag, conf);
	static loads = async (ids) => await ORMbase.loads(TweetTag, ids);
	static delete = async (id) => await ORMbase.delete(TweetTag, id);
	static update = async (id, name = '', order = 0, categories = nullList, createTime = Date.now(), user = 'root') =>
		await ORMbase.update(TweetTag, { id, name, order, categories, createTime, user }, true);
	static load = async (id) => await new TweetTag(id).loadToSelf(id);
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
