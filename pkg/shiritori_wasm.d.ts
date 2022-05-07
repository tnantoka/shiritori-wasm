/* tslint:disable */
/* eslint-disable */
/**
* @returns {any}
*/
export function start_game(): any;
/**
* @param {string} histories
* @param {string} text
* @returns {any}
*/
export function next_turn(histories: string, text: string): any;
/**
*/
export function setup(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly start_game: () => number;
  readonly next_turn: (a: number, b: number, c: number, d: number) => number;
  readonly setup: () => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
