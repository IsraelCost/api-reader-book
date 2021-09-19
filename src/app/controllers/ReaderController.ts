import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import ResponseError from "../errors/Response";
import Reader from "../models/Reader";

class ReaderController {
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const repository = getRepository(Reader);
            
            const readers = await repository.find();

            return res.status(200).json(readers);
        } catch (error) {
            next(error);
        }
    }

    async post(req: Request, res: Response, next: NextFunction) {
        try {
            const repository = getRepository(Reader);
            
            const { name, email, password } = req.body;

            // VERIFICAR DADOS INEXISTENTES //
            if (!email || !name || !password) {
                const error: ResponseError = new Error('Is missing arguments.');
                error.status = 400;
                throw error;
            }

            const readerExists = await repository.findOne({ where: { email } });

            if (readerExists) {
                const error: ResponseError = new Error('Data already exists.');
                error.status = 409;
                throw error;
            }

            const reader = repository.create({ name, email, password }); 

            await repository.save(reader);            
            
            return res.status(201).json(reader);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const repository = getRepository(Reader);
            
            const { name, email, password } = req.body;
            const { id } = req.params;

            // VERIFICAR DADOS INEXISTENTES //
            if (!email || !name || !password) {
                const error: ResponseError = new Error('Is missing arguments.');
                error.status = 400;
                throw error;
            }

            const readerExists = await repository.findOne({ where: { id } });

            if (!readerExists) {
                const error: ResponseError = new Error('Data not exists.');
                error.status = 409;
                throw error;
            }

            const newReader = await repository.update(id, { name, email, password }); 

            return res.status(201).json(newReader);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const repository = getRepository(Reader);

            const { id } = req.params;

            const readerExists = await repository.findOne(id);

            if (!readerExists) {
                const error: ResponseError = new Error('Data not exists.');
                error.status = 409;
                throw error;
            }

            await repository.delete(id);

            return res.status(200).json(readerExists);
        } catch (error) {
            next(error);
        }
    }
} 

export default new ReaderController();