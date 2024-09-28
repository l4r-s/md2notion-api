import fs from 'fs';
import path from 'path';
import showdown from 'showdown';
import express, { Request, Response } from 'express';
import { markdownToBlocks } from '@tryfabric/martian';

const app = express();
app.use(express.json());

const converter = new showdown.Converter();

app.get('/', (req: Request, res: Response) => {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const readmePath = path.join(__dirname, '../README.md');
    fs.readFile(readmePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading README.md file');
        }
        const htmlContent = converter.makeHtml(data);
        res.send(htmlContent);
    });
});

app.post('/api', (req: Request, res: Response) => {
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

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
