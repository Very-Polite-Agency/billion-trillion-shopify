const addClass = ( $class = '', $elements = [] ) => {
  if ( $class && $elements.length ) {
    for( let i = 0; i < $elements.length; i++ ) {
      if ( $elements[i] ) {
        $elements[i].classList.add( $class );
      }
    }
  }
};

const addClassesToElements = ( classes = [], elements = [] ) => {
  if ( classes.length && elements.length ) {
    elements.forEach( element => {
      element.classList.add( ...classes );
    });
  }
};

const debounce = (func, delay) => {
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

const getArrayOfElementsByTag = ( $elements = [ 'body', 'footer', 'header', 'main' ] ) => {
  let filteredElements = $elements.filter( tag => { return document.getElementsByTagName( tag )[0] } ) || [];
  return filteredElements.map( tag => document.getElementsByTagName( tag )[0] ) || [];
};

const getElementHeightByTag = ( $tag = '' ) => {
  return document.getElementsByTagName( $tag )[0].offsetHeight || 0;
};

const getLocalStorageValueByKey = ( $key ) => {
  return localStorage.getItem( $key );
}

const getTimeStamp = () => {
  let d = new Date();
  return d.getTime();
}

const removeClass = ( $class = '', $elements = [] ) => {
  if ( $class && $elements.length ) {
    for( let i = 0; i < $elements.length; i++ ) {
      if ( $elements[i] ) {
        $elements[i].classList.remove( $class );
      }
    }
  }
};

const removeClassesFromElements = ( classes = [], elements = [] ) => {
  if ( classes.length && elements.length ) {
    elements.forEach( element => {
      element.classList.remove( ...classes );
    });
  }
};

const setCSSVariable = ( $id = '', $value = '' ) => {
  if ( $id && $value ) {
    document.documentElement.style.setProperty( '--' + $id, $value );
  }
};

const setHeaderHeightTotalCSSVariable = () => {
  setCSSVariable('theme-header-height-total', getElementHeightByTag('header') + 'px'  );
};

const setLocalStorage = ( $key, $value ) => {
  localStorage.setItem( $key, $value );
};

const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

const toggleClass = ( $class = '', $elements = [] ) => {
  if ( $class && $elements.length ) {
    for( let i = 0; i < $elements.length; i++ ) {
      if ( $elements[i] ) {
        $elements[i].classList.toggle( $class );
      }
    }
  }
};

export default {
  addClass,
  addClassesToElements,
  debounce,
  getArrayOfElementsByTag,
  getElementHeightByTag,
  getLocalStorageValueByKey,
  getTimeStamp,
  removeClass,
  removeClassesFromElements,
  setCSSVariable,
  setHeaderHeightTotalCSSVariable,
  setLocalStorage,
  toggleClass,
  throttle
};