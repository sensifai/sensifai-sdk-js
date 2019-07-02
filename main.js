(function( factory){

	if(typeof module == 'object' && typeof module.exports == 'object' )
		module.exports = factory();
	else if( typeof window == 'object')
		window.SensifaiSDK = factory();
	else
		console.error('To use this library you need to either use browser or node.js [require()]');

})(function(){
	"use strict";

	// Plugin Constructor
	var mainHost = 'https://api.sensifai.com/api/';
	var SensifaiSDK = function(opts){
		this.options = Object.assign( SensifaiSDK.defaults , opts );
		this.init();
	};

	/**
	 * Initial Function
	 * @param opts
	 */
	SensifaiSDK.prototype.init = function(opts) {
		this.options = opts ? Object.assign(this.options, opts) : this.options;
	};

	/**
	 * Get Task Result
	 * @param taskID: Task ID
	 * @param onSuccess: CallBack Function After Get Result
	 */
	SensifaiSDK.prototype.getResultByTaskID = function( taskID, onSuccess ){
		var Http = new XMLHttpRequest();
		var payload = {
			'query': 'query( $taskId: String! ){apiResult( taskId: $taskId){ ...on ImageResult{isDone errors imageResults{nsfwResult{type probability value}logoResult{description}landmarkResult{description}taggingResult{label probability}faceResult{detectedBoxesPercentage probability detectedFace label}}} ... on VideoResult{fps duration isDone framesCount errors videoResults{startSecond endSecond startFrame endFrame thumbnailPath taggingResult{label probability}actionResult{label probability}celebrityResult{name frequency} sportResult{label probability}nsfwResult{probability type value}}}}}',
			'variables':{'taskId': taskID }
		};

		/** Success CallBack Function **/
		Http.onreadystatechange = function(){
			if ( Http.readyState === 4 && Http.status === 200 ){
				var Response = JSON.parse( this.responseText );
				onSuccess( Response );
			}
		};

		Http.open('POST', mainHost );
		Http.setRequestHeader( 'content-type', 'application/json');
		Http.send( JSON.stringify( payload ) );
	};

	/**
	 * Start Process By URL
	 * @param fileUrls: File URLs List
	 * @param onSuccess: CallBack Function After get Result
	 */
	SensifaiSDK.prototype.uploadByUrls = function( fileUrls, onSuccess ){
		var Http = new XMLHttpRequest();
		var payload = {
			'query':'mutation( $token: String!, $urls: [String!]! ){uploadByUrl( token: $token, urls: $urls){result error succeed{file taskId} cannotUpload}}',
			'variables':{
				'urls': fileUrls,
				'token': this.options['applicationToken']
			}
		};
		Http.open('POST', mainHost, true );
		Http.setRequestHeader( 'content-type', 'application/json');
		Http.send( JSON.stringify( payload ) );

		/** Success CallBack Function **/
		Http.onreadystatechange = function(){
			if ( Http.readyState === 4 && Http.status === 200 ){
				var Response = JSON.parse( this.responseText );
				onSuccess( Response );
			}
		};
	};

	/**
	 * Start Process By File
	 * @param fileInputValue: Files We Want to Uploads
	 * @param onSuccess: CallBack Function After Get Result
	 */
	SensifaiSDK.prototype.uploadByFiles = function( fileInputValue, onSuccess ){
		/** Create New Http, FormData instance **/
		var Http = new XMLHttpRequest();
		var formData = new FormData();

		/** Create Base Object Query Variable **/
		var filesMap = {};
		var nullFiles = Array( fileInputValue.length ).fill(null);
		var payload = {
			"operationName": null,
			"query": "mutation( $token: String!, $files: [Upload!]! ){uploadByFile(token: $token, files: $files){result error succeed{file taskId} cannotUpload}}",
			"variables":{
				'files': nullFiles,
				'token': this.options['applicationToken']
			}
		};

		/** Map Object Generator Loop **/
		for (var i = 0, len = fileInputValue.length; i < len; i++) {
			var tempObj = {};
			tempObj[i]  = ["variables.files." + i.toString()];
			Object.assign( filesMap, tempObj);
		}

		/** Append Operation and Map to FormData Query **/
		formData.append( 'operations', JSON.stringify( payload) );
		formData.append( 'map', JSON.stringify( filesMap ) );

		/** Append Files To FormData  **/
		for (var file = 0, len = fileInputValue.length; file < len; file++) {
			formData.append( file, fileInputValue[file]);
		}

		Http.open('POST', mainHost, true );
		Http.send( formData );

		/** Success CallBack Function **/
		Http.onreadystatechange = function(){
			if ( Http.readyState === 4 && Http.status === 200 ){
				var Response = JSON.parse( this.responseText );
				onSuccess( Response );
			}
		};
	};


	// Set All the Default Values
	SensifaiSDK.defaults = {
		applicationToken : '',
	};

	return SensifaiSDK;
});
