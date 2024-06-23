import { Vw } from '../../libs/Vw.js';
import { FrameTypes } from '../../const/FrameTypes.js';
import { TweetImageManager } from '../../services/logic/TweetImageManager.js';
import { TweetMenu } from '../Tweet/TweetMenu.js';
import { FileUtil } from '../../libs/FileUtil.js';
import { Util } from '../../libs/Util.js';
import { IMG } from '../../const/FileTypes.js';
import { ID_DELIMITER } from '../../const/Delimiters.js';
export class ImageViewer {
	static init(parentElm) {
		ImageViewer.frame = Vw.div(parentElm, { class: 'ImageViewer' });
		Vw.aC(ImageViewer.frame, FrameTypes.NONE);
		ImageViewer.header = Vw.div(ImageViewer.frame, { class: 'ImageViewerHeader' });
		ImageViewer.statArea = Vw.span(ImageViewer.header, { class: 'stat' });
		ImageViewer.closeBtn = Vw.btn(ImageViewer.statArea, { text: '☓', class: 'stat' });
		ImageViewer.fileName = Vw.span(ImageViewer.statArea, { class: 'stat' });
		ImageViewer.mimeType = Vw.span(ImageViewer.statArea, { class: 'stat' });
		ImageViewer.size = Vw.span(ImageViewer.statArea, { class: 'stat' });
		ImageViewer.byteLength = Vw.span(ImageViewer.statArea, { class: 'stat' });
		ImageViewer.dlBtn = Vw.btn(ImageViewer.statArea, { text: 'DL', class: 'stat' });
		ImageViewer.imageArea = Vw.div(ImageViewer.frame, { class: 'imageArea' });
		const img = new Image();
		Vw.a(ImageViewer.imageArea, img);
		ImageViewer.img = img;
		Vw.ael(ImageViewer.closeBtn, 'click', () => ImageViewer.close());
		Vw.ael(ImageViewer.dlBtn, 'click', () => ImageViewer.download());
		Vw.ael(img, 'click', ImageViewer.toggle());
	}
	static toggle = () => () => Vw.tC(ImageViewer.frame, 'ImageFull');
	static download() {
		const fieName = Vw.sT(ImageViewer.fileName);
		if (!confirm('DL ' + fieName + ' ?')) return;
		FileUtil.imgDl(fieName, ImageViewer.img.src);
	}
	static doOpen = async (id) => {
		const hash = ImageViewer.mkHash(id);
		location.hash = hash;
		// Util.addHistory(hash);
		setTimeout(() => ImageViewer.openHasIDHash());
	};
	static mkHash = (id) => IMG + ID_DELIMITER + id;
	static openHasIDHash = async () => {
		const hash = location.hash;
		console.log('openHasIDHash hash:' + hash);
		if (!hash) return ImageViewer.close();
		const hs = hash.split(ID_DELIMITER);
		if (hs.length !== 2 || hs[0].indexOf(IMG) < 0) return;
		await ImageViewer.open(hs[1]);
	};
	static open = async (id) => {
		const d = await TweetImageManager.load(id);
		if (!d) return;
		TweetMenu.hide();
		await ImageViewer.setData(id, d.dataUrl, d.fileName, d.byteLength, d.mimeType);
	};
	static setData = async (id, dataUrl, fileName, byteLength, mimeType) => {
		if (!dataUrl) return;
		const img = ImageViewer.img;
		await FileUtil.imageLoad(img, dataUrl);
		const w = img.width;
		const h = img.height;
		ImageViewer.img = img;
		ImageViewer.id = id;
		Vw.sT(ImageViewer.size, w + 'x' + h);
		Vw.sT(ImageViewer.fileName, fileName);
		Vw.sT(ImageViewer.mimeType, mimeType);
		Vw.sT(ImageViewer.byteLength, byteLength + '');
		console.log('TweetImage setData B ImageViewer.frame:', ImageViewer.frame);
		Vw.rC(ImageViewer.frame, FrameTypes.NONE);
	};
	static close() {
		Util.addHistory('');
		Vw.aC(ImageViewer.frame, FrameTypes.NONE);
	}
}
