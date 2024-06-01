import { Vw } from '../libs/Vw.js';
import { SessonStorageManager } from '../libs/SessionStrageManager.js';
import { TweetManager } from '../services/logic/TweetManager.js';
import { LifeCycle } from '../services/manager/LifeCycle.js';
export class TweetTextEditor {
	constructor(callbacks) {
		if (Vw.isNotBrowser) return;
		this.editor = Vw.ce('div', { class: 'TweetTextEditor' });
		this.maineditor = Vw.ta(this.editor, { class: 'maineditor' });
		const okBtn = Vw.btn(this.editor, { class: 'TweetTextEditorOK', text: 'OK' });
		const cancelBtn = Vw.btn(this.editor, { class: 'TweetTextEditorCancel', text: 'Cancel' });
		for (const cbOBJ in callbacks) {
			const e = cbOBJ.event;
			const cb = cbOBJ.func;
		}
		Vw.ael(okBtn, 'click', () => this.submit());
		Vw.ael(cancelBtn, 'click', () => this.hide());
		this.isHidden = true;
	}
	open(t, parentElm) {
		this.t = t;
		const v = t.value;
		const tid = this.t.id;
		const r = SessonStorageManager.get(tid);
		console.log('TweetTextEditor open r:', r);
		Vw.a(parentElm, this.editor);
		const hasSessionData = r && r.value && r.value.text;
		this.maineditor.value = hasSessionData ? r.value.text : v.text;
		this.isHidden = false;
	}
	getValue() {
		return this.maineditor.value;
	}
	async submit() {
		const v = this.getValue();
		this.hide(true);
		this.t.text = v;
		await TweetManager.editTweet(this.t);
		await LifeCycle.refresh();
	}
	hide(isNotRegister) {
		if (this.isHidden) return;
		const v = this.getValue();
		const tid = this.t.id;
		if (v && v !== this.t.value.text)
			isNotRegister || confirm('下書きは保存しますか？')
				? SessonStorageManager.register(tid, { text: this.getValue() })
				: null;
		Vw.rm(this.editor);
		this.isHidden = true;
	}
	setOutputElm() {}
	getOnWindsizeChange() {}
}
