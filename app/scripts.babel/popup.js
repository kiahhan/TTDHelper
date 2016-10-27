'use strict';

console.log('Newegg online troubleshooting tools - develope by Kiah Han.');

var debugURL = '';

/*
chrome.tabs.query({active:true, currentWindow:true}, tabs=>{
    $('#textline').html('<span>http://www.newegg.com</span><h2>'+tabs[0].url+'</h2>');
    var tabURL = tabs[0].url;
    if(detectNewegg(tabURL)>=0){
        if(tabURL.includes('&')){
            debugURL = tabURL + '&' +ttd;
        }else{
            debugURL = tabURL + '?' +ttd;
        }
        $('#textline').html('<span>'+debugURL+'</span>');
    }
});
*/
query_tab('LOAD');

function parser_jss(response){
    $('#textline').html(response);
    if($('#textline').html().startsWith('<a href')){
        $('#new').removeClass('hidden');
        $('#new').bind('click', ()=>{
            chrome.tabs.create({url: $('#textline').text()});
        });
    }  
}

function query_tab(action){
    chrome.tabs.query({active: true, currentWindow: true}, tabs =>{
        if(action === 'PARSE'){
            chrome.tabs.sendMessage(tabs[0].id, {text: 'report_back'}, parser_jss);
        }else if(action === 'UPDATE'){
            chrome.tabs.update(tabs[0].id, {url: debugURL});
        } else {
            var tabURL = tabs[0].url;
            debugURL = tabURL;
            var urlDetector = detectNewegg(tabURL);
            if(urlDetector==1){
                query_tab('PARSE');
            }else if(urlDetector == 0){
                if(tabURL.includes('&')){
                    debugURL = tabURL + '&' +ttd;
                }else{
                    debugURL = tabURL + '?' +ttd;
                }
            }else{
                debugURL = tabURL;
            }
            $('#textline').html('<span class=\"bg-info\">'+debugURL+'</span>');
        }
    }); 
}

$('#openBtn').click(()=>{
    //chrome.tabs.create({url: debugURL});
    // chrome.tabs.query({active: true, currentWindow: true}, tabs =>{
    //     chrome.tabs.sendMessage(tabs[0].id, {text: 'report_back'}, parser_jss);
    // }); 
    query_tab('PARSE');
});

$('#hackBtn').click(()=>{
    // chrome.tabs.query({'active': true}, tabs =>{
    //     chrome.tabs.update(tabs[0].id, {url: debugURL});
    // });
    query_tab('UPDATE');
});

