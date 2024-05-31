import { ORMbase, nullList } from './base/ORMbase.js';
export class Title extends ORMbase {
	static props = {
		id: 'id',
		name: 'Title',
		prop: ['id', 'name', 'rootFrameId', 'relativeTitleIds', 'createTime', 'user'],
	};
	static ia = null;
	constructor(id = '', name, rootFrameId = '', relativeTitleIds = [], createTime = Date.now(), user = 'root') {
		super(Title);
		this.id = id;
		this.name = name;
		this.rootFrameId = rootFrameId;
		this.relativeTitleIds = relativeTitleIds;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static init = async () => await ORMbase.init(Title);
	static getAll = async (conf) => await ORMbase.getAll(Title, conf);
	static update = async (
		id,
		name = '',
		rootFrameId,
		relativeTitleIds = nullList,
		createTime = Date.now(),
		user = 'root'
	) => await ORMbase.update(Title, { id, name, rootFrameId, relativeTitleIds, createTime, user }, true);
	static load = async (id) => await new Title(id).loadToSelf(id);
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
