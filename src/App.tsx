import React, { ChangeEvent, useCallback, useState } from "react";
import Table from "./Components/Table";
import TextArea from "./Components/TextArea";

function App() {
  const [CSV, setCSV] = useState<string>(`Name,email,phone number,address
Example,example@example.com,555-555-5555,Example Address
Example2,example2@example.com,555-555-5551,Example2 Address`);
  const [tableData, setTableData] = useState<any>({});
  const [error, setError] = useState<string>();

  const handleTextInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setCSV(value);
  };

  const startParseTable = useCallback(() => {
    const header = CSV.split("\n")[0].split(",");
    const handle = errorHandle(setError, header);
    setError("");

    const data = CSV.split("\n").reduce((acc, cur, i) => {
      if (i === 0) {
        acc.header = cur.split("\n")[0].split(",");
      } else {
        const tableData = cur.split(",");
        handle.linesLength(tableData);

        acc.body = acc.body?.some(Boolean)
          ? [...acc.body, tableData]
          : [tableData];
      }

      return acc;
    }, {} as any);

    setTableData(data);
  }, [CSV]);

  return (
    <div className="App">
      <TextArea handleTextInput={handleTextInput} value={CSV} />
      <button onClick={startParseTable}>Parse CSV</button>
      <Table tableData={tableData} error={error} />
    </div>
  );
}

export default App;

function errorHandle(setError: any, header: any) {
  function linesLength(tableData: any) {
    if (tableData.length > header.length || header.length > tableData.length) {
      return setError("Lines length are not equal");
    }
  }

  return {
    linesLength,
  };
}
