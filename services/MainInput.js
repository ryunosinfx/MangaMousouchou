import { Vw } from '../libs/Vw.js';
import { TweetManager } from './logic/TweetManager.js';
import { LifeCycle } from './manager/LifeCycle.js';
export class MainInput {
	static init(parent, callbacks) {
		const editor = Vw.div(parent, { class: 'Editor', id: 'Editor' });
		const maineditor = Vw.ta(editor, { class: 'maineditor', id: 'maineditor' });
		const ok = Vw.btn(editor, { class: 'maineditor', id: 'maineditor', text: 'OK' });
		const clear = Vw.btn(editor, { class: 'maineditor', id: 'maineditor', text: 'cancel' });
		Vw.ael(ok, 'click', MainInput.postNew(maineditor));
		Vw.ael(clear, 'click', MainInput.clear(maineditor));
		for (const event in callbacks) {
		}
	}
	static postNew(ta) {
		return async () => {
			const text = ta.value;
			if (!text) return;
			ta.value = '';
			await TweetManager.postTweet(text);
			await LifeCycle.refresh();
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
