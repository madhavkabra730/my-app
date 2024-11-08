// src/Form.js
import React, { useState } from 'react';
import { MdCancel } from 'react-icons/md';
interface Document {
  title: string;
  thumbnail: string;
  type: string;
}
const Form = ({ onSubmit,setShowForm }) => {
  const [formData, setFormData] = useState<Document>({
    type: '',
    title: '',
    thumbnail: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Call the onSubmit function passed from parent
    setFormData({ type: '', title: '', thumbnail: '' }); // Reset form
  };

  return (
    <div className="relative w-full max-w-sm m-auto bg-white border p-2 border-gray-300 rounded-lg">
      <MdCancel className="absolute top-1 right-1 text-red-600 size-5" onClick={() => setShowForm(false)} />
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4 space-y-2">
          <label className="block text-sm font-medium">Type</label>
          <input
            type="text"
            name="type"
            placeholder="Enter document type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4 space-y-2">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter document title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4 space-y-2">
          <label className="block text-sm font-medium">Thumbnail</label>
          <input
            type="link"
            name="thumbnail"
            placeholder="Enter link to your thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Document
        </button>
      </form>
    </div>
  );
};

export default Form;
