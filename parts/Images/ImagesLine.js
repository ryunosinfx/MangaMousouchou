import { Vw } from '../../libs/Vw.js';
import { FrameTypes } from '../../const/FrameTypes.js';
export class ImagesLine {
	static init(parentElm) {
		ImagesLine.frame = Vw.div(parentElm, { class: 'ImagesLine' });
		Vw.aC(ImagesLine.frame, FrameTypes.NONE);
	}
	static load() {}
}
