import { Vw } from '../libs/Vw.js';
import { FrameTypes } from '../const/FrameTypes.js';
export class MainMenu {
	static timeLineElm = null;
	static mastersElm = null;
	static titlesElm = null;
	static attachedFilesElm = null;
	static TimeLine = null;
	static Masters = null;
	static Titles = null;
	static AttachedFiles = null;
	static init(parent) {
		MainMenu.parent = parent;
		MainMenu.menue = Vw.div(parent, { text: 'menu', class: 'MainMenu' });
		MainMenu.TimeLine = Vw.div(MainMenu.menue, { text: 'TimeLine', class: 'TimeLine' });
		MainMenu.Masters = Vw.div(MainMenu.menue, { text: 'Masters', class: 'Masters' });
		MainMenu.Titles = Vw.div(MainMenu.menue, { text: 'Titles', class: 'Titles' });
		MainMenu.AttachedFiles = Vw.div(MainMenu.menue, { text: 'AttachedFiles', class: 'AttachedFiles' });
		Vw.ael(MainMenu.TimeLine, 'click', MainMenu.clickTimeLine);
		Vw.ael(MainMenu.Masters, 'click', MainMenu.clickMaster);
		Vw.ael(MainMenu.Titles, 'click', MainMenu.clickTitle);
		Vw.ael(MainMenu.AttachedFiles, 'click', MainMenu.clickAttachedFiles);
	}
	static clickTimeLine = () => MainMenu.showElm(MainMenu.timeLineElm, MainMenu.TimeLine);
	static clickMaster = () => MainMenu.showElm(MainMenu.mastersElm, MainMenu.Masters);
	static clickTitle = () => MainMenu.showElm(MainMenu.titlesElm, MainMenu.Titles);
	static clickAttachedFiles = () => MainMenu.showElm(MainMenu.attachedFilesElm, MainMenu.AttachedFiles);
	static addTimeLineElm(elm) {
		MainMenu.timeLineElm = elm;
		if (elm) Vw.aC(elm, FrameTypes.NONE);
	}
	static addMastersElm(elm) {
		MainMenu.mastersElm = elm;
		if (elm) Vw.aC(elm, FrameTypes.NONE);
	}
	static addTitlesElm(elm) {
		MainMenu.titlesElm = elm;
		if (elm) Vw.aC(elm, FrameTypes.NONE);
	}
	static addAttachedFilesElm(elm) {
		MainMenu.attachedFilesElm = elm;
		if (elm) Vw.aC(elm, FrameTypes.NONE);
	}
	static setDisplayNone(elm) {
		Vw.rC(MainMenu.TimeLine, FrameTypes.SELECTED);
		Vw.rC(MainMenu.Masters, FrameTypes.SELECTED);
		Vw.rC(MainMenu.Titles, FrameTypes.SELECTED);
		Vw.rC(MainMenu.AttachedFiles, FrameTypes.SELECTED);
		if (elm !== MainMenu.timeLineElm && MainMenu.timeLineElm) Vw.aC(MainMenu.timeLineElm, FrameTypes.NONE);
		if (elm !== MainMenu.mastersElm && MainMenu.mastersElm) Vw.aC(MainMenu.mastersElm, FrameTypes.NONE);
		if (elm !== MainMenu.titlesElm && MainMenu.titlesElm) Vw.aC(MainMenu.titlesElm, FrameTypes.NONE);
		if (elm !== MainMenu.attachedFilesElm && MainMenu.attachedFilesElm)
			Vw.aC(MainMenu.attachedFilesElm, FrameTypes.NONE);
	}
	static showElm(elm, btnElm) {
		if (!elm) return;
		MainMenu.setDisplayNone(elm);
		Vw.rC(elm, FrameTypes.NONE);
		Vw.aC(btnElm, FrameTypes.SELECTED);
	}

	setTextArea() {}
}
