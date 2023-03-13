import Glide from "@glidejs/glide";

const config = { debug: true, name: 'gliders.js', version: '1.0' };
const events = [ "build.after", "run.after" ];
const gliders = {};

const createGliderFromElement = ( element = {} ) => {

  let element_id = element?.id ?? '';
  let animationDuration = parseInt( element.dataset?.glideAnimationDuration ) ?? 450;
  let autoplay = parseInt( element.dataset?.glideAutoplay ) ?? 3500;
  let gap = parseInt( element.dataset?.glideGap ) ?? 36;
  let style = element.dataset?.glideStyle ?? '';
  let options = getOptions({ animationDuration, autoplay, gap });

  switch ( style ) {
    case 'instagram-feed' : {
      options.breakpoints = {
        // up to 9999
        9999: {
          gap: gap,
          peek: { before: 0, after: 175 },
          perView: 3
        },
        // up to 1400
        1399: {
          gap: gap,
          peek: { before: 0, after: 175 },
          perView: 2
        },
        // up to 1200
        1199: {
          gap: gap,
          peek: { before: 0, after: 175 },
          perView: 2
        },
        // up to 992
        991: {
          gap: gap,
          peek: { before: 0, after: 100 },
          perView: 2
        },
        // up to 768
        767: {
          gap: gap,
          peek: { before: 0, after: 150 },
          perView: 1
        },
        // up to 576
        575: {
          gap: gap,
          peek: { before: 0, after: 100 },
          perView: 1
        }
      };
      break;
    }
  }

  let glide = new Glide( "#" + element_id, options );

  glide.on( events, event => {
    setTimeout(() => {
      updateGlideTrackHeight( element );
    }, 100 );
  });

  ( document.querySelectorAll('[data-glide-navigation="#' + element_id + '"].next' ) || [] ).forEach( button => {
    button.addEventListener("click", function () {
      glide.go(">");
    });
  });

  ( document.querySelectorAll( '[data-glide-navigation="#' + element_id + '"].prev' ) || [] ).forEach( button => {
    button.addEventListener("click", function () {
      glide.go("<");
    });
  });

  glide.mount();

  // FIX for when single slide doesn't fill 100% of Glider
  setTimeout( () => { glide.update() }, 250 );

  gliders[element_id] = { element_id, glide };

};

const getOptions = ( custom = {} ) => {

  let standard = {
    animationTimingFunc: "ease-in-out",
    animationDuration: 450,
    autoHeight: true,
    autoplay: 3250,
    dragThreshold: 20,
    perView: 1,
    swipeThreshold: 20,
    type: "carousel",
    rewind: true,
    throttle: 50,
    gap: 20,
  };

  return { ...standard, ...custom };

};

const updateGlideTrackHeight = ( element = false ) => {
  if ( element ) {

    let active_slide = element.querySelector( '.glide__slide--active' ) || false;
    let glide_track = element.querySelector( '.glide__track' ) || false;

    if ( active_slide && glide_track ) {

      let active_slide_height = active_slide.offsetHeight;
      let glide_track_height = glide_track.offsetHeight;

      if ( glide_track_height != active_slide_height ) {
        // glide_track.style.height = active_slide_height + 'px';
      }

    }

  }
};

const init = () => {
  if ( config.debug ) console.log(`[ ${config.name} v.${config.version} initialized ]`);
    ( document.querySelectorAll( '.js--glide' ) || [] ).forEach( element => {
      createGliderFromElement( element );
    });
  if ( config.debug ) console.log(`[ ${config.name} v.${config.version} complete ]`);
};

export default {
  createGliderFromElement,
  getOptions,
  gliders,
  init
};
