import {
  component$,
  useClientEffect$,
  useContext,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";
import Swal from "sweetalert2";
import { GlobalState } from "~/routes";
import { createGame } from "~/services/createGame";
import { getGameStatus } from "~/services/getGameStatus";
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
              Swal.fire({
                icon: `success`,
                iconColor:'#fff',
                iconHtml:'<h3 style="color:slateblue">QeQ</h3>',
                title: `${title}`,
                showDenyButton: true,
                confirmButtonText:"Unirse",
                confirmButtonColor:"#E74C3C",
                denyButtonText:"Crear partida",
                denyButtonColor:'slateblue'
              }).then((result:any)=>{
                //Unirse a una partida.
                if(result.isConfirmed){
                  Swal.fire({
                    icon: `success`,
                    iconColor:'#fff',
                    iconHtml:'<h3 style="color:slateblue">QeQ</h3>',
                    title: `Unirse`,
                    confirmButtonText:"Continuar",
                    confirmButtonColor:"slateblue",
                    text: "Ingresa el codigo de partida.",
                    input: 'text',
                    inputAttributes: {
                      autocapitalize: 'off'
                    },
                  }).then((result:any)=>{
                    if(result.isConfirmed){
                      globalState.isIntroduction = false;
                      globalState.gameId=result.value
                      setTimeout(() => {
                        getGameStatus(result.value)
                      }, 1000);
                   
                    }
                  });
                }else if(result.isDenied){
                  //Crear una partida
                  Swal.fire({
                    icon: `success`,
                    iconColor:'#fff',
                    iconHtml:'<h3 style="color:slateblue">QeQ</h3>',
                    title: `Crear partida`,
                    confirmButtonText:"Continuar",
                    confirmButtonColor:"slateblue",
                    text: "Ingresa el codigo de partida.",
                    input: 'text',
                    inputAttributes: {
                      autocapitalize: 'off'
                    },
                  }).then((result:any)=>{
                    if(result.isConfirmed){
                      globalState.isIntroduction = false;
                      createGame(result.value)
                      globalState.gameId=result.value
                      setTimeout(()=>{
                        getGameStatus(result.value)
                      },1000)
                     
                    }
                  });
                }
              });
              
            }}
          >
            Continuar
          </button>
       
        </div>
      </div>
    </div>
  );
});
