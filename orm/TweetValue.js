import { ORMbase, nullList } from './base/ORMbase.js';
export class TweetValue extends ORMbase {
	static props = {
		id: 'id',
		name: 'TweetValue',
		prop: ['id', 'parentTweetId', 'text', 'binaryDataIds', 'createTime', 'user'],
	};
	static ia = null;
	constructor(id = '', parentTweetId, text = '', binaryDataIds = [], createTime = Date.now(), user = 'root') {
		super(TweetValue);
		this.id = id;
		this.parentTweetId = parentTweetId;
		this.text = text;
		this.binaryDataIds = binaryDataIds;
		this.hash = null;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static init = async () => await ORMbase.init(TweetValue);
	static getAll = async (conf) => await ORMbase.getAll(TweetValue, conf);
	static delete = async (id) => await ORMbase.delete(TweetValue, id);
	static update = async (
		id,
		parentTweetId = '',
		text = '',
		binaryDataIds = nullList,
		createTime = Date.now(),
		user = 'root'
	) => await ORMbase.update(TweetValue, { id, parentTweetId, text, binaryDataIds, createTime, user }, true);
	static load = async (id) => await new TweetValue(id).loadToSelf(id);
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
