/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState, useMemo } from "react";
import Papa from "papaparse";
import autoTable from "jspdf-autotable";
import { jsPDF } from "jspdf";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import FileInput from "./components/FIleInput";

const columnHelper = createMRTColumnHelper();

const App = () => {
  const [tableData, setTableData] = useState([]);

  const handleFileUpload = (data) => {
    Papa.parse(data, {
      complete: (result) => {
        setTableData(result.data.slice(1)); // Skip header row
      },
      header: true,
    });
  };

  const columns = useMemo(() => {
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
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
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
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  const handleExportRows = (rows) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save("mrt-pdf-example.pdf");
  };
  let email = "heyshabink@gmail.com";
  return (
    <div className="w-full h-ful overflow-hidden">
      {tableData.length > 0 ? (
        <>
          <button onClick={exportToPDF} className="button_app">
            Export to PDF
          </button>
          <MaterialReactTable table={table} />
        </>
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
