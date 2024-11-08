# Document Management App

A simple document management application built with React. This app allows users to view documents, drag-and-drop to reorder them, and add new documents through a form. Documents are fetched from a mock API (`json-server`) and are stored in `localStorage`.

## Features

- **Document Display**: Displays documents fetched from a mock API (`json-server`).
- **Drag-and-Drop**: Reorder documents using `react-beautiful-dnd`.
- **Form for Adding Documents**: Add new documents using a form that updates `localStorage` and re-renders the document list.
- **Local Storage**: Documents are saved in the browser's `localStorage` to persist between app reloads.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React-Bootstrap**: Provides responsive components like buttons and form controls.
- **react-beautiful-dnd**: A library for drag-and-drop functionality.
- **json-server**: A simple mock REST API for development and testing.
- **Tailwind CSS**: A utility-first CSS framework for styling.

## Getting Started

### Prerequisites

- Node.js and npm are required to run this project.

### Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <project-folder>
2. **Install Dependencies**
    ```bash
    Copy code
    npm install
3. **Run the Application**

To run the development server, use the following command:

    ```bash
    npm start
The app will run on http://localhost:3000. If you're using json-server for the backend, you can set it up on http://localhost:5000.

4. **Run the Mock API (json-server)** If you don't already have json-server installed, run:

    ```bash
    npm install -g json-server
Then, start the mock API:

    json-server --watch db.json --port 5000

You can edit the documents.json file to add or modify documents. This file serves as a simple mock database for the app.

Documents are displayed as cards with a thumbnail and title.
Clicking on a document card will show a larger view of the thumbnail.
Adding Documents

Click the "Add Document" button to open the form.
Fill in the type, title, and thumbnail link to add a new document.
The new document is appended to the list and saved to localStorage.
Reordering Documents

Use the drag-and-drop feature to reorder documents in the list.
Changes are saved to localStorage and reflected immediately.
Example of the db.json for json-server
json
```
{
  "documents": [
    {
      "type": "PDF",
      "title": "Document 1",
      "thumbnail": "https://example.com/document1-thumbnail.jpg"
    },
    {
      "type": "Image",
      "title": "Document 2",
      "thumbnail": "https://example.com/document2-thumbnail.jpg"
    }
  ]
}
```
5. **Troubleshooting:**
Issue with API Fetching: Ensure that json-server is running on http://localhost:5000 or the correct API endpoint.
Documents Not Saving: Check the browser's local storage for documents or ensure that the form is correctly updating the state.
