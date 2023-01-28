import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./HorizontalTable.css?inline";
export default component$(({headers,body, colsRows}:any) => {
  useStylesScoped$(styles);
  return (
    <table >
      {body.map((content:string,index:number)=>{

        return(
          <tr >
              {index%colsRows===0 &&
                 <th style={'width:10px'} rowSpan={colsRows} >
                 <span class={"vertical"}>{headers[index/colsRows]}</span>
               </th>
              }
        <td >
          {content}
        </td>
      </tr>
        )
      })}
   
    </table>
  );
});
