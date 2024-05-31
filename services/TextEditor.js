import { Vw } from '../libs/Vw.js';
export class TextEditor {
	constructor(parent, callbacks) {
		const editor = Vw.div(parent, { class: 'Editor', id: 'Editor' });
		const maineditor = Vw.ta(editor, { class: 'maineditor', id: 'maineditor' });
		const button = Vw.btn(editor, { class: 'maineditor', id: 'maineditor' });
		this.editorTextAreaElm = maineditor;
		for (const event in callbacks) {
		}
	}
	setOutputElm() {}
	getOnWindsizeChange() {}
}
