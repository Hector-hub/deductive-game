import { component$, useClientEffect$, useStore } from "@builder.io/qwik";
import InputGrid from "../InputGrid";
export default component$(({ tableData, colsRows }: any) => {
  let styles = [
    [
      "border:1px dotted; ",
      "  border:1px; border-style: dotted none dotted none;",
      "  border:1px dotted;",
    ],
    [
      "border:1px dotted; border-style: none dotted none dotted;",
      "   border:1px dotted; border-style: none dotted dotted none; ",
    ],
    ["border:1px dotted;  "],
  ];

  return (
    <>
      <div>
        {tableData.map((values: any, colIndex: number) => {
          return (
            <div style={"display:flex; justify-content:flex-start"}>
              {values.relations.map((value: any, rowIndex: number) => {
                return (
                  <div
                    class={"border-rounded"}
                    style={styles[colIndex][rowIndex]}
                  >
                    <InputGrid
                      tableName={values.name}
                      tableBody={values.body}
                      relations={value}
                      colsRows
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
});
