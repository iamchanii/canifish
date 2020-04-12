import Fish, { FishData } from './Fish';

export const API_BASE_URL = 'https://canifish.now.sh/api';
export const GET_FISHES_API = API_BASE_URL + '/fishes';

export default class FishRepository {
  static async fetch() {
    const response = await fetch(GET_FISHES_API);
    const { data: fishDataList } = await response.json();

    return (fishDataList as FishData[]).map((data) => new Fish(data));
  }
}
