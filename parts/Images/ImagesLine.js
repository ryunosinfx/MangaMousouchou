import { Vw } from '../../libs/Vw.js';
import { FrameTypes } from '../../const/FrameTypes.js';
import { TweetImageManager } from '../../services/logic/TweetImageManager.js';
import { ImagesLineBrock } from './ImageLineBlock.js';
const blockNum = 100;
export class ImagesLine {
	static blocks = [];
	static parentElm = null;
	static setParentElm = (parentElm) => (ImagesLine.parentElm = parentElm);
	static init() {
		ImagesLine.frame = Vw.div(ImagesLine.parentElm, { class: 'ImagesLine' });
		Vw.aC(ImagesLine.frame, FrameTypes.NONE);
	}
	static refresh = async () => {
		console.log('ImagesLine.refresh A :', ImagesLine.parentElm);
		await ImagesLine.load();
		console.log('ImagesLine.refresh B :', ImagesLine.parentElm);
	};
	static async load(ids = null) {
		console.log('ImagesLine.load A ids:', ids);
		const imageDatas = [];
		let imgBlock = null;
		if (ids) await TweetImageManager.loads(ids, imageDatas);
		else await TweetImageManager.loadsAll(imageDatas);
		console.log('ImagesLine.load B imageDatas:', imageDatas);
		let count = 0;
		const promises = [],
			blocks = ImagesLine.blocks,
			idsByBlock = [];
		for (const block of blocks) block.clear();
		for (const imgData of imageDatas) {
			idsByBlock.push(imgData);
			count++;
			if (count % blockNum === 0) {
				const i = count / blockNum,
					ib = blocks[i];
				imgBlock = ib ? ib : new ImagesLineBrock(ImagesLine.frame);
				blocks[i] = imgBlock;
				console.log('ImagesLine.load X promises:', idsByBlock.length, blocks);
				await imgBlock.adds(idsByBlock);
				idsByBlock.splice(0, idsByBlock.length);
			}
		}
		if (idsByBlock.length > 0) {
			const i = Math.ceil(count / blockNum),
				ib = blocks[i];
			imgBlock = ib ? ib : new ImagesLineBrock(ImagesLine.frame);
			blocks[i] = imgBlock;
			await imgBlock.adds(idsByBlock);
			console.log('ImagesLine.load Y promises:', idsByBlock.length, blocks);
			idsByBlock.splice(0, idsByBlock.length);
		}
		Vw.rC(ImagesLine.frame, FrameTypes.NONE);
		console.log('ImagesLine.load Z promises:', promises, blocks);
	}
}
