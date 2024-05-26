import { ORMbase } from './ORMbase.js';
export class Title extends ORMbase {
	static props = { id: 'id', prop: ['id', 'name', 'rootFrameId', 'relativeTitleIds', 'createTime', 'user'] };
	constructor(id = '', name, rootFrameId = '', relativeTitleIds = [], createTime = Date.now(), user = 'root') {
		super('Title', Title.props);
		this.id = id;
		this.name = name;
		this.rootFrameId = rootFrameId;
		this.relativeTitleIds = relativeTitleIds;
		this.createTime = createTime;
		this.user = user;
		this.setSelf(this);
	}
	static async load(id) {
		return await new Title(id).loadToSelf(id);
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
