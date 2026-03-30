import { bootstrapApp } from './app';

const start = () => {
  void bootstrapApp().catch((error: unknown) => {
    // eslint-disable-next-line no-console
    console.error('Failed to bootstrap Pokémon Fighting Game MVP.', error);
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}

