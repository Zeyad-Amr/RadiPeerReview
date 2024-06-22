"use client";

import {
  SessionStorage,
  SessionStorageKeys,
} from "@/core/shared/utils/session-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PdfViewer = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fileUrl = params.get("file");
    console.log("fileUrl", fileUrl);

    if (fileUrl) {
      getPdfFile(fileUrl);
    }
  }, []);

  const getPdfFile = async (fileUrl: string) => {
    try {
      setError(null); // Reset error state

      // Get the token from session storage
      const token: string =
        SessionStorage.getDataByKey(SessionStorageKeys.token) ?? "";

      // Configure headers
      const headers: any = {};
      if (token.length > 0) {
        headers["Authorization"] = "Bearer " + token;
      }

      const res = await axios.get(fileUrl, {
        responseType: "blob",
        headers: headers,
      });

      if (res.data) {
        // Ensure the content is a PDF
        if (res.data.type === "application/pdf") {
          // Create a URL for the PDF blob
          const url = URL.createObjectURL(res.data);
          setPdfUrl(url);
        } else {
          setError("The fetched file is not a PDF.");
        }
      }
    } catch (error) {
      console.error("Error fetching PDF file:", error);
      setError("Error fetching PDF file. Please try again.");
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          e.preventDefault();
          router.back();
        }}
        style={{ position: "absolute", bottom: 10, left: 10, zIndex: 1000 }}
      >
        Back
      </button>
      {error ? (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      ) : (
        pdfUrl && (
          <iframe
            src={pdfUrl}
            title="PDF Viewer"
            width="100%"
            height="100%"
            style={{ border: "none" }}
          ></iframe>
        )
      )}
    </div>
  );
};

export default PdfViewer;
