
tar -cf archive.tar foo bar  # Create archive.tar from files foo and bar.
  -> tar -cf vault.zip vault/

tar -tvf archive.tar         # List all files in archive.tar verbosely.
tar -xf archive.tar          # Extract all files from archive.tar.
  -> tar -xf vault.zip



- pull -> download from "repo" and move to "designated" (might include decompression)
    - repo -> list defined in user file
    - designated -> associated with file/folder

- host -> copy to "share" folder and host server

user file:
``` json
{
  repo : [
    "http...",
    "127.0...",
    "192...",
    "https..."
  ],
  file:{
    "vault01":{
      "url":"vault_01.zip",
      "destination":"/home/lebo/Documents/vault/"
    },
    "emacsInit":{
      "url":"emacsInit.zip",
      "destination":"/home/lebo/Documents/config/"
    }
  }
}
```
