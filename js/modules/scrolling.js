import Tools from 'tools';

const config = { debug: true, name: 'scrolling.js', version: '1.0' };
const elements = document.querySelector( 'body, footer, header, main' ) || [];
const classes = {
  atTop: 'scroll-position--at-top',
  scrolled: 'scroll-position--scrolled',
  scrollingDown: 'scroll-position--scrolling-down',
  scrollingUp: 'scroll-position--scrolling-up'
};
const scrollPosition = {
  current: currentScrollPosition(),
  initial: currentScrollPosition(),
  previous: currentScrollPosition(),
  down: false
};

const currentScrollPosition = () => {
  return window.pageYOffset || document.documentElement.scrollTop;
};

const setScrollStateClassesByScrollPosition = () => {

  // assign scroll direction
  scrollPosition.down = ( scrollPosition.current > scrollPosition.previous ) ? true : false;

  // set scrolling action state
  if ( scrollPosition.current > 30 ) {
    Tools.addClass( classes.scrolled, elements );
  } else {
    Tools.removeClass( classes.scrolled, elements );
  }

  // set scroll top position state
  if ( scrollPosition.current === 0 ) {
    Tools.addClass( classes.atTop, elements );
  } else {
    Tools.removeClass( classes.atTop, elements );
  }

  // set scroll direction down state
  if ( scrollPosition.down ) {
    Tools.addClass( classes.scrollingDown, elements );
    Tools.removeClass( classes.scrollingUp, elements );
  } else {
    Tools.addClass( classes.scrollingUp, elements );
    Tools.removeClass( classes.scrollingDown, elements );
  }

  // set previous position and new current
  scrollPosition.previous = scrollPosition.current;
  scrollPosition.current = currentScrollPosition();

};

const init = () => {
  if ( config.debug ) console.log(`[ ${config.name} v.${config.version} initialized ]`);
    setScrollStateClassesByScrollPosition();
  if ( config.debug ) console.log(`[ ${config.name} v.${config.version} complete ]`);
};

export default { init };
