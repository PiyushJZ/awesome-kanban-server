/**
 * This interface allows you to declare additional properties on your session
 * object using [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html).
 *
 * @example
 * declare module 'express-session' {
 *     interface SessionData {
 *         views: number;
 *     }
 * }
 *
 */
declare module 'express-session' {
  interface SessionData {
    token: string;
  }
}

export type StatusCode = 200 | 201 | 204 | 400 | 404 | 500;
