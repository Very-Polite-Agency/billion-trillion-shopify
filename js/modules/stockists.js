import Render from 'render';
import SheetDB from 'sheetdb-js'
import Tools from 'tools';

const cache_limit = { days: 2, hours: 24, minutes: 300 };
const config = { debug: true, name: 'stockists.js', version: '1.0' };
const elements = document.querySelectorAll( '.js--stockist-region' ) || [];
const endpoint = 'https://sheetdb.io/api/v1/d9l930i37bict';
const storage = {
  data: {},
  name: 'BT--stockists',
};

const asyncGetSheetData = async () => {

  return await fetch( endpoint, { method: 'GET' } )
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
    console.log('[ asyncGetToken() ] :: Error', error );
  });

};

const localStorageExpired = ( data = {} ) => {

  let now = Date.now();
  let storage_date = data?.date || 0;
  let date_difference_milliseconds = now - storage_date;
  let date_difference_days = (date_difference_milliseconds / (1000 * 3600 * 24));
  let date_difference_minutes = ( date_difference_milliseconds / 60000 ).toFixed(2);

  if ( storage_date ) {
    if ( date_difference_minutes > cache_limit.minutes ) {
      return true;
    }
    return false;
  }
  return true;

};

const init = () => {
  if ( config.debug ) console.log(`[ ${config.name} v.${config.version} initialized ]`);
    if ( Tools.localStorageAvailable() && elements.length ) {

      storage.data = JSON.parse(localStorage.getItem( storage.name )) || false;
      storage.data_expired = localStorageExpired( storage.data );

      if ( storage.data_expired ) {
        asyncGetSheetData().then( stockists => {
          localStorage.setItem( storage.name, JSON.stringify({ date: Date.now(), stockists: stockists }) );
          elements.forEach( element => {
            Render.stockistRegion( element, stockists );
          });
        });
      } else {
        elements.forEach( element => {
          Render.stockistRegion( element, storage.data.stockists );
        });
      }

    }
  if ( config.debug ) console.log(`[ ${config.name} v.${config.version} complete ]`);
};

export default { init };
