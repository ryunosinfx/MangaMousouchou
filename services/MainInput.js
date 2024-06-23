import { Vw } from '../libs/Vw.js';
import { TweetManager } from './logic/TweetManager.js';
import { LifeCycle } from './manager/LifeCycle.js';
import { TweetEditor } from '../parts/logic/TweetEditor.js';
import { TweetImageEditor } from '../parts/Tweet/TweetImageEditor.js';
export class MainInput {
	static imageSlots = [];
	static imageMap = new Map();
	static imgCount = 0;
	static init(parent, callbacks) {
		MainInput.editor = Vw.div(parent, { class: 'Editor', id: 'Editor' });
		MainInput.maineditor = Vw.ta(MainInput.editor, { class: 'maineditor', id: 'maineditor' });
		MainInput.imageArea = Vw.div(MainInput.editor, { class: 'inputImageArea' });
		MainInput.footer = Vw.div(MainInput.editor, { class: 'EditorFoot' });
		MainInput.countArea = Vw.span(MainInput.footer, { class: 'textCounter' });
		const ok = Vw.btn(MainInput.footer, { class: 'maineditorBtn', text: 'OK' });
		const clear = Vw.btn(MainInput.footer, { class: 'maineditorBtn', text: 'cancel' });
		const fileForm = Vw.ipt(MainInput.footer, { type: 'file', class: 'fileUP' });
		MainInput.fileForm = fileForm;
		Vw.ael(ok, 'click', MainInput.postNew(MainInput.maineditor));
		Vw.ael(clear, 'click', MainInput.clear(MainInput.maineditor));
		Vw.ael(MainInput.maineditor, 'input', () =>
			TweetEditor.refresh(MainInput.editor, MainInput.maineditor, MainInput.countArea, MainInput)
		);
		Vw.ael(MainInput.maineditor, 'focus', () => TweetEditor.onForcus());
		Vw.ael(fileForm, 'change', (e) => TweetImageEditor.onLoadImage(e, MainInput));
		for (const cb in callbacks) {
			console.log(cb);
		}
		TweetImageEditor.init(MainInput);
		TweetEditor.refresh(MainInput.editor, MainInput.maineditor, MainInput.countArea, MainInput);
	}
	static postNew(ta) {
		return async () => {
			const text = ta.value;
			if (!text) return;
			ta.value = '';
			await TweetManager.postTweet(text, undefined, TweetImageEditor.getImageDatas(MainInput));
			TweetImageEditor.init(MainInput);
			await LifeCycle.refresh();
			TweetEditor.refresh(MainInput.editor, MainInput.maineditor, MainInput.countArea, MainInput);
		};
	}
	static clear(ta) {
		return async () => {
			ta.value = '';
			TweetImageEditor.init(MainInput);
		};
	}
}
