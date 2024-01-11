/* eslint-disable react/no-unescaped-entities */
import { useState, useMemo } from "react";
import Papa from "papaparse";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import FileInput from "./components/FIleInput";


const App = () => {
  const [jsonData, setJsonData] = useState([]);

  const handleFileUpload = (data) => {
    Papa.parse(data, {
      complete: (result) => {
        setJsonData(result.data.slice(1)); // Skip header row
      },
      header: true,
    });
  };

  const columns = useMemo(() => {
    if (jsonData.length > 0) {
      return Object.keys(jsonData[0]).map((key) => ({
        accessorKey: key,
        header: key,
      }));
    }
    return [];
  }, [jsonData]);

  const table = useMaterialReactTable({
    columns,
    data: useMemo(() => jsonData, [jsonData]),
  });

  const email = "heyshabink@gmail.com";
  return (
    <div className="w-full h-ful overflow-hidden">
      {jsonData.length > 0 ? (
        <MaterialReactTable table={table} />
      ) : (
        <FileInput handleFileUpload={handleFileUpload} />
      )}

      <p className="text-black text-xs">
        "Need assistance or have questions? Connect with us at{" "}
        <a href={`mailto:${email}`} className="underline text-blue-500">
          {email}
        </a>
        ,and we'll get back to you promptly!"
      </p>
    </div>
  );
};

export default App;
