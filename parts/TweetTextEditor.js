import { Vw } from '../libs/Vw.js';
import { SessonStorageManager } from '../libs/SessionStrageManager.js';
import { TweetManager } from '../services/logic/TweetManager.js';
import { LifeCycle } from '../services/manager/LifeCycle.js';
import { TweetEditor } from './logic/TweetEditor.js';
import { TweetImageEditor } from './TweetImageEditor.js';
export class TweetTextEditor {
	constructor(callbacks) {
		if (Vw.isNotBrowser) return;
		this.imageSlots = [];
		this.imageMap = new Map();
		this.imgCount = 0;
		this.editor = Vw.ce('div', { class: 'TweetTextEditor' });
		this.maineditor = Vw.ta(this.editor, { class: 'editeditor' });
		this.footer = Vw.div(this.editor, { class: 'EditorFoot' });
		this.countArea = Vw.span(this.footer, { class: 'textCounter' });
		this.imageArea = Vw.div(this.editor, { class: 'inputImageArea' });
		const okBtn = Vw.btn(this.footer, { class: 'TweetTextEditorOK', text: 'OK' });
		const cancelBtn = Vw.btn(this.footer, { class: 'TweetTextEditorCancel', text: 'Cancel' });
		const fileForm = Vw.ipt(this.footer, { type: 'file', class: 'fileUP' });
		this.fileForm = fileForm;
		for (const cbOBJ in callbacks) {
			const e = cbOBJ.event;
			const cb = cbOBJ.func;
			console.log(e, cb);
		}
		Vw.ael(this.maineditor, 'input', () => TweetEditor.refresh(this.editor, this.maineditor, this.countArea));
		Vw.ael(this.maineditor, 'focus', () => TweetEditor.onForcus());
		Vw.ael(fileForm, 'change', (e) => TweetImageEditor.onLoadImage(e, this));
		Vw.ael(okBtn, 'click', () => this.submit());
		Vw.ael(cancelBtn, 'click', () => this.hide());
		this.isHidden = true;
		TweetImageEditor.init(this);
		TweetEditor.refresh(this.editor, this.maineditor, this.countArea);
	}
	open(tw, parentElm) {
		this.tw = tw;
		const v = tw.value;
		const tid = this.tw.id;
		const r = SessonStorageManager.get(tid);
		Vw.a(parentElm, this.editor);
		const hasSessionData = r && r.value && r.value.text;
		this.maineditor.value = hasSessionData ? r.value.text : v.text;
		this.isHidden = false;
		TweetImageEditor.load(this, tw.imageDatas);
		TweetEditor.refresh(this.editor, this.maineditor, this.countArea);
	}
	getValue() {
		return this.maineditor.value;
	}
	async submit() {
		const v = this.getValue();
		this.hide(true);
		this.tw.text = v;
		await TweetManager.editTweet(this.tw, TweetImageEditor.getImageDatas(this));
		TweetImageEditor.init(this);
		await LifeCycle.refresh();
		TweetEditor.refresh(this.editor, this.maineditor, this.countArea);
	}
	hide(isNotRegister) {
		if (this.isHidden) return;
		const v = this.getValue();
		const tid = this.tw.id;
		if (v && v !== this.tw.value.text)
			isNotRegister || confirm('下書きは保存しますか？')
				? SessonStorageManager.register(tid, { text: this.getValue() })
				: null;
		Vw.rm(this.editor);
		this.isHidden = true;
	}
	setOutputElm() {}
	getOnWindsizeChange() {}
}
