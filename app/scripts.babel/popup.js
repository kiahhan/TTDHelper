'use strict';

console.log('Newegg online troubleshooting tools - develope by Kiah Han.');

var debugURL = '';

/*
chrome.tabs.getSelected(null, tab =>{
    document.getElementById('container').innerHTML = '<span>http://www.newegg.com</span><h2>'+tab.url+'</h2>';
    var tabURL = tab.url;
    if(tabURL.toLowerCase().includes('newegg.com')){
        debugURL = tabURL + '&TerribleTerribleDamage=1';
        document.getElementById('container').innerHTML = '<span>'+debugURL+'</span>';
    }
});
*/

chrome.tabs.query({active:true, currentWindow:true}, tabs=>{
    document.getElementById('container').innerHTML = '<span>http://www.newegg.com</span><h2>'+tabs[0].url+'</h2>';
    var tabURL = tabs[0].url;
    if(detectNewegg(tabURL)){
        if(tabURL.includes('&')){
            debugURL = tabURL + '&' +ttd;
        }else{
            debugURL = tabURL + '?' +ttd;
        }
        document.getElementById('container').innerHTML = '<span>'+debugURL+'</span>';
    }
});

function doStuffWithDom(jssURL){
    document.getElementById('container').innerHTML = jssURL;
    chrome.tabs.create({url: document.getElementById('container').innerText});
}


$('#tryBtn').click(event=>{
    alert('jQuery is installed.');
});



document.getElementById('openBtn').onclick = function(){
    //chrome.tabs.create({url: debugURL});
    chrome.tabs.query({active: true, currentWindow: true}, tabs =>{
        chrome.tabs.sendMessage(tabs[0].id, {text: 'report_back'}, doStuffWithDom);
    }); 
}

document.getElementById('hackBtn').onclick = function(){
    chrome.tabs.query({'active': true}, tabs =>{
        chrome.tabs.update(tabs[0].id, {url: debugURL});
    });
}

