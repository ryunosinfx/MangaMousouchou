import { ORMbase } from './ORMbase.js';
export class TweetLink extends ORMbase {
	static props = { id: 'id', prop: ['id', 'linkToTweetIds', 'linkFromTweetIds', 'createTime', 'user'] };
	constructor(id = '', data, createTime = Date.now(), user = 'root') {
		super('TweetLink', TweetLink.props);
		this.id = id;
		this.linkToTweetIds = linkToTweetIds;
		this.linkFromTweetIds = linkFromTweetIds;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static async load(id) {
		return await new TweetLink(id).loadToSelf(id);
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
