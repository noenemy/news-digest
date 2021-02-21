// ==UserScript==
// @name         AWS What's New Automation
// @namespace    http://elastic.kim/
// @version      0.1
// @description  try to take over the world!
// @author       SoonKeun Kim (@noenemy)
// @include      /^https?://aws\.amazon\.com/about-aws/whats-new/\d{4}\/\d{2}\/[a-z]+
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

var LOCAL_STORAGE_NAME = "whatsnew_automation_localstorage";
var localStorageEnabled = isLocalStorageEnabled();
var currentPageUrl = window.location.href;

function isLocalStorageEnabled() {
    if (typeof(Storage) !== "undefined") {
        return true;
    }

    // The current brwoser doesn't support local storage feature
    return false;
}

function addOrRemoveWhatsNewItemToCart() {
    var current_page_url = window.location.href;
    var array = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
    if (array === null) {
        array = [];
    }

    if (isUrlInCart(currentPageUrl) === true) {
        var index = array.indexOf(currentPageUrl);
        array.splice(index, 1);
    } else {
        array.push(currentPageUrl);
    }
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(array));

    // refresh UI
    showWhatsNewCartItemCount();
    showAddOrRemoveCartItemButton();
}

function isUrlInCart(url) {
    var array = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
    if (array === null) {
        console.log("local Storge not found.");
        return false;
    }
    //console.log(array);

    if (array.find((e) => e === url)) {
        return true;
    }

    return false;
}

function showAddOrRemoveCartItemButton() {

    var element = document.getElementById('whatsnew_button__addtocart');

    if (isUrlInCart(currentPageUrl) === true) {
        element.innerHTML = "[Remove from Cart]";
    } else {
        element.innerHTML = "[Add to Cart]";
    }
}

function showWhatsNewCartItemCount() {

    var array = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
    if (array === null) {
        array = [];
    }

    var element = document.getElementById('whatsnew_button__cart');
    element.innerHTML = "[Cart(" + array.length + ")]";
}

function showWhatsNewAutomationButtons() {

    // Create button elements
    var span = document.createElement('span');

    span.innerHTML = ' <a id="whatsnew_button__saveasppt" onclick="saveAsPPT()" href="#">[Save as PPT]</a>';
    if (localStorageEnabled === true) {
    span.innerHTML +=
        ' <a id="whatsnew_button__addtocart" href="#">[Add to Cart]</a>' +
        ' <a id="whatsnew_button__cart" onclick="checkOut()" href="#">[Cart(0)]</a>';
    }

    // Attach to the page
    var date_span = document.getElementsByClassName('date');
    date_span[0].appendChild(span);

    // Add event listeners
    var addtocart_link = document.getElementById('whatsnew_button__addtocart');
    if (addtocart_link) {
        console.log("found");
        addtocart_link.addEventListener("click", addOrRemoveWhatsNewItemToCart);
    } else {
        console.log("not found");
    }
}

(function() {
    'use strict';

    // Your code here...
    showWhatsNewAutomationButtons();
    showWhatsNewCartItemCount();
    showAddOrRemoveCartItemButton();

})();