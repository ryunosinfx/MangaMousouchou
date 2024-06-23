import { Vw } from '../libs/Vw.js';
import { TweetTextEditor } from './TweetTextEditor.js';
import { TweetManager } from '../services/logic/TweetManager.js';
import { TweetImage } from './TweetImage.js';
import { LifeCycle } from '../services/manager/LifeCycle.js';
export class TweetMenu {
	static editor = new TweetTextEditor();
	static elms = null;
	static currentTweet = null;
	static editingTweet = null;
	static menuBtnParent = null;
	static tweetHistryLine = null;
	static currentTweetView = null;
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
			Vw.ael(addBefore, 'click', () => TweetMenu.hide());
			Vw.ael(addAfter, 'click', () => TweetMenu.hide());
			Vw.ael(edit, 'click', () => TweetMenu.showTextEditor());
			Vw.ael(deleteTweet, 'click', () => TweetMenu.deleteTweet());
			Vw.ael(showHistory, 'click', () => TweetMenu.showHistory());
		}
	}
	static show(currentTweetView, menuBtnParent, tweetHistryLine) {
		TweetMenu.currentTweetView = currentTweetView;
		const menuBtn = currentTweetView.menu,
			tweet = currentTweetView.tw;
		TweetMenu.tweetHistryLine = tweetHistryLine;
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
		TweetImage.init(TweetMenu.currentTweetView);
		TweetMenu.editor.open(TweetMenu.editingTweet, TweetMenu.menuBtnParent, TweetMenu.currentTweetView);
	}
	static async deleteTweet() {
		if (!TweetMenu.currentTweet || !TweetMenu.menuBtnParent) return;
		if (!confirm('削除しますか？')) return;
		await TweetManager.deleteTweet(TweetMenu.currentTweet);
		await LifeCycle.refresh();
		TweetMenu.hide();
	}
	static showHistory() {
		if (!TweetMenu.currentTweet || !TweetMenu.tweetHistryLine) return;
		TweetMenu.editingTweet = TweetMenu.currentTweet;
		TweetMenu.tweetHistryLine.show();
		TweetMenu.hide();
	}
}
