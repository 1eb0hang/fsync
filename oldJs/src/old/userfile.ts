// {
//     "repo":[
// 		"192.168.8.107:8080",
// 		"127.0.0.1:8000"
//     ],
//     "file":{
// 		"vault":{
// 			"name":"vault_01.tar.gz", // can conceptually be anything
// 		    "url":[
// 				"vault_01.tar.gz",
//              "obs_safe.zip"
// 		    ],
// 		    "destination":"/home/lebo/Documents/vault/vault_01"
// 		},
// 		"webterm":{
// 			"name":"web-term.tar.gz",
// 			"url":[
// 				"web-term.tar.gz"
// 			],
// 			"destination":"/home/lebo/Dev/PROJECTS/temp/web-term"
// 		}
//     }
// }

export type UserFile = {
    repo:string[];
    file:{[symbol:string]:FileData}
}

type FileData = {
    name:string;
    urlPath:string[];
    destination:Destination
}

type Destination = {
    path:string;
    basename:string
}

export default UserFile;
export {FileData, Destination};

// TODO: server should anounce what values are available
//      like on the server you define keys "vault" and "cv" which
//      are mapped to some download, and then when pulling you can
//      query what keys are there, and then pick on to pull from