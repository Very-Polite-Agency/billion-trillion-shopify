//////////////////////////////////////////////////////////
////  Tools
//////////////////////////////////////////////////////////

const Tools = (() => {

  const debug = false;
  const info = { name : 'Tools', version : '1.0' };

  //////////////////////////////////////////////////////////
  ////  Get Cookie
  //////////////////////////////////////////////////////////

  const getCookie = ( $cookieName = '' ) => {

    let name = $cookieName + "=";
    let ca = document.cookie.split(';');

    for ( let i = 0; i < ca.length; i++ ) {
      let c = ca[i];
      while ( c.charAt(0) == ' ' ) {
        c = c.substring(1);
      }
      if ( c.indexOf(name) == 0 ) {
        return c.substring( name.length, c.length );
      }
    }

    return false;

  }

  //////////////////////////////////////////////////////////
  ////  Set Cookie
  //////////////////////////////////////////////////////////

  const setCookie = ( $cookieName = '', $cookieValue = '', $expiresInDays = 1 ) => {

    if ( $cookieName && $cookieValue ) {
      const d = new Date();
      d.setTime( d.getTime() + ( $expiresInDays * 24 * 60 * 60 * 1000 ) );
      let expires = "expires="+d.toUTCString();
      document.cookie = $cookieName + "=" + $cookieValue + ";" + expires + ";path=/";
    } else {
      return false;
    }

  }

  //////////////////////////////////////////////////////////
  ////  Check Cookie
  //////////////////////////////////////////////////////////

  const cookieExists = ( $cookieName = '', $cookieValue = '' ) => {
    if ( $cookieValue === getCookie( $cookieName ) ) {
      return true;
    }
    return false;
  }

  //////////////////////////////////////////////////////////
  ////  Get Local Storage Value by Key
  //////////////////////////////////////////////////////////

  const getLocalStorageValueByKey = ( $key ) => {
    return localStorage.getItem( $key );
  }

  //////////////////////////////////////////////////////////
  ////  Set Local Storage Value
  //////////////////////////////////////////////////////////

  const setLocalStorage = ( $key, $value ) => {
    localStorage.setItem( $key, $value );
  }

  //////////////////////////////////////////////////////////
  ////  Set Total Header Height to CSS Variable
  //////////////////////////////////////////////////////////

  const setHeaderHeightTotalCSSVariable = () => {
    let headerHeight = getElementHeightByTag('header') || false;
    if ( headerHeight ) setCSSVariable( 'theme-header-height--total', headerHeight + 'px' );
  };

  //////////////////////////////////////////////////////////
  ////  Get Element Height by Tag
  //////////////////////////////////////////////////////////

  const getElementHeightByTag = ( $tag = '' ) => {
    let element = document.getElementsByTagName( $tag )[0] || false;
    if ( element ) {
      return element.offsetHeight;
    }
    return 0;
  };

  //////////////////////////////////////////////////////////
  ////  Get Main Elements
  /////////////////////////////////////////////////////////

  const getArrayOfElementsByTag = ( $elements = [ 'body', 'footer', 'header', 'main' ] ) => {
    let filteredElements = $elements.filter( tag => { return document.getElementsByTagName( tag )[0] } ) || [];
    return filteredElements.map( tag => document.getElementsByTagName( tag )[0] ) || [];
  };

  //////////////////////////////////////////////////////////
  ////  Add Class
  //////////////////////////////////////////////////////////

  const addClass = ( $class = '', $elements = [] ) => {
    if ( $class && $elements.length ) {
      for( let i = 0; i < $elements.length; i++ ) {
        if ( $elements[i] ) {
          $elements[i].classList.add( $class );
        }
      }
    }
  };

  //////////////////////////////////////////////////////////
  ////  Remove Class
  //////////////////////////////////////////////////////////

  const removeClass = ( $class = '', $elements = [] ) => {
    if ( $class && $elements.length ) {
      for( let i = 0; i < $elements.length; i++ ) {
        if ( $elements[i] ) {
          $elements[i].classList.remove( $class );
        }
      }
    }
  };

  //////////////////////////////////////////////////////////
  ////  Toggle Class
  //////////////////////////////////////////////////////////

  const toggleClass = ( $class = '', $elements = [] ) => {
    if ( $class && $elements.length ) {
      for( let i = 0; i < $elements.length; i++ ) {
        if ( $elements[i] ) {
          $elements[i].classList.toggle( $class );
        }
      }
    }
  };

  //////////////////////////////////////////////////////////
  ////  Set CSS Variable
  //////////////////////////////////////////////////////////

  const setCSSVariable = ( $id = '', $value = '' ) => {
    if ( $id && $value ) {
      document.documentElement.style.setProperty( '--' + $id, $value );
    }
  };

  //////////////////////////////////////////////////////////
  ////  Returned
  //////////////////////////////////////////////////////////

  return {
    addClass,
    cookieExists,
    debug,
    getCookie,
    getLocalStorageValueByKey,
    getElementHeightByTag,
    getArrayOfElementsByTag,
    info,
    removeClass,
    setCookie,
    setCSSVariable,
    setLocalStorage,
    setHeaderHeightTotalCSSVariable,
    toggleClass
  };

});
