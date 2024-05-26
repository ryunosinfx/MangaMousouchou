import { Util } from '../libs/Util.js';
import { Hasher, Cryptor, BinUtil } from '../libs/BinaryUtil.js';
export class WorkerManager {
	static a = [];
	static queue = new Map();
	static workersRoundCounter = new Map();
	static workers = new Map();
	static workerSrcs = {
		server: { src: './BaseWorker.js', lifetime: 30000, count: 2 },
	};
	static isInitialized = false;
	static init = () => {
		for (const type in WorkerManager.workerSrcs) {
			WorkerManager.workersRoundCounter.set(type, 0);
			WorkerManager.bootWorker(type);
		}
	};
	static bootWorker(type, index = -1) {
		const ss = WorkerManager.workerSrcs[type];
		const w = WorkerManager.workers.has(type) ? WorkerManager.workers.set(type) : [];
		const l = w.length;
		const c = ss.count;
		if (index >= 0 && l > index) {
			const d = w[index];
			d.w = new Worker(ss.src);
			d.n = Date.now() + Util.random(1000);
			d.w.onmessage = (e) => {
				const data = e.data;
				if (data.byteLength !== undefined) {
					const u8a = new Uint8Array(data);
					const u8aK = u8a.subarray(0, 32);
					const key = BinUtil.a2U(u8aK);
					const resolve = WorkerManager.queue.get(key);
					resolve(u8a.subarray(32));
				}
				console.log('Message received from worker');
			};
		} else for (let i = l; i < c; i++) w.push({ w: new Worker(ss.src), n: Date.now() + Util.random(1000) });
		WorkerManager.workers.set(type, w);
	}
	static isStop = true;
	static async startLoop() {
		WorkerManager.isStop = false;
		while (WorkerManager.isStop === false) {
			WorkerManager.oneLoop();
			await Util.sleep(1000);
		}
	}
	static async stopLoop() {
		WorkerManager.isStop = true;
	}
	static oneLoop() {
		for (const type in WorkerManager.workerSrcs) {
			const a = WorkerManager.workers.get(type);
			for (const i = 0; i < a.length; i++) {
				const d = a[i];
				const worker = a.w;
				const ss = WorkerManager.workerSrcs[type];
				const endOfLife = d.n + ss.lifetime;
				if (Date.now() > endOfLife) WorkerManager.changeWorkerGeneration(type, i, ss.lifetime, worker);
			}
		}
	}
	static changeWorkerGeneration(type, index, lifetime, worker) {
		if (!worker) return;
		const w = WorkerManager.workers.get(type);
		const d = w[index];
		if (!d || d.w !== worker) return;
		setTimeout(() => worker.terminate(), lifetime * 2);
		WorkerManager.bootWorker(type, index);
	}
	static postMsg(type, u8a) {
		return new Promise(async (resolve) => {
			const a = WorkerManager.a;
			const c = WorkerManager.workersRoundCounter;
			const w = WorkerManager.workers.get(type);
			const s = WorkerManager.workerSrcs[type];
			if (!s || !w) return console.warn('NO type defined :' + type);
			const index = c.get(type) % s.count;
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
			WorkerManager.queue.set(key, resolve);
			c.set(type, index + 1);
		});
	}
}
