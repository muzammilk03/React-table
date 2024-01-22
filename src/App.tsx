/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_Row,
} from "material-react-table";
import Papa from "papaparse";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useState, useMemo } from "react";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import "./App.css";
import FileInput from "./components/FIleInput";

interface Column {
  accessorKey: string;
  header: string;
}

type Data = Record<string, any>;

const App: React.FC = () => {
  const [tableData, setTableData] = useState<Data[]>([]);

  const handleFileUpload = (data: File) => {
    Papa.parse(data, {
      complete: (result) => {
        if (result && result.data) {
          const parsedData: any[] = result.data;
          setTableData(parsedData.slice(1)); // Skip header row
        }
      },
      header: true,
    });
  };

  const columns = useMemo<Column[]>(() => {
    if (tableData.length > 0) {
      return Object.keys(tableData[0]).map((key) => ({
        accessorKey: key,
        header: key,
      }));
    }
    return [];
  }, [tableData]);

  const table = useMaterialReactTable({
    columns,
    data: useMemo(() => tableData, [tableData]),
    enableRowSelection: true,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  const handleExportRows = (rows: MRT_Row<Data>[]) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    //doc.text("Pasc arts", 20, 20); // Add title

    const autoTableConfig = {
      margin: { top: 30 },
      theme: "grid" as const,
    };

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
      ...autoTableConfig,
    });
    let person = prompt("Please enter File name");
    if (person) {
      doc.save(`${person}-shabink.pdf`);
    }else{
      return;
    }
  };

  const email = "heyshabink@gmail.com";

  return (
    <div className="app">
      {tableData.length > 0 ? (
        <>
          <MaterialReactTable table={table} />
        </>
      ) : (
        <FileInput handleFileUpload={handleFileUpload} />
      )}

      <p className="connect">
        "Need assistance or have questions? Connect with me at{" "}
        <a href={`mailto:${email}`} className="email">
          {email}
        </a>
        ,and we'll get back to you promptly!"
      </p>
    </div>
  );
};

export default App;
