import { getStage, setStage } from '../models/stage.model.js';
import { getGameAssets } from '../init/assets.js';

export const moveStageHandler = (userId, payload) => {
  // 유저의 현재 스테이지 배열을 가져오고, 최대 스테이지 ID를 찾는다.
  let currentStages = getStage(userId);
  if (!currentStages.length) {
    return { status: 'fail', message: 'No stages found for user' };
  }

  // 오름차순 정렬 후 가장 큰 스테이지 ID 확인
  currentStages.sort((a, b) => a.id - b.id);
  const currentStageId = currentStages[currentStages.length - 1].id;

  // payload 의 currentStage 와 비교
  if (currentStageId !== payload.currentStage) {
    return { status: 'fail', message: 'Current stage mismatch' };
  }
  const serverTime = Data.now();
  const elapsedTime = serverTime - currentStage.timestamp / 1000;
  if (elapsedTime < 100 || elapsedTime > 105) {
    return { status: 'fail', message: 'Invalid elapsed Time' };
  }
  // 게임 에셋에서 다음 스테이지의 존재 여부 확인
  const { stages } = getGameAssets();
  if (!stages.data.some((stage) => stage.id === payload.targetStage)) {
    return { status: 'fail', message: 'Target stage does not exist' };
  }

  // 유저의 스테이지 정보 업데이트
  setStage(userId, payload.targetStage, serverTime);
  return { status: 'success', handler: 11 };
};
// 업데이트 과제 데이터 테이블의 정보가 부족해 스테이지가 올라갈수록 시간 당
// 높은 점수 획득 가능 미 구현
