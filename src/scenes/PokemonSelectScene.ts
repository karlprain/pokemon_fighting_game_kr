import Phaser from 'phaser';
import { getSelectablePokemonRoster } from '../data/pokemonRoster';
import { getGameFlowController } from '../state/gameFlow';
import { createSceneHeading, createTextButton } from './sceneUi';

export default class PokemonSelectScene extends Phaser.Scene {
  private rosterItems: Phaser.GameObjects.Text[] = [];

  constructor() {
    super('PokemonSelectScene');
  }

  create(): void {
    const controller = getGameFlowController();
    const roster = getSelectablePokemonRoster();
    const columns = 10;
    const startX = 84;
    const startY = 150;
    const columnWidth = 116;
    const rowHeight = 32;

    this.cameras.main.setBackgroundColor('#111827');
    createSceneHeading(this, 'Pokémon Selection', 'Choose exactly one Pokémon from the first 150 entries');

    const message = this.add
      .text(this.scale.width / 2, 118, '', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: '#cbd5e1',
      })
      .setOrigin(0.5);

    const selectionSummary = this.add
      .text(this.scale.width / 2, 666, '', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        color: '#e2e8f0',
        align: 'center',
      })
      .setOrigin(0.5);

    const refreshSummary = () => {
      const state = controller.state.selection;
      if (state.isConfirmed && state.confirmedPokemonId !== null) {
        selectionSummary.setText(`Confirmed Pokémon: #${state.confirmedPokemonId}`);
      } else if (state.selectedPokemonId !== null) {
        selectionSummary.setText(`Selected Pokémon: #${state.selectedPokemonId}`);
      } else {
        selectionSummary.setText('No Pokémon selected yet.');
      }
    };

    const renderRoster = () => {
      this.rosterItems.forEach((item) => item.destroy());
      this.rosterItems = [];

      roster.forEach((pokemon, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const isSelected = controller.state.selection.selectedPokemonId === pokemon.id;
        const isConfirmed = controller.state.selection.confirmedPokemonId === pokemon.id;
        const text = this.add
          .text(startX + column * columnWidth, startY + row * rowHeight, `#${String(pokemon.id).padStart(3, '0')} ${pokemon.name}`, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '14px',
            color: isConfirmed ? '#34d399' : isSelected ? '#fde047' : '#e2e8f0',
            backgroundColor: isSelected || isConfirmed ? '#1f2937' : '#0f172a',
            padding: {
              x: 8,
              y: 4,
            },
          })
          .setInteractive({ useHandCursor: true });

        text.on('pointerup', () => {
          controller.highlightPokemon(pokemon.id);
          message.setText(`Highlighted ${pokemon.name} (#${pokemon.id}).`);
          renderRoster();
          refreshSummary();
        });

        this.rosterItems.push(text);
      });
    };

    renderRoster();
    refreshSummary();

    createTextButton(this, 220, 690, 'Confirm Selection', () => {
      if (controller.state.selection.selectedPokemonId === null) {
        message.setText('Select a Pokémon before confirming.');
        return;
      }

      controller.confirmPokemon();
      controller.beginFightSetup();

      if (controller.state.session === null) {
        message.setText('Selection could not be confirmed.');
        return;
      }

      this.scene.start('FightSetupScene');
    }, 220);

    createTextButton(this, this.scale.width - 220, 690, 'Back to Start', () => {
      controller.returnToStart();
      this.scene.start('StartScreenScene');
    }, 220);

    this.add
      .text(this.scale.width / 2, 720 - 16, 'Only National Dex IDs 1-150 are eligible.', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        color: '#94a3b8',
      })
      .setOrigin(0.5);
  }
}

