type Factory<T> = () => T;

declare global {
  // eslint-disable-next-line no-var
  var __core_singletons__: Map<string, unknown> | undefined;
}

function getStore() {
  if (!globalThis.__core_singletons__) {
    globalThis.__core_singletons__ = new Map<string, unknown>();
  }

  return globalThis.__core_singletons__;
}

export function getSingleton<T>(key: string, factory: Factory<T>): T {
  const store = getStore();

  if (!store.has(key)) {
    store.set(key, factory());
  }

  return store.get(key) as T;
}
