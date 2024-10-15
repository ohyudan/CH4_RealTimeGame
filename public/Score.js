import { sendEvent } from './Socket.js';
import { client_handlerMapping } from './client_handlerMapping.js';
//import { current_UserProfile } from './Socket.js';
import { getGameAssets } from './response/client_GameAsset.js';
class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  stageChange = true;
  currentStage = 1000;
  current_Stage_Score = 0;

  scorePerSecond = 0;
  nextScore = 0;

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
    this.first = true;
  }
  chanage_stage() {
    const { stages } = getGameAssets();
    const currentStage = stages.data.find((item) => {
      return item.id === this.currentStage;
    });
    this.currentStage = currentStage.id;
    if (stages.data.length == currentStage.id + 1 - 1000) {
      this.stageChange = false;
    } else {
      const nextStage = stages.data.find((item) => {
        return item.id === this.currentStage + 1;
      });
      this.scorePerSecond = currentStage.scorePerSecond;
      this.nextScore = nextStage.score;
      sendEvent(client_handlerMapping.moveStageHandler, {
        currentStage: currentStage.id,
        targetStage: nextStage.id,
        timestamp: Date.now(),
      });
      this.stageChange = true;
    }
  }
  update(deltaTime) {
    if (this.first === true) {
      this.first = false;
      this.chanage_stage();
      this.scorePerSecond = 1;
    }

    this.current_Stage_Score += deltaTime * 0.001 * this.scorePerSecond; // 스테이지 증감치
    // 스테이지 증가
    if (
      Math.floor(this.current_Stage_Score) >= this.nextScore &&
      this.stageChange
    ) {
      this.stageChange = false;
      // sendEvent(client_handlerMapping.moveStageHandler, {
      //   currentStage: this.currentStage,
      //   targetStage: this.currentStage + 1,
      //   timestamp: Date.now(),
      // });
      this.score += this.current_Stage_Score;
      this.current_Stage_Score = 0;
      this.chanage_stage();
    }
  }

  getItem(itemId) {
    this.score += 0;
  }

  reset() {
    this.score = 0;
    this.stageChange = true;
    this.currentStage = 1000;
    this.current_Stage_Score = 0;
    this.first = true;
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score + this.current_Stage_Score)
      .toString()
      .padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);

    this.drawStage();
  }

  drawStage() {
    const stageY = 50 * this.scaleRatio;
    const fontSize = 30 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = 'black';

    const stageText = `Stage ${this.currentStage - 999}`; // 스테이지 번호 계산
    const stageX =
      this.canvas.width / 2 - this.ctx.measureText(stageText).width / 2;

    this.ctx.fillText(stageText, stageX, stageY);
  }
}

export default Score;
