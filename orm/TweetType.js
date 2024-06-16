import { ORMbase } from './base/ORMbase.js';
export class TweetType extends ORMbase {
	static props = { id: 'id', name: 'TweetType', prop: ['id', 'name', 'createTime', 'user'] };
	static ia = null;
	constructor(id = '', name, createTime = Date.now(), user = 'root') {
		super(TweetType);
		this.id = id;
		this.name = name;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static init = async () => await ORMbase.init(TweetType);
	static getAll = async (conf) => await ORMbase.getAll(TweetType, conf);
	static loads = async (ids) => await ORMbase.loads(TweetType, ids);
	static delete = async (id) => await ORMbase.delete(TweetType, id);
	static update = async (id, name = '', createTime = Date.now(), user = 'root') =>
		await ORMbase.update(TweetType, { id, name, createTime, user }, true);
	static load = async (id) => await new TweetType(id).loadToSelf(id);
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
