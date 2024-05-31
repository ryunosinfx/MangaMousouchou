import { ORMbase, nullList } from './base/ORMbase.js';
import { FrameTypes } from '../const/FrameTypes.js';
export class Frame extends ORMbase {
	static props = {
		id: 'id',
		name: 'Frame',
		prop: ['id', 'listIdList', 'name', 'volume', 'parent', 'require', 'type', 'order', 'createTime', 'user'],
	};
	static ia = null;
	constructor(
		id = '',
		listIdList = [],
		name,
		volume,
		parent,
		require = '',
		type = FrameTypes.NONE,
		order = 0,
		createTime = Date.now(),
		user = 'root'
	) {
		super(Frame);
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
	static init = async () => await ORMbase.init(Frame);
	static getAll = async (conf) => await ORMbase.getAll(Frame, conf);
	static update = async (
		id,
		listIdList = nullList,
		name = '',
		volume = 0,
		parent,
		require = '',
		type = FrameTypes.NONE,
		order = 0,
		createTime = Date.now(),
		user = 'root'
	) =>
		await ORMbase.update(
			Frame,
			{ id, listIdList, name, volume, parent, require, type, order, createTime, user },
			true
		);
	static load = async (id) => await new Frame(id).loadToSelf(id);
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
