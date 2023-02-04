import {
  component$,
  useClientEffect$,
  useContext,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";
import { GlobalState } from "~/routes";
import { getAllPuzzles } from "~/services/getAllPuzzles";
import Header from "../Header/header";
import styles from "./PuzzlesGrid.css?inline";

export default component$(() => {
    const globalState: any = useContext(GlobalState);
 
  useStylesScoped$(styles);
  const state = useStore({
    puzzles: [],
  });
  useClientEffect$(() => {
    getAllPuzzles().then((puzzle) => {
      state.puzzles = puzzle;
    });
  });
  return (
    <>
      <Header />
      <div class="" style={"display:flex;  flex-direction: column;"}>
        {state.puzzles.map((puzzle, i) => {
          let index = i + 1;
          return (
            <>
              <br />

              <div
                onClick$={() => {
                  globalState.isPuzzleScreen=false;
                  location.href = "/?puzzle=" + index;
                }}
                class="card"
              >
                <h2>Puzzle #{index}</h2>
                <b>
                  <h4>{puzzle}</h4>
                </b>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
});
