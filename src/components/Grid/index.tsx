import { component$, useClientEffect$, useStore } from "@builder.io/qwik";
import InputGrid from "../inputGrid";
export default component$(({tableData, colsRows}:any) => {
  let styles=[
   ["border:1px solid; width:33%;"," width:33%; border:1px; border-style: solid none solid none;","  width:33%;border:1px solid;"],
   ["  width:33%; border:1px solid; border-style: none solid none solid;","  width:33%; border:1px solid; border-style: none solid solid none; "],
   ["border:1px solid;  width:33%;"]
  ]

  return (
    <>
      <div>
        {
          tableData.map((values:any,colIndex:number)=>{
            return(
              <div style={"display:flex; justify-content:flex-start"}>
                {values.relations.map((value:any,rowIndex:number)=>{
                  return(
                    <div class={'border-rounded'} style={styles[colIndex][rowIndex]}>
                    <InputGrid  tableName={values.name} tableBody={values.body} relations={value} colsRows  />
                  </div>
                  )
                })}
              </div>
            )
          })
        }
      </div>
    </>
  );
});
