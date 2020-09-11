## File Explorer (in progress)
Browse your files using File Explorer!

**@Copyright for design idea goes to Apple (MacOS Finder app)!**

## Usage
Set your `serverApi` prop and serve your files based on the following API URLs:

- `GET [YOUR_SERVER_API]/directories[/relative/path]` to return a directory.
- `GET [YOUR_SERVER_API]/directory-branch/[/relative/path]` to return a list of directories from base path up to the requested directory.
- `DELETE [YOUR_SERVER_API]/directories[/relative/path]` to delete a directory
- `GET [YOUR_SERVER_API]/files[/relative/path]` to get a file
- `POST [YOUR_SERVER_API]/files[/relative/path]` to upload a file
- `DELETE [YOUR_SERVER_API]/files[/relative/path]` to delete a file

Make sure you return the response formats expected by the File Browser:
- for directories: single or array of `Directory` type
- for the upload/delete actions: just 200/400/etc status codes
- for single file: 200 status code, Content-Disposition: inline, Content-Type: [mime type]

## Stack
Built with React, Redux, TypeScript, Webpack & Eslint

## TODO
- create/delete/rename directories
- add upload file functionality
- refactor API urls to use REST-style
- maybe add permissions (at least for root dirs)

## Licence
MIT