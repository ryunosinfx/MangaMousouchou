import { BinaryData } from '../../orm/BinaryData.js';
import { DataVersion } from '../../orm/DataVersion.js';
import { Frame } from '../../orm/Frame.js';
import { Master } from '../../orm/Master.js';
import { OrderList } from '../../orm/OrderList.js';
import { Pickuphistory } from '../../orm/Pickuphistory.js';
import { TagCategory } from '../../orm/TagCategory.js';
import { Title } from '../../orm/Title.js';
import { Tweet } from '../../orm/Tweet.js';
import { TweetLink } from '../../orm/TweetLink.js';
import { TweetTag } from '../../orm/TweetTag.js';
import { TweetType } from '../../orm/TweetType.js';
import { TweetValue } from '../../orm/TweetValue.js';
import { TimeLine } from '../TimeLine.js';
import { ImagesLine } from '../../parts/Images/ImagesLine.js';
export class LifeCycle {
	static isInited = false;
	static async init() {
		if (LifeCycle.isInited) return;
		await BinaryData.init();
		await DataVersion.init();
		await Frame.init();
		await Master.init();
		await OrderList.init();
		await Pickuphistory.init();
		await TagCategory.init();
		await Title.init();
		await Tweet.init();
		await TweetLink.init();
		await TweetTag.init();
		await TweetType.init();
		await TweetValue.init();
		LifeCycle.isInited = true;
	}
	static async refresh() {
		await TimeLine.refresh();
		await ImagesLine.refresh();
	}
}
