import { Vw } from '../../libs/Vw.js';
import { ImageEditor } from './ImageEditor.js';

export class ImagesLineBrock {
	constructor(parentElm, callbacks) {
		if (Vw.isNotBrowser) return;
		this.parentElm = parentElm;
		this.imageSlots = [];
		this.imageMap = new Map();
		this.imgCount = 0;
		this.imageLineBlock = Vw.div(this.parentElm, { class: 'ImageLineBlock' });
		this.imageArea = Vw.div(this.imageLineBlock, { class: 'inputImageBlockArea' });
		for (const cbOBJ in callbacks) {
			const e = cbOBJ.event;
			const cb = cbOBJ.func;
			console.log(e, cb);
		}
		this.isHidden = true;
		ImageEditor.init(this);
	}
	clear() {
		ImageEditor.reflesh(this);
		return this;
	}
	refresh() {
		ImageEditor.reflesh(this);
		return this;
	}
	async adds(imageDatas) {
		const len = this.imageSlots.length;
		if (imageDatas.length >= len) {
			const al = imageDatas.length - len;
			for (let i = 0; i < al; i++) this.imageSlots.push(new ImageEditor(this.imageArea));
		}
		await ImageEditor.load(this, imageDatas);
	}
}
