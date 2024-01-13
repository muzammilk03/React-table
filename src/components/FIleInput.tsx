import React, { ChangeEvent } from "react";
import "./Fileinput.css";

interface FileInputProps {
  handleFileUpload: (file: File) => void;
}

const FileInput: React.FC<FileInputProps> = ({ handleFileUpload }) => {
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="Fileinput">
      <div className="app_display">
        <div style={{ width: "100%", padding: "0.75rem" }}>
          <div className="main_container">
            <div style={{ position: "absolute" }}>
              <div className="text_container">
                <i className="fa fa-folder-open fa-4x"></i>
                <span className="text_span_container">
                  Attach your CSV files here
                </span>
              </div>
            </div>
            <input type="file" className="file_input" onChange={onFileChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileInput;
