import { gql } from '@apollo/client';

const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      description
      status
      clientId
      client{
        id
        name
      }
    }
  }
`;

export { GET_PROJECTS };