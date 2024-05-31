import { Util } from '../libs/Util.js';
import { Hasher, Cryptor, BinUtil } from '../libs/BinaryUtil.js';
import { LifeCycle } from '../services/manager/LifeCycle.js';
import { WORKER_TYPE } from '../const/WorkerType.js';
const TYPE_MODULE = { type: 'module' };
export class WorkerManager {
	static a = [];
	static queue = new Map();
	static workersRoundCounter = new Map();
	static workers = new Map();
	static workerSrcs = {};
	static isInitialized = false;
	static init = async () => {
		(WorkerManager.workerSrcs[WORKER_TYPE.server] = {
			src: Util.getCurrentPath() + './worker/BaseWorker.js',
			lifetime: 30000,
			count: 2,
		}),
			await LifeCycle.init();
		for (const type in WorkerManager.workerSrcs) {
			WorkerManager.workersRoundCounter.set(type, 0);
			WorkerManager.bootWorker(type);
		}
		WorkerManager.isInitialized = true;
		WorkerManager.startLoop();
	};
	static bootWorker(workerType, index = -1) {
		const ss = WorkerManager.workerSrcs[workerType];
		const w = WorkerManager.workers.has(workerType) ? WorkerManager.workers.get(workerType) : [];
		const l = w.length;
		const c = ss.count;
		console.log('bootWorker workerType:' + workerType, ss);
		if (index >= 0 && l > index) {
			const d = w[index];
			d.w = WorkerManager.loadWorker(ss.src);
			d.n = Date.now() + Util.random(1000);
		} else
			for (let i = l; i < c; i++)
				w.push({ w: WorkerManager.loadWorker(ss.src), n: Date.now() + Util.random(1000) });
		WorkerManager.workers.set(workerType, w);
	}
	static loadWorker = (src) => {
		const w = new Worker(src, TYPE_MODULE);
		console.log('loadWorker src:', src);
		w.onmessage = (e) => {
			const data = e.data;
			if (data.byteLength !== undefined) {
				const u8a = new Uint8Array(data);
				const u8aK = u8a.subarray(0, 32);
				const key = BinUtil.a2U(u8aK);
				const resolve = WorkerManager.queue.get(key);
				resolve(u8a.subarray(32));
				console.log('Message received from worker OK');
			} else console.log('Message received from worker NG');
		};
		w.onmessageerror = (e) => console.log('worker onmessageerror', e);
		w.onerror = (e) => console.log('worker onerror', e.stack?.split('\n'), e);
		return w;
	};
	static isStop = true;
	static async startLoop() {
		WorkerManager.isStop = false;
		while (WorkerManager.isStop === false) {
			WorkerManager.oneLoop();
			await Util.sleep(1000);
			console.log('startLoop isStop:', WorkerManager.isStop);
		}
	}
	static async stopLoop() {
		WorkerManager.isStop = true;
	}
	static oneLoop() {
		for (const workerType in WorkerManager.workerSrcs) {
			const a = WorkerManager.workers.get(workerType);
			for (let i = 0; i < a.length; i++) {
				const d = a[i];
				const worker = d.w;
				const ss = WorkerManager.workerSrcs[workerType];
				const endOfLife = d.n + ss.lifetime;
				if (Date.now() > endOfLife) WorkerManager.changeWorkerGeneration(workerType, i, ss.lifetime, worker);
			}
		}
	}
	static changeWorkerGeneration(workerType, index, lifetime, worker) {
		if (!worker) return;
		const w = WorkerManager.workers.get(workerType);
		const d = w[index];
		if (!d || d.w !== worker) return;
		setTimeout(() => worker.terminate(), lifetime * 2);
		WorkerManager.bootWorker(workerType, index);
	}
	static postMsg(workerType, u8a) {
		return new Promise(async (resolve) => {
			const a = WorkerManager.a;
			const c = WorkerManager.workersRoundCounter;
			const w = WorkerManager.workers.get(workerType);
			const s = WorkerManager.workerSrcs[workerType];
			if (!s || !w) return console.warn('NO type defined :' + workerType);
			const index = c.get(workerType) % s.count;
			console.log('postMsg 1 index:' + index + '/w:' + w[index], w);
			const worker = w[index].w;
			a.splice(0, a.length);
			const keyAB = await Hasher.d(
				`${Date.now() + Math.floor(Cryptor.srand() * Date.now())}`,
				10,
				'SHA-256',
				true
			);
			const u8aK = new Uint8Array(keyAB);
			const key = BinUtil.a2U(u8aK);
			a.push(u8aK);
			a.push(u8a);
			const u8aD = BinUtil.jus(a);
			a.splice(0, a.length);
			worker.postMessage(u8aD, [u8aD.buffer]);
			console.log('postMsg 2 u8aD:', u8aD);
			WorkerManager.queue.set(key, resolve);
			c.set(workerType, index + 1);
		});
	}
}
