import createFishData from '../../testing/createFishData';
import FishRepository, { GET_FISHES_API } from '../FishRepository';

const mockFishData = createFishData();

const fetchSpy = jest.spyOn(window, 'fetch').mockResolvedValue({
  json() {
    return {
      version: 'test',
      data: [mockFishData],
    };
  },
} as any);

it('물고기 목록을 잘 요청해서 받아온다.', async () => {
  const fishes = await FishRepository.fetch();
  expect(fishes.length).toBe(1);
  expect(fishes[0].data).toBe(mockFishData);

  expect(fetchSpy).toHaveBeenCalledTimes(1);
  expect(fetchSpy).toHaveBeenLastCalledWith(GET_FISHES_API);
});
