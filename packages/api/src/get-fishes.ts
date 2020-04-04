import { NowRequest, NowResponse } from '@now/node';
import fishData from './fishData.json';
import pkg from '../package.json';

export default (req: NowRequest, res: NowResponse) => {
  res.json({
    version: pkg.version,
    data: fishData,
  });
};
