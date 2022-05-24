//////////////////////////////////////////////////////////
////  Age Gate
//////////////////////////////////////////////////////////

const AgeGate = (() => {

  let debug = false;
	let info = { name : 'AgeGate', version : '1.0' };

  let tools = new Tools();
  let modals = new Modals();

  let modal = {
    id: 'modal--age-gate',
    redirectURL: function() {
      let modalID = this.id;
      return document.getElementById( modalID ).getAttribute( 'data-modal-redirect-url' ) || 'https://pbskids.org';
    },
    timeout: function() {
      let modalID = this.id;
      return document.getElementById( modalID ).getAttribute( 'data-modal-timeout' ) || 3000;
    }
  };
  let cookie = {
  	name: 'shaketown-brewing-co--age-gate',
  	value: 'of-age',
    expires: function() {
      return parseInt( document.getElementById( modal.id ).getAttribute( 'data-cookie-expires' ) ) || 60;
    }
	};

  //////////////////////////////////////////////////////////
	////  Modal Exists
	//////////////////////////////////////////////////////////

  const modalExists = ( $id ) => {
    return document.getElementById( $id ) ? true : false;
  };

  //////////////////////////////////////////////////////////
	////  Gate keeper
	//////////////////////////////////////////////////////////

  const gateKeeper = () => {

    document.querySelectorAll( '#' + modal.id + ' .button' ).forEach( button => {
      button.addEventListener( 'click', ( event ) => {

        let choice = button.getAttribute( 'data-choice' );
        let ofAge = {
          'yes': function() {
            tools.setCookie( cookie.name, cookie.value, cookie.expires() );
            modals.toggleModalVisibility( modal.id, 'close', 0 );
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
    let showAgeGate = !tools.checkCookie( 'shaketown-brewing-co--age-gate', 'of-age' ) ? true : false;
    if ( showAgeGate && modalExists( modal.id ) ) {
      modals.toggleModalVisibility( modal.id, 'show', { closeTrigger: false, disableFocus: true }, modal.timeout() );
    }
    gateKeeper();
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
