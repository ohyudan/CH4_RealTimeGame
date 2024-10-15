import { gameAssets_Setup } from './client_GameAsset.js';
import { client_handlerMapping } from '../client_handlerMapping.js';
class response_data {
  constructor() {
    this._result_data = null;
  }
  result(data) {
    if (!data) {
      console.error('responese 실패 - data가 없습니다.');
    }
    switch (data.handler) {
      case client_handlerMapping.first_GameAssets_Setup:
        this._result_data = data;
        gameAssets_Setup(data);
        break;
      default:
        console.log(data.handler + ': 데이터 결과가 필요하지 않습니다.');
        break;
      case undefined:
        console.error(data.message);
        break;
    }
  }
  get_result_data() {
    return this._result_data;
  }
}
export const client_response_data = new response_data();
