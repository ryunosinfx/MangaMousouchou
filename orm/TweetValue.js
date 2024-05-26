import { ORMbase } from './ORMbase.js';
export class TweetValue extends ORMbase {
	static props = { id: 'id', prop: ['id', 'parentTweetId', 'text', 'binaryDataIds', 'createTime', 'user'] };
	constructor(id = '', parentTweetId, text = '', binaryDataIds = [], createTime = Date.now(), user = 'root') {
		super('TweetValue', TweetValue.props);
		this.id = id;
		this.parentTweetId = parentTweetId;
		this.text = text;
		this.binaryDataIds = binaryDataIds;
		this.hash = null;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static async load(id) {
		return await new TweetValue(id).loadToSelf(id);
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
