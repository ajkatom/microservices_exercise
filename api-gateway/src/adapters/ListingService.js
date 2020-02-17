import got from 'got';
import accessEnv from '#root/helpers/accessEnv';

const LISTING_SERVICE_URI = accessEnv('LISTING_SERVICE_URI');

export default class ListingService {
  static async fetchAllListings() {
    const body = await got.get(`${LISTING_SERVICE_URI}/listings`).json();
    return body;
  }
  static async createListing({ description, title }) {
    const body = await got
      .post(`${LISTING_SERVICE_URI}/listings`, { json: { description, title } })
      .json();
    return body;
  }
}
