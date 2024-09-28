# md2notion-api

An API to convert Markdown to Notion blocks.

This project provides an API endpoint to convert Markdown text into Notion-compatible blocks, leveraging the [`martian`](https://github.com/tryfabric/martian) library.

A hosted version of this API is available at [https://md2notion.hilars.dev](https://md2notion.hilars.dev).

## Usage

### Hosted API

You can use the hosted API by sending a `POST` request to:

`https://md2notion.hilars.dev/api`

**Example Request using `curl`:**

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"md": "# Hello World\nThis is a test."}' \
  https://md2notion.hilars.dev/api
```

**Example Response:**

```json
[
  {
    "object": "block",
    "type": "heading_1",
    "heading_1": {
      "rich_text": [
        {
          "type": "text",
          "annotations": {
            "bold": false,
            "strikethrough": false,
            "underline": false,
            "italic": false,
            "code": false,
            "color": "default"
          },
          "text": {
            "content": "Hello World"
          }
        }
      ]
    }
  },
  {
    "object": "block",
    "type": "paragraph",
    "paragraph": {
      "rich_text": [
        {
          "type": "text",
          "annotations": {
            "bold": false,
            "strikethrough": false,
            "underline": false,
            "italic": false,
            "code": false,
            "color": "default"
          },
          "text": {
            "content": "This is a test."
          }
        }
      ]
    }
  }
]
```

### Running Locally

#### Prerequisites

- Node.js
- Yarn or npm

#### Installation

```bash
git clone https://github.com/l4r-s/md2notion-api.git
cd md2notion-api
yarn install
```

#### Running the API

```bash
yarn dev
```

The API will be running at `http://localhost:3000/api`.

### Docker

```bash
docker build -t md2notion-api .
docker run -p 3000:3000 md2notion-api
```

## Credits

This project is built upon [`martian`](https://github.com/tryfabric/martian), which does the heavy lifting of parsing Markdown into Notion blocks. Big thanks to the contributors of `martian` for their excellent work!

## License

[MIT](LICENSE)

## Buy me a coffee

If you find this project useful, consider buying me a coffee.

<a href="https://buymeacoffee.com/builditn0w" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>