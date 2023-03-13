import AgeGate from './modules/ageGate';
import Credits from './modules/credits';
import Forms from './modules/forms';
import Gliders from './modules/gliders';
import Scrolling from './modules/scrolling';
import Tools from './modules/tools';

AgeGate.init();
Credits.init();
Forms.init();
Gliders.init();
Scrolling.init();

AOS.init({
  offset: 150,                // offset (in px) from the original trigger point
  delay: 0,                   // values from 0 to 3000, with step 50ms
  duration: 500,              // values from 0 to 3000, with step 50ms
  easing: 'ease-in-out',      // default easing for AOS animations
});

window.addEventListener( 'load', function (e) {
  Gliders.init();
  AOS.refresh();
});

window.addEventListener( 'resize', Tools.debounce(() => {
  // debounced resize based functions here
  Scrolling.init();
}, 300));

window.addEventListener( 'scroll', Tools.debounce(() => {
  // debounced scroll based functions here
  Scrolling.init();
}, 300));
