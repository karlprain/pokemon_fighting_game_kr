import Phaser from 'phaser';
import { getGameFlowController } from '../state/gameFlow';
import { createSceneHeading, createTextButton } from './sceneUi';

export default class ResultScene extends Phaser.Scene {
  constructor() {
    super('ResultScene');
  }

  create(): void {
    const controller = getGameFlowController();
    const session = controller.state.session;

    this.cameras.main.setBackgroundColor('#1e293b');
    createSceneHeading(this, 'Result', 'Return to Start Screen to begin a new match');

    const resultMessage = session
      ? `Winner: ${session.winner ?? 'Unknown'}\nMatch: ${session.setup.matchId}`
      : 'No completed match is available yet.';

    this.add
      .text(this.scale.width / 2, 220, resultMessage, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '22px',
        color: '#f8fafc',
        align: 'center',
        wordWrap: { width: 760 },
        lineSpacing: 14,
      })
      .setOrigin(0.5);

    createTextButton(this, this.scale.width / 2, 340, 'Return to Start', () => {
      controller.returnToStart();
      this.scene.start('StartScreenScene');
    });
  }
}

