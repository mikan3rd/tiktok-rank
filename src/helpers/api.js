import ApiClient from './ApiClient';

const client = new ApiClient();

class GnaviApi {

  static async get(params) {
    const endpoint = '/gnavi';

    try {
      return await client.request('GET', endpoint, params);
    } catch (e) {
      console.log('エラー:', e);
      return {data: []};
    }
  }
}

class HotpepperApi {

    static async get(params) {
      const endpoint = '/hotpepper';

      try {
        return await client.request('GET', endpoint, params);
      } catch (e) {
        console.log('エラー:', e);
        return {data: []};
      }
    }
  }

class ChargeApi {

    static async post(token) {
      const endpoint = '/charge';

      try {
        return await client.request('POST', endpoint, token);
      } catch (e) {
        console.log('エラー:', e);
        return {data: []};
      }
    }
  }


export {
  GnaviApi,
  HotpepperApi,
  ChargeApi,
};
