// @codekit-prepend "./modules/_ageGate.js";
// @codekit-prepend "./modules/_credits.js";
// @codekit-prepend "./modules/_breakpoints.js";
// @codekit-prepend "./modules/_forms.js";
// @codekit-prepend "./modules/_modals";
// @codekit-prepend "./modules/_scrolling.js";
// @codekit-prepend "./modules/_sizing.js";
// @codekit-prepend "./modules/_tools.js";

//////////////////////////////////////////////////////////////////////////////////////////
////  Execute Theme
//////////////////////////////////////////////////////////////////////////////////////////

let modules = [
  new AgeGate(),
  new Credits(),
  new Forms(),
  new Scrolling(),
];

modules.forEach( module => module.init() );

AOS.init({
  offset: 175,                // offset (in px) from the original trigger point
  delay: 0,                   // values from 0 to 3000, with step 50ms
  duration: 550,              // values from 0 to 3000, with step 50ms
  easing: 'ease-in-out',      // default easing for AOS animations
});
