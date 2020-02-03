import { Listing } from '#root/db/models';

const setRoutes = app => {
  app.get('/listings', async (req, res, next) => {
    try {
      const listings = await Listing.findAll();
      return res.json(listings);
    } catch (e) {
      return next(e);
    }
  });

  app.post('/listings', async (req, res, next) => {
    if (!req.body.description || !req.body.title) {
      return next(new Error('!invalid body! or title!'));
    }
    try {
      const newListing = await Listing.create({
        title: req.body.title,
        description: req.body.description,
      });
      return res.json(newListing);
    } catch (e) {
      return next(e);
    }
  });
};

export default setRoutes;
