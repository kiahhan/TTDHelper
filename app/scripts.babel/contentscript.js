'use strict';

console.log('Start inject and get JSS query URL');

var startString = '{Raw url}:';
var endString = '{Elapse time}:';
var jssURI = 'http://app-solr-highqs';



chrome.runtime.onMessage.addListener((msg, sender, sendResponse) =>{
    console.log('have being invoked..................'+document);
    if(msg.text === 'report_back'){
        var responseContent = 'nothing';
        var html = document.all[0].outerHTML; 
        responseContent = html.substring(html.indexOf(startString)+startString.length, html.indexOf(endString)).trim();
        var elem = document.createElement('textarea');
        elem.innerHTML = responseContent;
        var decodedHTML = elem.value;
        if(decodedHTML.startsWith(jssURI)){
            responseContent = '<a href=\"'+decodedHTML+'\">'+decodedHTML+'</a>';
        } else {
            responseContent= '<span class=\"bg-warning\">Nothing Found in this page</span>';
        } 

        sendResponse(responseContent);
    }
});