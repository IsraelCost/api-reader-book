import { Router } from "express";
import ReaderController from "./app/controllers/ReaderController";
import BookController from "./app/controllers/BookController";

const routes = Router();

// Rota dos leitores //
routes.get('/readers', ReaderController.get);
routes.post('/readers', ReaderController.post);
routes.put('/readers/:id', ReaderController.update);
routes.delete('/readers/:id', ReaderController.delete);

// Rota dos livros //
routes.get('/books', BookController.get);
routes.get('/books/:reader_id', BookController.getByReader);
routes.post('/books', BookController.post);
routes.put('/books/:id', BookController.update);
routes.delete('/books/:id', BookController.delete);

export default routes;