import { Vw } from '../libs/Vw.js';
import { FileUtil } from '../libs/FileUtil.js';
import { FrameTypes } from '../const/FrameTypes.js';
import { BinUtil } from '../libs/BinaryUtil.js';

const size = 300;
const inageCount = 4;
export class TweetImage {
	constructor(parentElm) {
		this.parentElm = parentElm;
		this.frame = Vw.div(parentElm, { class: 'TwwetImageEdit' });
		Vw.aC(this.frame, FrameTypes.NONE);
		this.header = Vw.div(this.frame, { class: 'TwwetImageEditHeader' });
		this.statArea = Vw.span(this.header, { class: 'stat' });
		this.fileName = Vw.span(this.statArea, { class: 'stat' });
		this.mimeType = Vw.span(this.statArea, { class: 'stat' });
		this.size = Vw.span(this.statArea, { class: 'stat' });
		this.byteLength = Vw.span(this.statArea, { class: 'stat' });
		this.imgFrame = Vw.div(this.frame, { class: 'TwwetImage' });
	}
	async setData(dataUrl, fileName, byteLength, mimeType) {
		if (!dataUrl) return;
		Vw.rc(this.imgFrame);
		const img = new Image();
		await FileUtil.imageLoad(img, dataUrl);
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
		console.log('TweetImage setData B this.frame:', this.frame);
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
	static load = async (c, imageDatas) => {
		const iss = c.imageSlots;
		if (!Array.isArray(imageDatas)) {
			for (let i = 0; i < iss.length; i++) iss[i].clear();
			return;
		}
		for (let i = 0; i < iss.length; i++) {
			const d = imageDatas[i];
			if (!d) {
				iss[i].clear();
				continue;
			}
			await iss[i].setData(d.dataUrl, d.fileName, d.byteLength, d.mimeType);
		}
	};
	static init(c, ic = TweetImage) {
		const iss = c.imageSlots;
		c.imgCount = 0;
		for (let i = 0; i < iss.length; i++) iss[i].clear();
		for (let i = iss.length; i < inageCount; i++) iss.push(new ic(c.imageArea, c));
	}
}
