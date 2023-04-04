import Templates from 'templates';
import Tools from 'tools';

const config = { debug: false, name: 'render.js', version: '1.0' };

const stockistRegion = ( element = false, stockists = [] ) => {
  if ( element && stockists.length ) {

    let block_name = 'stockists';
    let region = element.dataset.regionTitle || '';
    let stores_by_region = stockists.filter( store => ( store.region === region ) );
    let cities_by_region = [...new Set(stores_by_region.map(({ city }) => city))].sort();
    let template = '';

    if ( cities_by_region.length ) {
      cities_by_region.forEach( city => {

        let stores_by_city = stores_by_region.filter( store => ( store.city === city ) );
        let stores_by_city_sorted = stores_by_city.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

        template += `<h3 class="${block_name}__city">${city}</h3>`;

        if ( stores_by_city_sorted.length ) {
          template += `<div class="${block_name}__listing">`;
            for ( let j = 0; j < stores_by_city_sorted.length; j++ ) {
              template += Templates.stockistLocation( stores_by_city_sorted[j] );
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

export default { stockistRegion };
