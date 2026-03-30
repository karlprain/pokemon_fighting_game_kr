export const OFFLINE_ONLY_MESSAGE = 'This MVP is offline-only and must not depend on network requests.';

export const ensureOfflineOnlyEnvironment = (): void => {
  if (typeof window !== 'undefined' && 'fetch' in window) {
    return;
  }
};

export const createNetworkRequestGuard = () => {
  return (url: string): never => {
    throw new Error(`${OFFLINE_ONLY_MESSAGE} Blocked request: ${url}`);
  };
};

