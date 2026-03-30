import Phaser from 'phaser';

export const createTextButton = (
  scene: Phaser.Scene,
  x: number,
  y: number,
  label: string,
  onClick: () => void,
  width = 240,
): Phaser.GameObjects.Text => {
  const button = scene.add
    .text(x, y, label, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '20px',
      color: '#0f172a',
      backgroundColor: '#e2e8f0',
      padding: {
        x: 14,
        y: 10,
      },
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true });

  button.setDisplaySize(width, button.height);
  button.on('pointerup', onClick);
  button.on('pointerover', () => {
    button.setStyle({ backgroundColor: '#cbd5e1' });
  });
  button.on('pointerout', () => {
    button.setStyle({ backgroundColor: '#e2e8f0' });
  });

  return button;
};

export const createSceneHeading = (
  scene: Phaser.Scene,
  title: string,
  subtitle: string,
): void => {
  scene.add
    .text(scene.scale.width / 2, 52, title, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '42px',
      color: '#f8fafc',
      fontStyle: 'bold',
    })
    .setOrigin(0.5);

  scene.add
    .text(scene.scale.width / 2, 96, subtitle, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      color: '#cbd5e1',
    })
    .setOrigin(0.5);
};

