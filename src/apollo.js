import ApolloClient from 'apollo-boost';

export default new ApolloClient({
  uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
});
