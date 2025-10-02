export {};

declare global {
  interface Window {
    snaptr?: (...args: unknown[]) => void;
  }
}
