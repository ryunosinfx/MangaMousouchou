import { Vw } from '../../libs/Vw.js';
// import { FileUtil } from '../../libs/FileUtil.js';
import { Util } from '../../libs/Util.js';
import { TweetImage } from '../Tweet/TweetImage.js';
import { FrameTypes } from '../../const/FrameTypes.js';
// import { TweetImageManager } from '../../services/logic/TweetImageManager.js';

export class ImageEditor extends TweetImage {
	constructor(parentElm, c, imgClearCallBack = () => {}) {
		super(parentElm);
		this.parentElm = parentElm;
		this.deleteBtn = Vw.btn(this.header, { class: 'btn', text: '☓' });
		this.imageData = {};
		Vw.ael(this.deleteBtn, 'click', () => {
			this.delete();
			imgClearCallBack(this);
			ImageEditor.onRemove(this, c);
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
	static load = TweetImage.load;
	static reflesh = (c, imageDatas = []) => TweetImage.init(c, ImageEditor, imageDatas.length);
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
}
