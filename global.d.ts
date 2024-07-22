// declare module 'import.meta' {
//   export const env: Record<string, any>;
// }


declare var global: typeof globalThis;

declare global {
  var importMeta: {
    env: {
      VITE_API_ENDPOINT: string;
    };
  };
}

export {};

