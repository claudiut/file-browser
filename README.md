## File Manager (in progress)
Browse your files using File Manager!

**@Copyright and credits for UI design idea go to Apple (MacOS Finder app)!**

## Usage
```js
    import FileManager from 'file-manager';
    ...
    <FileManager serverApi="https://your-host.com/maybe-prefix" /> 
```

Set your `serverApi` prop and serve your files based on the following API URLs:

- `GET [serverApi]/directories?path=/relative/dir/path&withParents=true|false` to return a directory.
- `DELETE [serverApi]/directories?path=/relative/dir/path` to delete a directory
- `GET [serverApi]/files?path=/relative/file/path` to get a file
- `DELETE [serverApi]/files?path=/relative/dir/or/file/path` to delete a file

## Stack
Built with React, Redux, TypeScript, Webpack & Eslint

## TODO
- rename files & directories
- add upload file functionality

## Licence
MIT