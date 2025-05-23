import * as http from "http"
import * as fs from "fs"
import * as url from "url"
import { FileData } from "./userfile";

// TODO: move download path to be in downloads folder
export default function download(repos:string[], file:FileData, downloadName?:string):Promise<number>{
	return new Promise((resolve, reject)=>{
		let exitCode = 0;
		
		// Parses the URL to enure we handle diffrent protocols (http, https)
		const url = new URL(file.urlPath[0],"http:127.0.0.1:8000"); 
		// TODO: either loop through all repos to find path or
		//		specify specific paths for all files
		//		- e.g. http://127.0.0.1:8000/cv.tar.gz

		// downloadName = downloadName?downloadName:file.name;
		// downloadName ??= file.name;

		// Make a request to the file URL
		http.get(url, res =>downloadFile(res, downloadName||file.name, [resolve, reject]))
		.on("error", (error)=>{
			console.error("Request failed:", error);
			reject(1);
		});
	})
} 

const downloadFile = (response:http.IncomingMessage, 
				filename:string,
				[resolve, 
				reject]:((value: number | PromiseLike<number>) => void)[])=>{
	
	if(response.statusCode !== 200){
		// if (404) -> file not found at remote
		throw new Error(`HTTP error: ${response.statusCode}`);
	}
	
	// Try to extract filename from Content-Disposition header
	// let filename = downloadName
	// const contentDisposition = response.headers["content-disposition"];
	// if(contentDisposition && contentDisposition.includes("filename=")){
	// 	const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
	// 	if(match != null && match[1]){
	// 		filename = match[1].replace(/['"]/g, '').trim();
	// 	}
	// }
	

	// Create a writable stream
	const fileStream = fs.createWriteStream(`downloads/${filename}`);

	// Pipe the response body to the file 
	response.pipe(fileStream);

	fileStream.on("finish",()=>{
	 	console.log(`File downloaded as ${filename}`);
		resolve(0);
	});

	fileStream.on("error", (error)=>{
		console.log("Error writin file: ", error);
		reject(1);
	});
}

//downloadFile("http://127.0.0.1:8000/web-term.tar.gz");