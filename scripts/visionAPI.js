console.log('right before loadCLient');

var http = function(method, url, body, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) { return; }
        if (xhr.status >= 400) {
            console.log('XHR failed', xhr.responseText);
            return;
        }
        cb(JSON.parse(xhr.responseText));
    };
    xhr.send(body);
};

var data = {
    'requests': [
        {
            'image': {
                'source': {
                    'imageUri': 'https://www.petmd.com/sites/default/files/petmd-cat-happy-10.jpg',
                },
            },
            'features': [
                {
                    'maxResults': 5,
                    'type': 'LABEL_DETECTION',
                },
            ],
            'imageContext': {},
        },
    ],
}


function getImageData() {
    http('POST',
        'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDaBwDtrwcTIpQf4wAHi_GaCtnBahXdLFs',
        JSON.stringify(data), function(obj) {
            console.log(obj);
        });

}

// http('GET', chrome.runtime.getURL('config.json'), '', function (obj) {
//     API_KEY = obj.key;
//     document.dispatchEvent(new Event('config-loaded'));
// });
//
//
// function loadClient() {
//     gapi.client.setApiKey("AIzaSyDaBwDtrwcTIpQf4wAHi_GaCtnBahXdLFsp");
//     return gapi.client.load(
//         'https://content.googleapis.com/discovery/v1/apis/vision/v1p1beta1/rest').
//         then(function() { console.log('GAPI client loaded for API'); },
//             function(err) {
//                 console.error('Error loading GAPI client for API', err);
//             });
// }
//
// // Make sure the client is loaded before calling this method.
// function execute() {
//     console.log("got here");
//     return gapi.client.vision.images.annotate().then(function(response) {
//             // Handle the results here (response.result has the parsed body).
//
//             console.log('Response', response);
//         },
//         function(err) { console.error('Execute error', err); });
// }
//
// gapi.load("client");
