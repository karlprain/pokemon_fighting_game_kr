import { describe, expect, it } from 'vitest';
import { createNetworkRequestGuard, ensureOfflineOnlyEnvironment, OFFLINE_ONLY_MESSAGE } from '../../src/systems/offlineGuard';

describe('offlineGuard', () => {
  it('does not fail when the offline-only environment is validated', () => {
    expect(() => ensureOfflineOnlyEnvironment()).not.toThrow();
  });

  it('blocks network requests with a clear error', () => {
    const guard = createNetworkRequestGuard();

    expect(() => guard('https://example.com/pokemon')).toThrow(OFFLINE_ONLY_MESSAGE);
  });
});

