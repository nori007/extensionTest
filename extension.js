console.log('extension content script load2');
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
            resData = save('key' + data.replace(/ /gi, ""), 'data: '+data, resFunc);
            break;

        case 'load':
            resData = load('key' + data.replace(/ /gi, ""), resFunc);
            break;

        case 'remove':
            resData = remove('key' + data.replace(/ /gi, ""), resFunc);
            break;
        case 'all':
            resData = allList(resFunc);
            break;
    }

    function resFunc(res) {
        var resEvent = new CustomEvent("resEvent", {detail: res});
        document.getElementById('myCustomEventDiv').dispatchEvent(resEvent);
    }
});


function save(key, data, callback){
    var str = '{"' + key.toString() + '":"' + data.toString() + '"}';

    // chrome: chrome.storage.local.~;
    browser.storage.local.set(JSON.parse(str), function(res){
        callback('save res: ' + res);
    });
}

function load(key, callback) {
    // chrome: chrome.storage.local.~;
    browser.storage.local.get([key], function(res){
        callback('load res: ' + res[key]);
    });
}

function remove(key, callback) {
    // chrome: chrome.storage.local.~;
    browser.storage.local.remove([key], function(res){
        callback('remove res: ' + res);
    })   
}

function allList(callback) {
    // chrome: chrome.storage.local.~;
    browser.storage.local.get(null, function(res){
        callback('allList res: ' + JSON.stringify(res));
    })
}