const te = new TextEncoder('utf-8'),
	td = new TextDecoder('utf-8'),
	M = Math,
	Mc = (n) => M.ceil(n),
	Ma = (n) => M.abs(n),
	J = JSON,
	Jp = (a) => J.parse(a),
	Js = (a) => J.stringify(a),
	w = (...a) => console.warn(a),
	io = (...a) => console.info(a),
	err = (...a) => console.error(a),
	crv = (t) => crypto.getRandomValues(t),
	isS = (s) => typeof s === 'string',
	isFn = (s) => typeof s === 'function',
	gBl = (b) => b.byteLength,
	cb = (a) => a,
	N = '',
	ef = (e, id = N, l = null) => {
		cb(w(`${id} ${e.message}`), w(e.stack));
		if (l && isFn(l)) cb(l(`${id} ${e.message}`), l(e.stack));
		return null;
	},
	cy = crypto.subtle,
	wi = window;
export class B {
	static u8 = (a) => new Uint8Array(a);
	static u32 = (a) => new Uint32Array(a);
	static i32 = (a) => new Int32Array(a);
}
export class BinUtil {
	static a = [];
	static isSameAb = (abA, abB) => BinUtil.a2B(abA) === BinUtil.a2B(abB);
	static isB64 = (s = N) => s % 4 === 0 && /[+/=0-9a-zA-Z]+/.test(s);
	static s2u = (s) => te.encode(s);
	static u2s = (u) => td.decode(u);
	static a2s = (a) => td.decode(B.u8(a));
	static a2B = (i) => wi.btoa(BinUtil.u2b(B.u8(i.buffer ? i.buffer : i)));
	static u2B = (u) => wi.bta(BinUtil.u2b(u));
	static u2I(u) {
		const f = B.u8(4),
			l = u.length,
			n = Mc(l / 4),
			i32a = B.i32(n);
		for (let i = 0; i < n; i++) {
			f[0] = u[i + 0];
			f[1] = l < i + 1 ? 0 : u[i + 1];
			f[2] = l < i + 2 ? 0 : u[i + 2];
			f[3] = l < i + 3 ? 0 : u[i + 3];
			i32a[i] = B.i32(f.buffer)[0];
		}
		return i32a;
	}
	static u8a2u32a(u) {
		const f = B.u8(4),
			l = u.length,
			n = Mc(l / 4),
			u32a = B.u32(n);
		for (let i = 0; i < n; i++) {
			f[0] = u[i + 0];
			f[1] = l < i + 1 ? 0 : u[i + 1];
			f[2] = l < i + 2 ? 0 : u[i + 2];
			f[3] = l < i + 3 ? 0 : u[i + 3];
			u32a[i] = B.u32(f.buffer)[0];
		}
		return u32a;
	}
	static h2u(h) {
		const l = h.length / 2,
			u = B.u8(l);
		for (let i = 0; i < l; i++) u[i] = parseInt(h.substr(i * 2, 2), 16);
		return u;
	}
	static u2h = (u) => Array.prototype.map.call(u, (x) => x.toString(16).padStart(2, '0')).join(N);
	static s2U = (s) => BinUtil.B2U(BinUtil.a2B(BinUtil.s2u(s).buffer));
	static a2U = (a) => BinUtil.B2U(BinUtil.a2B(a));
	static B2a = (B) => BinUtil.b2u(wi.atob(B));
	static U2a = (U) => BinUtil.B2a(BinUtil.U2B(U));
	static U2s = (U) => BinUtil.u2s(B.u8(BinUtil.B2a(BinUtil.U2B(U))));
	static B2U = (B) => (B ? B.split('+').join('-').split('/').join('_').split('=').join(N) : B);
	static U2B(U) {
		const l = U.length,
			c = l % 4 > 0 ? 4 - (l % 4) : 0;
		let B = U.split('-').join('+').split('_').join('/');
		for (let i = 0; i < c; i++) B += '=';
		return B;
	}
	static jus(s) {
		let l = 0;
		const c = s.length;
		for (let i = 0; i < c; i++) l += gBl(s[i]);
		const a = B.u8(l);
		let o = 0;
		for (let i = 0; i < c; i++) {
			const u = s[i];
			a.set(u, o);
			o += gBl(u);
		}
		return a;
	}
	static u2b(u) {
		const r = BinUtil.a;
		r.splice(0, r.length);
		for (const e of u) r.push(String.fromCharCode(e));
		const bs = r.join(N);
		r.splice(0, r.length);
		return bs;
	}
	static b2u(bs) {
		const l = bs.length,
			a = B.u8(new ArrayBuffer(l));
		for (let i = 0; i < l; i++) a[i] = bs.charCodeAt(i);
		return a;
	}
	static L2a(b) {
		return new Promise((r) => {
			const fr = new FileReader();
			fr.onload = () => r(fr.result);
			fr.onerror = () => cb(r(fr.error), err(fr.error));
			fr.readAsArrayBuffer(b);
		});
	}
	static dpU(u) {
		const l = u.length,
			n = B.u8(l);
		for (let i = 0; i < l; i++) n[i] = u[i];
		return n;
	}
	static N2u(n) {
		let a = n;
		const p = BinUtil.a;
		p.splice(0, r.length);
		while (Ma(a) > 0) {
			p.unshift(a % 256);
			a = a >> 8;
		}
		const l = p.length,
			u = B.u8(l);
		for (let i = 0; i < l; i++) u[i] = p[i];
		p.splice(0, r.length);
		return u;
	}
	static b32a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'.split(N);
	static b32t = (() => {
		const t = {};
		for (let i = 0; i < 32; i++) t[BinUtil.b32a[i]] = i;
		return t;
	})();
	static b32d(b32) {
		const a = b32.toUpperCase().replace(/[^A-Z234567]/g, N),
			b = a.padEnd(Mc(a.length / 8) * 8, 'A'),
			u = B.u8((a.length * 5) / 8);
		let i = 0,
			j = 0,
			k = 0;
		for (const v of b.split(N)) {
			i = (i << 5) | BinUtil.b32t[v];
			j += 5;
			if (j >= 8) {
				j -= 8;
				u[k++] = i >> j;
				i %= 256;
			}
		}
		if (i > 0) u[k] = i;
		/*
        aaaaabbb
        bbcccccd
        ddddeeee
        efffffgg
        ggghhhhh
         */
		return u.buffer;
	}
	static b32e(ab) {
		const u = B.u8(ab),
			a = BinUtil.a;
		a.splice(0, r.length);
		let j = 0,
			k = 0;
		for (let i = 0; i < u.length; i++) {
			const b = u[i];
			j = (j << 8) + b;
			k += 8;
			while (k > 5) {
				k -= 5;
				a.push(BinUtil.b32a[j >> k]);
				j &= (1 << k) - 1;
			}
		}
		if (k > 0) a.push(BinUtil.b32a[j << (5 - k)]);
		/*
        aaaaabbb
        bbcccccd
        ddddeeee
        efffffgg
        ggghhhhh
         */
		const b32 = a.join(N);
		a.splice(0, r.length);
		return b32;
	}
}
export class Cryptor {
	static async gK(p, s) {
		const k = await cy.deriveKey(
			{
				name: 'PBKDF2',
				salt: s,
				iterations: 100000,
				hash: 'SHA-256',
			},
			await cy.importKey(
				'raw',
				await Hasher.d(BinUtil.s2u(p).buffer, 100, 'SHA-256', true),
				{ name: 'PBKDF2' },
				false,
				['deriveKey']
			),
			{ name: 'AES-GCM', length: 256 },
			false,
			['encrypt', 'decrypt']
		);
		return [k, s];
	}
	static gS = (saltI, isAB) => (saltI ? (isAB ? B.u8(saltI) : BinUtil.s2u(saltI)) : crv(B.u8(16)));
	static importKeyAESGCM = async (kAb, usages = ['encrypt', 'decrypt']) =>
		await cy.importKey('raw', kAb, { name: 'AES-GCM' }, true, usages);
	static gFF = () => crv(B.u8(12));
	static gIF = () => crv(B.u32(1));
	static srand = () => crv(B.u32(1))[0] / 4294967295;
	static enc = async (s, pk) => await Cryptor.encAES256GCM(BinUtil.s2u(s), pk ? pk : await Cryptor.mkH());
	static async encAES256GCM(u, pk, saltI = null, isAB) {
		const s = Cryptor.gS(saltI, isAB),
			iv = Uint8Array.from([...Cryptor.gFF(), ...B.u8(Cryptor.gIF().buffer)]),
			edAb = await cy.encrypt({ name: 'AES-GCM', iv }, await Cryptor.lk(pk, s), u.buffer);
		return [BinUtil.a2U(edAb), BinUtil.a2U(iv.buffer), BinUtil.a2U(s.buffer)].join(',');
	}
	static mkH = (s = [location.origin], st = 100) => Hasher.d(Js(s), st);
	static dec = async (ers, pk) => BinUtil.u2s(await Cryptor.decAES256GCM(ers, pk ? pk : await Cryptor.mkH()));
	static lk = async (pk, s) => (isS(pk) ? await Cryptor.gK(pk, isS(s) ? B.u8(BinUtil.U2a(s)) : s) : [pk])[0];
	static async decAES256GCM(ers, p) {
		const [U, ip, s] = ers.split(',');
		try {
			return B.u8(
				await cy.decrypt({ name: 'AES-GCM', iv: B.u8(BinUtil.U2a(ip)) }, await Cryptor.lk(p, s), BinUtil.U2a(U))
			);
		} catch (e) {
			return ef(e);
		}
	}
	static generateRsaKeyPair = async (name = 'RSA-OAEP', modulusLength = 4096, hash = 'SHA-512') =>
		await cy.generateKey(
			{
				name, //RSASSA-PKCS1-v1_5, RSA-PSS, RSA-OAEP
				modulusLength,
				publicExponent: new Uint8Array([1, 0, 1]), //65,537 ( [0x01, 0x00, 0x01] )
				hash, //SHA-256, SHA-384, SHA-512
			},
			true,
			['encrypt', 'decrypt'] //keyPair.publicKey; // 公開鍵,eyPair.privateKey; // 秘密鍵 ArrayBuffer
		);
	static importBase64PublicKey = async (base64PublicKey, name = 'RSA-OAEP', hash = 'SHA-512') =>
		await cy.importKey(
			'spki',
			BinUtil.B2a(base64PublicKey).buffer,
			{
				name,
				hash,
			},
			false,
			['encrypt']
		);
	/**
     * Minimum source data length is zero bytes, giving total message sizes (and therefore minimum RSA key sizes):
0 + 42 = 42 Bytes (336 bits) for SHA-1 OAEP
0 + 58 = 58 Bytes (464 bits) for SHA-224 OAEP
0 + 66 = 66 Bytes (528 bits) for SHA-256 OAEP
0 + 98 = 98 Bytes (784 bits) for SHA-384 OAEP
0 + 130 = 130 Bytes (1040 bits) for SHA-512 OAEP
The Maximum RSA key size is 4096 bits (512 bytes); therefore, the maximum message size is key size - overhead:
512 – 42 = 470 Bytes (3760 bits) for SHA-1 OAEP
512 – 58 = 454 Bytes (3632 bits) for SHA-224 OAEP
512 – 66 = 446 Bytes (3568 bits) for SHA-256 OAEP
512 – 98 = 414 Bytes (3312 bits) for SHA-384 OAEP
512 – 130 = 382 Bytes (3056 bits) for SHA-512 OAEP
     * @param {*} base64PublicKey 
     * @param {*} str 
     * @param {*} isBase64 
     * @param {*} keyLen 
     */
	static restrictRsaOaep = {
		RSA2048_SHA256: 190, //256-66
		RSA3072_SHA256: 318, //384-66
		RSA4096_SHA256: 446, //512-66
		RSA2048_SHA384: 158, //256-98
		RSA3072_SHA384: 286, //384-98
		RSA4096_SHA384: 414, //512-98
		RSA2048_SHA512: 126, //256-130
		RSA3072_SHA512: 254, //384-130
		RSA4096_SHA512: 382, //512-130
	};
	static calcKey = (keyLen, hash) => `RSA${keyLen}_${hash.split('-').join('')}`;
	static encryptByPablicKey = async (base64PublicKey, str, isBase64, keyLen = 4096, hash = 'SHA-512') => {
		const u8a = isBase64 ? BinUtil.B2a(str) : BinUtil.s2u(str);
		const key = Cryptor.calcKey(keyLen, hash);
		const c = Math.floor(u8a.length / 3);
		const a = [];
		a.push(
			BinUtil.a2B(
				await cy.encrypt(
					{
						name: 'RSA-OAEP',
					},
					cy.importBase64PublicKey(base64PublicKey),
					encoded
				)
			)
		);
	};
}
export class Hasher {
	static async d(m, sc = 1, algo = 'SHA-256', isAB = false) {
		let r = m.buffer ? (m instanceof Uint8Array ? BinUtil.dpU(m) : B.u8(m.buffer)) : te.encode(m);
		for (let i = 0; i < sc; i++) r = await cy.digest(algo, r);
		return isAB ? r : BinUtil.a2U(r);
	}
	static async hmac(secretU, msgU, algo = 'SHA-512') {
		const key = await cy.importKey(
			'raw',
			secretU,
			{
				name: 'HMAC',
				hash: { name: algo },
			},
			false,
			['sign', 'verify']
		);
		return await cy.sign('HMAC', key, msgU);
	}
}
