import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./VerticalTable.css?inline";
export default component$(({ headers, body,colsRows }: any) => {
  useStylesScoped$(styles);

  return (
    <table>
      {headers.map((header: string) => (
        <th colSpan={colsRows}>{header}</th>
      ))}

      <tr>
        {body.map((content: string) => (
          <td class={"vertical"} height={'250'} >
            {content}
          </td>
        ))}
      </tr>
    </table>
  );
});
