import { Vw } from '../../libs/Vw.js';
import { ID_DELIMITER } from '../../const/Delimiters.js';
import { IMG } from '../../const/FileTypes.js';
import { TweetConditions } from '../../const/TweetConditions.js';
import { TweetMenu } from '../TweetMenu.js';
import { TweetImageEditor } from '../TweetImageEditor.js';
const delimiter = '#' + IMG + ID_DELIMITER;
const regexImgUrlSuffix = delimiter + '([-_0-9A-Za-z]+)';
export class TweetEditor {
	static refresh(editor, maineditor, countArea, c) {
		setTimeout(async () => {
			const v = maineditor.value;
			await TweetEditor.onInputFilter(c, v);
			const rowCount = v.split('\n');
			const lh = Vw.gCSv(maineditor, 'line-height');
			const lhm = lh === 'normal' ? 1.5 : lh;
			const height = (rowCount.length + 2) * lhm;
			Vw.sS(maineditor, { height: height + 'em' });
			// console.log('refresh height:' + height + '/scrollHeight:' + maineditor.scrollHeight, v, v === '');e
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
	static onInputFilter = async (c, text) => {
		let nt = text;
		const href = location.href;
		const head = href.split('#')[0];
		const h2 = head.split('/').join('\\/');
		const r = h2 + regexImgUrlSuffix;
		const regex = new RegExp(r, 'g');
		for (const match of text.matchAll(regex)) {
			const url = match[0];
			const ids = url.split(delimiter);
			if (ids.length < 2) continue;
			const id = ids[1];
			console.log('onInputFilter 2 id:' + id);
			if (await TweetImageEditor.onLoadImageFromId(id, c)) nt = nt.split(url).join('');
		}
		return nt;
	};
}
