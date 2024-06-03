import { WORKER_TYPE } from '../../const/WorkerType.js';
import { AddTweet } from '../../const/jobs/AddTweet.js';
import { EditTweet } from '../../const/jobs/EditTweet.js';
import { DeleteTweet } from '../../const/jobs/DeleteTweet.js';
import { Util } from '../../libs/Util.js';
import { BinUtil } from '../../libs/BinaryUtil.js';
import { WorkerManager } from '../../worker/WorkerManager.js';
import { Tweet } from '../../orm/Tweet.js';
import { TweetValue } from '../../orm/TweetValue.js';
import { ID_DELIMITER } from '../../const/Delimiters.js';

export class TweetManager {
	static defaultConf = {};
	static a = {};
	static map = new Map();
	static async postTweet(msg, id = Util.mkUUIDb64U(), conf = TweetManager.defaultConf) {
		const a = TweetManager.a;
		a.text = msg;
		a.id = id;
		a.conf = conf;
		a.type = AddTweet.name;
		console.log('postTweet msg:' + msg + ' /id:' + id);
		const dd = BinUtil.s2u(JSON.stringify(a));
		const bb = await WorkerManager.postMsg(WORKER_TYPE.server, dd);
	}
	static async editTweet(tw, conf) {
		const a = TweetManager.a;
		for (const k in tw) a[k] = tw[k];
		a.conf = conf;
		a.type = EditTweet.name;
		console.log('editTweet tw.text :' + tw.text + ' /tw.id:' + tw.id);
		const dd = BinUtil.s2u(JSON.stringify(a));
		const bb = await WorkerManager.postMsg(WORKER_TYPE.server, dd);
	}
	static async postTweetExec(obj) {
		console.log('postTweetExec obj:', obj);
		await Tweet.update(obj.id, obj.replayTweetIds, obj.typeId, obj.tagIds, obj.state, obj.createTime);
		const vid = obj.id + ID_DELIMITER + Util.getNowAsU();
		await TweetValue.update(vid, obj.id, obj.text, obj.binaryDataIds);
	}
	static async deleteTweet(tw, conf) {
		const a = TweetManager.a;
		a.id = tw.id;
		a.conf = conf;
		a.type = DeleteTweet.name;
		console.log('deleteTweet tw.text :' + tw.text + ' /tw.id:' + tw.id);
		const dd = BinUtil.s2u(JSON.stringify(a));
		const bb = await WorkerManager.postMsg(WORKER_TYPE.server, dd);
	}
	static async deleteTweetExec(obj) {
		console.log('deleteTweetExec obj:', obj);
		await Tweet.delete(obj.id);
		const ids = await TweetValue.getAll({ isKeyOnly: true, prefix: obj.id });
		const promises = [];
		for (const id of ids) promises.push(TweetValue.delete(id));
		await Promise.all(promises);
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
		for (const tw of t) {
			const tid = tw.id;
			tw.value = map.get(tid);
		}
		console.log('loadTweets t:', t);
		return t;
	}
}
