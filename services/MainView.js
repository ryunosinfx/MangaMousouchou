import { VERSION } from '../parts/Version.js';
import { Vw } from '../libs/Vw.js';
import { MainMenu } from './MainMenu.js';
import { PagesView } from './PagesView.js';
import { TimeLine } from './TimeLine.js';
import { TweetMenu } from '../parts/TweetMenu.js';
import { MainInput } from './MainInput.js';
const AppTitle = 'MangaMousouChou';

export class MainView {
	constructor() {
		console.log('MainView');
		this.pagesElm = null;
		this.editorTextAreaElm = null;
		this.callbacks = [];
		this.init();
		this.second();
	}
	async init() {
		const frame = Vw.div(Vw.b, { class: 'frame', id: 'frame' });
		TweetMenu.init(frame);
		console.log(Vw);
		const header = Vw.div(frame, { class: 'header', id: 'header' });
		this.buildTitle(header);
		this.buildMenu(header);
		const contents = Vw.div(frame, { class: 'Contents', id: 'Contents' });
		this.buildEditor(contents);
		this.buildPages(contents);
		// this.TextEditor.setOutputElm(this.PagesView.getFormattedElm(), this.PagesView.getJsonElm());
		Vw.div(frame, { class: 'footer', id: 'footer' });
		this.callbacks.push((parsed) => {
			this.PagesView.calc(parsed);
		});
		// window.addEventListener('resize', this.TextEditor.getOnWindsizeChange());
	}
	second() {
		this.mainmenu.setTextArea(this.editorTextAreaElm);
	}
	buildTitle(header) {
		const titleFrame = Vw.div(header, { class: 'titleFrame', id: 'titleFrame' });
		Vw.span(titleFrame, {
			class: 'Editor',
			id: 'Editor',
			text: AppTitle,
		});
		Vw.span(titleFrame, { class: 'version', id: 'version', text: ` v${VERSION}` });
	}
	buildMenu(header) {
		const menu = Vw.div(header, { class: 'menu', id: 'menu' });
		this.mainmenu = new MainMenu(menu);
	}
	buildPages(contents) {
		const pages = Vw.div(contents, { class: 'Pages', id: 'Pages' });
		this.pagesElm = pages;
		this.PagesView = new PagesView(this.pagesElm);
		this.timeline = TimeLine.build(pages);
		TimeLine.refresh();
	}
	getJoinCallBackFunc() {
		return async (args) => {
			for (const callback of this.callbacks) await callback(args);
		};
	}
	buildEditor(contents) {
		MainInput.init(contents);
		// this.MainInput = new MainInput(contents, this.getJoinCallBackFunc());
	}
}
