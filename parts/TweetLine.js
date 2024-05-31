import { TweetOrderTypes } from '../const/TweetOrderTypes.js';
import { Vw } from '../libs/Vw.js';
import { TweetView } from './TweetView.js';
export class TweetLine {
	constructor(parentElm, orderType = TweetOrderTypes.createTimeDESC) {
		this.lineParent = Vw.div(parentElm, {});
		this.line = [];
		this.tweetViews = [];
		this.idOrder = [];
		this.orderType = orderType;
		this.map = new Map();
	}
	refresh(ts, order) {
		const map = this.map;
		const l = this.line;
		const io = this.idOrder;
		map.clear();
		l.splice(0, l.length);
		console.log('TweetLine refresh l:' + l + '/io:' + io, ts);

		if (Array.isArray(order) && this.orderType === TweetOrderTypes.manual) {
			for (const t of ts) map.set(t.id, t);
			for (const id of order) l.push(map.get(id));
		} else {
			io.splice(0, io.length);
			for (const t of ts) {
				const id = t.creatTime + '_' + t.id;
				map.set(id, t);
				io.push(id);
			}
			io.sort();
			if (this.orderType === TweetOrderTypes.createTimeDESC) io.reverse();
			for (const id of io) l.push(map.get(id));
		}
		this.build();
	}
	build() {
		const l = this.line;
		const len = l.length;
		const tvs = this.tweetViews;
		const tLen = tvs.length;
		console.log('TweetLine build len:' + len + '/tLen:' + tLen, this.line);
		for (let i = 0; i < len; i++) {
			if (i >= tLen) tvs.push(new TweetView(this.lineParent));
			const tv = tvs[i];
			tv.set(l[i]);
		}
		if (tLen > len) for (let i = len; i < tLen; i++) tvs[i].clear();
	}
}
