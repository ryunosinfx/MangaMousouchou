import { ORMbase } from './base/ORMbase.js';
export class BinaryData extends ORMbase {
	static props = { id: 'id', name: 'BinaryData', prop: ['id', 'data', 'meta', 'tweetIds', 'createTime', 'user'] };
	static ia = null;
	constructor(id = '', data, meta, createTime = Date.now(), user = 'root') {
		super(BinaryData);
		this.id = id;
		this.data = data;
		this.meta = meta;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static init = async () => await ORMbase.init(BinaryData);
	static getAll = async (conf) => await ORMbase.getAll(BinaryData, conf);
	static loads = async (ids) => await ORMbase.loads(BinaryData, ids);
	static delete = async (id) => await ORMbase.delete(BinaryData, id);
	static update = async (id, data, meta, tweetIds = [], createTime = Date.now(), user = 'root') =>
		await ORMbase.update(BinaryData, { id, data, meta, tweetIds, createTime, user }, true);
	static load = async (id) => await new BinaryData(id).loadToSelf(id);
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
