import {
  component$,
  useClientEffect$,
  useContext,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";
import Swal from "sweetalert2";
import { GlobalState } from "~/routes";
import ChangePuzzleButton from "../Atoms/ChangePuzzleButton";
import Logo from "../Atoms/Logo";
import styles from "./Introduction.css?inline";
export default component$(({ message, title }: any) => {
  const globalState: any = useContext(GlobalState);
  useStylesScoped$(styles);
  const state = useStore({
    messageLength: 0,
  });
  useClientEffect$(() => {
    state.messageLength = message.length;
  });

  return (
    <div class={"center"}>
      <div class={"header"}>
        <Logo />
        <h1>{title}</h1>
        <br />
      </div>

      <div class={"wrapper"}>
        <span class="type" style={`--n:${state.messageLength}`}>
          {message}
        </span>
        <br />
        <br />
        <br />
        <div class={"buttonContainer"}>
            <ChangePuzzleButton/>
          <button class={'how-play'}
            onClick$={() => {
              window.open(
                "https://www.taringa.net/+ciencia_educacion/logica-ejercicios-de-quien-es-quien-yapa_xq7jj",
                "_blank"
              );
              Swal.fire({
                icon: `info`,
                title: "Aviso!",
                html:
                  'El "¿Como jugar?" oficial, estará disponible pronto. La pereza me ganó.😁' +
                  "<br> <br>" +
                  '<input type="radio" style="" name="" id=""  checked disabled disabled /> <p style="display: inline;">Este es el equivalente a la <b>O</b>. (Click)</p>' +
                  "<br>" +
                  '<input type="radio" style="" name="" id="" class="dClicked"/>  <p style="display: inline;"> Este es el equivalente a la <b>X</b>. (Doble click)</p>',
              });
            }}
          >
            ¿Como jugar?
          </button>
          <button
            onClick$={() => {
              globalState.isIntroduction = false;
            }}
          >
            Continuar
          </button>
       
        </div>
      </div>
    </div>
  );
});
