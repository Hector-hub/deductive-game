import {
  component$,
  createContext,
  useClientEffect$,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Header from "~/components/header/header";
import Square from "~/components/inputGrid";
import HorizontalTable from "~/components/HorizontalTable";
import VerticalTable from "~/components/VerticalTable";
import Grid from "~/components/Grid";
import Swal from "sweetalert2";

export const Answer = createContext("answer");
export default component$(() => {
  const state = useStore({
    tableData: [],
    premises: [],
    tableColsRows: 0,
    verticalTableHeaders: [],
    verticalTableBody: [],
    horizontalTableHeaders: [],
    horizontalTableBody: [],
    harakirin:5
  });
  const answerState = useStore({
    userPoints:0,
    totalPoints:0,

  });
  
  useClientEffect$(() => {  
    if (screen.width <  875){ 
   
      Swal.fire({
        icon: `error`,
        title: 'Oops...',
        text: 'La resolución de tu pantalla no es suficiente para visualizar este juego de forma adecuada. Gira la tu dispositivo.',
        footer: `Te recomiendo este juego: <a href="https://counterclick-thegame.web.app/">Counter Click The Game</a>`
      });
      setTimeout(()=>{
        Swal.fire({
          title: 'Tambien puede visitar mi pagina web: <a href="https://hecrey.000webhostapp.com/">hecrey.com</a>',
          width: 600,
          padding: '3em',
          color: '#716add',
          background: '#fff url(https://sweetalert2.github.io/images/trees.pngs)',
          backdrop: `
            rgba(0,0,123,0.4)
            url("https://sweetalert2.github.io/images/nyan-cat.gif")
            left top
            no-repeat
          `
        })
      },10000)
      if (screen.width <  875){
      setTimeout(()=>{
        Swal.fire({
        title: 'Adios',
        text: `Esta pagina se auto destruira en 5 segundos.`,
        imageUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/67401945-34fc-46b8-8e8f-1982847277d4/ddba22b-2fad9d00-1d3f-4ec8-a65d-199a09dfa4e1.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY3NDAxOTQ1LTM0ZmMtNDZiOC04ZThmLTE5ODI4NDcyNzdkNFwvZGRiYTIyYi0yZmFkOWQwMC0xZDNmLTRlYzgtYTY1ZC0xOTlhMDlkZmE0ZTEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.p1RcYkkOBXh0fzpoZxaTbE1_xNWLfoLqEZv1_0utuzU',
        imageWidth: 476,
        imageHeight: 280,
        imageAlt: 'nyan',
      })
      },20000)
      setTimeout(()=>{
        document.write('')
      },25000)
     }}

    fetch("/puzzles/2.json")
      .then((response) => response.json())
      .then((response) => {
        state.tableData = response.tableData;
        state.premises = response.premises;
        state.tableColsRows = response.tableColsRows;
        state.verticalTableHeaders = response.verticalTable.headers;
        state.verticalTableBody = response.verticalTable.body;
        state.horizontalTableHeaders = response.horizontalTable.headers;
        state.horizontalTableBody = response.horizontalTable.body;
        answerState.totalPoints=response.totalPoints;

      });
      return () => {
        clearInterval(checkScreenSize);
      };
  });
  

  useContextProvider(Answer, answerState);
  return (
    <>
      <main>
        <Header />
        <section>
          <div >
            <div class={"row"}>
              <div class={"column"}>
                <div style={" overflow: auto; width:auto;height: 285px"}>
                  <ol>
                    {state.premises.map((premise) => {
                      return <li>{premise}</li>;
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
              <div class={"column"} >
               
                  <HorizontalTable
                    headers={state.horizontalTableHeaders}
                    body={state.horizontalTableBody}
                    colsRows={state.tableColsRows}
                  />
                
              </div>
              <div class={"column"}>
                <div>
                  <Grid tableData={state.tableData} colsRows={state.tableColsRows}  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer></footer>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
