import { ORMbase } from './ORMbase.js';
export class Tweet extends ORMbase {
	static props = { id: 'id', prop: ['id', 'replayTweetIds', 'typeId', 'tagIds', 'state', 'createTime', 'user'] };
	constructor(id = '', replayTweetIds, typeId, tagIds = [], state, createTime = Date.now(), user = 'root') {
		super('Tweet', Tweet.props);
		this.id = id;
		this.replayTweetIds = replayTweetIds;
		this.typeId = typeId;
		this.tagIds = tagIds;
		this.state = state;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static async load(id) {
		return await new Tweet(id).loadToSelf(id);
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
