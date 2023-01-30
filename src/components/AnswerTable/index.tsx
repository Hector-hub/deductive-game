import {
  component$,
  useClientEffect$,
  useContext,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";
import styles from "./AnswerTable.css?inline";
import { Answer } from "~/routes";

export default component$(() => {
  useStylesScoped$(styles);
  const answerState: any = useContext(Answer);
  const state = useStore({
    answerTableHeaders: [],
    answerTableBody: [],
  });
  useClientEffect$(() => {
    state.answerTableHeaders = answerState.answerTable.headers;
    state.answerTableBody = answerState.answerTable.body;
  });
  return (
    <div id={"answers"} class="flip-card">
      <div class="flip-card-inner">
        <div
          class="flip-card-front"
          style={
            "display:flex; justify-content:center; align-items:stretch; margin-top: 20px; flex-direction:column"
          }
        >
          <h1> RESPUESTAS</h1>
        </div>
        <div class="flip-card-back">
          <div
            style={
              "display:flex; justify-content:center; align-items:stretch;  flex-direction:column"
            }
          >
            <table style={"padding:15.5px 0 17.5px 0"}>
              <thead>
                {state.answerTableHeaders.map((header: string) => {
                  return <th>{header}</th>;
                })}
              </thead>
              <tbody>
                {state.answerTableBody.map((values: Array<string>) => {
                  return (
                    <tr>
                      {values.map((value: string) => {
                        return <td>{value}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
});
