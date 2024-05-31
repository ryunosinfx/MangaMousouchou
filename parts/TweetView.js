import { Vw } from '../libs/Vw.js';
import { Util } from '../libs/Util.js';
export class TweetView {
	constructor(parentElm) {
		this.parentElm = parentElm;
		this.elm = null;
	}
	set(t) {
		if (!this.elm) this.build();
		const v = t.value;
		Vw.sT(this.elm.creatTime, Util.convertTimeToFromat(t.createTime));
		Vw.sT(this.elm.updateTime, Util.convertTimeToFromat(v.createTime));
		Vw.sT(this.elm.main, v.text);
		Vw.sT(this.elm.state, t.state);
		Vw.sT(this.elm.type, t.type);
	}
	clear() {
		Vw.cT(this.elm.creatTime);
		Vw.cT(this.elm.updateTime);
		Vw.cT(this.elm.type);
		Vw.cT(this.elm.state);
		Vw.cT(this.elm.main);
	}
	build() {
		console.log('TweetView build', this.elm);
		const frame = Vw.div(this.parentElm, { class: 'TweetFrame' });
		const header = Vw.div(frame, { class: 'TweetHeader' });
		const creatTime = Vw.div(header, { class: 'TweetTime' });
		const updateTime = Vw.div(header, { class: 'TweetTime' });
		const type = Vw.div(header, { class: 'TweetType' });
		const state = Vw.div(header, { class: 'TweetState' });
		const menu = Vw.div(header, { class: 'TweetMenu' });
		const main = Vw.div(frame, { class: 'TweetMain' });

		this.elm = { frame, header, creatTime, updateTime, type, state, menu, main };
	}
}
