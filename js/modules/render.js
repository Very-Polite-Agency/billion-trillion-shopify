import Templates from 'templates';
import Tools from 'tools';

const config = { debug: false, name: 'render.js', version: '1.0' };

const stockistCountryPopulationGraph = ( element = false, name = '', population = 0 ) => {
  console.log( 'stockistCountryPopulationGraph() ', element, name, population );
};

const stockistLocationByRegion = ( element = false, stockist_locations = [] ) => {

  if ( element && stockist_locations.length ) {

    let block_name = 'stockists';
    let region = element.dataset.region || '';
    let locations_by_region = stockist_locations.filter( location => location.region === region && location.hidden !== 'TRUE' );
    let cities_by_region = [...new Set(locations_by_region.map(({ city }) => city))].sort();
    let template = '';

    if ( cities_by_region.length ) {
      cities_by_region.forEach( city => {

        let locations_by_city = locations_by_region.filter( location => ( location.city === city ) );
        let locations_by_city_sorted = locations_by_city.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

        template += `<h3 class="${block_name}__city">${city}</h3>`;

        if ( locations_by_city_sorted.length ) {
          template += `<div class="${block_name}__listing">`;
            for ( let j = 0; j < locations_by_city_sorted.length; j++ ) {
              template += Templates.stockistLocation( locations_by_city_sorted[j] );
            }
          template += `</div>`;
        }

      });
    } else {
      template = `
        <div class="${block_name}__error text--align-center body-copy--primary body-copy--2">
          <p>No stockists for this region yet. Checkback soon!</p>
        </div>
      `;
    }

    element.innerHTML = template;

  }
};

export default { stockistCountryPopulationGraph, stockistLocationByRegion };
