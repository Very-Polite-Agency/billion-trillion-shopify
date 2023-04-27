import Money from 'money';
import Templates from 'templates';
import Tools from 'tools';

const config = { debug: false, name: 'render.js', version: '1.0' };
const elements = {
  cart: document.querySelectorAll( '.js--cart' ) || [],
  cart_drawer: document.getElementById("drawer-cart__line-items") || false
};

const cartEmptyMessage = () => {
  elements.cart.forEach( element => {
    element.innerHTML = Templates.cartEmptyMessage();
  });
};

const cartLineItemErrorMessage = ( key = '', message = '' ) => {
  alert(message);
};

const cartLineItemRemoveByKey = ( key = '' ) => {
  let element = document.getElementById(`cart-line-item--${key}`) || false;
  if ( element ) {
    anime.timeline({
      targets: element,
      easing: 'easeOutElastic(1, .8)',
      complete: function(anim) {
        element.remove();
      }
    }).add({
      delay: 500,
      duration: 700,
      endDelay: 700,
      translateX: 250,
      opacity: 0,
    }).play
  }
}

const cartLineItemsLinePrice = ( key = '', line_items = [] ) => {
  if ( line_items.length ) {
    for ( let i = 0; i < line_items.length; i++ ) {
      if ( key === line_items[i].key ) {
        ( document.querySelectorAll( `[data-key="${key}"] .cart-line-item__price` ) || [] ).forEach( element => {
          element.innerHTML = Money.format( line_items[i].final_line_price );
        });
      }
    }
  }
};

const cartLineItemsQuantity = ( key = '', quantity = 1, line_items = [] ) => {
  if ( line_items.length ) {
    for ( let i = 0; i < line_items.length; i++ ) {
      if ( key === line_items[i].key ) {
        if ( quantity > line_items[i].quantity ) {
          // show message stating no inventory
          ( document.querySelectorAll( `[data-key="${key}"] input[name="quantity"]` ) || [] ).forEach( element => {
            element.value = line_items[i].quantity;
          });
        }
        break;
      }
    }
  }
};

const cartLineItemsToElement = ( line_items = [], elements = [] ) => {
  elements.forEach( element => {
    let template = '';
    for ( let i = 0; i < line_items.length; i++ ) {
      template += Templates.cartLineItem( line_items[i] );
    }
    element.innerHTML = template;
  });
};

const cartLineItemsTotal = ( line_items_total = 0 ) => {
  ( document.querySelectorAll( '.js--cart-line-items-total' ) || [] ).forEach( element => {
    element.innerHTML = `${line_items_total}`;
  });
};

const cartSubtotal = ( subtotal = 0 ) => {
  ( document.querySelectorAll( '.js--cart-subtotal' ) || [] ).forEach( element => {
    element.innerHTML = Money.format( subtotal );
  });
};

const stockistCountryPopulationGraph = ( element = false, name = '', population = 0 ) => {

  let countryPopulation = population * 1000;
  let regionID = element.id || 'not-set';
  let region = element.dataset.region || '';
  let regionPopulation = parseInt(element.dataset.regionPopulation || 0);
  let regionPopulationPercent = (regionPopulation/countryPopulation).toFixed(2)
  let regionScaleElement = document.getElementById(`${regionID}--scale`) || false;
  let scaleLimit = 13;
  let scalePercent = Math.ceil(scaleLimit * regionPopulationPercent);
  let template = '';

  for ( let i = 0; i < scaleLimit; i++ ) {
    template += `<div class="stockists__region-stats-scale-item${ i < scalePercent ? " active" : "" }"></div>`;
  }

  regionScaleElement.innerHTML = template;

  if ( regionScaleElement ) {
    console.log({ region, regionPopulation, regionPopulationPercent, countryPopulation, scaleLimit, scalePercent });
  }

};

const stockistLocationByRegion = ( element = false, locations = [] ) => {

  if ( element && locations.length ) {

    let cities = [...new Set(locations.map(({ city }) => city))].sort();
    let template = '';

    if ( cities.length ) {
      cities.forEach( city => {

        let locations_by_city = locations.filter( location => ( location.city === city ) );
        let locations_by_city_sorted = locations_by_city.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

        template += `<h3 class="stockists__city">${city}</h3>`;

        if ( locations_by_city_sorted.length ) {
          template += `<div class="stockists__listing">`;
            for ( let j = 0; j < locations_by_city_sorted.length; j++ ) {
              template += Templates.stockistLocation( locations_by_city_sorted[j] );
            }
          template += `</div>`;
        }

      });
    } else {
      template = `
        <div class="stockists__error text--align-center body-copy--primary body-copy--2">
          <p>No stockists for this region yet. Checkback soon!</p>
        </div>
      `;
    }

    element.innerHTML = template;

  }
};

export default {
  cartEmptyMessage,
  cartLineItemErrorMessage,
  cartLineItemRemoveByKey,
  cartLineItemsLinePrice,
  cartLineItemsQuantity,
  cartLineItemsToElement,
  cartLineItemsTotal,
  cartSubtotal,
  stockistCountryPopulationGraph,
  stockistLocationByRegion
};
