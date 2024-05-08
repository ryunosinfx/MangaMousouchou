export class TimeLine {
	line = [];
	constructor() {
		console.log('MainView');
		this.pagesElm = null;
		this.editorTextAreaElm = null;
		this.callbacks = [];
		this.init();
		this.second();
	}
}
