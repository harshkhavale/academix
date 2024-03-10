import { Close } from "@mui/icons-material";
import React, { useState } from "react";

import { Document, Page, pdfjs } from "react-pdf";

const DocumentView = ({ onClose, pdfContent }) => {
  return (
    <div>
      <div className="flex justify-center items-center fixed inset-0  z-[1000] bg-blue-300 bg-opacity-30 backdrop-blur-sm">
        <div className="bg-white rounded-2xl h-[80vh] shadow p-4 relative overflow-scroll">
          <button onClick={onClose} className="fixed top-2 z-50 right-2">
            <Close />
          </button>
          <div>
            {pdfContent && (
              <Document
                file={pdfContent} // Convert Uint8Array to string
                renderMode="canvas"
              >
                <Page pageNumber={1} />
              </Document>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentView;
