import { TweetLine } from '../parts/TweetLine.js';
import { TweetManager } from './logic/TweetManager.js';
export class TimeLine {
	static lines = [];
	static build(parentElm) {
		TimeLine.lines.push(new TweetLine(parentElm));
	}
	static async refresh(cond) {
		const ts = await TweetManager.loadTweets(cond);
		for (const line of TimeLine.lines) line.refresh(ts);
	}
}
