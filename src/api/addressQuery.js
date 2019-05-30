import axios from 'axios';

const digitransitGeocodingUrl = 'https://api.digitransit.fi/geocoding/v1/search?text=';

const searchForAddress = (address) => axios.get(`${digitransitGeocodingUrl}${address}&size=1`);

export default searchForAddress;
