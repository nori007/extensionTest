
document.getElementById('myCustomEventDiv').addEventListener('myCustomEvent', function (e) {
    var op = e.detail.op;
    var data = e.detail.data;

    var resData;
    switch(op) {
        case 'message' :
        resData = 'message res: ' + data;
        resFunc(resData);
        break;

        case 'save':
        resData = 'save res' + save({'keyName': data}, resFunc);
        break;

        case 'load':
        resData = 'load res' + load('keyName', resFunc);
        break;
    }

    function resFunc(res) {
        var resEvent = new CustomEvent("resEvent", {detail: res});
        document.getElementById('myCustomEventDiv').dispatchEvent(resEvent);
    }
});


function save(data, callback) {
    chrome.storage.sync.set(data, function(res){
        callback('save res: ' + res);
    });
}

function load(key, callback) {
    chrome.storage.sync.get([key], function(res){
        callback('load res: ' + res.keyName);
    });
}

function reqBackground(data) {
    chrome.runtime.onMessage.addListener(repBackground);
}

function repBackground(message, sender, sendRespones) {
    var resEvent = new CustomEvent("resEvent", {detail: message});
    document.getElementById('myCustomEventDiv').dispatchEvent(resEvent);
}