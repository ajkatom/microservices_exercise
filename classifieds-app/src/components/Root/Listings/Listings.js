import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';

import AddListing from './AddListing/index';

const query = gql`
  {
    listings {
      id
      title
      description
    }
  }
`;

const Title = styled.strong`
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
`;

const Descritption = styled.p`
  margin-bottom: 0;
`;

const Listing = styled.div`
  padding: 1rem 0;
  :not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.veryLightgrey};
  }
`;

const Listings = () => {
  const { loading, error, data, refetch } = useQuery(query);
  if (loading) return '...Loading';
  if (error) return `There is an Error ${error.message}`;
  return (
    <div>
      <div>
        {data.listings.map(listing => (
          <Listing key={listing.id}>
            <Title>{listing.title}</Title>
            <Descritption>{listing.description}</Descritption>
          </Listing>
        ))}
      </div>
      <AddListing onAddListing={() => refetch()} />
    </div>
  );
};

export default Listings;
