import { ORMbase } from './ORMbase.js';
export class TweetType extends ORMbase {
	static props = { id: 'id', prop: ['id', 'name', 'createTime', 'user'] };
	constructor(id = '', name, createTime = Date.now(), user = 'root') {
		super('TweetType', TweetType.props);
		this.id = id;
		this.name = name;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static async load(id) {
		return await new TweetType(id).loadToSelf(id);
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
