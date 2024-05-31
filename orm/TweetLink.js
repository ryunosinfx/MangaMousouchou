import { ORMbase, nullList } from './base/ORMbase.js';
export class TweetLink extends ORMbase {
	static props = {
		id: 'id',
		name: 'TweetLink',
		prop: ['id', 'linkToTweetIds', 'linkFromTweetIds', 'createTime', 'user'],
	};
	static ia = null;
	constructor(id = '', linkToTweetIds = [], linkFromTweetIds = [], createTime = Date.now(), user = 'root') {
		super(TweetLink);
		this.id = id;
		this.linkToTweetIds = linkToTweetIds;
		this.linkFromTweetIds = linkFromTweetIds;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static init = async () => await ORMbase.init(TweetLink);
	static getAll = async (conf) => await ORMbase.getAll(TweetLink, conf);
	static update = async (
		id,
		linkToTweetIds = nullList,
		linkFromTweetIds = nullList,
		createTime = Date.now(),
		user = 'root'
	) => await ORMbase.update(TweetLink, { id, linkToTweetIds, linkFromTweetIds, createTime, user }, true);
	static load = async (id) => await new TweetLink(id).loadToSelf(id);
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
