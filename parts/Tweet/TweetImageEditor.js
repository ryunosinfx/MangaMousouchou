import { Vw } from '../../libs/Vw.js';
import { FileUtil } from '../../libs/FileUtil.js';
import { Util } from '../../libs/Util.js';
import { TweetImage, imageCount } from './TweetImage.js';
import { FrameTypes } from '../../const/FrameTypes.js';
import { TweetImageManager } from '../../services/logic/TweetImageManager.js';

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
	async setData(id, dataUrl, fileName, byteLength, mimeType) {
		await super.setData(id, dataUrl, fileName, byteLength, mimeType);
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
	static init = (c, max = imageCount) => TweetImage.init(c, TweetImageEditor, max);
	static onLoadImage = async (e, c, max = imageCount) => {
		const files = e.target.files;
		console.log('onLoadImage c.count:' + c.imgCount, files);
		for (const file of files) {
			const fileName = file.name;
			const mimeType = file.type;
			const byteLength = file.size;
			const dataUrl = await FileUtil.readAsDataURL(file);
			const v = c.imageSlots[c.imgCount];
			if (c.imgCount >= max || !v) break;
			console.log('onLoadImage c.count:' + c.imgCount, c.imageSlots[0] === v);
			await v.setData(await FileUtil.mkHash(dataUrl), dataUrl, fileName, byteLength, mimeType);
			c.imgCount++;
			if (c.imgCount >= max) {
				Vw.disable(c.fileForm);
				break;
			}
		}
	};
	static onLoadImageFromDataUrl = async (durl, c) =>
		await TweetImageEditor.onLoadImageFromId(await FileUtil.mkHash(durl), c);
	static onLoadImageFromId = async (id, c) =>
		await TweetImageEditor.onLoadImageFromImageData(await TweetImageManager.load(id), c);
	static onLoadImageFromImageData = async (imageData, c, max = imageCount) => {
		const iss = c.imageSlots;
		const v = iss[c.imgCount];
		console.log('onLoadImageFromDataUrl c.count:' + c.imgCount, imageData, v);
		if (c.imgCount >= max || !v || !imageData) return false;
		for (const is of iss) {
			const imgdata = is.getImageData();
			if (imageData.id === imgdata.id) return true;
		}
		console.log('onLoadImageFromDataUrl c.count:' + c.imgCount, iss[0] === v);
		await v.setData(imageData.id, imageData.dataUrl, imageData.fileName, imageData.byteLength, imageData.mimeType);
		c.imgCount++;
		if (c.imgCount >= max) Vw.disable(c.fileForm);
		return true;
	};
	static onRemove(vI, c) {
		const iss = c.imageSlots;
		let count = 0;
		for (let i = 0; i < iss.length; i++) count += Vw.hC(iss[i].frame, FrameTypes.NONE) ? 0 : 1;
		for (let i = 0; i < iss.length; i++)
			if (iss[i] === vI) {
				c.imgCount = count > 0 ? count : 0;
				iss.splice(i, 1);
				iss.push(vI);
				const vIf = vI.frame;
				const p = Vw.gp(vIf);
				Vw.rm(vIf);
				Vw.a(p, vIf);
				vI.delete();
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
