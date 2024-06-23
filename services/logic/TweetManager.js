import { WORKER_TYPE } from '../../const/WorkerType.js';
import { AddTweet } from '../../const/jobs/AddTweet.js';
import { EditTweet } from '../../const/jobs/EditTweet.js';
import { DeleteTweet } from '../../const/jobs/DeleteTweet.js';
import { Util } from '../../libs/Util.js';
import { BinUtil } from '../../libs/BinaryUtil.js';
import { WorkerManager } from '../../worker/WorkerManager.js';
import { Tweet } from '../../orm/Tweet.js';
import { TweetValue } from '../../orm/TweetValue.js';
import { TweetImageManager } from './TweetImageManager.js';
import { ID_DELIMITER } from '../../const/Delimiters.js';

export class TweetManager {
	static defaultConf = {};
	static a = {};
	static bids = [];
	static map = new Map();
	static async postTweet(msg, id = Util.mkUUIDb64U(), imageDatas = [], conf = TweetManager.defaultConf) {
		const a = TweetManager.a;
		a.text = msg;
		a.id = id;
		a.conf = conf;
		a.type = AddTweet.name;
		a.imageDatas = imageDatas;
		console.log('postTweet msg:' + msg + ' /id:' + id);
		const dd = BinUtil.s2u(JSON.stringify(a));
		await WorkerManager.postMsg(WORKER_TYPE.server, dd);
	}
	static async editTweet(tw, imageDatas = [], conf) {
		tw.imageDatas = imageDatas;
		const a = TweetManager.a;
		for (const k in tw) a[k] = tw[k];
		a.conf = conf;
		a.type = EditTweet.name;
		console.log('editTweet tw.text :' + tw.text + ' /tw.id:' + tw.id);
		const dd = BinUtil.s2u(JSON.stringify(a));
		await WorkerManager.postMsg(WORKER_TYPE.server, dd);
	}
	static async postTweetExec(tw) {
		console.log('postTweetExec obj:', tw);
		await Tweet.update(tw.id, tw.replayTweetIds, tw.typeId, tw.tagIds, tw.state, tw.createTime);
		const ids = await TweetImageManager.save(tw.id, tw.imageDatas);
		const vid = tw.id + ID_DELIMITER + Util.getNowAsU();
		await TweetValue.update(vid, tw.id, tw.text, ids);
	}
	static async deleteTweet(tw, conf) {
		const a = TweetManager.a;
		a.id = tw.id;
		a.conf = conf;
		a.type = DeleteTweet.name;
		console.log('deleteTweet tw.text :' + tw.text + ' /tw.id:' + tw.id);
		const dd = BinUtil.s2u(JSON.stringify(a));
		await WorkerManager.postMsg(WORKER_TYPE.server, dd);
	}
	static async deleteTweetExec(obj) {
		console.log('deleteTweetExec obj:', obj);
		await Tweet.delete(obj.id);
		const tvs = await TweetValue.getAll({ prefix: obj.id });
		const promises = [];
		for (const tv of tvs) promises.push(TweetValue.delete(tv.id));
		promises.push(TweetImageManager.deleteByTvs(tvs));
		await Promise.all(promises);
		promises.splice(0, promises.length);
	}
	static async loadTweets(cond = {}) {
		const t = await Tweet.getAll(cond);
		const v = await TweetValue.getAll();
		const map = TweetManager.map;
		map.clear();
		for (const tv of v) {
			const vid = tv.id;
			const tid = tv.parentTweetId;
			const current = Util.cU2N(vid.split(ID_DELIMITER)[1]);
			const asNew = map.has(tid) && map.get(tid).id ? Util.cU2N(map.get(tid).id.split(ID_DELIMITER)[1]) : null;
			!asNew || current > asNew ? map.set(tid, tv) : null;
		}
		v.splice(0, v.length);
		const r = [];
		for (const tw of t) {
			const v = map.get(tw.id);
			if (!v) continue;
			r.push(tw);
			tw.value = v;
			tw.imageDatas = await TweetImageManager.loads(v.binaryDataIds);
		}
		t.splice(0, t.length);
		return r;
	}
	static async loadTweet(tid) {
		const tw = await Tweet.load(tid);
		const v = await TweetValue.getAll({ prefix: tid });
		const map = TweetManager.map;
		map.clear();
		for (const tv of v) {
			const vid = tv.id;
			const tid = tv.parentTweetId;
			const current = Util.cU2N(vid.split(ID_DELIMITER)[1]);
			const asNew = map.has(tid) && map.get(tid).id ? Util.cU2N(map.get(tid).id.split(ID_DELIMITER)[1]) : null;
			!asNew || current > asNew ? map.set(tid, tv) : null;
		}
		v.splice(0, v.length);
		const tv = map.get(tid);
		tw.value = tv;
		if (Array.isArray(tv.binaryDataIds)) tw.imageDatas = await TweetImageManager.loads(tv.binaryDataIds);
		console.log('loadTweet tw:', tw);
		return tw;
	}
}
