export default interface MountParams {
  /**
   * The story id to resolve and mount, e.g. "components/Button/Primary".
   * Named `story` because that is the key Playwright's built-in `mount`
   * fixture sends to `window.mount` — do not rename.
   */
  story: string;

  /** The props to pass to the resolved story. */
  props?: Record<string, unknown>;
}
