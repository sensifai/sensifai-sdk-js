Sensifai API Java Script Client
====================

Sensifai API Java Script Client

## Overview
This Java Script client provides a wrapper around Sensifai [Image and Video recognition API](https://developer.sensifai.com).

## Installation
The API client is available on NPM. A library that exposes functions to masks strings. To use it, it's pretty simple. First, you need to install it:

```sh
npm install sensifai-js-sdk
```

Then, you can import its functions and use at will:

```js
var sdk = require('sensifai-js-sdk');

var sensifai = new sdk({
  applicationToken: 'Your_Application_Token',
});
```


### Sample Usage
The following example will set up the client and predict video attributes.
First of all, you need to import the library and define an instance like above.
You can get a free limited `token` from [Developer Panel](https://developer.sensifai.com)  by creating an application.
After that if you want to process Data by url you can call `uploadByUrls` like a below sample code. 

```js
/** This Function Return a Json Result **/

var urls_list = ['https://url1.png', 'http://url2.jpg'];
sensifai.uploadByUrls( urls_list, function (res) {
  console.log(res);
});
```

But if you want to process Data by File you can call `uploadByFiles` like a below sample code. 

```js
/** This Function Return a Json Result **/

var fileInput = document.getElementById('the-file');
sensifai.uploadByFiles( fileInput.files, function (res) {
  console.log(res);
});
```

at the end, to retrieve result of a task, pass it through `getResultByTaskID`.
Please don't remember to pass a single `task id!` this function won't work with a list of task id.


```js
/** This Function Return a Json Result **/

var TaskID = 'XXXX-XXX-XXXX-XXXX';
sensifai.getResultByTaskID( TaskID, function (res) {
  console.log( res );
});
```
