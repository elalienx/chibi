// Node modules
import { useState } from "react";

// Project files
import Button from "./Button";
import Icon from "components/icon/Icon";

// A plain button with static label.
export const Primary = () => <Button>Hello</Button>;

// A button with a trailing icon, mirroring the Storybook example.
export const PrimaryWithIcon = () => (
  <Button>
    Hello
    <Icon name="arrow-right" />
  </Button>
);

// Per-test label via serializable props (see `mount(id, props)`).
export const WithLabel = ({ label = "Default" }: { label?: string }) => (
  <Button>{label}</Button>
);

// The story owns the state: it records each click into a hidden form so the
// test can assert on the observed count through the DOM.
export const CountsClicks = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button onClick={() => setCount((c) => c + 1)}>Click me</Button>
      <form hidden>
        <input data-testid="count" readOnly value={String(count)} />
      </form>
    </>
  );
};
