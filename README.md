# File Sync

Webserver that syncs files across computers on the same network.

## Installation

Clone the repo:

```shell
git clone https:github.com/1eb0hang/sync.git
```
Go into directory and run the following npm commands:

```shell
npm install
npm run build
```

Make _fsync_ file executable:

```shell
chmod +x ./fsync
```

## Running the Program
**Note**: Make sure both computers on the same network

1. Run server on hiosting computer:

```shell
fsync host
```
2. Pull file from hosting computer to second computer

```shell
fsync pull file
```

File shorthands and hosting computer options and stored in user/userFile.json
