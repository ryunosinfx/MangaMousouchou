console.log('################TestWorker boot!:');
onmessage = async (msg) => {
	console.log('############test message from main received in worker:', msg);
	const bufTransferredFromMain = msg.data;
	const u8a = new Uint8Array();
	// バッファーを main に送信し返し、配下の ArrayBuffer を移転する
	self.postMessage(u8a);
};
