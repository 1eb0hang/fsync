// TODO: Refactor cus its not mine

import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import * as url from "url";

const PORT = 8000;
const ROOT_DIR = path.join(path.dirname(String(import.meta.dirname)), "shared");


const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // Prevent access outside the ROOT_DIR
    const safePath = path.normalize(path.join(ROOT_DIR, pathname));
    if (!safePath.startsWith(ROOT_DIR)) {
        res.statusCode = 403;
        res.end('Forbidden');
        return;
    }

    fs.stat(safePath, (err, stats) => {
        if (err) {
            res.statusCode = 404;
            res.end('Not Found');
            return;
        }

        if (stats.isDirectory()) {
            fs.readdir(safePath, (err, files) => {
                if (err) {
                    res.statusCode = 500;
                    res.end('Error reading directory');
                    return;
                }

                res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                res.write('<html><body><h1>Files</h1><ul>');
                files.forEach(file => {
                    const itemPath = path.join(pathname, file).replace(/\\/g, '/');
                    res.write(`<li><a href="${itemPath}">${file}</a></li>`);
                });
                res.end('</ul></body></html>');
            });
        } else {
            const fileName = path.basename(safePath);
            res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

            const mimeType = getMimeType(fileName);
            res.setHeader('Content-Type', mimeType);

            const fileStream = fs.createReadStream(safePath);
            fileStream.pipe(res);
            fileStream.on('error', () => {
                res.statusCode = 500;
                res.end('Error reading file');
            });
        }
    });
});

server.listen(PORT, () => {
    console.log(`File server running at http://localhost:${PORT}/`);
});

// Very basic MIME type lookup
function getMimeType(fileName) {
    const ext = path.extname(fileName).toLowerCase();
    switch (ext) {
        case '.html': return 'text/html';
        case '.txt': return 'text/plain';
        case '.jpg': case '.jpeg': return 'image/jpeg';
        case '.png': return 'image/png';
        case '.gif': return 'image/gif';
        case '.pdf': return 'application/pdf';
        case '.zip': return 'application/zip';
        default: return 'application/octet-stream';
    }
}

export default server;