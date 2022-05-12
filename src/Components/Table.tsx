import React, { FC } from "react";

interface IProps {
  tableData: any;
  error?: string;
}

const Table: FC<IProps> = (props) => {
  if (!!props.error) return <div style={{ color: "red" }}>{props.error}</div>;

  return (
    <table>
      <thead>
        <tr>
          {props.tableData?.header?.map((value: any, i: number) => (
            <th key={`header-${i}`}>{value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.tableData?.body?.map((row: any, i: number) => (
          <tr key={`body-row-${i}`}>
            {row.map((value: any, j: number) => (
              <td key={`body-data-${j}`}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
