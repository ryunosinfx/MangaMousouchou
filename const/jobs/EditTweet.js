import { TweetManager } from '../../services/logic/TweetManager.js';
export class EditTweet {
	static name = 'EditTweet';
	static do = async (obj) => await TweetManager.postTweetExec(obj);
}
