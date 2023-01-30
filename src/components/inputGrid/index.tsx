import {
  component$,
  useContext,
  useStore,
} from "@builder.io/qwik";
import Swal from "sweetalert2";
import { Answer } from "~/routes";

export default component$(
  ({ tableName, tableBody, relations, colsRows }: any) => {
    const answerState:any = useContext(Answer);

    const state = useStore({
      inputs: [],
      inputsSelected: [],
    });
    return (
      <div style={"width:auto; height:auto;"}>
        {tableBody.map((value: any, index: number) => {
          let i = index + 1;
          return (
            <>
              {relations.body.map((relation: any, relationIndex: number) => {
                let answers: Array<string> = [value["answer"]];
                let answer = answers.flat();
                return (
                  <>
                    <input
                      style={"width:18.7px; height:19.6px"}
                      onDblClick$={(event: any) => {
                        event.target.setAttribute("class", "dClicked");
                        event.target.checked = false;
                      }}
                      onClick$={(event: any) => {
                        event.target.setAttribute("class", "clicked");
                        if (!state.inputsSelected.includes(event.target.name)) {
                          state.inputsSelected.push(event.target.name);
                          answerState.userAnswerCount++;
                        }
                        if (answer.includes(relation)) {
                          answerState.userPoints++;
                          state.inputs.push(event.target.name);
                        } else if (state.inputs.includes(event.target.name)) {
                          answerState.userPoints--;
                          state.inputs.splice(
                            state.inputs.indexOf(event.target.name),
                            1
                          );
                        }
                        if (
                          answerState.userPoints === answerState.totalPoints
                        ) {
                          Swal.fire({
                            icon: `success`,
                            title: "Ganaste!",
                            showCancelButton: true,
                            cancelButtonText:"No",
                            cancelButtonColor:'#ff0000',
                            input: 'text',
                            inputAttributes: {
                              autocapitalize: 'off'
                            },
                            text: "¿Quieres jugar otra vez? Ingresa el numero de puzzle.",
                           
                          }).then((result:any)=>{
                            if(result.isConfirmed){
                              location.href="/?puzzle="+result.value
                            }
                          });
                  
                        } else if (
                          answerState.userAnswerCount ===
                          answerState.totalPoints
                        ) {
                          Swal.fire({
                            icon: `error`,
                            title: "Has perdido!",
                            showCancelButton: true,
                            cancelButtonText:"No",
                            confirmButtonText:"Si",
                            cancelButtonColor:'#ff0000',
                            text: "¿Quieres ver las respuestas?",
                           
                          }).then((result:any)=>{
                            if(result.isConfirmed){
                              setTimeout(() => {
                                location.href = "#answers";
                              }, 1000);
                            }else{
                              location.href="/"
                            }
                          });
                         
                        }
                      }}
                      value={`${answer.includes(relation)}`}
                      type="radio"
                      name={`${value.text}_${relations.name}`}
                      id={`${tableName}_${value.text}_${relation}`.replace(
                        /\s/g,
                        ""
                      )}
                    />
                  </>
                );
              })}
              {i % colsRows === 0 && <br />}
            </>
          );
        })}
      </div>
    );
  }
);
