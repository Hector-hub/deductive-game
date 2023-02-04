import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import { GlobalState } from "~/routes";
import ChangePuzzleButton from "../Atoms/ChangePuzzleButton";
import Logo from "../Atoms/Logo";
import styles from "./header.css?inline";

export default component$(() => {
  const globalState: any = useContext(GlobalState);
  useStylesScoped$(styles);

  return (
    <header>
      <Logo />
      {
      (!globalState.isPuzzleScreen)?<ChangePuzzleButton/>:<></>
      }
      
    </header>
  );
});
