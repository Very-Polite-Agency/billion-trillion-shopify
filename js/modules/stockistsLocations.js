import Render from 'render';
import Tools from 'tools';

const MAX_CACHE_MINUTES = 1 * 1440;

const config = { debug: true, name: 'stockistsLocations.js', version: '1.0' };
const elements = document.querySelectorAll( '.js--stockist-region' ) || [];
const local_storage_key = 'BT--stockist-regions';

const asyncGetSheetData = async ( region = '' ) => {
  return await fetch(
    `https://sheetdb.io/api/v1/d9l930i37bict/search?hidden=!TRUE&region=${region}`,
    { method: 'GET' }
  ).then((response) => {
    return response.json();
  })
  .catch((error) => {
    console.log('[ asyncGetSheetData() ] :: Error', error );
  });
};

const init = () => {
  if ( config.debug ) console.log(`[ ${config.name} v.${config.version} initialized ]`);
    elements.forEach( element => {

      let region = element.dataset.region || '';

      if ( Tools.localStorageAvailable() ) {

        // do stuff WITH local storage
        let cached_data = JSON.parse(localStorage.getItem( local_storage_key )) || {};
        let cached_data_last_fetched_date = cached_data?.last_fetched_date || 0;
        let cached_data_expired = Tools.localStorageExpiredByMinutes( cached_data_last_fetched_date, MAX_CACHE_MINUTES );
        let cached_data_region_exists = cached_data?.[region] ? true : false;

        if ( cached_data_expired || !cached_data_region_exists ) {
          asyncGetSheetData( region ).then( locations => {
            cached_data.last_fetched_date = Date.now();
            cached_data[region] = locations;
            localStorage.setItem( local_storage_key, JSON.stringify( cached_data ));
            Render.stockistLocationByRegion( element, locations );
          });
        } else {
          Render.stockistLocationByRegion( element, cached_data[region] );
        }

      } else {

        // do stuff WITHOUT local storage
        asyncGetSheetData( region ).then( locations => {
          Render.stockistLocationByRegion( element, locations );
        });

      }

    });
  if ( config.debug ) console.log(`[ ${config.name} v.${config.version} complete ]`);
};

export default { init };
