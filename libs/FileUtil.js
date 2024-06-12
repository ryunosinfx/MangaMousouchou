import { BinUtil } from './BinaryUtil.js';
const cb = () => {};
export class FileUtil {
	static currentReaders = [];
	static readAsArrayBuffer = async (file, onloadstartCB, updateProgressCB, errorHandlerCB) =>
		FileUtil.read(file, 'ArrayBuffer', onloadstartCB, updateProgressCB, errorHandlerCB);
	static readAsBinaryString = async (file, onloadstartCB, updateProgressCB, errorHandlerCB) =>
		await FileUtil.read(file, 'BinaryString', onloadstartCB, updateProgressCB, errorHandlerCB);
	static readAsDataURL = async (file, onloadstartCB, updateProgressCB, errorHandlerCB) =>
		await FileUtil.read(file, 'DataURL', onloadstartCB, updateProgressCB, errorHandlerCB);
	static readAsText = async (file, onloadstartCB, updateProgressCB, errorHandlerCB) =>
		await FileUtil.read(file, 'text', onloadstartCB, updateProgressCB, errorHandlerCB);
	static read(file, type = 'binaryString', onloadstartCB = cb, updateProgressCB = cb) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			//this.progress.init();readAsBinaryString
			reader.onerror = (event) => reject(FileUtil.errorHandler(event));
			reader.onprogress = (event) => updateProgressCB(event);
			reader.onabort = (e) => console.log('abort', e) && alert('File read cancelled');
			reader.onloadstart = (event) => onloadstartCB(event);
			reader.onload = (event) => resolve(reader.result);
			FileUtil.currentReaders.push(reader);
			return type === 'ArrayBuffer'
				? reader.readAsArrayBuffer(file)
				: type === 'BinaryString'
				? reader.readAsBinaryString(file)
				: type === 'DataURL'
				? reader.readAsDataURL(file)
				: reader.readAsText(file);
		});
	}
	static abortRead() {
		for (const reader of FileUtil.currentReaders) reader.abort();
	}
	static errorHandler(event) {
		switch (event.target.error.code) {
			case event.target.error.NOT_FOUND_ERR:
				alert('File Not Found!');
				break;
			case event.target.error.NOT_READABLE_ERR:
				alert('File is not readable');
				break;
			case event.target.error.ABORT_ERR:
				break; // noop
			default:
				alert('An error occurred reading this file.');
		}
	}
	static download(fileName, content, mimeType = 'text/plain') {
		const blob = new Blob([content], { type: mimeType });
		const ancker = document.createElement('a');
		ancker.style.display = 'none';
		ancker.download = fileName;
		ancker.href = window.URL.createObjectURL(blob);
		ancker.dataset.downloadurl = [mimeType, fileName, ancker.href].join(':');
		document.body.appendChild(ancker);
		ancker.click();
		setTimeout(() => document.body.removeChild(ancker));
	}
	static imageLoad(img, dataUri) {
		return new Promise((resolev) => {
			img.onload = (e) => resolev();
			img.src = dataUri;
		});
	}
	static mkDataURL = (type, u8a) => `data:${type}:base64,${BinUtil.u2B(u8a)}`;
	static getU8AfromDataURL = (durl = '') =>
		durl.indexOf(',') > 0 ? new Uint8Array(BinUtil.B2a(durl.split(',')[1])) : durl;
}
