import Phaser from 'phaser';
import { getGameFlowController } from '../state/gameFlow';
import { createSceneHeading } from './sceneUi';

export default class FightSetupScene extends Phaser.Scene {
  constructor() {
    super('FightSetupScene');
  }

  create(): void {
    const controller = getGameFlowController();
    controller.beginFightSetup();

    const session = controller.state.session;

    this.cameras.main.setBackgroundColor('#111827');
    createSceneHeading(this, 'Fight Setup', 'Preparing a deterministic local match');

    if (session === null) {
      this.add
        .text(this.scale.width / 2, 220, 'No confirmed Pokémon was available for fight setup.', {
          fontFamily: 'Arial, sans-serif',
          fontSize: '20px',
          color: '#fca5a5',
          align: 'center',
          wordWrap: { width: 720 },
        })
        .setOrigin(0.5);

      this.time.delayedCall(800, () => {
        controller.returnToStart();
        this.scene.start('StartScreenScene');
      });
      return;
    }

    this.add
      .text(
        this.scale.width / 2,
        205,
        [
          `Match: ${session.setup.matchId}`,
          `Player Pokémon: #${session.setup.playerPokemonId}`,
          `Opponent Pokémon: #${session.setup.opponentPokemonId}`,
          `Seed: ${session.setup.deterministicSeed}`,
        ],
        {
          fontFamily: 'Arial, sans-serif',
          fontSize: '20px',
          color: '#e2e8f0',
          align: 'center',
          lineSpacing: 12,
        },
      )
      .setOrigin(0.5);

    this.add
      .text(this.scale.width / 2, 340, 'Launching fight scene...', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        color: '#94a3b8',
      })
      .setOrigin(0.5);

    this.time.delayedCall(250, () => {
      controller.activateFight();
      this.scene.start('FightScene');
    });
  }
}

