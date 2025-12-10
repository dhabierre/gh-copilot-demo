import { Router } from 'express';
import { Album, albums } from '../models/album.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json(albums);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const album = albums.find(a => a.id === id);
  if (!album) {
    return res.status(404).json({ message: 'Album not found' });
  }
  res.json(album);
});

router.post('/', (req, res) => {
  const { title, artist, price, image_url } = req.body as Partial<Album>;
  if (
    typeof title !== 'string' ||
    typeof artist !== 'string' ||
    typeof price !== 'number' ||
    typeof image_url !== 'string'
  ) {
    return res.status(400).json({ message: 'Invalid album payload' });
  }
  const id = albums.length ? Math.max(...albums.map(a => a.id)) + 1 : 1;
  const album: Album = { id, title, artist, price, image_url };
  albums.push(album);
  res.status(201).json(album);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = albums.findIndex(a => a.id === id);
  if (idx === -1) {
    return res.status(404).json({ message: 'Album not found' });
  }
  const { title, artist, price, image_url } = req.body as Partial<Album>;
  if (
    typeof title !== 'string' ||
    typeof artist !== 'string' ||
    typeof price !== 'number' ||
    typeof image_url !== 'string'
  ) {
    return res.status(400).json({ message: 'Invalid album payload' });
  }
  const updated: Album = { id, title, artist, price, image_url };
  albums[idx] = updated;
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = albums.findIndex(a => a.id === id);
  if (idx === -1) {
    return res.status(404).json({ message: 'Album not found' });
  }
  const deleted = albums.splice(idx, 1)[0];
  res.json(deleted);
});

export default router;
