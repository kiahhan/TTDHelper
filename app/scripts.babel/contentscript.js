'use strict';

console.log('\'Allo \'Allo! Content script...');

var startString = '{Raw url}:';
var endString = '{Elapse time}:';


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) =>{
    if(msg.text === 'report_back'){
        var responseContent = 'nothing';
        var html = document.all[0].outerHTML; 
        responseContent = html.substring(html.indexOf(startString)+startString.length, html.indexOf(endString)).trim();
        var elem = document.createElement('textarea');
        elem.innerHTML = responseContent;
        var decodedHTML = elem.value;
        sendResponse(decodedHTML);
    }
});