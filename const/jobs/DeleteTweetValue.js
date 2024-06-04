import { TweetValueManger } from '../../services/logic/TweetValueManger.js';
export class DeleteTweetValue {
	static name = 'DeleteTweetValue';
	static do = async (obj) => await TweetValueManger.deleteTweetValueExec(obj);
}
