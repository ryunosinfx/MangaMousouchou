import { Vw } from '../libs/Vw.js';
import { Util } from '../libs/Util.js';
import { TweetManager } from '../services/logic/TweetManager.js';
import { TweetValueManger } from '../services/logic/TweetValueManger.js';
import { LifeCycle } from '../services/manager/LifeCycle.js';
export class TweetHistoryView {
	constructor(historyLine) {
		this.historyLine = historyLine;
		this.nodes = [];
		this.build();
	}
	build() {
		this.frame = Vw.ce('div');
		Vw.aC(this.frame, 'TweetHistoryView');
		this.main = Vw.div(this.frame, {});
		const footer = Vw.div(this.frame, { class: 'TweetHistoryViewFooter' });
		this.time = Vw.span(footer, { class: 'time' });
		this.msg = Vw.span(footer, { text: '' });
		const copyBtn = Vw.btn(footer, { text: 'copy' });
		const deleteBtn = Vw.btn(footer, { text: 'delete' });
		Vw.ael(copyBtn, 'click', () => this.copy());
		Vw.ael(deleteBtn, 'click', () => this.delete());
	}
	set(parentElm, tv, count) {
		this.tv = tv;
		const nodes = this.nodes;
		nodes.splice(0, nodes.length);
		this.al = count;
		Vw.a(parentElm, this.frame);
		Vw.sT(this.time, Util.convertTimeToFromat(tv.createTime));
		const main = this.main;
		const rows = tv.text.split(/\r\n|\n/g);
		const matches = main.querySelectorAll('div.TweetRow');
		const ml = matches.length;
		for (let i = 0; i < ml; i++) nodes.push(matches[i]);
		const rl = rows.length;
		if (ml < rl) {
			const l = rl - ml;
			for (let i = 0; i < l; i++) nodes.push(Vw.div(main, { class: 'TweetRow' }));
		}
		for (let i = 0; i < rl; i++) Vw.sT(nodes[i], rows[i]);
		for (let i = rl; i < ml; i++) Vw.rm(nodes[i]);
		nodes.splice(0, nodes.length);
	}
	clear() {
		Vw.rm(this.frame);
	}
	copy() {
		const msg = this.msg;
		Util.copyToClipBoard(this.tv.text, async () => {
			Vw.sT(msg, 'copied…');
			await Util.sleep(1000);
			Vw.sT(msg, ' ');
		});
	}
	async delete() {
		if (!this.tv) return;
		const ptv = this.historyLine.getParentTweetView();
		if (!ptv) return;
		const tw = ptv.getCurrentTweet();
		if (!tw) return;
		if (this.al === 1) {
			if (!confirm('削除しますか？')) return;
			await TweetManager.deleteTweet(tw);
			await LifeCycle.refresh();
		} else {
			await TweetValueManger.deleteTweetValue(this.tv);
			await ptv.resetByTid(tw.id);
		}
	}
}
