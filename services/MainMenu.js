import { Vw } from '../libs/Vw.js';
export class MainMenu {
	constructor(parent) {
		this.parent = parent;
		this.menue = Vw.div(parent, { text: 'menu', class: 'MainMenu' });
		this.timeLine = Vw.div(this.menue, { text: 'TimeLine', class: 'TimeLine' });
		this.Masters = Vw.div(this.menue, { text: 'Masters', class: 'Masters' });
		this.Titles = Vw.div(this.menue, { text: 'Titles', class: 'Titles' });
		this.AttachedFiles = Vw.div(this.menue, { text: 'AttachedFiles', class: 'AttachedFiles' });
	}
	setTextArea() {}
}
