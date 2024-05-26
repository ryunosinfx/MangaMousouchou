import { ORMbase } from './ORMbase.js';
export class Frame extends ORMbase {
	static props = {
		id: 'id',
		prop: ['id', 'listIdList', 'name', 'volume', 'parent', 'require', 'type', 'order', 'createTime', 'user'],
	};
	constructor(
		id = '',
		listIdList = [],
		name,
		volume,
		parent,
		require = '',
		type = '',
		order = 0,
		createTime = Date.now(),
		user = 'root'
	) {
		super('Frame', Frame.props);
		this.id = id;
		this.listIdList = listIdList;
		this.name = name;
		this.volume = volume;
		this.parent = parent;
		this.require = require;
		this.type = type;
		this.order = order;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static async load(id) {
		return await new Frame(id).loadToSelf(id);
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
