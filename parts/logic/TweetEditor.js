import { Vw } from '../../libs/Vw.js';
import { TweetConditions } from '../../const/TweetConditions.js';
import { TweetMenu } from '../TweetMenu.js';
export class TweetEditor {
	static refresh(editor, maineditor, countArea) {
		setTimeout(() => {
			const v = maineditor.value;
			const rowCount = v.split('\n');
			const lh = Vw.gCSv(maineditor, 'line-height');
			const lhm = lh === 'normal' ? 1.5 : lh;
			const height = (rowCount.length + 2) * lhm;
			Vw.sS(maineditor, { height: height + 'em' });
			// console.log('refresh height:' + height + '/scrollHeight:' + maineditor.scrollHeight, v, v === '');
			const l = v.length;
			Vw.sT(countArea, l + '');
			Vw.rC(editor, 'BLUE');
			Vw.rC(editor, 'YELLOW');
			Vw.rC(editor, 'RED');
			if (l >= TweetConditions.RED) Vw.aC(editor, 'RED');
			else if (l >= TweetConditions.YELLOW) Vw.aC(editor, 'YELLOW');
			else if (l >= TweetConditions.BLUE) Vw.aC(editor, 'BLUE');
		});
	}
	static onForcus() {
		console.log('onForcus');
		TweetMenu.hide();
	}
}
