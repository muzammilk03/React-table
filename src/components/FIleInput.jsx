// eslint-disable-next-line react/prop-types
const FileInput = ({ handleFileUpload }) => {
  return (
    <div className="max-w-md mx-auto rounded-2xl  md:max-w-xl">
      <div className="md:flex">
        <div className="w-full p-3">
          <div className="relative h-48 rounded-lg border-2 border-dotted border-blue-700 bg-gray-100 flex justify-center items-center">
            <div className="absolute">
              <div className="flex flex-col items-center">
                <i className="fa fa-folder-open fa-4x text-blue-700"></i>
                <span className="block text-gray-400 font-normal">
                  Attach you files here
                </span>
              </div>
            </div>
            <input
              type="file"
              className="h-full w-full opacity-0"
              onChange={(e) => handleFileUpload(e.target.files[0])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileInput;
