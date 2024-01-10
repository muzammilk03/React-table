/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import CSVReader from "react-csv-reader";
import csvtojson from "csvtojson";
import camelcase from "camelcase";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const App = () => {
  const [jsonData, setJsonData] = useState([]);

  const handleFileUpload = (data, fileInfo) => {
    // Convert CSV data to JSON
    csvtojson()
      .fromString(data.join("\n"))
      .then((jsonArray) => {
        // Normalize headers using camelcase
        const normalizedData = jsonArray.map((item, index) => {
          const normalizedItem = {};
          Object.keys(item).forEach((key) => {
            const normalizedKey = camelcase(key.replace(/^\d+\.\s*/, ""));
            normalizedItem[normalizedKey] = item[key];
          });
          // Add a unique key based on the index
          normalizedItem.key = index;
          return normalizedItem;
        });

        setJsonData(normalizedData);
      })
      .catch((error) => {
        console.error("Error converting CSV to JSON:", error);
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

  return (
    <div>
      <CSVReader onFileLoaded={handleFileUpload} />
      {jsonData.length > 0 && <MaterialReactTable table={table} />}
    </div>
  );
};

export default App;
