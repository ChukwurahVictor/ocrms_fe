import { Accept, useDropzone } from "react-dropzone";
import React, { useState } from "react";

const ImageUploader = () => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*" as any,
    multiple: true,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const previews = files.map(file => (
    <img
      key={file.name as any}
      src={file.preview}
      style={{ width: "100px", height: "100px", objectFit: "cover" }}
      alt={file.name}
    />
  ));

  return (
    <div>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag & drop some files here, or click to select files</p>
      </div>
      <div>{previews}</div>
    </div>
  );
};

export default ImageUploader;
