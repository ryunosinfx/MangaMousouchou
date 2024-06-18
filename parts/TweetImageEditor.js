import { Vw } from '../libs/Vw.js';
import { FileUtil } from '../libs/FileUtil.js';
import { Util } from '../libs/Util.js';
import { TweetImage } from './TweetImage.js';

export class TweetImageEditor extends TweetImage {
	constructor(parentElm, c, imgClearCallBack = () => {}) {
		super(parentElm);
		this.parentElm = parentElm;
		this.deleteBtn = Vw.btn(this.header, { class: 'btn', text: '☓' });
		this.imageData = {};
		Vw.ael(this.deleteBtn, 'click', () => {
			this.delete();
			imgClearCallBack(this);
			TweetImageEditor.onRemove(this, c);
		});
	}
	async setData(dataUrl, fileName, byteLength, mimeType, id = '') {
		await super.setData(dataUrl, fileName, byteLength, mimeType);
		this.imageData.fileName = fileName;
		this.imageData.mimeType = mimeType;
		this.imageData.dataUrl = dataUrl;
		this.imageData.id = id;
	}
	getImageData() {
		return this.imageData;
	}
	delete() {
		super.delete();
		this.clear();
	}
	clear() {
		super.clear();
		Util.clearObj(this.imageData);
	}
	static init = (c) => TweetImage.init(c, TweetImageEditor);
	static onLoadImage = async (e, c) => {
		const files = e.target.files;
		for (const file of files) {
			const fileName = file.name;
			const mimeType = file.type;
			const byteLength = file.size;
			const dataUrl = await FileUtil.readAsDataURL(file);
			const v = c.imageSlots[c.imgCount];
			if (c.imgCount >= 4 || !v) break;
			console.log('onLoadImage c.count:' + c.count, c.imageSlots[0] === v);
			await v.setData(dataUrl, fileName, byteLength, mimeType);
			c.imgCount++;
			if (c.imgCount >= 4) {
				Vw.disable(c.fileForm);
				break;
			}
		}
	};
	static onRemove(vI, c) {
		const iss = c.imageSlots;
		for (let i = 0; i < iss.length; i++)
			if (iss[i] === vI) {
				c.imgCount--;
				iss.splice(i, 1);
				iss.push(vI);
				Vw.enable(c.fileForm);
				break;
			}
	}
	static getImageDatas(c) {
		const a = [];
		const iss = c.imageSlots;
		for (let i = 0; i < iss.length; i++) a.push(iss[i].getImageData());
		return a;
	}
}
