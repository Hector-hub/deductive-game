import {
  component$,
  createContext,
  useClientEffect$,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { DocumentHead, useLocation } from "@builder.io/qwik-city";
import Header from "~/components/Header/header";
import HorizontalTable from "~/components/HorizontalTable";
import VerticalTable from "~/components/VerticalTable";
import Grid from "~/components/Grid";
import Swal from "sweetalert2";
import AnswerTable from "~/components/AnswerTable";
import Introduction from "~/components/Introduction";
import { getPuzzle } from "~/services/getPuzzle";
import PuzzlesGrid from "~/components/PuzzlesGrid";

export const Answer = createContext("answer");
export const GlobalState = createContext("globalState");
export default component$(() => {
  const state = useStore({
    title: "",
    introduction: "",
    tableData: [],
    premises: [],
    tableColsRows: 0,
    verticalTableHeaders: [],
    verticalTableBody: [],
    horizontalTableHeaders: [],
    horizontalTableBody: [],
    harakirin: 5,
    screenWidth: 0,
    isShowingMsg: false,
    isLoaded: false,
  });
  const answerState = useStore({
    userWin: false,
    totalPoints: 0,
    answerTable: [],
    userAnswerCount: 0,
  });
  const globalState = useStore({
    isPuzzleScreen:false,
    isIntroduction: true,
    gameStatus: [],
    gameId: "",
    puzzleId: 0,
  });
  useContextProvider(Answer, answerState);
  useContextProvider(GlobalState, globalState);
  useClientEffect$(async () => {
    const urlParams = new URLSearchParams(location.search);
    const puzzle: any = urlParams.get("puzzle");
    globalState.puzzleId = puzzle;
    await getPuzzle(puzzle)
      .then((response) => {
        state.isLoaded = response.isLoaded;
        state.title = response.title;
        state.introduction = response.introduction;
        state.tableData = response.tableData;
        state.premises = response.premises;
        state.tableColsRows = response.tableColsRows;
        state.verticalTableHeaders = response.verticalTable.headers;
        state.verticalTableBody = response.verticalTable.body;
        state.horizontalTableHeaders = response.horizontalTable.headers;
        state.horizontalTableBody = response.horizontalTable.body;
        state.screenWidth = response.screenWidth;
        answerState.totalPoints = response.totalPoints;
        answerState.answerTable = response.answerTable;
      })
      .catch(() => {
        globalState.isPuzzleScreen=true
        if (globalState.puzzleId != null) {
          Swal.fire({
            icon: `error`,
            title: "Oops...",
            text: `N??mero de puzzle incorrecto.`,
            footer: ``,
          })
        }
      });
    let width = 0;
    width = state.screenWidth === 650 ? 705 : 875;

    if (screen.width < width && state.isShowingMsg === false) {
      state.isShowingMsg = true;
      Swal.fire({
        icon: `error`,
        title: "Oops...",
        text: "La resoluci??n de tu pantalla no es suficiente para visualizar este juego de forma adecuada. Gira la tu dispositivo para verificar si es posible visualizarlo.",
        footer: `Te recomiendo este juego: <a href="https://counterclick-thegame.web.app/">Counter Click The Game</a>`,
      });
      setTimeout(() => {
        Swal.fire({
          title:
            'Tambi??n puede visitar mi p??gina web: <a href="https://hecrey.000webhostapp.com/">hecrey.com</a>',
          width: 600,
          padding: "3em",
          color: "#716add",
          background:
            "#fff url(https://sweetalert2.github.io/images/trees.pngs)",
          backdrop: `
            rgba(0,0,123,0.4)
            url("https://sweetalert2.github.io/images/nyan-cat.gif")
            left top
            no-repeat
          `,
        });
      }, 10000);

      setTimeout(() => {
        if (screen.width < width) {
          Swal.fire({
            title:
              "Que mal, no dispones de la resoluci??n suficiente, te recomiendo utilizar otro dispositivo. Adi??s.",
            text: `Esta p??gina se autodestruir?? en 5 segundos.`,
            imageUrl:
              "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/67401945-34fc-46b8-8e8f-1982847277d4/ddba22b-2fad9d00-1d3f-4ec8-a65d-199a09dfa4e1.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY3NDAxOTQ1LTM0ZmMtNDZiOC04ZThmLTE5ODI4NDcyNzdkNFwvZGRiYTIyYi0yZmFkOWQwMC0xZDNmLTRlYzgtYTY1ZC0xOTlhMDlkZmE0ZTEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.p1RcYkkOBXh0fzpoZxaTbE1_xNWLfoLqEZv1_0utuzU",
            imageWidth: 476,
            imageHeight: 280,
            imageAlt: "nyan",
          });
        }
      }, 15000);
      setTimeout(() => {
        if (screen.width < width) {
          document.write("");
        }
        state.isShowingMsg === false;
      }, 20000);
    }
    addEventListener("resize", (event) => {
      if (event.target.innerWidth < width && state.isShowingMsg === false) {
        state.isShowingMsg = true;
        Swal.fire({
          icon: `error`,
          title: "Oops...",
          text: "La resoluci??n de tu pantalla no es suficiente para visualizar este juego de forma adecuada. Gira la tu dispositivo para verificar si es posible visualizarlo.",
          footer: `Te recomiendo este juego: <a href="https://counterclick-thegame.web.app/">Counter Click The Game</a>`,
        });
        setTimeout(() => {
          Swal.fire({
            title:
              'Tambien puede visitar mi pagina web: <a href="https://hecrey.000webhostapp.com/">hecrey.com</a>',
            width: 600,
            padding: "3em",
            color: "#716add",
            background:
              "#fff url(https://sweetalert2.github.io/images/trees.pngs)",
            backdrop: `
              rgba(0,0,123,0.4)
              url("https://sweetalert2.github.io/images/nyan-cat.gif")
              left top
              no-repeat
            `,
          });
        }, 10000);

        setTimeout(() => {
          if (event.target.innerWidth < width) {
            Swal.fire({
              title: "Adios",
              text: `Esta p??gina se autodestruir?? en 5 segundos.`,
              imageUrl:
                "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/67401945-34fc-46b8-8e8f-1982847277d4/ddba22b-2fad9d00-1d3f-4ec8-a65d-199a09dfa4e1.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY3NDAxOTQ1LTM0ZmMtNDZiOC04ZThmLTE5ODI4NDcyNzdkNFwvZGRiYTIyYi0yZmFkOWQwMC0xZDNmLTRlYzgtYTY1ZC0xOTlhMDlkZmE0ZTEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.p1RcYkkOBXh0fzpoZxaTbE1_xNWLfoLqEZv1_0utuzU",
              imageWidth: 476,
              imageHeight: 280,
              imageAlt: "nyan",
            });
          }
        }, 10000);
        setTimeout(() => {
          if (event.target.innerWidth < width) {
            document.write("");
          }
          state.isShowingMsg === false;
        }, 15000);
      }
    });
  });

  return (
    <>
    
      {
      globalState.isPuzzleScreen? <PuzzlesGrid />:
      state.isLoaded ? (
        <main style={`max-width: ${state.screenWidth}px;`}>
          {(globalState.isIntroduction && (
            <Introduction title={state.title} message={state.introduction} />
          )) || (
            <div class={"game-panel"}>
              <Header />
              <section>
                <div>
                  <div class={"row"}>
                    <div class={"column"}>
                      <div style={" overflow: auto; width:auto;height: 285px"}>
                        <ol>
                          {state.premises.map((premise:string) => {
                            return (
                              <li>
                                <p class={'type'} style={`--n:50`}>{premise}</p>
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                    </div>
                    <div class={"column"}>
                      <div>
                        <VerticalTable
                          headers={state.verticalTableHeaders}
                          body={state.verticalTableBody}
                          colsRows={state.tableColsRows}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class={"row"}>
                    <div class={"column"}>
                      <HorizontalTable
                        headers={state.horizontalTableHeaders}
                        body={state.horizontalTableBody}
                        colsRows={state.tableColsRows}
                      />
                    </div>
                    <div class={"column"}>
                      <div>
                        <Grid
                          tableData={state.tableData}
                          colsRows={state.tableColsRows}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {answerState.userAnswerCount >= answerState.totalPoints && (
                  <AnswerTable />
                )}
              </section>
            </div>
          )}
        </main>
      ) : (
        <></>
      )}
      <br />
      <footer><h3>Powered by <a href="https://hecrey.000webhostapp.com/">hecrey</a></h3></footer>
    </>
  );
});

export const head: DocumentHead = {
  title: "QeQ - ??Qui??n es Qui??n?",
  meta: [
    {
      name: "description",
      content: "Un juego de l??gica.",
    },
  ],
};
