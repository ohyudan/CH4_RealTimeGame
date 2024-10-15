export class UserProfile {
  constructor(userId, currentStage) {
    this._userId = userId;
    this._currentStage = currentStage;
  }
  get_userId() {
    return this._userId;
  }
  get_currentStage() {
    return this._currentStage;
  }
  set_currentStage_Plus() {
    this._currentStage++;
  }
}
