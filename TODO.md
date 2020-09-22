Implement/refactor urls and add this readme!

## Usage
Set your `serverApi` prop and serve your files based on the following API URLs:

- `GET [YOUR_SERVER_API]/directories?path=/relative/dir/path&withParents=true|false` to return a directory.
- `DELETE [YOUR_SERVER_API]/directories?path=/relative/dir/path` to delete a directory
- `DELETE [YOUR_SERVER_API]/files?path=/relative/dir/or/file/path` to delete a file
- `GET [YOUR_SERVER_API]/files?path=/relative/file/path` to get a file
- `POST [YOUR_SERVER_API]/files?path=/relative/dir/path` to upload a file

Make sure you return the response formats expected by the File Browser:
- for directories: single or array of `Directory` type
- for the upload/delete actions: just 200/400/etc status codes
- for single file: 200 status code, Content-Disposition: inline, Content-Type: [mime type]