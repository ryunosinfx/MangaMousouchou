import { Vw } from '../libs/Vw.js';
import { TweetManager } from './logic/TweetManager.js';
import { LifeCycle } from './manager/LifeCycle.js';
import { TweetEditor } from '../parts/logic/TweetEditor.js';
export class MainInput {
	static init(parent, callbacks) {
		this.editor = Vw.div(parent, { class: 'Editor', id: 'Editor' });
		this.maineditor = Vw.ta(this.editor, { class: 'maineditor', id: 'maineditor' });
		this.footer = Vw.div(this.editor, { class: 'EditorFoot' });
		this.countArea = Vw.span(this.footer, { class: 'textCounter' });
		const ok = Vw.btn(this.footer, { class: 'maineditor', id: 'maineditor', text: 'OK' });
		const clear = Vw.btn(this.footer, { class: 'maineditor', id: 'maineditor', text: 'cancel' });
		Vw.ael(ok, 'click', MainInput.postNew(this.maineditor));
		Vw.ael(clear, 'click', MainInput.clear(this.maineditor));
		Vw.ael(this.maineditor, 'input', () => TweetEditor.refresh(this.editor, this.maineditor, this.countArea));
		Vw.ael(this.maineditor, 'focus', () => TweetEditor.onForcus());
		for (const event in callbacks) {
		}
		TweetEditor.refresh(this.editor, this.maineditor, this.countArea);
	}
	static postNew(ta) {
		return async () => {
			const text = ta.value;
			if (!text) return;
			ta.value = '';
			await TweetManager.postTweet(text);
			await LifeCycle.refresh();
			TweetEditor.refresh(this.editor, this.maineditor, this.countArea);
		};
	}
	static clear(ta) {
		return async () => {
			ta.value = '';
		};
	}
	static postEdit(ta, id) {
		return async () => {
			const text = ta.value;
			ta.value = '';
			await TweetManager.postTweet(text, id);
		};
	}
}
