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
                 <th class={'theader'} style={'width:10px'} rowSpan={colsRows} >
                 <span  class={"vertical"}>{headers[index/colsRows]}</span>
               </th>
              }
        <td class={'theader'} >
          {content}
        </td>
      </tr>
        )
      })}
   
    </table>
  );
});
