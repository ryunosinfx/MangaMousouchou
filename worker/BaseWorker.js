export class BaseWorker {
    static async  do(){

    }
}
self.onmessage = async function handleMessageFromMain(msg) {
	console.log('message from main received in worker:', msg);

	const bufTransferredFromMain = msg.data;

	// バッファーを main に送信し返し、配下の ArrayBuffer を移転する
	self.postMessage(bufTransferredFromMain, [bufTransferredFromMain]);
};
