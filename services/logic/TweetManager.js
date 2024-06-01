import { WORKER_TYPE } from '../../const/WorkerType.js';
import { AddTweet } from '../../const/jobs/AddTweet.js';
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
	static async postTweet(msg, id = Util.mkUUID(), conf = TweetManager.defaultConf) {
		const a = TweetManager.a;
		a.text = msg;
		a.id = id;
		a.conf = conf;
		a.type = AddTweet.name;
		console.log('postTweet msg:' + msg + ' /id:' + id);
		const dd = BinUtil.s2u(JSON.stringify(a));
		const bb = await WorkerManager.postMsg(WORKER_TYPE.server, dd);
	}
	static async postTweetExec(obj) {
		console.log('postTweetExec obj:', obj);
		await Tweet.update(obj.id, obj.replayTweetIds, obj.typeId, obj.tagIds, obj.state);
		const vid = obj.id + ID_DELIMITER + Util.getNowAsU();
		await TweetValue.update(vid, obj.id, obj.text, obj.binaryDataIds);
	}
	static async loadTweets(cond = {}) {
		const t = await Tweet.getAll(cond);
		const v = await TweetValue.getAll();
		const map = TweetManager.map;
		map.clear();
		for (const tv of v) {
			const vid = tv.id;
			const tid = tv.parentTweetId;
			!map.has(tid) || map.get(tid).id < vid ? map.set(tid, tv) : null;
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