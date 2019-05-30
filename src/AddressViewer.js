import React from 'react';
import { Query } from 'react-apollo';
import { RAUTATIENTORI, TULLI, Plan} from './api/durationQuery';

const calculateAverageDurationMins = (data) => {
  const durations = data.plan.itineraries.map(itinerary => itinerary.duration);
  const durationInSeconds = durations.reduce((dur1, dur2) => dur1 + dur2, 0) / durations.length;
  return Math.round((durationInSeconds / 60) * 100) / 100;
}

export default ({addressCoord}) => {
  if (!addressCoord) return <p>Search Results: 0</p>
  return (<div>
    <Query query={Plan} variables={{from: addressCoord, to: RAUTATIENTORI}}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error!: ${error}`;
        return (
          <p>Rautatientorille: {calculateAverageDurationMins(data)} minutes</p>
      )}}
      </Query>
      <Query query={Plan} variables={{from: addressCoord, to: TULLI}}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error!: ${error}`;
        return (
          <p>Töölöntullille: {calculateAverageDurationMins(data)} minutes</p>
      )}}
    </Query>
  </div>)
};