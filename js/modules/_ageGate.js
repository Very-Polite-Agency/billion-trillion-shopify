//////////////////////////////////////////////////////////
////  Age Gate
//////////////////////////////////////////////////////////

const AgeGate = (() => {

  let debug = true;
	let info = { name : 'AgeGate', version : '1.0' };

  let tools = new Tools();
  let modals = new Modals();

  let modal = {
    id: 'modal--age-gate',
    redirectURL: function() {
      let modalID = this.id;
      return document.getElementById( modalID ).getAttribute( 'data-redirect-url' ) || 'https://pbskids.org';
    },
    timeout: function() {
      let modalID = this.id;
      return document.getElementById( modalID ).getAttribute( 'data-timeout-milliseconds' ) || 3000;
    }
  };
  let cookie = {
  	name: 'billion-trillion--age-gate',
  	value: 'of-age',
    expires: function() {
      return parseInt( document.getElementById( modal.id ).getAttribute( 'data-days-saved' ) ) || 60;
    }
	};

  //////////////////////////////////////////////////////////
	////  Modal Exists
	//////////////////////////////////////////////////////////

  const modalExists = ( $id ) => {
    return document.getElementById( $id ) ? true : false;
  };

  //////////////////////////////////////////////////////////
	////  Show Modal
	//////////////////////////////////////////////////////////

  const showModal = () => {
    let showAgeGate = tools.cookieExists( cookie.name, cookie.value ) ? false : true;
    showAgeGate = true;
    if ( showAgeGate && modalExists( modal.id ) ) {
      modals.toggleModalVisibility( modal.id, 'show', modal.timeout() );
    }
  };

  //////////////////////////////////////////////////////////
	////  (Age) Gate keeper
	//////////////////////////////////////////////////////////

  const gateKeeper = () => {

    ( document.querySelectorAll( '#' + modal.id + ' .modal__actions button' ) || [] ).forEach( button => {
      button.addEventListener( 'click', event => {

        let choice = button.dataset.ofAge || '';
        let ofAge = {
          'yes': function() {
            tools.setCookie( cookie.name, cookie.value, cookie.expires() );
            alert('yes!');
            // modals.toggleModalVisibility( modal.id, 'close' );
          },
          'no': function() {
            document.location.replace( modal.redirectURL() );
          },
          'default': function () {}
        };

        ( ofAge[choice] || ofAge['default'] )();

      });
    });

  }

	//////////////////////////////////////////////////////////
	////  Public Method | Initialize
	//////////////////////////////////////////////////////////

	const init = () => {
    if ( debug ) console.log( `${info.name}.init() v.${info.version} Started` );
    showModal();
    gateKeeper();
    if ( debug ) console.log( `${info.name}.init() Finished` );
	};

	//////////////////////////////////////////////////////////
	////  Returned Methods
	//////////////////////////////////////////////////////////

	return {
    cookie,
		info,
		init,
    modal
	};

});
