import Phaser from 'phaser';
import { getGameFlowController } from '../state/gameFlow';
import { createSceneHeading, createTextButton } from './sceneUi';

export default class StartScreenScene extends Phaser.Scene {
  constructor() {
    super('StartScreenScene');
  }

  create(): void {
    const controller = getGameFlowController();
    controller.returnToStart();

    this.cameras.main.setBackgroundColor('#0f172a');
    createSceneHeading(this, 'Pokémon Fighting Game', 'Offline-only MVP · Start Screen');

    this.add
      .text(this.scale.width / 2, 180, 'Press Start Fight to choose one of the first 150 Pokémon.', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '22px',
        color: '#e2e8f0',
        align: 'center',
        wordWrap: { width: 760 },
      })
      .setOrigin(0.5);

    createTextButton(this, this.scale.width / 2, 300, 'Start Fight', () => {
      controller.requestStartFight();
      this.scene.start('PokemonSelectScene');
    });

    this.add
      .text(this.scale.width / 2, 380, 'Deterministic · Local-first · No network calls', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: '#94a3b8',
      })
      .setOrigin(0.5);
  }
}

