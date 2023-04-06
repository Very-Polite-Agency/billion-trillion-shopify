import Render from 'render';
import Tools from 'tools';

const MAX_CACHE_MINUTES = 300;

const config = { debug: true, name: 'stockistsLocations.js', version: '1.0' };
const elements = document.querySelectorAll( '.js--stockist-region' ) || [];
const local_storage_key = 'BT--stockists';

const asyncGetSheetData = async () => {
  return await fetch( `https://sheetdb.io/api/v1/d9l930i37bict`, { method: 'GET' } )
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
    console.log('[ asyncGetSheetData() ] :: Error', error );
  });
};

const init = () => {
  if ( config.debug ) console.log(`[ ${config.name} v.${config.version} initialized ]`);
    if ( elements.length ) {
      if ( Tools.localStorageAvailable() ) {

        // do stuff WITH local storage
        let cached_data = JSON.parse(localStorage.getItem( local_storage_key )) || {};
        let cached_data_last_fetched_date = cached_data?.last_fetched_date || 0;
        let cached_data_expired = Tools.localStorageExpiredByMinutes( cached_data_last_fetched_date, MAX_CACHE_MINUTES );

        if ( cached_data_expired ) {
          asyncGetSheetData().then( locations => {
            localStorage.setItem( local_storage_key, JSON.stringify({
              last_fetched_date: Date.now(),
              locations: locations
            }));
            elements.forEach( element => {
              Render.stockistLocationByRegion( element, locations );
            });
          });
        } else {
          elements.forEach( element => {
            Render.stockistLocationByRegion( element, cached_data.locations );
          });
        }

      } else {

        // do stuff WITHOUT local storage
        asyncGetSheetData().then( locations => {
          elements.forEach( element => {
            Render.stockistLocationByRegion( element, locations );
          });
        });

      }

    }
  if ( config.debug ) console.log(`[ ${config.name} v.${config.version} complete ]`);
};

export default { init };
