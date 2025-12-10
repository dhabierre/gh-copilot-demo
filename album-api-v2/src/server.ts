import express from 'express';
import cors from 'cors';
import albumsRouter from './routes/albums';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hit the /albums endpoint to retrieve a list of albums!');
});

app.use('/albums', albumsRouter);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`album-api-v2 listening on http://localhost:${port}`);
  });
}

export default app;
