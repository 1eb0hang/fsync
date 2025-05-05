import * as http from "http"
import * as fs from "fs"
import * as url from "url"

export default function downloadFile(fileUrl, defaultFilename="dowload"){
		
	return new Promise((resolve, reject)=>{
		let exitCode = 0;
		// Parses the URL to enure we handle diffrent protocols (http, https)
		const parsedUrl = url.parse(fileUrl.toString());

		// Make a request to the file URL
		http.get(parsedUrl, res =>download(res, defaultFilename, {resolve, reject})).on("error", (error)=>{
			console.error("Request faild:", error);
		});
	})
} 

const download = (response, defaultFilename, {resolve, reject})=>{
	console.log("Something");
	if(response.statusCode !== 200){
		throw new Error(`HTTP error: ${response.statusCode}`);
	}
	
	// Try to extract filename from Content-Disposition header
	let filename = defaultFilename;
	const contentDisposition = response.headers["content-disposition"];
	if(contentDisposition && contentDisposition.includes("filename=")){
		const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
		if(match != null && match[1]){
			filename = match[1].replace(/['"]/g, '').trim();
		}
	}
	
	// Create a writable stream
	const fileStream = fs.createWriteStream(filename);

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

const neon = (response, resolve)=>{
	console.log("Thing here alses");
	resolve(1);
}

//downloadFile("http://127.0.0.1:8000/web-term.tar.gz");