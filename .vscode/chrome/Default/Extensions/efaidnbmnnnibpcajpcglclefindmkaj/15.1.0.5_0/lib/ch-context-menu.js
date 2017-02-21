function registerActions(a){"use strict";function b(a){var c,b=a.splice();for(c=0;c<a.length;c+=1)b.push(a[c]+"?*")}function s(){chrome.runtime.getPlatformInfo(function(a){var b;SETTINGS.OS=a.os,SETTINGS.CHROME_VERSION=0,SETTINGS.EXTENSION_VERSION=0;try{b=navigator.userAgent.match(/Chrome\/([0-9]+)/),b&&(SETTINGS.CHROME_VERSION=+b[1])}catch(a){}try{SETTINGS.EXTENSION_VERSION=chrome.runtime.getManifest().version}catch(a){}"mac"===a.os?acom_analytics.event(acom_analytics.e.OS_MAC_OP):"win"===a.os&&acom_analytics.event(acom_analytics.e.OS_WIN_OP)})}function t(a){var b;return b=utilities&&utilities.getTranslation?utilities.getTranslation(a):chrome.i18n.getMessage(a)}function u(a){var b=a.title||t("web2pdfUntitledFileName");return b.replace(/[<>?:|\*"\/\\'&\.]/g,"")}function v(a,b){acom_analytics.event(acom_analytics.e.CONTEXT_MENU_CONVERT_PAGE),c().handleConversionRequest({tabId:b.id,caller:d().web2pdfCaller.MENU,action:d().web2pdfAction.CONVERT,context:d().web2pdfContext.PAGE,url:a.pageUrl||b.url,domtitle:u(b)})}function w(a,b){acom_analytics.event(acom_analytics.e.CONTEXT_MENU_APPEND_PAGE),c().handleConversionRequest({tabId:b.id,caller:d().web2pdfCaller.MENU,action:d().web2pdfAction.APPEND,context:d().web2pdfContext.PAGE,url:a.pageUrl||b.url,domtitle:u(b)})}function x(a,b){acom_analytics.event(acom_analytics.e.CONTEXT_MENU_CONVERT_LINK),c().handleConversionRequest({tabId:b.id,caller:d().web2pdfCaller.MENU,action:d().web2pdfAction.CONVERT,context:d().web2pdfContext.LINK,url:a.linkUrl,domtitle:u(b)})}function y(a,b){acom_analytics.event(acom_analytics.e.CONTEXT_MENU_APPEND_LINK),c().handleConversionRequest({tabId:b.id,caller:d().web2pdfCaller.MENU,action:d().web2pdfAction.APPEND,context:d().web2pdfContext.LINK,url:a.linkUrl,domtitle:u(b)})}var g,n,c=function(){return communicate.getModule("acro-web2pdf")},d=function(){return communicate.getModule("acro-gstate")},j=["*://*/*.pdf"],l=["link"],m=["image"],o=["all"],q=["*://*/*.ai","*://*/*.bmp","*://*/*.doc","*://*/*.docx","*://*/*.gif","*://*/*.indd","*://*/*.jpeg","*://*/*.jpg","*://*/*.odf","*://*/*.odg","*://*/*.odp","*://*/*.ods","*://*/*.odt","*://*/*.png","*://*/*.ppt","*://*/*.pptx","*://*/*.pptx","*://*/*.ps","*://*/*.psd","*://*/*.pub","*://*/*.rtf","*://*/*.stw","*://*/*.sxd","*://*/*.sxc","*://*/*.sxi","*://*/*.sxw","*://*/*.text","*://*/*.tif","*://*/*.tiff","*://*/*.txt","*://*/*.xls","*://*/*.xlsx"],r=b(q.concat(j));startupComplete||(startupComplete=!0,startup.then(function(b){s(),a?"update"===a.reason?b.event(b.e.EXTENSION_UPDATE):"install"===a.reason&&b.event(b.e.EXTENSION_INSTALLED):b.event(b.e.EXTENSION_STARTUP),chrome.browserAction.onClicked.addListener(function(a){communicate.echo(a)})}),!SETTINGS.IS_READER&&SETTINGS.USE_ACROBAT?(chrome.contextMenus.create({title:t("web2pdfConvertPageContextMenu"),contexts:["page"],onclick:v}),chrome.contextMenus.create({title:t("web2pdfAppendPageContextMenu"),contexts:["page"],onclick:w}),chrome.contextMenus.create({title:t("web2pdfConvertLinkContextMenu"),contexts:["link"],onclick:x}),chrome.contextMenus.create({title:t("web2pdfAppendLinkContextMenu"),contexts:["link"],onclick:y})):SETTINGS.IS_READER||(g="Adobe PDF",n=chrome.contextMenus.create({title:g,contexts:o,id:"pdf-page"}),chrome.contextMenus.create({title:"Upload PDF to acrobat.com",contexts:o,parentId:n,id:"upload",documentUrlPatterns:j}),chrome.contextMenus.create({title:"Upload and export to Word/Excel/PowerPoint/Images",contexts:o,parentId:n,id:"export",documentUrlPatterns:j}),chrome.contextMenus.create({title:"Upload link to acrobat.com",contexts:l,parentId:n,id:"upload_link",targetUrlPatterns:r}),chrome.contextMenus.create({title:"Upload image to acrobat.com",contexts:m,parentId:n,id:"upload-image"}),chrome.contextMenus.create({title:"Create a Slideshow from a Flickr album",contexts:o,parentId:n,id:"flickr-slideshow",documentUrlPatterns:["*://www.flickr.com/*"]}),chrome.contextMenus.create({title:"Create a contact sheet from Flickr images",contexts:o,parentId:n,id:"flickr-contact-sheet",documentUrlPatterns:["*://www.flickr.com/*"]})))}var communicate,acom_analytics,utilities,started,startup=new Promise(function(a,b){"use strict";started=a}),startupComplete=!1;SETTINGS=SETTINGS||{USE_ACROBAT:!0},chrome.runtime.getPlatformInfo(function(a){"use strict";SETTINGS.OS=a.os}),require(["communicate","util","upload","download-manager","analytics","acro-gstate","acro-actions","acro-web2pdf","session","convert-to-zip"],function(a,b,c,d,e,f,g,h){"use strict";function i(a){var c="mac"===SETTINGS.OS?"data/js/options.html?os=mac":"https://adobe.com/go/chromeextensionfirstlaunch";"false"!==b.getCookie("fte")&&b.createTab(c,function(){b.setCookie("fte","false",3650),a.event(a.e.FTE_LAUNCH)})}function j(a){var b;return b=utilities&&utilities.getTranslation?utilities.getTranslation(a):chrome.i18n.getMessage(a)}function k(a){a===SETTINGS.ERP_READER_VER?chrome.browserAction.setTitle({title:j("web2pdfConvertButtonToolTipERPReader")}):chrome.browserAction.setTitle({title:j("web2pdfConvertButtonToolTipReader")})}function l(a,b){var c={filename:b.title,tabId:b.id,menuItem:a.menuItemId,handleResult:"preview"};return"flickr-slideshow"===a.menuItemId||"flickr-contact-sheet"===a.menuItemId?(e.event(c,e.e.FLICKR_CONTEXT_CLICK),void communicate.deferMessage({panel_op:"flickr",tabId:b.id})):("upload-image"===a.menuItemId&&(e.setOp("Image"),c.handleResult="image_preview",c.url=a.srcUrl),"upload_link"===a.menuItemId&&(e.setOp("Link"),c.url=a.linkUrl),"upload"===a.menuItemId&&(e.setOp("Link"),c.url=a.linkUrl),"pdf-page"===a.menuItemId&&(e.setOp("PdfPage"),c.url=a.pageUrl),c.filename.length>20&&(c.filename=c.filename.substring(0,19)),a.linkUrl?c.filename=a.linkUrl.split("/").splice(-1)[0].replace(/\?\S*/,""):a.srcUrl&&(c.url=a.srcUrl,c.filename=a.srcUrl.split("/").splice(-1)[0].replace(/\?\S*/,"")),"export"===a.menuItemId&&(c.handleResult="export"),void d.proxy(d.do_upload(c)))}chrome.management.getSelf(function(a){e.s||e.init(a.version,a.installType),g.getVersion(function(b){b!==SETTINGS.READER_VER&&b!==SETTINGS.ERP_READER_VER||(SETTINGS.IS_READER=!0,b===SETTINGS.ERP_READER_VER&&(SETTINGS.IS_ERP_READER=!0),k(b)),registerActions(),started(e)}),i(e)}),acom_analytics=e,communicate=a,utilities=b,SETTINGS.USE_ACROBAT||chrome.contextMenus.onClicked.addListener(l),chrome.runtime.onMessage.addListener(communicate.proxy(communicate.handler))}),chrome.runtime.onInstalled.addListener(registerActions);