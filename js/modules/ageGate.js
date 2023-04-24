import Cookies from 'cookies';

const config = { debug: true, name: 'ageGate.js', version: '1.0' };
const modal = {
  element: document.getElementById('age-gate') || false,
  instance: false
};
const cookie = {
	name: 'billion-trillion--age-gate',
	value: 'of-age',
  delay: function() {
    return parseInt( modal.element.dataset?.delay ?? 4000 );
  },
  duration: function() {
    return parseInt( modal.element.dataset?.cookieDuration ?? 30 );
  },
  expired: function() {
    return Cookies.get( this.name ) ? false : true;
  },
  redirect: function() {
    return modal.element.dataset?.redirectUrl ?? 'https://www.pbs.org';
  }
};

const enableGateKeeper = () => {

  showAgeGate( modal.instance, cookie.delay() );

  ( modal.element.querySelectorAll( 'button' ) || [] ).forEach( button => {
    button.addEventListener( 'click', event => {

      let choice = button.dataset.ofAge || '';
      let ofAge = {
        'yes': function() {
          modal.instance.hide();
        },
        'no': function() {
          document.location.replace( cookie.redirect() );
        },
        'default': function () {}
      };

      ( ofAge[choice] || ofAge['default'] )();

    });
  });
};

const showAgeGate = ( modal = false, delay = 0 ) => {
  if ( modal ) {
    setTimeout(() => {
      modal.show();
    }, delay );
  }
};

const init = () => {
  if ( config.debug ) console.log(`[ ${config.name} v.${config.version} initialized ]`);
  if ( modal.element && cookie.expired() ) {

    modal.instance = new bootstrap.Modal(modal.element, {}) || false;
    modal.element.addEventListener( 'hide.bs.modal', function (event) {
      Cookies.set( cookie.name, cookie.value, cookie.duration() );
    });

    enableGateKeeper();

  }
  if ( config.debug ) console.log(`[ ${config.name} v.${config.version} complete ]`);
};

export default { init };

