import React, { useState } from "react";
import Spinner from "./Spinner";
interface Document {
  title: string;
  thumbnail: string;
  type: string;
}
const Card = ({ doc, onClick }: { doc: Document; onClick: any }) => {
  // State to track if the image is still loading
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  return (
    <div
      className="m-4 px-6 pb-6 w-64 bg-white rounded-lg shadow-md cursor-pointer space-y-2"
      // Calls the onClick function passed as a prop with the document's thumbnail URL as an argument
      onClick={() => onClick(doc.thumbnail)}
    >
      {/* Display the document title */}
      <h3 className="text-gray-700">{doc.title}</h3>

      {/* Show a loading spinner while the image is loading */}
      {imageLoading && <Spinner />}

      {/* Document thumbnail image */}
      <img
        src={doc.thumbnail}
        alt={doc.title}
        className="w-full h-32 object-cover rounded-md"
        // Hide the spinner once the image has loaded
        onLoad={() => setImageLoading(false)}
      />
    </div>
  );
};

export default Card;
