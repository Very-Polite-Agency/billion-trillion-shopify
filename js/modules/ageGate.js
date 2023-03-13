import Cookies from 'cookies';

const config = { debug: true, name: 'ageGate.js', version: '1.0' };
const modal = {
  id: 'age-gate',
  element: () => {
    return document.getElementById( this.id ) || false
  },
  delay: () => {
    return parseInt( this.element.dataset?.delay ?? 4000 );
  },
  redirectURL: () => {
    return this.element.dataset?.redirectUrl ?? 'https://pbskids.org';
  },
  instance: false
};
const cookie = {
	name: 'billion-trillion--age-gate',
  nalue: 'of-age',
  duration: () => {
    return parseInt( modal.element ? modal.element.dataset?.cookieDuration ?? 30 );
  },
  expired: () => {
    return Cookies.get( this.name ) ? false : true;
  }
};

const gateKeeper = () => {
  ( document.querySelectorAll( '#' + modal.id + ' .modal__actions button' ) || [] ).forEach( button => {
    button.addEventListener( 'click', event => {

      let choice = button.dataset.ofAge || '';
      let ofAge = {
        'yes': function() {
          Cookies.set( cookie.name, cookie.value, cookie.duration() );
          let successMessage = document.getElementById('age-gate--success-message') || false;
          if ( successMessage ) {
            successMessage.style.zIndex = "1";
            successMessage.addEventListener('transitionend', function() {
              setTimeout(function(){
                modals.toggleModalVisibility( modal.id, 'close' );
              }, 1250)
            });
            setTimeout(function(){
              successMessage.classList.add('active');
            }, 250);
          }
        },
        'no': function() {
          document.location.replace( modal.redirectURL() );
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
  if ( cookie.expired() && modal.element ) {
    modal.instance = new bootstrap.Modal ( modal.element, {} ) || false;
    showAgeGate( modal.instance, modal.delay );
    gateKeeper();
    // modal.element.addEventListener( 'hide.bs.modal', function (event) {
    //   Cookies.set( cookie.name, cookie.value, cookie.duration() );
    // });
  }
  if ( config.debug ) console.log(`[ ${config.name} v.${config.version} complete ]`);
};

export default { init, modal, cookie };
