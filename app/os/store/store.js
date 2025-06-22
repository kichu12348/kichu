import { useSyncExternalStore } from "react";

const defaultSelector=(arg)=>arg;

export function create(callback) {
  let initialState;
  let state;
  const listeners = new Set();

  function set(param) {
    const newState = typeof param === "function" ? param(state) : param;
    state = { ...state, ...newState };
    listeners.forEach((listener) => listener());
  }

  function get() {
    return state;
  }

  initialState = callback(set, get);
  state = initialState;

  function subscribe(listener) {
    listeners.add(listener);

    return () => listeners.delete(listener);
  }

  return function useStore(selector = defaultSelector) {
    return useSyncExternalStore(
      subscribe,
      () => selector(get()),
      () => selector(initialState)
    );
  };
}
