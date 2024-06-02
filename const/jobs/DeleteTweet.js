import { TweetManager } from '../../services/logic/TweetManager.js';
export class DeleteTweet {
	static name = 'DeleteTweet';
	static do = async (obj) => await TweetManager.deleteTweetExec(obj);
}
