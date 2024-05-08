const wi = window,
	N = '';
export class Vw {
	static d = document;
	static cnvtGebav2Camel(t = N) {
		if (!t) return t;
		const s = t.split('-');
		for (let i = 1, j = s.length; i < j; i++) {
			const w = s[i],
				l = w.length;
			s[i] = l > 0 ? w.substring(0, 1).toUpperCase() : `${l}` > 1 ? w.substring(1) : N;
		}
		return s.join(N);
	}
	static a = (p, e) => p.appendChild(e);
	static addHiddenDiv = (p, att = {}) => Vw.add(p, 'div', att, { display: 'none' });
	static add(p, tN, att = null, sty = null) {
		const e = Vw.ce(tN);
		Vw.sa(e, att);
		if (att && att.text) Vw.sT(e, att.text);
		Vw.sS(e, sty);
		if (p && typeof p === 'object') p.appendChild(e);
		return e;
	}
	static div = (p, att, sty) => Vw.add(p, 'div', att, sty);
	static span = (p, att, sty) => Vw.add(p, 'span', att, sty);
	static ta = (p, att, sty) => Vw.add(p, 'textarea', att, sty);
	static h1 = (p, att, sty) => Vw.add(p, 'h1', att, sty);
	static h2 = (p, att, sty) => Vw.add(p, 'h2', att, sty);
	static btn = (p, att, sty) => Vw.add(p, 'button', att, sty);
	static ipt = (p, att, sty) => Vw.add(p, 'input', att, sty);
	static gi = (i) => Vw.d.getElementById(i);
	static rm = (e) => (e.parentNode ? e.parentNode.removeChild(e) : null);
	static rc = (e) => {
		while (e.firstChild) e.removeChild(e.firstChild);
	};
	static sS = (e, sty = {}) =>
		sty && typeof sty === 'object' ? Object.keys(sty).map((k) => (e.style[Vw.cnvtGebav2Camel(k)] = sty[k])) : sty;
	static sA = (e, k, v) => (e.style[Vw.cnvtGebav2Camel(k)] = v);
	static gS = (e, k) => e.style[Vw.cnvtGebav2Camel(k)];
	static tS = (e, k, v, v2) => (e.style[Vw.cnvtGebav2Camel(k)] = e.style[Vw.cnvtGebav2Camel(k)] === v ? v2 : v);
	static click = (e, cb) => Vw.ael(e, 'click', cb);
	static change = (e, cb) => Vw.ael(e, 'change', cb);
	static input = (e, cb) => Vw.ael(e, 'input', cb);
	static ael = (e, ev, cb) => (e.addEventListener(ev, cb) ? cb : cb);
	static rel = (e, ev, cb) => (e.removeEventListener(ev, cb) ? cb : cb);
	static sT = (e, msg) => (msg ? (e.textContent = msg) : e.textContent);
	static aC = (e, cN) => e.classList.add(cN);
	static rC = (e, cN) => e.classList.remove(cN);
	static tC = (e, cN) => e.classList.toggle(cN);
	static sa = (e, att) =>
		att && typeof att === 'object' ? Object.keys(att).map((k) => e.setAttribute(k, att[k])) : att;
	static gB = () => Vw.d.getElementsByTagName('body')[0];
	static gT = (p, T) => p.getElementsByTagName(T)[0];
	static ce = (tN) => Vw.d.createElement(tN);
	static copy = async (d) => navigator.clipboard.writeText(d);
	static uO = (a, b) => {
		const c = {};
		for (const k in a) c[k] = a[k];
		for (const k in b) c[k] = b[k];
		return c;
	};
	static fr = (f) => {
		const r = new FileReader(),
			p = new Promise((rv, rj) => {
				r.onload = () => rv(r.result);
				r.onerror = () => rj(r.error);
			});
		return {
			asArrayBuffer() {
				r.readAsArrayBuffer(f);
				return p;
			},
			asBinaryString() {
				r.readAsBinaryString(f);
				return p;
			},
			asDataURL() {
				r.readAsDataURL(f);
				return p;
			},
			asText() {
				r.readAsText(f);
				return p;
			},
		};
	};
	static beDraggable(e) {
		const p = 'px',
			T = 'top',
			L = 'left',
			a = (k) => Vw.gS(e, k).split(p).join(N) * 1,
			b = (k, x) => Vw.sA(e, k, x + p),
			m = {},
			f = (evt) => {
				setTimeout(() => {
					m.eX = evt.clientX;
					m.eY = evt.clientY;
					b(L, m.x + m.eX - m.sX);
					b(T, m.y + m.eY - m.sY);
				}, 1);
			};
		Vw.ael(e, 'mousedown', async (evt) => {
			Vw.sA(e, 'cursor', 'grab');
			m.x = a(L);
			m.y = a(T);
			m.sX = evt.clientX;
			m.sY = evt.clientY;
			Vw.ael(wi, 'mousemove', f);
		});
		Vw.ael(wi, 'mouseup', () => {
			Vw.sA(e, 'cursor', 'auto');
			Vw.rel(wi, 'mousemove', f);
		});
	}
	static b = Vw.gB();
	static append2Body = (e) => Vw.b.appendChild(e);
}
