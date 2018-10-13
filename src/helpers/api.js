import ApiClient from './ApiClient';

const client = new ApiClient();

class TikTokApi {

  static async getUserList(params) {
    const endpoint = '/tiktok/users';

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
  TikTokApi,
  ChargeApi,
};
