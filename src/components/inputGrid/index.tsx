import { component$, useContext, useStore } from "@builder.io/qwik";
import Swal from "sweetalert2";
import { useWinLose } from "~/hooks/useWinLose";
import { Answer, GlobalState } from "~/routes";
import { getGameStatus } from "~/services/getGameStatus";
import { getTotalUserAnswer } from "~/services/getTotalUserAnswer";
import { getUserAnswerState } from "~/services/getUserAnswerState";
import { setUserAnswerState } from "~/services/setUserAnswerState";
import { updateGameStatus } from "~/services/updateGameStatus";
export default component$(
  ({ tableName, tableBody, relations, colsRows }: any) => {
    const globalState: any = useContext(GlobalState);
    const answerState: any = useContext(Answer);

    const state = useStore({
      inputs: [],
      inputsSelected: [],
      ignoreFirstClick: false,
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
                      onClick$={async (event: any) => {
                      
                        if (state.ignoreFirstClick) {
                          event.preventDefault();
                          state.ignoreFirstClick = false;
                          // Handle double-click event
                          updateGameStatus(
                            globalState.gameId,
                            "x",
                            event.target.id,
                            globalState.puzzleId,
                            event.target.name,
                          );
                          // getGameStatus(
                          //   globalState.gameId,
                          //   globalState.puzzleId
                          // );
                        } else {
                          state.ignoreFirstClick = true;
                          setTimeout(() => {
                            if (state.ignoreFirstClick) {
                              updateGameStatus(
                                globalState.gameId,
                                "o",
                                event.target.id,
                                globalState.puzzleId,
                                event.target.value,
                                event.target.name
                              );

                              getUserAnswerState(globalState.gameId,globalState.puzzleId).then((values:any)=>{
                                getTotalUserAnswer(globalState.gameId,globalState.puzzleId).then((value:any)=>{
                                  answerState.userAnswerCount=value.length
                               
                               
                                  

                                  let answerObj:any=values;
                                  answerObj[event.target.name]=event.target.value
                                  if(answerObj.name){
                                    delete answerObj.name;
                                  }
                                 
                                  setUserAnswerState(globalState.gameId,globalState.puzzleId, answerObj);
                                  const allPropertiesTrue = Object.values(values).every(value => value === "true");
                                  const propertiesLength =Object.keys(values).length;
                                  if(allPropertiesTrue===true && propertiesLength===answerState.totalPoints &&  answerState.userWin===false){
                                    answerState.userWin=true
                                  }else{
                                    answerState.userWin=false
                                  }
                                    useWinLose(answerState.userWin,answerState.totalPoints,answerState.userAnswerCount)
                             
                                
                            })
                          })   
                          }
                            state.ignoreFirstClick = false;
                            // Handle single-click event
                          }, 250);
                        }
                      }}
                      value={`${answer.includes(relation)}`}
                      type="radio"
                      class={"radio-button"}
                      name={`${value.text}_${relations.name}`.replace(
                        /\s/g,
                        ""
                      )}
                      id={`${value.text}_${relations.name}_${relation}_${tableName}`.replace(
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
