import {
  component$,
  useClientEffect$,
  useContext,
  useStore,
  useStylesScoped$,
  useTask$,
} from "@builder.io/qwik";
import { Answer } from "~/routes";


export default component$(({tableName,tableBody,relations,colsRows}:any) => {
  const answerState = useContext(Answer);

  const state = useStore({
    inputs:[]
  })
  return (
    <div style={"width:auto; height:auto;" }>
      {tableBody.map((value: any, index:number) => {
        let i = index + 1;
        return (
          <>
            {relations.body.map((relation: any,relationIndex:number) => {
         
              let answers:Array<string>=[value['answer']]
              let answer=answers.flat();
              return (
                <>
                  <input
                    style={"width:18.7px; height:19.6px"}
                    onClick$={(a:any)=>{
                      if(answer.includes(relation)){
                        answerState.userPoints++
                        state.inputs.push(a.target.name)
                      }else if(state.inputs.includes(a.target.name)){
                        answerState.userPoints--
                        state.inputs.splice(state.inputs.indexOf(a.target.name),1)
                      }
                      
                      console.log(answerState.userPoints,state.inputs)
                     if(answerState.userPoints===answerState.totalPoints){
                      alert("Ganaste!")
                     }
          
                    }}
                    value={`${answer.includes(relation)}`}
                    type="radio"
                    name={`${value.text}_${relations.name}`}
                    id={`${tableName}_${value.text}_${relation}`.replace(/\s/g, '')}
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
});
