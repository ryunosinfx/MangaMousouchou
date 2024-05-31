import { MainView } from './services/MainView.js';
import { WorkerManager } from './worker/WorkerManager.js';
export class MangaMousouchou {
	static async exec() {
		console.log('aaa');
		await WorkerManager.init();
		const mv = new MainView();
	}
}
