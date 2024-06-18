import { BinUtil } from '../../libs/BinaryUtil.js';
import { WORKER_TYPE } from '../../const/WorkerType.js';
import { TweetValue } from '../../orm/TweetValue.js';
import { DeleteTweetValue } from '../../const/jobs/DeleteTweetValue.js';
import { WorkerManager } from '../../worker/WorkerManager.js';

export class TweetValueManger {
	static a = {};
	static async loadByTid(tid) {
		return await TweetValue.getAll({ prefix: tid });
	}
	static async deleteTweetValue(tv, conf) {
		const a = TweetValueManger.a;
		a.id = tv.id;
		a.conf = conf;
		a.type = DeleteTweetValue.name;
		console.log('deleteTweetValue tv.text :' + tv.text + ' /tv.id:' + tv.id);
		const dd = BinUtil.s2u(JSON.stringify(a));
		await WorkerManager.postMsg(WORKER_TYPE.server, dd);
	}
	static async deleteTweetValueExec(obj) {
		console.log('deleteTweetExec obj:', obj);
		await TweetValue.delete(obj.id);
	}
}
