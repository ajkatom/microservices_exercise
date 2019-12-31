const { Listing } = require('#root/db/models');

const setRoutes = app => {
  app.get('/listings', async (req, res, next) => {
    const listings = await Listing.findAll();
    return res.json(listings);
  });
};

export default setRoutes;
