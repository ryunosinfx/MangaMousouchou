import { BinUtil } from '../libs/BinaryUtil.js';
import { LifeCycle } from '../services/manager/LifeCycle.js';
import { JobType } from '../const/JobType.js';
console.log('################BaseWorker boot!:');
class BaseWorker {
	static async do(bufTransferredFromMain) {
		await LifeCycle.init();
		const u8a = new Uint8Array(bufTransferredFromMain);
		const keyU8a = BinUtil.subDpU(u8a, 0, 32);
		const json = BinUtil.u2sSub(u8a, 32);
		try {
			const obj = JSON.parse(json);
			const ret = await BaseWorker.doParType(obj);
			const result = BinUtil.jus([keyU8a, BinUtil.s2u(JSON.stringify(ret))]);
			return result;
		} catch (e) {
			console.log(e);
		}
		return keyU8a;
	}
	static async doParType(obj) {
		if (obj && obj.type) {
			const type = JobType[obj.type];
			return type && type.do ? await type.do(obj) : {};
		}
		return {};
	}
}
onmessage = async (msg) => {
	const bufTransferredFromMain = msg.data;
	const u8a = await BaseWorker.do(bufTransferredFromMain);
	self.postMessage(u8a, [u8a.buffer]);
};
