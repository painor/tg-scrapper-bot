// const Web3 = require('./web3.min.js');
let web3, web3Ws;

const connectToWeb3 = async () => {
    try {
        console.log('try connect with',SETTINGS.WSS_NODE);
        Handler.appendScannerTextarea(`try connect with ${SETTINGS.WSS_NODE}`);
        web3 = new Web3(SETTINGS.WSS_NODE);
        web3Ws = new Web3(new Web3.providers.WebsocketProvider(SETTINGS.WSS_NODE));
        return true;
    }catch(e){
        // console.log(e);
        console.log('Utils : error in connect');
    }
}
