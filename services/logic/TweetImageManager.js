import { FileUtil } from '../../libs/FileUtil.js';
import { BinaryData } from '../../orm/BinaryData.js';
export class TweetImageManager {
	static save = async (tid, imageDatas, binaryDataIds = []) => {
		const ids = Array.isArray(binaryDataIds) ? binaryDataIds : [];
		if (!Array.isArray(imageDatas)) return;
		for (const imageData of imageDatas) {
			if (!imageData.dataUrl || imageData.id) continue;
			const durl = imageData.dataUrl;
			const id = await FileUtil.mkHash(durl);
			const bd = await BinaryData.load(id);
			const meta = {
				fileName: imageData.fileName,
				mimeType: imageData.mimeType,
			};
			const tweetIds = !bd || !Array.isArray(bd.tweetIds) ? [] : bd.tweetIds;
			tweetIds.push(tid);
			await BinaryData.update(id, FileUtil.getU8AfromDataURL(durl), meta, tweetIds);
			ids.push(id);
		}
		return ids;
	};
	static loads = async (ids, a = []) => {
		for (const id of ids) a.push(await TweetImageManager.load(id));
		return a;
	};
	static load = async (id) => (id ? TweetImageManager.mkImageData(await BinaryData.load(id)) : null);
	static mkImageData(bd) {
		if (!bd.meta) return null;
		const id = bd.id,
			meta = bd.meta,
			fileName = meta.fileName,
			mimeType = meta.mimeType,
			data = bd.data,
			dataUrl = data.byteLength ? FileUtil.mkDataURL(mimeType, data) : data,
			byteLength = data.byteLength ? data.byteLength : data && data.length ? data.length : 0;
		return { id, fileName, mimeType, dataUrl, byteLength };
	}
	static deleteByTvs = async (tvs) => {
		const parentTweetIds = [];
		const binaryDataIds = [];
		for (const tv of tvs) {
			if (!parentTweetIds.includes(tv.parentTweetId)) parentTweetIds.push(tv.parentTweetId);
			if (Array.isArray(tv.binaryDataIds)) for (const bdid of tv.binaryDataIds) binaryDataIds.push(bdid);
		}
		const bds = await BinaryData.loads(binaryDataIds);
		for (const ptid of parentTweetIds)
			for (const bd of bds) {
				const tweetIds = bd.tweetIds;
				if (!Array.isArray(tweetIds)) continue;
				const index = tweetIds.indexOf(ptid);
				if (index >= 0) tweetIds.splice(index, 1);
			}
		for (const bd of bds) {
			if (!Array.isArray(bd.tweetIds) || bd.tweetIds.length < 1) await BinaryData.delete(bd.id);
			else await BinaryData.update(bd.id, bd.data, bd.meta, bd.tweetIds, bd.createTime, bd.user);
		}
		parentTweetIds.splice(0, parentTweetIds.length);
		binaryDataIds.splice(0, binaryDataIds.length);
	};
	static delete = async (id) => await BinaryData.delete(id);
}
