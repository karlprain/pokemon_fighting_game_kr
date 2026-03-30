import { createGameFlowController, setGameFlowController } from './state/gameFlow';
import { ensureOfflineOnlyEnvironment } from './systems/offlineGuard';

export const SCENE_ORDER = [
  'StartScreenScene',
  'PokemonSelectScene',
  'FightSetupScene',
  'FightScene',
  'ResultScene',
] as const;

export const bootstrapApp = async (): Promise<void> => {
  ensureOfflineOnlyEnvironment();

  const [{ default: Phaser }, StartScreenScene, PokemonSelectScene, FightSetupScene, FightScene, ResultScene] =
    await Promise.all([
      import('phaser'),
      import('./scenes/StartScreenScene'),
      import('./scenes/PokemonSelectScene'),
      import('./scenes/FightSetupScene'),
      import('./scenes/FightScene'),
      import('./scenes/ResultScene'),
    ]);

  const controller = createGameFlowController();
  setGameFlowController(controller);

  new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'app',
    width: 1280,
    height: 720,
    backgroundColor: '#0f172a',
    scene: [
      StartScreenScene.default,
      PokemonSelectScene.default,
      FightSetupScene.default,
      FightScene.default,
      ResultScene.default,
    ],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      },
    },
    audio: {
      noAudio: true,
    },
  });
};

