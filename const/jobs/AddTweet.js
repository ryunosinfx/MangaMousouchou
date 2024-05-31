import { TweetManager } from '../../services/logic/TweetManager.js';
export class AddTweet {
	static name = 'AddTweet';
	static do = async (obj) => await TweetManager.postTweetExec(obj);
}
