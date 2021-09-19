import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('books')
class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    reader_id: string
}

export default Book;