Sensifai API Javascript Client
====================

Sensifai API Javascript Client

##Overview
This Javascript client provides a wrapper around Sensifai [Image and Video recognition API](https://developer.sensifai.com)..

##Installation
The API client is available on NPM.
A library that exposes functions to analyze videos and images.
Using this API is pretty simple. First, you need to install it using npm:

```sh
npm install sensifai-js-sdk
```

Then, you can import its functions and use them as follows:

```js
var sdk = require('sensifai-js-sdk');

var sensifai = new sdk({
  applicationToken: 'Your_Application_Token',
});
```


###Sample Usage
The following example will set up the client and predict video or image attributes.
First of all, you need to import the library and define an instance as mentioned above.
You can get a free limited `token` from [Developer Panel](https://developer.sensifai.com) by creating an application.
Then, if you want to process Data by URL you can call `uploadByUrls` like the below sample code.

```js
/** This Function Return a Json Result **/

var urls_list = ['https://url1.png', 'http://url2.jpg'];
sensifai.uploadByUrls( urls_list, function (res) {
  console.log(res);
});
```

Also, if you want to process Data by File, you can call `uploadByFiles` like the following sample code. 

```js
/** This Function Return a Json Result **/

var fileInput = document.getElementById('the-file');
sensifai.uploadByFiles( fileInput.files, function (res) {
  console.log(res);
});
```

at the end, to retrieve the result of a task, pass it through `getResultByTaskID`.
Please don't remember to pass a single `TaskID!` this function won't work with a list of task id.


```js
/** This Function Return a Json Result **/

var TaskID = 'XXXX-XXX-XXXX-XXXX';
sensifai.getResultByTaskID( TaskID, function (res) {
  console.log( res );
});
```
