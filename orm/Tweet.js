import { ORMbase, nullList } from './base/ORMbase.js';
import { TweetStates } from '../const/TweetStates.js';
export class Tweet extends ORMbase {
	static props = {
		id: 'id',
		name: 'Tweet',
		prop: ['id', 'replayTweetIds', 'typeId', 'tagIds', 'state', 'createTime', 'user'],
	};
	static ia = null;

	constructor(id = '', replayTweetIds, typeId, tagIds = [], state, createTime = Date.now(), user = 'root') {
		super(Tweet);
		this.id = id;
		this.replayTweetIds = replayTweetIds;
		this.typeId = typeId;
		this.tagIds = tagIds;
		this.state = state;
		this.createTime = createTime;
		this.user = user;
		super.setSelf(this);
	}
	static init = async () => await ORMbase.init(Tweet);
	static getAll = async (conf) => await ORMbase.getAll(Tweet, conf);
	static loads = async (ids) => await ORMbase.loads(Tweet, ids);
	static delete = async (id) => await ORMbase.delete(Tweet, id);
	static update = async (
		id,
		replayTweetIds = nullList,
		typeId,
		tagIds = nullList,
		state = TweetStates.Visible,
		createTime = Date.now(),
		user = 'root'
	) => await ORMbase.update(Tweet, { id, replayTweetIds, typeId, tagIds, state, createTime, user }, true);

	static load = async (id) => await new Tweet(id).loadToSelf(id);
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
