import Phaser from 'phaser';
import { getGameFlowController } from '../state/gameFlow';
import { resolveDeterministicFightOutcome } from '../systems/deterministicFightSetup';
import { createSceneHeading, createTextButton } from './sceneUi';

export default class FightScene extends Phaser.Scene {
  constructor() {
    super('FightScene');
  }

  create(): void {
    const controller = getGameFlowController();
    controller.activateFight();

    const session = controller.state.session;

    this.cameras.main.setBackgroundColor('#020617');
    createSceneHeading(this, 'Fight Active', 'Deterministic local battle in progress');

    if (session === null) {
      this.add
        .text(this.scale.width / 2, 230, 'No active fight session is available.', {
          fontFamily: 'Arial, sans-serif',
          fontSize: '22px',
          color: '#fca5a5',
        })
        .setOrigin(0.5);

      createTextButton(this, this.scale.width / 2, 360, 'Return to Start', () => {
        controller.returnToStart();
        this.scene.start('StartScreenScene');
      });
      return;
    }

    this.add
      .text(
        this.scale.width / 2,
        220,
        [
          `Session: ${session.sessionId}`,
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

    createTextButton(this, this.scale.width / 2, 350, 'Resolve Fight', () => {
      const winner = resolveDeterministicFightOutcome(session.setup);
      controller.completeFight(winner);
      this.scene.start('ResultScene');
    });

    createTextButton(this, this.scale.width / 2, 430, 'Abort Match', () => {
      controller.returnToStart();
      this.scene.start('StartScreenScene');
    });
  }
}

