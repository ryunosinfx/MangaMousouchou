import { VERSION } from '../parts/Version.js';
import { Vw } from '../libs/Vw.js';
import { MainMenu } from './MainMenu.js';
import { PagesView } from './PagesView.js';
import { TimeLine } from './TimeLine.js';
import { ImagesLine } from '../parts/Images/ImagesLine.js';
import { TweetMenu } from '../parts/Tweet/TweetMenu.js';
import { MainInput } from './MainInput.js';
import { ImageViewer } from '../parts/Images/ImageViewer.js';
const AppTitle = 'MangaMousouChou';

export class MainView {
	static async init() {
		console.log('MainView');
		MainView.pagesElm = null;
		MainView.editorTextAreaElm = null;
		MainView.callbacks = [];
		const frame = Vw.div(Vw.b, { class: 'frame', id: 'frame' });
		TweetMenu.init(frame);
		// console.log(Vw);
		const header = Vw.div(frame, { class: 'header', id: 'header' });
		MainView.buildTitle(header);
		MainView.buildMenu(header);
		const contentsAF = Vw.div(frame, { class: 'Contents', id: 'ContentsAF' });
		MainMenu.addAttachedFilesElm(contentsAF);
		const contentsTL = Vw.div(frame, { class: 'Contents', id: 'ContentsTL' });
		MainMenu.addTimeLineElm(contentsTL);
		MainInput.init(contentsTL);
		MainView.buildPages(contentsTL, contentsAF);
		ImageViewer.init(frame);
		// MainView.TextEditor.setOutputElm(MainView.PagesView.getFormattedElm(), MainView.PagesView.getJsonElm());
		Vw.div(frame, { class: 'footer', id: 'footer' });
		MainView.callbacks.push((parsed) => MainView.PagesView.calc(parsed));
		// window.addEventListener('resize', MainView.TextEditor.getOnWindsizeChange());
		addEventListener('popstate', (e) => ImageViewer.openHasIDHash(e));
		MainMenu.clickTimeLine();
	}
	static buildTitle(header) {
		const titleFrame = Vw.div(header, { class: 'titleFrame', id: 'titleFrame' });
		Vw.span(titleFrame, {
			class: 'Editor',
			id: 'Editor',
			text: AppTitle,
		});
		Vw.span(titleFrame, { class: 'version', id: 'version', text: ` v${VERSION}` });
	}
	static buildMenu(header) {
		const menu = Vw.div(header, { class: 'menu', id: 'menu' });
		MainView.mainmenu = MainMenu.init(menu);
	}
	static buildPages(contentsTL, contentsAF) {
		const pages = Vw.div(contentsTL, { class: 'Pages', id: 'Pages' });
		MainView.pagesElm = pages;
		MainView.PagesView = new PagesView(MainView.pagesElm);
		MainView.timeline = TimeLine.build(pages);
		TimeLine.refresh();
		ImagesLine.setParentElm(contentsAF);
		ImagesLine.init();
		ImagesLine.refresh();
	}
	static getJoinCallBackFunc() {
		return async (args) => {
			for (const callback of MainView.callbacks) await callback(args);
		};
	}
}
