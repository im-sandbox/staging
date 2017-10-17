var imIsObjValid=function(a){return"undefined"!=typeof a&&null!=a?!0:!1},EventListeners=function(a){this.event=a;this.count=0;var b=[];this.add=function(a){b.push(a);++this.count};this.remove=function(a){var d=!1,e=this;b=b.filter(function(b){if(b=b===a)--e.count,d=!0;return!b});return d};this.removeAll=function(){b=[];this.count=0};this.broadcast=function(a){b.forEach(function(b){try{b.apply({},a)}catch(e){}})};this.toString=function(){var c=[a,":"];b.forEach(function(a){c.push("|",String(a),"|")});
return c.join("")}},InmobiObj=function(){this.listeners=[];this.addEventListener=function(a,b){try{if(imIsObjValid(b)&&imIsObjValid(a)){var c=this.listeners;c[a]||(c[a]=new EventListeners);c[a].add(b);"micIntensityChange"==a&&window.imraidview.startListeningMicIntensity();"deviceMuted"==a&&window.imraidview.startListeningDeviceMuteEvents();"deviceVolumeChange"==a&&window.imraidview.startListeningDeviceVolumeChange();"volumeChange"==a&&window.imraidview.startListeningVolumeChange();"headphones"==a&&
window.imraidview.startListeningHeadphonePluggedEvents();"backButtonPressed"==a&&window.imraidview.startListeningForBackButtonPressedEvent();"downloadStatusChanged"==a&&window.imraidview.registerDownloaderCallbacks()}}catch(d){this.log(d)}};this.removeEventListener=function(a,b){if(imIsObjValid(a)){var c=this.listeners;imIsObjValid(c[a])&&(imIsObjValid(b)?c[a].remove(b):c[a].removeAll());"micIntensityChange"==a&&0==c[a].count&&window.imraidview.stopListeningMicIntensity();"deviceMuted"==a&&0==c[a].count&&
window.imraidview.stopListeningDeviceMuteEvents();"deviceVolumeChange"==a&&0==c[a].count&&window.imraidview.stopListeningDeviceVolumeChange();"volumeChange"==a&&0==c[a].count&&window.imraidview.stopListeningVolumeChange();"headphones"==a&&0==c[a].count&&window.imraidview.stopListeningHeadphonePluggedEvents();"backButtonPressed"==a&&0==c[a].count&&window.imraidview.stopListeningForBackButtonPressedEvent();"downloadStatusChanged"==a&&0==c[a].count&&window.imraidview.unregisterDownloaderCallbacks()}};
this.broadcastEvent=function(a){if(imIsObjValid(a)){for(var b=Array(arguments.length),c=0;c<arguments.length;c++)b[c]=arguments[c];c=b.shift();try{this.listeners[c]&&this.listeners[c].broadcast(b)}catch(d){}}};this.sendSaveContentResult=function(a){if(imIsObjValid(a)){for(var b=Array(arguments.length),c=0;c<arguments.length;c++)if(2==c){var d=arguments[c],d=JSON.parse(d);b[c]=d}else b[c]=arguments[c];d=b[1];"success"!=d&&(c=b[0].substring(b[0].indexOf("_")+1),imraid.saveContentIDMap[c]&&delete imraid.saveContentIDMap[c]);
window.imraid.broadcastEvent(b[0],b[1],b[2])}}},__im__iosNativeMessageHandler=void 0;window.webkit&&(window.webkit.messageHandlers&&window.webkit.messageHandlers.nativeMessageHandler)&&(__im__iosNativeMessageHandler=window.webkit.messageHandlers.nativeMessageHandler);
var __im__iosNativeCall={nativeCallInFlight:!1,nativeCallQueue:[],executeNativeCall:function(a){this.nativeCallInFlight?this.nativeCallQueue.push(a):(this.nativeCallInFlight=!0,imIsObjValid(__im__iosNativeMessageHandler)?__im__iosNativeMessageHandler.postMessage(a):window.location=a)},nativeCallComplete:function(a){0==this.nativeCallQueue.length?this.nativeCallInFlight=!1:(a=this.nativeCallQueue.shift(),imIsObjValid(__im__iosNativeMessageHandler)?__im__iosNativeMessageHandler.postMessage(a):window.location=
a)}},IOSNativeCall=function(){this.urlScheme="";this.executeNativeCall=function(a){if(imIsObjValid(__im__iosNativeMessageHandler)){d={};d.command=a;d.scheme=this.urlScheme;for(var b={},c=1;c<arguments.length;c+=2)e=arguments[c+1],null!=e&&(b[arguments[c]]=""+e);d.params=b}else for(var d=this.urlScheme+"://"+a,e,b=!0,c=1;c<arguments.length;c+=2)e=arguments[c+1],null!=e&&(b?(d+="?",b=!1):d+="&",d+=arguments[c]+"="+escape(e));__im__iosNativeCall.executeNativeCall(d);return"OK"};this.nativeCallComplete=
function(a){__im__iosNativeCall.nativeCallComplete(a);return"OK"};this.updateKV=function(a,b){this[a]=b;var c=this.broadcastMap[a];c&&this.broadcastEvent(c,b)}};
(function(){var a=window.mraidview=new IOSNativeCall;a.viewable=!1;a.state="loading";a.placement="inline";a.urlScheme="mraidview";a.supportedFeatures=[];a.resizeProperties=null;a.expandProperties={width:0,height:0,useCustomClose:!1,isModal:!0,lockOrientation:!1,orientation:""};a.expandPropertiesSetByCreative=!1;a.orientationProperties={allowOrientationChange:!0,forceOrientation:"none",direction:"right"};a.broadcastMap={state:"stateChange",viewable:"viewableChange"};a.screenSize={width:0,height:0};
a.currentPosition={x:0,y:0,width:0,height:0};a.defaultPosition={x:0,y:0,width:0,height:0};a.maxSize={width:0,height:0};a.detectAndBlockFraud=function(b){if(!a.isPossibleFraud())return!1;a.isAdShownToUser?setTimeout(function(){a.isPossibleFraud()&&a.fireRedirectFraudBeacon(b)},200):a.fireRedirectFraudBeacon(b);return!1};a.close=function(){a.executeNativeCall("close")};a.expand=function(a){try{var c="mraidview.executeNativeCall('expand'";imIsObjValid(a)&&(c+=", 'url', '"+a+"'");eval(c+");")}catch(d){}};
a.getExpandProperties=function(){if(!1===a.expandPropertiesSetByCreative){var b=a.expandProperties;b.height=a.screenSize.height;b.width=a.screenSize.width;return b}return a.expandProperties};a.setExpandProperties=function(b){try{if(imIsObjValid(b)){a.expandProperties=b;a.expandProperties.isModal=!0;a.expandPropertiesSetByCreative=!0;var c={},d="mraidview.executeNativeCall('expandprops'";imIsObjValid(b.width)&&(d+=", 'width', '"+b.width+"'");imIsObjValid(b.height)&&(d+=", 'height', '"+b.height+"'");
imIsObjValid(b.useCustomClose)&&(d+=", 'close', '"+b.useCustomClose+"'");imIsObjValid(b.isModal)&&(d+=", 'isModal', '"+b.isModal+"'");imIsObjValid(b.lockOrientation)&&imIsObjValid(b.orientation)&&(c.allowOrientationChange=!b.lockOrientation,c.forceOrientation=b.orientation,mraid.setOrientationProperties(c));eval(d+");")}}catch(e){}};a.getResizeProperties=function(){return a.resizeProperties};a.setResizeProperties=function(b){try{if(imIsObjValid(b)){a.resizeProperties=b;var c="mraidview.executeNativeCall('resizeprops'";
imIsObjValid(b.width)&&(c+=", 'width', '"+b.width+"'");imIsObjValid(b.height)&&(c+=", 'height', '"+b.height+"'");imIsObjValid(b.customClosePosition)&&(c+=", 'customClosePosition', '"+b.customClosePosition+"'");imIsObjValid(b.offsetX)&&(c+=", 'offsetX', '"+b.offsetX+"'");imIsObjValid(b.offsetY)&&(c+=", 'offsetY', '"+b.offsetY+"'");imIsObjValid(b.allowOffscreen)&&(c+=", 'allowOffscreen', '"+b.allowOffscreen+"'");eval(c+");")}}catch(d){}};a.getOrientationProperties=function(){return{forceOrientation:a.orientationProperties.forceOrientation,
allowOrientationChange:a.orientationProperties.allowOrientationChange}};a.setOrientationProperties=function(b){try{if(imIsObjValid(b)){var c="mraidview.executeNativeCall('orientprops'";imIsObjValid(b.allowOrientationChange)&&(c+=", 'allowOrientationChange', '"+b.allowOrientationChange+"'");imIsObjValid(b.forceOrientation)&&(c+=", 'forceOrientation', '"+b.forceOrientation+"'");imIsObjValid(a.orientationProperties.direction)&&(c+=", 'direction', '"+a.orientationProperties.direction+"'");a.orientationProperties.allowOrientationChange=
b.allowOrientationChange;a.orientationProperties.forceOrientation=b.forceOrientation;eval(c+");")}}catch(d){}};a.useCustomClose=function(b){imIsObjValid(b)?(a.expandProperties.useCustomClose=b,a.executeNativeCall("useCustomClose","close",b)):window.mraid.broadcastEvent("error","Invalid custom close value","useCustomClose")};a.open=function(b){!imIsObjValid(b)||0==b.trim().length?window.mraid.broadcastEvent("error","Invalid url","open"):a.executeNativeCall("open","url",b)};a.resize=function(){if(a.resizeProperties){var b=
a.resizeProperties.width,c=a.resizeProperties.height;!imIsObjValid(b)||!imIsObjValid(c)||isNaN(b)||isNaN(c)?window.mraid.broadcastEvent("error","Ad size ("+b+" x "+c+") in resizeProperties is not valid.","resize"):a.executeNativeCall("resize")}else window.mraid.broadcastEvent("error","Cannot resize ad without resizeProperties.","resize")};a.createCalendarEvent=function(a){try{if(window._im_imaiview.isProtectedAPIAllowed()&&imIsObjValid(a)){var c="mraidview.executeNativeCall('createCalendarEvent'";
imIsObjValid(a.start)&&(c+=", 'start', '"+a.start+"'");imIsObjValid(a.summary)&&(c+=", 'summary', '"+a.summary+"'");imIsObjValid(a.end)&&(c+=", 'end', '"+a.end+"'");imIsObjValid(a.description)&&(c+=", 'description', '"+a.description+"'");imIsObjValid(a.location)&&(c+=", 'location', '"+a.location+"'");imIsObjValid(a.status)&&(c+=", 'status', '"+a.status+"'");imIsObjValid(a.recurrence)&&(c+=", 'recurrence', '"+JSON.stringify(a.recurrence)+"'");imIsObjValid(a.id)&&(c+=", 'id', '"+a.id+"'");imIsObjValid(a.reminder)&&
(c+=", 'reminder', '"+a.reminder+"'");eval(c+");")}}catch(d){}};a.getScreenSize=function(){var b=a.screenSize;return{width:b.width,height:b.height}};a.getMaxSize=function(){var b=a.maxSize;return{width:b.width,height:b.height}};a.getCurrentPosition=function(){var b=a.currentPosition;return{x:b.x,y:b.y,width:b.width,height:b.height}};a.getDefaultPosition=function(){var b=a.defaultPosition;return{x:b.x,y:b.y,width:b.width,height:b.height}};a.isViewable=function(){return a.viewable};a.getState=function(){return a.state};
a.getPlacementType=function(){return a.placement};a.supports=function(b){return-1!=a.supportedFeatures.indexOf(b)};a.playVideo=function(a){try{if(!imIsObjValid(a)||0==a.trim().length)window.mraid.broadcastEvent("error","Invalid url","playVideo");else{var c="mraidview.executeNativeCall('playVideo'";imIsObjValid(a)&&(c+=", 'url', '"+a+"');");eval(c)}}catch(d){}};a.storePicture=function(b){try{window._im_imaiview.isProtectedAPIAllowed()&&(!imIsObjValid(b)||0==b.trim().length?window.mraid.broadcastEvent("error",
"Invalid url","storePicture"):a.executeNativeCall("storePicture","url",b))}catch(c){}};a.fireMediaTrackingEvent=function(a,c){};a.fireMediaErrorEvent=function(a,c){};a.fireMediaTimeUpdateEvent=function(a,c,d){};a.fireMediaCloseEvent=function(a,c,d){};a.fireMediaVolumeChangeEvent=function(a,c){};a.broadcastEvent=function(){window.mraid.broadcastEvent.apply(window.mraid,arguments)}})();
(function(){var a=window.mraid=new InmobiObj,b=window.mraidview,c=!1;b.isAdShownToUser=!1;b.onUserInteraction=function(){c=!0};b.isPossibleFraud=function(){return a.supports("redirectFraudDetection")&&(!b.isAdShownToUser||!c)};b.fireRedirectFraudBeacon=function(a){if("undefined"!=typeof inmobi&&inmobi.recordEvent){var c={};c.trigger=a;c.isAdShown=b.isAdShownToUser.toString();inmobi.recordEvent(135,c)}};window.onbeforeunload=function(){b.detectAndBlockFraud("redirect")};a.addEventListener("viewableChange",
function(a){a&&!b.isAdShownToUser&&(b.isAdShownToUser=!0)});a.useCustomClose=b.useCustomClose;a.close=b.close;a.getExpandProperties=b.getExpandProperties;a.setExpandProperties=function(c){"undefined"!=typeof c&&("useCustomClose"in c&&"undefined"!=typeof a.getState()&&"expanded"!=a.getState())&&a.useCustomClose(c.useCustomClose);b.setExpandProperties(c)};a.getResizeProperties=b.getResizeProperties;a.setResizeProperties=b.setResizeProperties;a.getOrientationProperties=b.getOrientationProperties;a.setOrientationProperties=
b.setOrientationProperties;a.expand=b.expand;a.getMaxSize=b.getMaxSize;a.getState=b.getState;a.isViewable=b.isViewable;a.createCalendarEvent=function(a){b.detectAndBlockFraud("mraid.createCalendarEvent")||b.createCalendarEvent(a)};a.open=function(c){b.detectAndBlockFraud("mraid.open")||("string"!=typeof c?a.broadcastEvent("error","URL is required.","open"):b.open(c))};a.resize=b.resize;a.getVersion=function(){return"2.0"};a.getPlacementType=b.getPlacementType;a.playVideo=function(a){b.playVideo(a)};
a.getScreenSize=b.getScreenSize;a.getCurrentPosition=b.getCurrentPosition;a.getDefaultPosition=b.getDefaultPosition;a.supports=function(a){return b.supports(a)};a.storePicture=function(c){"string"!=typeof c?a.broadcastEvent("error","Request must specify a valid URL","storePicture"):b.storePicture(c)}})();
(function(){var a=window.imraidview=new IOSNativeCall;a.urlScheme="imraidview";a.orientation="-1";a.micIntensity=0;a.deviceVolume=-1;a.deviceMuted=0;a.maxVibrateDuration=5;a.defaultVibrateInterval=0.4;a.sdkVersion=void 0;a.supportedFeatures=[];a.broadcastMap={orientation:"orientationChange",micIntensity:"micIntensityChange",headphones:"headphones",deviceVolume:"deviceVolumeChange",volumeChange:"volumeChange",deviceMuted:"deviceMuted"};a.resetAllMaps=function(){};a.fireMediaTrackingEvent=function(a,
c){var d={};d.name=a;var e="inmobi_media_"+a;imIsObjValid(c)&&""!=c&&(e=e+"_"+c);window.imraid.broadcastEvent(e,d);return"OK"};a.fireMediaErrorEvent=function(a,c){var d={name:"error"};d.code=c;var e="inmobi_media_"+d.name;imIsObjValid(a)&&""!=a&&(e=e+"_"+a);window.imraid.broadcastEvent(e,d);return"OK"};a.fireMediaTimeUpdateEvent=function(a,c,d){var e={name:"timeupdate",target:{}};e.target.currentTime=c;e.target.duration=d;c="inmobi_media_"+e.name;imIsObjValid(a)&&""!=a&&(c=c+"_"+a);window.imraid.broadcastEvent(c,
e);return"OK"};a.fireMediaCloseEvent=function(a,c,d){var e={name:"close"};e.viaUserInteraction=c;e.target={};e.target.currentTime=d;c="inmobi_media_"+e.name;imIsObjValid(a)&&""!=a&&(c=c+"_"+a);window.imraid.broadcastEvent(c,e);return"OK"};a.fireMediaVolumeChangeEvent=function(a,c){if(imIsObjValid(a)&&"string"==typeof a&&imIsObjValid(c)&&!isNaN(c))try{var d={name:"volumechange",target:{}};d.target.volume=c;d.target.muted=0.001>=c?!0:!1;window.imraid.broadcastEvent("inmobi_media_"+d.name+"_"+a,d)}catch(e){}return"OK"};
a.log=function(b){a.executeNativeCall("log","message",b)};a.asyncPing=function(b){try{!imIsObjValid(b)||0==b.trim().length?window.imraid.broadcastEvent("error","Invalid url","asyncPing"):a.executeNativeCall("asyncPing","url",b)}catch(c){a.log("asyncPing: "+c)}};a.makeCall=function(b){a.executeNativeCall("phone","number",b)};a.sendMail=function(b,c,d){a.executeNativeCall("email","to",b,"subject",c,"body",d,"html","N")};a.sendSMS=function(b,c){a.executeNativeCall("sms","to",b,"body",c)};a.openExternal=
function(b,c){try{(!imIsObjValid(b)||"string"!=typeof b||0==b.trim().length)&&window.imraid.broadcastEvent("error","Invalid url","openExternal"),imIsObjValid(c)&&("string"!=typeof c||0==c.trim().length)&&window.imraid.broadcastEvent("error","Invalid fallbackURL","openExternal"),a.executeNativeCall("openExternal","url",b,"fallbackUrl",c)}catch(d){}};a.updateToPassbook=function(b){!imIsObjValid(b)||0==b.trim().length?window.imraid.broadcastEvent("error","Invalid url","updateToPassbook"):a.executeNativeCall("updateToPassbook",
"url",b)};a.incentCompleted=function(a){try{var c="imraidview.executeNativeCall('incentCompleted'";imIsObjValid(a)&&(c+=",'value' ,'"+JSON.stringify(a)+"'");eval(c+")")}catch(d){}};a.getSdkVersion=function(){return window.imaiview.getSdkVersion()};a.getSdkVersionInt=function(){for(var b=a.getSdkVersion().split("."),c=b.length,d="",e=0;e<c;e++)d+=b[e];return parseInt(d)};a.takeCameraPicture=function(){if(window._im_imaiview.isProtectedAPIAllowed())try{a.executeNativeCall("takeCameraPicture")}catch(b){}};
a.startListeningMicIntensity=function(){window._im_imaiview.isProtectedAPIAllowed()&&(mraidview.onUserInteraction(),a.executeNativeCall("listenMicIntensity","listen",!0))};a.stopListeningMicIntensity=function(){a.executeNativeCall("listenMicIntensity","listen",!1)};a.getMicIntensity=function(){return a.micIntensity};a.startListeningHeadphonePluggedEvents=function(){a.executeNativeCall("listenHeadphonePluggedEvents","listen",!0)};a.stopListeningHeadphonePluggedEvents=function(){a.executeNativeCall("listenHeadphonePluggedEvents",
"listen",!1)};a.isHeadPhonesPlugged=function(){return a.headphones};a.startListeningDeviceVolumeChange=function(){a.executeNativeCall("listenDeviceVolumeChangeEvents","listen",!0)};a.stopListeningDeviceVolumeChange=function(){a.executeNativeCall("listenDeviceVolumeChangeEvents","listen",!1)};a.setDeviceVolume=function(b){a.executeNativeCall("setDeviceVolume","volume",b)};a.getDeviceVolume=function(){return a.deviceVolume};a.isDeviceMuted=function(){return a.deviceMuted};a.startListeningDeviceMuteEvents=
function(){a.executeNativeCall("listenDeviceMuteEvents","listen",!0)};a.stopListeningDeviceMuteEvents=function(){a.executeNativeCall("listenDeviceMuteEvents","listen",!1)};a.startListeningVolumeChange=function(){a.executeNativeCall("listenVolumeChangeEvents","listen",!0)};a.stopListeningVolumeChange=function(){a.executeNativeCall("listenVolumeChangeEvents","listen",!1)};a.postToSocial=function(b,c,d,e){a.executeNativeCall("postToSocial","type",b,"text",c,"url",d,"image",e)};a.cameraPictureCaptured=
function(a,c,d){var e=new Image;e.src="data:image/jpeg;base64,"+a;e.width=c;e.height=d;window.imraid.broadcastEvent("cameraPictureCaptured",e)};a.loadSKStore=function(b){try{a.executeNativeCall("loadSKStore","id",b)}catch(c){imraid.log(JSON.stringify(c))}};a.showSKStore=function(b){try{a.executeNativeCall("showSKStore","id",b)}catch(c){imraid.log(JSON.stringify(c))}};a.saveContent=function(b,c,d){window.imraid.addEventListener("saveContent_"+b,d);a.executeNativeCall("savecontent","contentid",b,"contenturl",
c)};a.cancelSaveContent=function(b){a.executeNativeCall("cancelsavecontent","contentid",b)};a.sendSaveContentResult=function(){window.imraid.sendSaveContentResult.apply(window.imraid,arguments)};a.disableCloseRegion=function(b){imIsObjValid(b)&&a.executeNativeCall("disableCloseRegion","disable",b)};a.setCloseEndCardTracker=function(b){700<=a.getSdkVersionInt()&&a.executeNativeCall("setCloseEndCardTracker","url",b)};a.setOrientationProperties=function(a){try{if(imIsObjValid(a)){var c="imraidview.executeNativeCall('orientprops'";
imIsObjValid(a.allowOrientationChange)&&(c+=", 'allowOrientationChange', '"+a.allowOrientationChange+"'");imIsObjValid(a.forceOrientation)&&(c+=", 'forceOrientation', '"+a.forceOrientation+"'");imIsObjValid(a.direction)&&(c+=", 'direction','"+a.direction+"'");mraidview.orientationProperties=a;eval(c+");")}}catch(d){}};a.getOrientationProperties=function(){return mraidview.orientationProperties};a.getOrientation=function(){return a.orientation};a.getPlatform=function(){return"ios"};a.supports=function(b){return-1!=
a.supportedFeatures.indexOf(b)};a.broadcastEvent=function(){window.imraid.broadcastEvent.apply(window.imraid,arguments)};a.hideStatusBar=function(){a.executeNativeCall("hideStatusBar")};a.registerDownloaderCallbacks=function(){};a.unregisterDownloaderCallbacks=function(){};a.fireEvent=function(b){"fireSkip"===b?a.executeNativeCall("fireSkip"):"fireComplete"===b?a.executeNativeCall("fireComplete"):"showEndCard"===b&&a.executeNativeCall("showEndCard")};a.saveBlob=function(b){a.executeNativeCall("saveBlob",
"blob",b)};a.getBlob=function(b,c){a.executeNativeCall("getBlob","namespace",b,"callback",c)}})();
(function(){var a=window.imraid=new InmobiObj,b=window.imraidview;a.getOrientation=b.getOrientation;a.setOrientationProperties=b.setOrientationProperties;a.getOrientationProperties=b.getOrientationProperties;a.saveContentIDMap={};a.saveContent=function(c,d,e){var k=arguments.length,h,f=null;if(3>k){if("function"===typeof arguments[k-1])h=arguments[k-1];else return;f={reason:1}}else a.saveContentIDMap[c]&&(h=arguments[2],f={reason:11,url:arguments[1]});"function"!==!h&&(f?(window.imraid.addEventListener("saveContent_failed_"+
c,h),window.imraid.sendSaveContentResult("saveContent_failed_"+c,"failed",JSON.stringify(f))):(a.removeEventListener("saveContent_"+c),a.saveContentIDMap[c]=!0,b.saveContent(c,d,e)))};a.cancelSaveContent=function(a){b.cancelSaveContent(a)};a.asyncPing=function(c){"string"!=typeof c?a.broadcastEvent("error","URL is required.","asyncPing"):b.asyncPing(c)};a.disableCloseRegion=b.disableCloseRegion;a.getSdkVersion=b.getSdkVersion;a.log=function(c){"undefined"==typeof c?a.broadcastEvent("error","message is required.",
"log"):"string"==typeof c?b.log(c):b.log(JSON.stringify(c))};a.getInMobiAIVersion=function(){return"2.0"};a.getVendorName=function(){return"inmobi"};a.openExternal=function(a,d){mraidview.detectAndBlockFraud("imraid.openExternal")||b.openExternal(a,d)};a.updateToPassbook=function(c){mraidview.detectAndBlockFraud("imraid.updateToPassbook")||("string"!=typeof c?a.broadcastEvent("error","Request must specify a valid URL","updateToPassbook"):b.updateToPassbook(c))};a.postToSocial=function(a,d,e,k){mraidview.detectAndBlockFraud("imraid.postToSocial")||
b.postToSocial(a,d,e,k)};a.getPlatform=b.getPlatform;a.incentCompleted=b.incentCompleted;a.loadSKStore=b.loadSKStore;a.showSKStore=function(a){mraidview.detectAndBlockFraud("imraid.showSKStore")||b.showSKStore(a)};a.supports=function(a){return b.supports(a)};a.isDeviceMuted=function(){return!imIsObjValid(a.listeners.deviceMuted)?-1:b.isDeviceMuted()};a.isHeadPhonesPlugged=function(){return!imIsObjValid(a.listeners.headphones)?!1:b.isHeadPhonesPlugged()};a.getDeviceVolume=function(){return b.getDeviceVolume()};
a.setDeviceVolume=function(a){b.setDeviceVolume(a)};a.hideStatusBar=function(){b.hideStatusBar()};a.setOpaqueBackground=function(){b.setOpaqueBackground()};a.disableBackButton=b.disableBackButton;a.isBackButtonDisabled=b.isBackButtonDisabled;a.startDownloader=b.startDownloader;a.getDownloadProgress=b.getDownloadProgress;a.getDownloadStatus=b.getDownloadStatus;a.fireEvent=b.fireEvent;a.saveBlob=b.saveBlob;a.getBlob=b.getBlob;a.setCloseEndCardTracker=b.setCloseEndCardTracker})();
(function(){var a=window._im_imaiview=new IOSNativeCall;window.imaiview=window._im_imaiview;a.ios={};a.imVersion="1.0";a.urlScheme="imaiview";a.sdkVersion=null;a.getPlatform=function(){return"ios"};a.getPlatformVersion=function(){return a.imVersion};a.log=function(b){a.executeNativeCall("log","message",b)};a.openEmbedded=function(b){a.executeNativeCall("open","url",b)};a.openExternal=function(b,c){try{(!imIsObjValid(b)||"string"!=typeof b||0==b.trim().length)&&window.imai.broadcastEvent("error","Invalid url",
"openExternal"),void 0!==c&&(!imIsObjValid(c)||"string"!=typeof c||0==c.trim().length)&&window.imai.broadcastEvent("error","Invalid fallbackURL","openExternal"),a.executeNativeCall("openExternal","url",b,"fallbackUrl",c)}catch(d){}};a.ping=function(b,c){a.executeNativeCall("ping","url",b,"redirects",c)};a.pingInWebView=function(b,c){a.executeNativeCall("pingInWebView","url",b,"redirects",c)};a.onUserInteraction=function(b){try{a.executeNativeCall("onUserInteraction","params",JSON.stringify(b))}catch(c){}};
a.getSdkVersion=function(){var b=a.sdkVersion;if("string"==typeof b&&null!=b)return b};a.ios.openItunesProductView=function(b){imai.addEventListener("SKStoreIsOpened",function(a){window._im_imai.broadcastEvent("openItunesProductView",a)});a.executeNativeCall("openSKStore","id",b)};a.loadSKStore=function(b){try{a.executeNativeCall("loadSKStore","id",b)}catch(c){imraid.log(JSON.stringify(c))}};a.showSKStore=function(b){try{a.executeNativeCall("showSKStore","id",b)}catch(c){imraid.log(JSON.stringify(c))}};
a.fireAdReady=function(){a.executeNativeCall("fireAdReady")};a.fireAdFailed=function(){a.executeNativeCall("fireAdFailed")};a.broadcastEvent=function(){window.imai.broadcastEvent.apply(window.imai,arguments)};if(void 0!==window.webkit){var b=document.querySelector("meta[name=viewport]");if(null===b){if(b=document.getElementsByTagName("head")[0],void 0!==b){var c=document.createElement("meta");c.name="viewport";c.content="initial-scale=1.0";b.appendChild(c)}}else{var c=b.getAttribute("content"),d=
!1;null===c||0==c.trim().length?(c="initial-scale = 1.0",d=!0):-1==c.toLowerCase().indexOf("initial-scale")&&(c+=",initial-scale = 1.0",d=!0);d&&b.setAttribute("content",c)}}a.isProtectedAPIAllowed=function(){var b=a.getSdkVersion();if(!imIsObjValid(b))return!1;b=parseInt(b.split(".").join(""));if(600>b){b=a.getPlatformVersion();if(!imIsObjValid(b)||"1.0"==b)return!1;b=parseInt(b.split(".")[0]);if(10<=b)return!1}return!0}})();
(function(){var a=window._im_imaiview;window._im_imai=new InmobiObj;window._im_imai.ios=new InmobiObj;var b=window._im_imai;window.imai=window._im_imai;b.matchString=function(a,b){if("string"!=typeof a||null==a||null==b)return-1;var e=-1;try{e=a.indexOf(b)}catch(k){}return e};b.isHttpUrl=function(a){return"string"!=typeof a||null==a?!1:0==b.matchString(a,"http://")?!0:0==b.matchString(a,"https://")?!0:!1};b.appendTapParams=function(a,d,e){if(!imIsObjValid(d)||!imIsObjValid(e))return a;b.isHttpUrl(a)&&
(a=-1==b.matchString(a,"?")?a+("?u-tap-o="+d+","+e):a+("&u-tap-o="+d+","+e));return a};b.performAdClick=function(a,d){d=d||event;if(imIsObjValid(a)){var e=a.clickConfig,k=a.landingConfig;if(!imIsObjValid(e)&&!imIsObjValid(k))b.log("click/landing config are invalid, Nothing to process ."),this.broadcastEvent("error","click/landing config are invalid, Nothing to process .");else{var h=null,f=null,g=null,m=null,n=null,l=null,q=null,p=null;if(imIsObjValid(d))try{m=d.changedTouches[0].pageX,n=d.changedTouches[0].pageY}catch(r){n=
m=0}imIsObjValid(k)?imIsObjValid(e)?(l=k.url,q=k.fallbackUrl,p=k.urlType,h=e.url,f=e.pingWV,g=e.fr):(l=k.url,p=k.urlType):(l=e.url,p=e.urlType);e=b.getPlatform();try{if("boolean"!=typeof g&&"number"!=typeof g||null==g)g=!0;if(0>g||1<g)g=!0;if("boolean"!=typeof f&&"number"!=typeof f||null==f)f=!0;if(0>f||1<f)f=!0;if("number"!=typeof p||null==p)p=0;h=b.appendTapParams(h,m,n);imIsObjValid(h)?!0==f?b.pingInWebView(h,g):b.ping(h,g):b.log("clickurl provided is null.");if(imIsObjValid(l))switch(imIsObjValid(h)||
(l=b.appendTapParams(l,m,n)),p){case 1:b.openEmbedded(l);break;case 2:"ios"==e?b.ios.openItunesProductView(l):this.broadcastEvent("error","Cannot process openItunesProductView for os"+e);break;default:b.openExternal(l,q)}else b.log("Landing url provided is null.")}catch(s){}}}else b.log(" invalid config, nothing to process ."),this.broadcastEvent("error","invalid config, nothing to process .")};b.performActionClick=function(a,d){d=d||event;if(imIsObjValid(a)){var e=a.clickConfig,k=a.landingConfig;
if(!imIsObjValid(e)&&!imIsObjValid(k))b.log("click/landing config are invalid, Nothing to process ."),this.broadcastEvent("error","click/landing config are invalid, Nothing to process .");else{var h=null,f=null,g=null,m=null,n=null;if(imIsObjValid(d))try{m=d.changedTouches[0].pageX,n=d.changedTouches[0].pageY}catch(l){n=m=0}imIsObjValid(e)&&(h=e.url,f=e.pingWV,g=e.fr);try{if("boolean"!=typeof g&&"number"!=typeof g||null==g)g=!0;if(0>g||1<g)g=!0;if("boolean"!=typeof f&&"number"!=typeof f||null==f)f=
!0;if(0>f||1<f)f=!0;h=b.appendTapParams(h,m,n);imIsObjValid(h)?!0==f?b.pingInWebView(h,g):b.ping(h,g):b.log("clickurl provided is null.");b.onUserInteraction(k)}catch(q){}}}else b.log(" invalid config, nothing to process ."),this.broadcastEvent("error","invalid config, nothing to process .")};b.getVersion=function(){return"1.0"};b.getPlatform=a.getPlatform;b.getPlatformVersion=a.getPlatformVersion;b.log=a.log;b.openEmbedded=function(b){mraidview.detectAndBlockFraud("imai.openEmbedded")||a.openEmbedded(b)};
b.openExternal=function(b,d){mraidview.detectAndBlockFraud("imai.openExternal")||a.openExternal(b,d)};b.ping=a.ping;b.pingInWebView=a.pingInWebView;b.onUserInteraction=a.onUserInteraction;b.getSdkVersion=a.getSdkVersion;b.loadSKStore=a.loadSKStore;b.showSKStore=function(b){mraidview.detectAndBlockFraud("imai.showSKStore")||a.showSKStore(b)};b.ios.openItunesProductView=function(b){mraidview.detectAndBlockFraud("imai.ios.openItunesProductView")||a.ios.openItunesProductView(b)};b.fireAdReady=a.fireAdReady;
b.fireAdFailed=a.fireAdFailed})();