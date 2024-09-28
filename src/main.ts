import fs from 'fs';
import path from 'path';
import express, { Request, Response } from 'express';
import { markdownToBlocks } from '@tryfabric/martian';

const app = express();
app.use(express.json());

//
// API
//
app.post('/', (req: Request, res: Response) => {
    const { md } = req.body;
    if (!md) {
        return res.status(400).send('markdown field is required');
    }

    try {
        const notionBlocks = markdownToBlocks(md);
        res.json(notionBlocks);
    } catch (error) {
        res.status(500).send('Error converting markdown to notion blocks');
    }
});


//
// Static files
//
app.get('/', (req: Request, res: Response) => {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const indexPath = path.join(__dirname, 'index.html');
    fs.readFile(indexPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading index.html file');
        }
        res.send(data);
    });
});

app.get('/LICENSE', (req: Request, res: Response) => {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const licensePath = path.join(__dirname, 'LICENSE');
    fs.readFile(licensePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading LICENSE file');
        }
        res.send(data);
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
