import gql from 'graphql-tag';
import searchForAddress from './addressQuery';

export const TULLI = {lat: 60.190785, lon: 24.912625};
export const RAUTATIENTORI = {lat: 60.17134, lon: 24.94329};

export const Plan = gql`
  query Plan($from: InputCoordinates, $to: InputCoordinates) {
    plan(from: $from, to: $to) {
      itineraries {
        startTime
        endTime
        duration
        waitingTime
        walkTime
        walkDistance
        elevationGained
        elevationLost
      }
    }
  }
`;

export const getAddress = async (address) => {
  const addressResult = await searchForAddress(address);
  return addressResult.data.features.map((feature) => {
    return {lat: feature.geometry.coordinates[1], lon: feature.geometry.coordinates[0]};
  })[0];
};
