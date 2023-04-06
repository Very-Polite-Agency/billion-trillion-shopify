import Render from 'render';
import Tools from 'tools';

const MAX_CACHE_MINUTES = 300;

const config = { debug: true, name: 'stockistsCountries.js', version: '1.0' };
const elements = document.querySelectorAll( '.js--region' ) || [];
const local_storage_key = 'BT--stockist-countries';

const asynGetCountryData = async ( country = '' ) => {
  return await fetch( `https://api.api-ninjas.com/v1/country?name=${country}&max_population`, {
    method: 'GET',
    headers: { 'X-Api-Key': 'pNhvQLUqaHbTbjh+2kTRxA==eULKvCq9hAj06ceu' }
  })
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
    console.log('[ asynGetCountryData() ] :: Error', error );
  });
};

const init = () => {
  if ( config.debug ) console.log(`[ ${config.name} v.${config.version} initialized ]`);
    elements.forEach( element => {

      let country = element.dataset.regionCountry || '';

      if ( Tools.localStorageAvailable() ) {

        // do stuff WITH local storage
        let cached_data = JSON.parse(localStorage.getItem( local_storage_key )) || {};
        let cached_data_last_fetched_date = cached_data?.last_fetched_date || 0;
        let cached_data_expired = Tools.localStorageExpiredByMinutes( cached_data_last_fetched_date, MAX_CACHE_MINUTES );
        let cached_data_country_exists = cached_data?.[country] ? true : false;

        if ( cached_data_expired || !cached_data_country_exists ) {
          asynGetCountryData( country ).then( response => {
            let { population } = response[0];
            cached_data.last_fetched_date = Date.now();
            cached_data[country] = { population };
            localStorage.setItem( local_storage_key, JSON.stringify( cached_data ));
            Render.stockistCountryPopulationGraph( element, country, population );
          });
        } else {
          Render.stockistCountryPopulationGraph( element, country, cached_data[country].population );
        }

      } else {

        // do stuff WITHOUT local storage
        asynGetCountryData( country ).then( response => {
          let { population } = response[0];
          Render.stockistCountryPopulationGraph( element, country, population );
        });

      }

    });
  if ( config.debug ) console.log(`[ ${config.name} v.${config.version} complete ]`);
};

export default { init };
