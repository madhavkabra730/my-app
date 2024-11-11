// src/App.js
import React, { useState, useEffect } from "react";
import Spinner from "./Spinner.tsx";
import Card from "./Card.tsx";
import Form from "./Form.tsx"; // Import the new Form component
import { MdAddBox } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

interface Document {
  title: string;
  thumbnail: string;
  type: string;
}

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  useEffect(() => {
    // Fetch documents data from the mock API or localStorage
    if (localStorage.getItem("documents")) {
      setDocuments(JSON.parse(localStorage.getItem("documents") || ""));
      setLoading(false);
    } else {
      setLoading(true);
      fetch("/documents")
        .then((response) => response.json())
        .then((data) => {
          setDocuments(data);
          localStorage.setItem("documents", JSON.stringify(data));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const handleCardClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeOverlay = () => setSelectedImage(null);

  // Handler to add a new document from the Form component
  const handleFormSubmit = (newDocument) => {
    const updatedDocuments = [...documents, newDocument];
    setDocuments(updatedDocuments);
    localStorage.setItem("documents", JSON.stringify(updatedDocuments));
    setShowForm(false);
  };
  const removeDocument = (title) => {
    const updatedDocuments = documents.filter((doc) => doc.title !== title);
    setDocuments(updatedDocuments);
    localStorage.setItem("documents", JSON.stringify(updatedDocuments));
  };
  // Handle drag start
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };
  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  // Handle drop event
  const handleDrop = (e, targetIndex) => {
    const draggedIndex = e.dataTransfer.getData("index");
    const draggedItem = documents[draggedIndex];
    const updatedDocuments = [...documents];
    updatedDocuments.splice(draggedIndex, 1); // Remove the dragged item
    updatedDocuments.splice(targetIndex, 0, draggedItem); // Insert the dragged item at the new position
    setDocuments(updatedDocuments);
    localStorage.setItem("documents", JSON.stringify(updatedDocuments));
  };
  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-800">Document Cards</h1>
      {/* Pass the form submit handler to the Form component */}
      {showForm && (
        <div className="z-10 absolute top-0 left-0 flex items-center justify-center h-screen w-screen inset-0 bg-black bg-opacity-70 overflow-hidden">
          <Form onSubmit={handleFormSubmit} setShowForm={setShowForm} />
        </div>
      )}

      {/* Document list */}
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc, index) => (
            <div
              key={doc.type}
              className="relative flex flex-col items-center justify-center w-64"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <Card doc={doc} onClick={handleCardClick} />
              <FaRegTrashAlt
                className="text-gray-500 size-5"
                onClick={() => removeDocument(doc.title)}
              />
            </div>
          ))}

          {/* Add new document button */}
          <div
            className="p-6 mt-6 w-64 h-44 flex items-center justify-center bg-white rounded-lg shadow-md cursor-pointer"
            onClick={() => setShowForm(true)}
          >
            <MdAddBox className="text-blue-600 size-10" />
            Add
          </div>
        </div>
      )}

      {/* Overlay for selected image */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeOverlay}
        >
          <img
            src={selectedImage}
            alt="Selected Document"
            className="w-auto max-h-full"
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={closeOverlay}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Documents;
