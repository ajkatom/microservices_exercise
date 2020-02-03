import ListingService from '#root/adapters/ListingService';

const createListingResolver = async (obj, { description, title }, context) => {
  if (!context.res.locals.userSession) throw new Error('You must be logged in to Post');
  return await ListingService.createListing({ description, title });
};

export default createListingResolver;
