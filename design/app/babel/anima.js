// // attention catcher
//
// let tlpNot = document.querySelector('.tlpNot'),
//     dictNot = document.querySelector('.dictNot');
//
// let tlpNotBlink = setInterval( function() {tlpNot.classList.toggle('toBlink')}, 1000);
// let dictNotBlink = setInterval( function() {dictNot.classList.toggle('toBlink')}, 1000);

// uploadAnimation
let upload = () => {

let mapper = document.querySelector('.logo__title').childNodes;

let count = 0;
  let uploadAnimation = setInterval(function() {

    count++;
    if (count > mapper.length) {
      count = 0;
    } else {
      mapper[count - 1].classList.toggle('load');
    }

  }, 800);
}

// // menu change
// document.getElementById('try').focus();
//
// let menuContents = {
//   try: document.querySelector('.dropCircle'),
//   about: document.querySelector('.aboutScreen'),
//   faq: document.querySelector('faqScreen')
// }
//
// let inFocus = {
//   try: true,
//   about: false,
//   faq: false
// }
//
// let replaceClass = (element, it, withIt, addAfter300) => {
//   element.className = element.className.replace(it, withIt);
//   setTimeout( () => {
//     addClass(element, ` ${addAfter300}`);// написать тренарный иф
//   }, 300);
// }
//
// let addClass = (element, it) => {
//   element.className = element.className + it;
// }
//
// let changeScreen = id => {
//
//   for (let id in inFocus) {
//     if (inFocus[id] === id) {
//       return;
//     } else if (inFocus[id]) {
//       inFocus[id] = false;
//       replaceClass(menuContents[id], ' display', ' fadeOutLeft',' displayNone');
//     }
//   }
//
//   if (id === 'try') {
//
//     replaceClass(menuContents[id], ' displayNone', '', 'display');
//     addClass(menuContents[id], ' fadeInLeft');
//     inFocus[id] = true;
//
//   } else {
//
//     replaceClass(menuContents[id], ' displayNone', '', 'display');
//     addClass(menuContents[id], ' fadeInRight');
//     inFocus[id] = true;
//
//   }
//
// }
