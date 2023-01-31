import { component$, useStylesScoped$ } from "@builder.io/qwik";
import ChangePuzzleButton from "../Atoms/ChangePuzzleButton";
import Logo from "../Atoms/Logo";
import styles from "./header.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <Logo />
      <ChangePuzzleButton/>
    </header>
  );
});
