'use strict';

// attention catcher

var tlpNot = document.querySelector('.tlpNot'),
    dictNot = document.querySelector('.dictNot');

var tlpNotBlink = setInterval(function () {
  tlpNot.classList.toggle('toBlink');
}, 1000);
var dictNotBlink = setInterval(function () {
  dictNot.classList.toggle('toBlink');
}, 1000);

// uploadAnimation
var upload = function upload() {

  var mapper = document.querySelector('.logo__title').childNodes;

  var count = 0;
  var uploadAnimation = setInterval(function () {

    count++;
    if (count > mapper.length) {
      count = 0;
    } else {
      mapper[count - 1].classList.toggle('load');
    }
  }, 800);
};

// menu change
document.getElementById('try').focus();

var menuContents = {
  try: document.querySelector('.dropCircle'),
  about: document.querySelector('.aboutScreen'),
  faq: document.querySelector('faqScreen')
};

var inFocus = {
  try: true,
  about: false,
  faq: false
};

var replaceClass = function replaceClass(element, it, withIt, addAfter300) {
  element.className = element.className.replace(it, withIt);
  setTimeout(function () {
    addClass(element, ' ' + addAfter300); // написать тренарный иф
  }, 300);
};

var addClass = function addClass(element, it) {
  element.className = element.className + it;
};

var changeScreen = function changeScreen(id) {

  for (var _id in inFocus) {
    if (inFocus[_id] === _id) {
      return;
    } else if (inFocus[_id]) {
      inFocus[_id] = false;
      replaceClass(menuContents[_id], ' display', ' fadeOutLeft', ' displayNone');
    }
  }

  if (id === 'try') {

    replaceClass(menuContents[id], ' displayNone', '', 'display');
    addClass(menuContents[id], ' fadeInLeft');
    inFocus[id] = true;
  } else {

    replaceClass(menuContents[id], ' displayNone', '', 'display');
    addClass(menuContents[id], ' fadeInRight');
    inFocus[id] = true;
  }
};