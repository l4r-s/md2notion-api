import fs from 'fs';
import path from 'path';
import showdown from 'showdown';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const readmePath = path.join(__dirname, '../README.md');
const outputPath = path.join(__dirname, '../dist/index.html');
const licensePath = path.join(__dirname, '../LICENSE');
const distLicensePath = path.join(__dirname, '../dist/LICENSE');

fs.copyFile(licensePath, distLicensePath, (err) => {
    if (err) {
        console.error('Error copying LICENSE file', err);
        process.exit(1);
    }
    console.log('LICENSE file copied to dist directory');
});

const converter = new showdown.Converter({
    extensions: [
        () => {
            return [
                {
                    type: 'output',
                    regex: /<h1>/g,
                    replace: '<h1 class="text-4xl font-bold mb-4">'
                },
                {
                    type: 'output',
                    regex: /<h2>/g,
                    replace: '<h2 class="text-3xl font-semibold mb-3">'
                },
                {
                    type: 'output',
                    regex: /<h3>/g,
                    replace: '<h3 class="text-2xl font-medium mb-2">'
                },
                {
                    type: 'output',
                    regex: /<p>/g,
                    replace: '<p class="text-base mb-2">'
                },
                {
                    type: 'output',
                    regex: /<ul>/g,
                    replace: '<ul class="list-disc list-inside mb-2">'
                },
                {
                    type: 'output',
                    regex: /<ol>/g,
                    replace: '<ol class="list-decimal list-inside mb-2">'
                },
                {
                    type: 'output',
                    regex: /<li>/g,
                    replace: '<li class="mb-1">'
                }
            ];
        }
    ]
});

fs.readFile(readmePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading README.md file', err);
        process.exit(1);
    }
    const htmlContent = converter.makeHtml(data);
    const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown to Notion API | hilars.dev</title>
    <meta name="description" content="Convert Markdown to Notion blocks with a free, hosted API.">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
        }
        a {
            color: #1a0dab;
            text-decoration: underline;
        }
        a:hover {
            color: #d61f69;
        }
        h1 {
            font-size: 2.25rem; /* 36px */
            font-weight: bold;
        }
        h2 {
            font-size: 1.875rem; /* 30px */
            font-weight: semibold;
        }
        h3 {
            font-size: 1.5rem; /* 24px */
            font-weight: medium;
        }
        h4 {
            font-size: 1.25rem; /* 20px */
            font-weight: normal;
        }
        h1, h2, h3 {
            margin-top: 1em;
            margin-bottom: 0.5em;
        }
        p {
            margin-bottom: 1em;
        }
        ul, ol {
            margin-bottom: 1em;
            padding-left: 1.5em;
        }
        li {
            margin-bottom: 0.5em;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2em;
        }
    </style>
</head>
<body>
    <div class="container mx-auto p-4">
        ${htmlContent}
    </div>
</body>
</html>
    `;
    fs.writeFile(outputPath, htmlTemplate, 'utf8', (err) => {
        if (err) {
            console.error('Error writing index.html file', err);
            process.exit(1);
        }
        console.log('index.html has been created successfully');
    });
});
