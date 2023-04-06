import Templates from 'templates';
import Tools from 'tools';

const config = { debug: false, name: 'render.js', version: '1.0' };

const stockistCountryPopulationGraph = ( element = false, name = '', population = 0 ) => {
  console.log( 'stockistCountryPopulationGraph() ', element, name, population );
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

export default { stockistCountryPopulationGraph, stockistLocationByRegion };
