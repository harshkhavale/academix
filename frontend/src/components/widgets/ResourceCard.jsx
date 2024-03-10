import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import DocumentView from "./DocumentView";

// Set PDF worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ResourceCard = ({ src }) => {
  const [showModal, setShowModal] = useState(false);

  const [pdfContent, setPdfContent] = useState(null);
  function Uint8ArrayToString(uint8Array) {
    return String.fromCharCode.apply(null, uint8Array);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/resources/${src.file}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const pdfData = await response.arrayBuffer();
        setPdfContent(pdfData);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchData();
  }, [src.file]);

  return (
    <div className=" relative rounded-2xl w-3/12 overflow-hidden rounded-br-[5rem]">
      <div className="absolute -bottom-2 p-8 -right-2 bg-gray-200" />

      <p
        className={`font-bold happy-font p-8 ${
          src.type === "ASSIGNMENT" ? "bg-red-200" : "bg-blue-200"
        }`}
      >
        {src.name}
      </p>
      <button
        className="p-10 w-full text-blue-400 font-bold text-5xl bg-gray-100"
        onClick={() => setShowModal(true)}
      >
        view
      </button>
      {showModal && (
        <DocumentView
          onClose={() => setShowModal(false)}
          pdfContent={pdfContent}
        />
      )}
    </div>
  );
};

export default ResourceCard;
