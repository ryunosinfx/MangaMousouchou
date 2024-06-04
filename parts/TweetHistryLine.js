import { Vw } from '../libs/Vw.js';
import { Util } from '../libs/Util.js';
import { ID_DELIMITER } from '../const/Delimiters.js';
import { TweetValueManger } from '../services/logic/TweetValueManger.js';
import { TweetHistoryView } from './TweetHistoryView.js';
import { FrameTypes } from '../const/FrameTypes.js';
export class TweetHistryLine {
	constructor(parentElm) {
		this.parentElm = parentElm;
		this.map = new Map();
		this.a = [];
		this.l = [];
		this.used = [];
		this.frame = Vw.div(parentElm, { class: 'TweetHistory' });
		const hideArea = Vw.div(this.frame, { class: 'TweetHistoryHide', text: '▲History ' });
		Vw.aC(this.frame, FrameTypes.NONE);
		Vw.ael(hideArea, 'click', () => this.hide());
		this.isHidden = true;
	}
	setUp(tid, parentTweetView) {
		this.tid = tid;
		this.parentTweetView = parentTweetView;
	}
	getParentTweetView() {
		return this.parentTweetView;
	}
	async show() {
		Vw.rC(this.frame, FrameTypes.NONE);
		await this.load();
	}
	async load() {
		const history = await TweetValueManger.loadByTid(this.tid);
		const a = this.a;
		a.splice(0, a.length);
		const map = this.map;
		map.clear();
		for (const v of history) {
			const vid = v.id;
			const c = Util.cU2N(vid.split(ID_DELIMITER)[1]);
			map.set(c, v);
			a.push(c);
		}
		a.sort().reverse();
		const al = a.length;
		const l = this.l;
		const ll = l.length;
		const used = this.used;
		if (al > ll) for (let i = ll; i < al; i++) l.push(used.length > 0 ? used.pop() : new TweetHistoryView(this));
		for (let i = 0; i < al; i++) {
			const c = a[i];
			const tv = map.get(c);
			l[i].set(this.frame, tv, al);
		}
		if (ll > al)
			for (let i = al; i < ll; i++) {
				const orver = l.pop();
				orver.clear();
				used.push(orver);
			}
		this.isHidden = false;
	}
	hide() {
		Vw.aC(this.frame, FrameTypes.NONE);
		this.isHidden = true;
	}
}
