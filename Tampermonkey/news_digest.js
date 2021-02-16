// ==UserScript==
// @name         News Digest
// @namespace    http://elastic.kim
// @version      0.1
// @description  Tampermonkey script for AWS what's new digest
// @author       SoonKeun Kim @noenemy
// @match        https://aws.amazon.com/about-aws/whats-new/2*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

function add_download_button() {
    var current_page_url = window.location.href;
    console.log(current_page_url);

    var span = document.createElement('span');

    span.innerHTML = ' <a href="#">[Save as PPT]</a>';
    var date_span = document.getElementsByClassName('date');
    console.log(date_span);
    date_span[0].appendChild(span);
}

(function() {
    'use strict';

    // Your code here...
    add_download_button();

})();