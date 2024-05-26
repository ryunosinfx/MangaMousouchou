import { ORMbase } from './ORMbase.js';
export class TweetTag extends ORMbase {
	static props = { id: 'id', prop: ['id', 'name', 'order', 'categories', 'createTime', 'user'] };
	constructor(id = '', name, order = 0, categories = [], createTime = Date.now(), user = 'root') {
		super('TweetTag', TweetTag.props);
		this.id = id;
		this.name = name;
		this.order = order;
		this.categories = categories;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static async load(id) {
		return await new TweetTag(id).loadToSelf(id);
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
