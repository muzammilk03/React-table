/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import "./Fileinput.css";

const FileInput = ({ handleFileUpload }) => {
  return (
    <div className="Fileinput">
      <div className="app_display">
        <div style={{ width: "100%", padding: "0.75rem" }}>
          <div className="main_container">
            <div style={{ position: "absolute" }}>
              <div className="text_container">
                <i className="fa fa-folder-open fa-4x"></i>
                <span className="text_span_container">
                  Attach you csv files here
                </span>
              </div>
            </div>
            <input
              type="file"
              className="file_input"
              onChange={(e) => handleFileUpload(e.target.files[0])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileInput;
