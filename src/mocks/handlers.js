// src/mocks/handlers.js
import { http, HttpResponse } from "msw";
import data from "./data.json";

export const handlers = [
  // Intercept "GET documents" requests...
  http.get("/documents", () => {
    return HttpResponse.json(data.documents);
  }),
];
