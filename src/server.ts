import express from 'express';
import 'reflect-metadata';

import './database/connect'
import global from './app/middlewares/global';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.use(global.notFound);
app.use(global.catchAll);

const port: Number = Number(process.env.PORT) || 3000;

app.listen(port, () => console.log(`Server is running on port: ${port}`));