import { Vw } from '../libs/Vw.js';
import { TweetTextEditor } from './TweetTextEditor.js';
export class TweetMenu {
	static editor = new TweetTextEditor();
	static elms = null;
	static currentTweet = null;
	static editingTweet = null;
	static menuBtnParent = null;
	static init(parent) {
		const elms = TweetMenu.elms;
		if (!elms) {
			// Vw.ael(parent, 'click', () => TweetMenu.hide());
			const p = Vw.div(parent, { class: 'TweetMenuPannel' });
			Vw.aC(p, 'None');
			const showHistory = Vw.div(p, { text: 'show History', class: 'TweetMenuPannelBtn' });
			const edit = Vw.div(p, { text: 'edit', class: 'TweetMenuPannelBtn' });
			const addBefore = Vw.div(p, { text: 'add Bfore', class: 'TweetMenuPannelBtn' });
			const addAfter = Vw.div(p, { text: 'add After', class: 'TweetMenuPannelBtn' });
			const deleteTweet = Vw.div(p, { text: 'delete', class: 'TweetMenuPannelBtn' });
			TweetMenu.elms = { p, edit };
			Vw.ael(p, 'click', () => TweetMenu.hide());
			Vw.ael(edit, 'click', () => TweetMenu.showTextEditor());
		}
	}
	static show(menuBtn, tweet, menuBtnParent) {
		console.log('TweetMenu show A ', TweetMenu.editor);
		TweetMenu.editor.hide();
		if (!menuBtn || !tweet) return;
		TweetMenu.currentTweet = tweet;
		TweetMenu.menuBtnParent = menuBtnParent;
		const rect = menuBtn.getBoundingClientRect();
		console.log('TweetMenu show B ', menuBtn, rect);
		const p = TweetMenu.elms.p;
		Vw.sS(p, { top: rect.top + 'px', left: rect.left + 'px' });
		Vw.rC(p, 'None');
	}
	static hide() {
		Vw.aC(TweetMenu.elms.p, 'None');
		TweetMenu.currentTweet = null;
		TweetMenu.menuBtnParent = null;
	}
	static showTextEditor() {
		if (!TweetMenu.currentTweet || !TweetMenu.menuBtnParent) return;
		TweetMenu.editingTweet = TweetMenu.currentTweet;
		TweetMenu.editor.open(TweetMenu.editingTweet, TweetMenu.menuBtnParent);
	}
}
