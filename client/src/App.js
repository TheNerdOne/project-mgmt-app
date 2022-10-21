import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Clients from './components/clients/Clients';
import AddProject from './components/projects/AddProject';
import Projects from './components/projects/Projects';


const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

const App = () => {


  return (
    <>
      <ApolloProvider client={client}>
        <Clients />
        <Projects/>
        <AddProject />
      </ApolloProvider>
    </>
  )



}


export default App;
