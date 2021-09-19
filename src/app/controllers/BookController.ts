import { Request, Response, NextFunction } from "express";
import ResponseError from "../errors/Response";
import Book from "../models/Book";
import Reader from "../models/Reader";
import { getRepository } from "typeorm";


class BookController {
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const repository = getRepository(Book);

            const books = await repository.find();

            return res.status(200).json(books);
        } catch (error) {
            next(error);
        }
    }

    async getByReader(req: Request, res: Response, next: NextFunction) {
        try {
            const bookRepository = getRepository(Book);
            const readerRepository = getRepository(Reader);

            const { reader_id } = req.params;

            const books = await bookRepository.find({ where: { reader_id } });

            const reader = await readerRepository.findOne({ where: { id: reader_id } });

            return res.status(200).json({
                reader,
                books
            });
        } catch (error) {
            next(error);
        }
    }

    async post(req: Request, res: Response, next: NextFunction) {
        try {
            const repository = getRepository(Book);

            const { name, reader_id } = req.body;

            if (!name || !reader_id) {
                const error: ResponseError = new Error('Is missing arguments');
                error.status = 401;
                throw error;
            }

            const bookExists = await repository.findOne({ where: { name } });

            if (bookExists) {
                const error: ResponseError = new Error('Data already Exists');
                error.status = 401;
                throw error;
            }

            const book = repository.create({ name, reader_id });
            
            await repository.save(book);

            return res.status(201).json(book);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const repository = getRepository(Book);

            const { name, reader_id } = req.body;
            const { id } = req.params;

            if (!name || !reader_id) {
                const error: ResponseError = new Error('Is missing arguments');
                error.status = 401;
                throw error;
            }

            const bookExists = await repository.findOne({ where: { id } });

            if (!bookExists) {
                const error: ResponseError = new Error('Data not Exists');
                error.status = 401;
                throw error;
            }

            const book = repository.update(id, { name, reader_id });
            
            return res.status(201).json(book);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const repository = getRepository(Book);

            const { id } = req.params;

            const bookExists = await repository.findOne({ where: { id } });

            if (!bookExists) {
                const error: ResponseError = new Error('Data not Exists');
                error.status = 401;
                throw error;
            }

            const book = repository.delete(id);

            return res.status(201).json(book);
        } catch (error) {
            next(error);
        }
    }
}

export default new BookController();