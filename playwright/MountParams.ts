export default interface MountParams {
  /** The Storybook component to be mounted by Playwright for testing. */
  story: string;

  /** The props from said component. */
  props?: Record<string, unknown>;
}
