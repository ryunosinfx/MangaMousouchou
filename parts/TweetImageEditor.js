import { Vw } from '../libs/Vw.js';
import { FileUtil } from '../libs/FileUtil.js';
import { FrameTypes } from '../const/FrameTypes.js';
import { BinUtil } from '../libs/BinaryUtil.js';

const size = 300;
export class TweetImageEditor {
	constructor(parentElm, c, imgClearCallBack = () => {}) {
		this.parentElm = parentElm;
		this.frame = Vw.div(parentElm, { class: 'TwwetImageEdit' });
		Vw.aC(this.frame, FrameTypes.NONE);
		this.header = Vw.div(this.frame, { class: 'TwwetImageEditHeader' });
		this.statArea = Vw.span(this.header, { class: 'stat' });
		this.fileName = Vw.span(this.statArea, { class: 'stat' });
		this.mimeType = Vw.span(this.statArea, { class: 'stat' });
		this.size = Vw.span(this.statArea, { class: 'stat' });
		this.byteLength = Vw.span(this.statArea, { class: 'stat' });
		this.deleteBtn = Vw.btn(this.header, { class: 'btn', text: '☓' });
		this.imgFrame = Vw.div(this.frame, { class: 'TwwetImage' });
		Vw.ael(this.deleteBtn, 'click', () => {
			this.delete();
			imgClearCallBack(this);
			TweetImageEditor.onRemove(this, c);
		});
	}
	async set(dataUri, fileName, byteLength, mimeType) {
		Vw.rc(this.imgFrame);
		const img = new Image();
		await FileUtil.imageLoad(img, dataUri);
		BinUtil.d;
		const w = img.width;
		const h = img.height;
		const isToll = w < h;
		const r = isToll ? w / h : h / w;
		const nh = isToll ? size : Math.floor(r * size);
		const nw = isToll ? Math.floor(r * size) : size;
		img.width = nw;
		img.height = nh;
		this.img = img;
		Vw.sT(this.size, w + 'x' + h);
		Vw.sT(this.fileName, fileName);
		Vw.sT(this.mimeType, mimeType);
		Vw.sT(this.byteLength, byteLength + '');
		Vw.a(this.imgFrame, img);
		Vw.rC(this.frame, FrameTypes.NONE);
	}
	delete() {
		this.img.src = '';
		this.clear();
	}
	clear() {
		Vw.aC(this.frame, FrameTypes.NONE);
		Vw.rc(this.imgFrame);
	}
	static onLoadImage = async (e, c) => {
		const files = e.target.files;
		for (const file of files) {
			const fileName = file.name;
			const mimeType = file.type;
			const byteLength = file.size;
			const dataUri = await FileUtil.readAsDataURL(file);
			const v = c.imageSlots[c.imgCount];
			if (c.imgCount >= 4 || !v) break;
			console.log('onLoadImage c.count:' + c.count, c.imageSlots[0] === v);
			await v.set(dataUri, fileName, byteLength, mimeType);
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
}
