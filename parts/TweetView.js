import { Vw } from '../libs/Vw.js';
import { Util } from '../libs/Util.js';
import { TweetMenu } from './TweetMenu.js';
import { TweetHistryLine } from './TweetHistryLine.js';
import { TweetManager } from '../services/logic/TweetManager.js';
import { TweetImage } from './TweetImage.js';
export class TweetView {
	constructor(parentElm) {
		this.parentElm = parentElm;
		this.elm = null;
		this.tw = null;
		this.menu = null;
		this.nodes = [];
		this.imageSlots = [];
		this.imgCount = 0;
	}
	async resetByTid(tid) {
		const tw = await TweetManager.loadTweet(tid);
		this.setData(tw);
	}
	setData(tw) {
		if (!this.elm) this.build();
		const nodes = this.nodes;
		nodes.splice(0, nodes.length);
		const v = tw.value;
		const { frame, header, creatTime, updateTime, type, state, menu, main, tweetHistryLine } = this.elm;
		if (state && typeof state === 'string') Vw.aC(frame, state);
		if (state && typeof state === 'string') Vw.aC(header, state);
		Vw.sT(creatTime, Util.convertTimeToFromat(tw.createTime));
		Vw.sT(updateTime, Util.convertTimeToFromat(v.createTime));
		const rows = v.text.split(/\r\n|\n/g);
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
		Vw.sT(state, tw.state);
		Vw.sT(type, tw.type);
		Vw.sT(menu, '三');
		this.tw = tw;
		TweetImage.load(this, tw.imageDatas);
		this.menu = menu;
		tweetHistryLine.setUp(tw.id, this);
		console.log('TweetView tw.id:' + tw.id);
		if (!tweetHistryLine.isHidden) tweetHistryLine.show();
		nodes.splice(0, nodes.length);
	}
	getCurrentTweet() {
		return this.tw;
	}
	clear() {
		Vw.cT(this.elm.creatTime);
		Vw.cT(this.elm.updateTime);
		Vw.cT(this.elm.type);
		Vw.cT(this.elm.state);
		Vw.rc(this.elm.main);
		Vw.rc(this.elm.menu);
		TweetImage.init(this);
	}
	build() {
		console.log('TweetView build', this.elm);
		const frame = Vw.div(this.parentElm, { class: 'TweetFrame' });
		const header = Vw.div(frame, { class: 'TweetHeader' });
		const creatTime = Vw.div(header, { class: 'TweetTime' });
		const updateTime = Vw.div(header, { class: 'TweetTime' });
		const type = Vw.div(header, { class: 'TweetType' });
		const state = Vw.div(header, { class: 'TweetState' });
		const menu = Vw.div(header, { class: 'TweetMenuBtn' });
		const main = Vw.div(frame, { class: 'TweetMain' });
		this.imageArea = Vw.div(frame, { class: 'inputImageArea' });
		const tweetHistryLine = new TweetHistryLine(frame);
		Vw.ael(
			menu,
			'click',
			(e) => TweetMenu.show(this.menu, this.tw, frame, tweetHistryLine) && e.stopImmediatePropagation()
		);
		TweetImage.init(this);
		this.elm = { frame, header, creatTime, updateTime, type, state, menu, main, tweetHistryLine };
	}
	edit;
}
