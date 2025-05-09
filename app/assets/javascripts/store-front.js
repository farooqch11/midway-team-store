// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//require turbolinks
//= require libs/toastr.min
//= require libs/jquery.countdown.min
//= require_self

window.xURL = {
    toObj: function () {
        if (location.search.substring(1) == "") {
            return {};
        }
        return JSON.parse('{"' + decodeURI(location.search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    }
}
window.xs = {
    loadCountdown: function(){

        /*! Simple JavaScript Inheritance
         * By John Resig http://ejohn.org/
         * MIT Licensed.
         */
        !function(){"use strict";var a=!1;window.JQClass=function(){},JQClass.classes={},JQClass.extend=function b(c){function d(){!a&&this._init&&this._init.apply(this,arguments)}var e=this.prototype;a=!0;var f=new this;a=!1;for(var g in c)if("function"==typeof c[g]&&"function"==typeof e[g])f[g]=function(a,b){return function(){var c=this._super;this._super=function(b){return e[a].apply(this,b||[])};var d=b.apply(this,arguments);return this._super=c,d}}(g,c[g]);else if("object"==typeof c[g]&&"object"==typeof e[g]&&"defaultOptions"===g){var h,i=e[g],j=c[g],k={};for(h in i)k[h]=i[h];for(h in j)k[h]=j[h];f[g]=k}else f[g]=c[g];return d.prototype=f,d.prototype.constructor=d,d.extend=b,d}}(),/*! Abstract base class for collection plugins v1.0.2.
            Written by Keith Wood (wood.keith{at}optusnet.com.au) December 2013.
            Licensed under the MIT license (http://keith-wood.name/licence.html). */
        function($){"use strict";function camelCase(a){return a.replace(/-([a-z])/g,function(a,b){return b.toUpperCase()})}JQClass.classes.JQPlugin=JQClass.extend({name:"plugin",defaultOptions:{},regionalOptions:{},deepMerge:!0,_getMarker:function(){return"is-"+this.name},_init:function(){$.extend(this.defaultOptions,this.regionalOptions&&this.regionalOptions[""]||{});var a=camelCase(this.name);$[a]=this,$.fn[a]=function(b){var c=Array.prototype.slice.call(arguments,1),d=this,e=this;return this.each(function(){if("string"==typeof b){if("_"===b[0]||!$[a][b])throw"Unknown method: "+b;var f=$[a][b].apply($[a],[this].concat(c));if(f!==d&&void 0!==f)return e=f,!1}else $[a]._attach(this,b)}),e}},setDefaults:function(a){$.extend(this.defaultOptions,a||{})},_attach:function(a,b){if(a=$(a),!a.hasClass(this._getMarker())){a.addClass(this._getMarker()),b=$.extend(this.deepMerge,{},this.defaultOptions,this._getMetadata(a),b||{});var c=$.extend({name:this.name,elem:a,options:b},this._instSettings(a,b));a.data(this.name,c),this._postAttach(a,c),this.option(a,b)}},_instSettings:function(a,b){return{}},_postAttach:function(a,b){},_getMetadata:function(elem){try{var data=elem.data(this.name.toLowerCase())||"";data=data.replace(/(\\?)'/g,function(a,b){return b?"'":'"'}).replace(/([a-zA-Z0-9]+):/g,function(a,b,c){var d=data.substring(0,c).match(/"/g);return d&&d.length%2!==0?b+":":'"'+b+'":'}).replace(/\\:/g,":"),data=$.parseJSON("{"+data+"}");for(var key in data)if(data.hasOwnProperty(key)){var value=data[key];"string"==typeof value&&value.match(/^new Date\(([-0-9,\s]*)\)$/)&&(data[key]=eval(value))}return data}catch(a){return{}}},_getInst:function(a){return $(a).data(this.name)||{}},option:function(a,b,c){a=$(a);var d=a.data(this.name),e=b||{};return!b||"string"==typeof b&&"undefined"==typeof c?(e=(d||{}).options,e&&b?e[b]:e):void(a.hasClass(this._getMarker())&&("string"==typeof b&&(e={},e[b]=c),this._optionsChanged(a,d,e),$.extend(d.options,e)))},_optionsChanged:function(a,b,c){},destroy:function(a){a=$(a),a.hasClass(this._getMarker())&&(this._preDestroy(a,this._getInst(a)),a.removeData(this.name).removeClass(this._getMarker()))},_preDestroy:function(a,b){}}),$.JQPlugin={createPlugin:function(a,b){"object"==typeof a&&(b=a,a="JQPlugin"),a=camelCase(a);var c=camelCase(b.name);JQClass.classes[c]=JQClass.classes[a].extend(b),new JQClass.classes[c]}}}(jQuery);
        //# sourceMappingURL=jquery.plugin.min.map
        
        /*! http://keith-wood.name/countdown.html
            Countdown for jQuery v2.1.0.
            Written by Keith Wood (wood.keith{at}optusnet.com.au) January 2008.
            Available under the MIT (http://keith-wood.name/licence.html) license. 
            Please attribute the author if you use it. */
            !function(a){"use strict";var b="countdown",c=0,d=1,e=2,f=3,g=4,h=5,i=6;a.JQPlugin.createPlugin({name:b,defaultOptions:{until:null,since:null,timezone:null,serverSync:null,format:"dHMS",layout:"",compact:!1,padZeroes:!1,significant:0,description:"",expiryUrl:"",expiryText:"",alwaysExpire:!1,onExpiry:null,onTick:null,tickInterval:1},regionalOptions:{"":{labels:["Years","Months","Weeks","Days","Hours","Minutes","Seconds"],labels1:["Year","Month","Week","Day","Hour","Minute","Second"],compactLabels:["y","m","w","d"],whichLabels:null,digits:["0","1","2","3","4","5","6","7","8","9"],timeSeparator:":",isRTL:!1}},_rtlClass:b+"-rtl",_sectionClass:b+"-section",_amountClass:b+"-amount",_periodClass:b+"-period",_rowClass:b+"-row",_holdingClass:b+"-holding",_showClass:b+"-show",_descrClass:b+"-descr",_timerElems:[],_init:function(){function b(a){var h=a<1e12?e?window.performance.now()+window.performance.timing.navigationStart:d():a||d();h-g>=1e3&&(c._updateElems(),g=h),f(b)}var c=this;this._super(),this._serverSyncs=[];var d="function"==typeof Date.now?Date.now:function(){return(new Date).getTime()},e=window.performance&&"function"==typeof window.performance.now,f=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||null,g=0;!f||a.noRequestAnimationFrame?(a.noRequestAnimationFrame=null,a.countdown._timer=setInterval(function(){c._updateElems()},1e3)):(g=window.animationStartTime||window.webkitAnimationStartTime||window.mozAnimationStartTime||window.oAnimationStartTime||window.msAnimationStartTime||d(),f(b))},UTCDate:function(a,b,c,d,e,f,g,h){"object"==typeof b&&b instanceof Date&&(h=b.getMilliseconds(),g=b.getSeconds(),f=b.getMinutes(),e=b.getHours(),d=b.getDate(),c=b.getMonth(),b=b.getFullYear());var i=new Date;return i.setUTCFullYear(b),i.setUTCDate(1),i.setUTCMonth(c||0),i.setUTCDate(d||1),i.setUTCHours(e||0),i.setUTCMinutes((f||0)-(Math.abs(a)<30?60*a:a)),i.setUTCSeconds(g||0),i.setUTCMilliseconds(h||0),i},periodsToSeconds:function(a){return 31557600*a[0]+2629800*a[1]+604800*a[2]+86400*a[3]+3600*a[4]+60*a[5]+a[6]},resync:function(){var b=this;a("."+this._getMarker()).each(function(){var c=a.data(this,b.name);if(c.options.serverSync){for(var d=null,e=0;e<b._serverSyncs.length;e++)if(b._serverSyncs[e][0]===c.options.serverSync){d=b._serverSyncs[e];break}if(b._eqNull(d[2])){var f=a.isFunction(c.options.serverSync)?c.options.serverSync.apply(this,[]):null;d[2]=(f?(new Date).getTime()-f.getTime():0)-d[1]}c._since&&c._since.setMilliseconds(c._since.getMilliseconds()+d[2]),c._until.setMilliseconds(c._until.getMilliseconds()+d[2])}});for(var c=0;c<b._serverSyncs.length;c++)b._eqNull(b._serverSyncs[c][2])||(b._serverSyncs[c][1]+=b._serverSyncs[c][2],delete b._serverSyncs[c][2])},_instSettings:function(a,b){return{_periods:[0,0,0,0,0,0,0]}},_addElem:function(a){this._hasElem(a)||this._timerElems.push(a)},_hasElem:function(b){return a.inArray(b,this._timerElems)>-1},_removeElem:function(b){this._timerElems=a.map(this._timerElems,function(a){return a===b?null:a})},_updateElems:function(){for(var a=this._timerElems.length-1;a>=0;a--)this._updateCountdown(this._timerElems[a])},_optionsChanged:function(b,c,d){d.layout&&(d.layout=d.layout.replace(/&lt;/g,"<").replace(/&gt;/g,">")),this._resetExtraLabels(c.options,d);var e=c.options.timezone!==d.timezone;a.extend(c.options,d),this._adjustSettings(b,c,!this._eqNull(d.until)||!this._eqNull(d.since)||e);var f=new Date;(c._since&&c._since<f||c._until&&c._until>f)&&this._addElem(b[0]),this._updateCountdown(b,c)},_updateCountdown:function(b,c){if(b=b.jquery?b:a(b),c=c||this._getInst(b)){if(b.html(this._generateHTML(c)).toggleClass(this._rtlClass,c.options.isRTL),"pause"!==c._hold&&a.isFunction(c.options.onTick)){var d="lap"!==c._hold?c._periods:this._calculatePeriods(c,c._show,c.options.significant,new Date);1!==c.options.tickInterval&&this.periodsToSeconds(d)%c.options.tickInterval!==0||c.options.onTick.apply(b[0],[d])}var e="pause"!==c._hold&&(c._since?c._now.getTime()<c._since.getTime():c._now.getTime()>=c._until.getTime());if(e&&!c._expiring){if(c._expiring=!0,this._hasElem(b[0])||c.options.alwaysExpire){if(this._removeElem(b[0]),a.isFunction(c.options.onExpiry)&&c.options.onExpiry.apply(b[0],[]),c.options.expiryText){var f=c.options.layout;c.options.layout=c.options.expiryText,this._updateCountdown(b[0],c),c.options.layout=f}c.options.expiryUrl&&(window.location=c.options.expiryUrl)}c._expiring=!1}else"pause"===c._hold&&this._removeElem(b[0])}},_resetExtraLabels:function(a,b){var c=null;for(c in b)c.match(/[Ll]abels[02-9]|compactLabels1/)&&(a[c]=b[c]);for(c in a)c.match(/[Ll]abels[02-9]|compactLabels1/)&&"undefined"==typeof b[c]&&(a[c]=null)},_eqNull:function(a){return"undefined"==typeof a||null===a},_adjustSettings:function(b,c,d){for(var e=null,f=0;f<this._serverSyncs.length;f++)if(this._serverSyncs[f][0]===c.options.serverSync){e=this._serverSyncs[f][1];break}var g=null,h=null;if(this._eqNull(e)){var i=a.isFunction(c.options.serverSync)?c.options.serverSync.apply(b[0],[]):null;g=new Date,h=i?g.getTime()-i.getTime():0,this._serverSyncs.push([c.options.serverSync,h])}else g=new Date,h=c.options.serverSync?e:0;var j=c.options.timezone;j=this._eqNull(j)?-g.getTimezoneOffset():j,(d||!d&&this._eqNull(c._until)&&this._eqNull(c._since))&&(c._since=c.options.since,this._eqNull(c._since)||(c._since=this.UTCDate(j,this._determineTime(c._since,null)),c._since&&h&&c._since.setMilliseconds(c._since.getMilliseconds()+h)),c._until=this.UTCDate(j,this._determineTime(c.options.until,g)),h&&c._until.setMilliseconds(c._until.getMilliseconds()+h)),c._show=this._determineShow(c)},_preDestroy:function(a,b){this._removeElem(a[0]),a.empty()},pause:function(a){this._hold(a,"pause")},lap:function(a){this._hold(a,"lap")},resume:function(a){this._hold(a,null)},toggle:function(b){var c=a.data(b,this.name)||{};this[c._hold?"resume":"pause"](b)},toggleLap:function(b){var c=a.data(b,this.name)||{};this[c._hold?"resume":"lap"](b)},_hold:function(b,c){var d=a.data(b,this.name);if(d){if("pause"===d._hold&&!c){d._periods=d._savePeriods;var e=d._since?"-":"+";d[d._since?"_since":"_until"]=this._determineTime(e+d._periods[0]+"y"+e+d._periods[1]+"o"+e+d._periods[2]+"w"+e+d._periods[3]+"d"+e+d._periods[4]+"h"+e+d._periods[5]+"m"+e+d._periods[6]+"s"),this._addElem(b)}d._hold=c,d._savePeriods="pause"===c?d._periods:null,a.data(b,this.name,d),this._updateCountdown(b,d)}},getTimes:function(b){var c=a.data(b,this.name);return c?"pause"===c._hold?c._savePeriods:c._hold?this._calculatePeriods(c,c._show,c.options.significant,new Date):c._periods:null},_determineTime:function(a,b){var c=this,d=function(a){var b=new Date;return b.setTime(b.getTime()+1e3*a),b},e=function(a){a=a.toLowerCase();for(var b=new Date,d=b.getFullYear(),e=b.getMonth(),f=b.getDate(),g=b.getHours(),h=b.getMinutes(),i=b.getSeconds(),j=/([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g,k=j.exec(a);k;){switch(k[2]||"s"){case"s":i+=parseInt(k[1],10);break;case"m":h+=parseInt(k[1],10);break;case"h":g+=parseInt(k[1],10);break;case"d":f+=parseInt(k[1],10);break;case"w":f+=7*parseInt(k[1],10);break;case"o":e+=parseInt(k[1],10),f=Math.min(f,c._getDaysInMonth(d,e));break;case"y":d+=parseInt(k[1],10),f=Math.min(f,c._getDaysInMonth(d,e))}k=j.exec(a)}return new Date(d,e,f,g,h,i,0)},f=this._eqNull(a)?b:"string"==typeof a?e(a):"number"==typeof a?d(a):a;return f&&f.setMilliseconds(0),f},_getDaysInMonth:function(a,b){return 32-new Date(a,b,32).getDate()},_normalLabels:function(a){return a},_generateHTML:function(b){var j=this;b._periods=b._hold?b._periods:this._calculatePeriods(b,b._show,b.options.significant,new Date);var k=!1,l=0,m=b.options.significant,n=a.extend({},b._show),o=null;for(o=c;o<=i;o++)k=k||"?"===b._show[o]&&b._periods[o]>0,n[o]="?"!==b._show[o]||k?b._show[o]:null,l+=n[o]?1:0,m-=b._periods[o]>0?1:0;var p=[!1,!1,!1,!1,!1,!1,!1];for(o=i;o>=c;o--)b._show[o]&&(b._periods[o]?p[o]=!0:(p[o]=m>0,m--));var q=b.options.compact?b.options.compactLabels:b.options.labels,r=b.options.whichLabels||this._normalLabels,s=function(a){var c=b.options["compactLabels"+r(b._periods[a])];return n[a]?j._translateDigits(b,b._periods[a])+(c?c[a]:q[a])+" ":""},t=b.options.padZeroes?2:1,u=function(a){var c=b.options["labels"+r(b._periods[a])];return!b.options.significant&&n[a]||b.options.significant&&p[a]?'<span class="'+j._sectionClass+'"><span class="'+j._amountClass+'">'+j._minDigits(b,b._periods[a],t)+'</span><span class="'+j._periodClass+'">'+(c?c[a]:q[a])+"</span></span>":""};return b.options.layout?this._buildLayout(b,n,b.options.layout,b.options.compact,b.options.significant,p):(b.options.compact?'<span class="'+this._rowClass+" "+this._amountClass+(b._hold?" "+this._holdingClass:"")+'">'+s(c)+s(d)+s(e)+s(f)+(n[g]?this._minDigits(b,b._periods[g],2):"")+(n[h]?(n[g]?b.options.timeSeparator:"")+this._minDigits(b,b._periods[h],2):"")+(n[i]?(n[g]||n[h]?b.options.timeSeparator:"")+this._minDigits(b,b._periods[i],2):""):'<span class="'+this._rowClass+" "+this._showClass+(b.options.significant||l)+(b._hold?" "+this._holdingClass:"")+'">'+u(c)+u(d)+u(e)+u(f)+u(g)+u(h)+u(i))+"</span>"+(b.options.description?'<span class="'+this._rowClass+" "+this._descrClass+'">'+b.options.description+"</span>":"")},_buildLayout:function(b,j,k,l,m,n){for(var o=b.options[l?"compactLabels":"labels"],p=b.options.whichLabels||this._normalLabels,q=function(a){return(b.options[(l?"compactLabels":"labels")+p(b._periods[a])]||o)[a]},r=function(a,c){return b.options.digits[Math.floor(a/c)%10]},s={desc:b.options.description,sep:b.options.timeSeparator,yl:q(c),yn:this._minDigits(b,b._periods[c],1),ynn:this._minDigits(b,b._periods[c],2),ynnn:this._minDigits(b,b._periods[c],3),y1:r(b._periods[c],1),y10:r(b._periods[c],10),y100:r(b._periods[c],100),y1000:r(b._periods[c],1e3),ol:q(d),on:this._minDigits(b,b._periods[d],1),onn:this._minDigits(b,b._periods[d],2),onnn:this._minDigits(b,b._periods[d],3),o1:r(b._periods[d],1),o10:r(b._periods[d],10),o100:r(b._periods[d],100),o1000:r(b._periods[d],1e3),wl:q(e),wn:this._minDigits(b,b._periods[e],1),wnn:this._minDigits(b,b._periods[e],2),wnnn:this._minDigits(b,b._periods[e],3),w1:r(b._periods[e],1),w10:r(b._periods[e],10),w100:r(b._periods[e],100),w1000:r(b._periods[e],1e3),dl:q(f),dn:this._minDigits(b,b._periods[f],1),dnn:this._minDigits(b,b._periods[f],2),dnnn:this._minDigits(b,b._periods[f],3),d1:r(b._periods[f],1),d10:r(b._periods[f],10),d100:r(b._periods[f],100),d1000:r(b._periods[f],1e3),hl:q(g),hn:this._minDigits(b,b._periods[g],1),hnn:this._minDigits(b,b._periods[g],2),hnnn:this._minDigits(b,b._periods[g],3),h1:r(b._periods[g],1),h10:r(b._periods[g],10),h100:r(b._periods[g],100),h1000:r(b._periods[g],1e3),ml:q(h),mn:this._minDigits(b,b._periods[h],1),mnn:this._minDigits(b,b._periods[h],2),mnnn:this._minDigits(b,b._periods[h],3),m1:r(b._periods[h],1),m10:r(b._periods[h],10),m100:r(b._periods[h],100),m1000:r(b._periods[h],1e3),sl:q(i),sn:this._minDigits(b,b._periods[i],1),snn:this._minDigits(b,b._periods[i],2),snnn:this._minDigits(b,b._periods[i],3),s1:r(b._periods[i],1),s10:r(b._periods[i],10),s100:r(b._periods[i],100),s1000:r(b._periods[i],1e3)},t=k,u=c;u<=i;u++){var v="yowdhms".charAt(u),w=new RegExp("\\{"+v+"<\\}([\\s\\S]*)\\{"+v+">\\}","g");t=t.replace(w,!m&&j[u]||m&&n[u]?"$1":"")}return a.each(s,function(a,b){var c=new RegExp("\\{"+a+"\\}","g");t=t.replace(c,b)}),t},_minDigits:function(a,b,c){return b=""+b,b.length>=c?this._translateDigits(a,b):(b="0000000000"+b,this._translateDigits(a,b.substr(b.length-c)))},_translateDigits:function(a,b){return(""+b).replace(/[0-9]/g,function(b){return a.options.digits[b]})},_determineShow:function(a){var b=a.options.format,j=[];return j[c]=b.match("y")?"?":b.match("Y")?"!":null,j[d]=b.match("o")?"?":b.match("O")?"!":null,j[e]=b.match("w")?"?":b.match("W")?"!":null,j[f]=b.match("d")?"?":b.match("D")?"!":null,j[g]=b.match("h")?"?":b.match("H")?"!":null,j[h]=b.match("m")?"?":b.match("M")?"!":null,j[i]=b.match("s")?"?":b.match("S")?"!":null,j},_calculatePeriods:function(a,b,j,k){a._now=k,a._now.setMilliseconds(0);var l=new Date(a._now.getTime());a._since?k.getTime()<a._since.getTime()?a._now=k=l:k=a._since:(l.setTime(a._until.getTime()),k.getTime()>a._until.getTime()&&(a._now=k=l));var m=[0,0,0,0,0,0,0];if(b[c]||b[d]){var n=this._getDaysInMonth(k.getFullYear(),k.getMonth()),o=this._getDaysInMonth(l.getFullYear(),l.getMonth()),p=l.getDate()===k.getDate()||l.getDate()>=Math.min(n,o)&&k.getDate()>=Math.min(n,o),q=function(a){return 60*(60*a.getHours()+a.getMinutes())+a.getSeconds()},r=Math.max(0,12*(l.getFullYear()-k.getFullYear())+l.getMonth()-k.getMonth()+(l.getDate()<k.getDate()&&!p||p&&q(l)<q(k)?-1:0));m[c]=b[c]?Math.floor(r/12):0,m[d]=b[d]?r-12*m[c]:0,k=new Date(k.getTime());var s=k.getDate()===n,t=this._getDaysInMonth(k.getFullYear()+m[c],k.getMonth()+m[d]);k.getDate()>t&&k.setDate(t),k.setFullYear(k.getFullYear()+m[c]),k.setMonth(k.getMonth()+m[d]),s&&k.setDate(t)}var u=Math.floor((l.getTime()-k.getTime())/1e3),v=null,w=function(a,c){m[a]=b[a]?Math.floor(u/c):0,u-=m[a]*c};if(w(e,604800),w(f,86400),w(g,3600),w(h,60),w(i,1),u>0&&!a._since){var x=[1,12,4.3482,7,24,60,60],y=i,z=1;for(v=i;v>=c;v--)b[v]&&(m[y]>=z&&(m[y]=0,u=1),u>0&&(m[v]++,u=0,y=v,z=1)),z*=x[v]}if(j)for(v=c;v<=i;v++)j&&m[v]?j--:j||(m[v]=0);return m}})}(jQuery);
            
    },

    // helper functions
    sendRequest: function (url, data, formData = false) {
        const _t = this;
        return new Promise((res, rej) => {
            let options = {
                url: url,
                data: data,
                dataType: "json",
                type: "post",
                success: function (data) {
                    res(data);

                },
                error: function (error) {
                    res(error);
                    console.log(error);
                }
            };
            if (formData) {
                options.processData = false;
                options.contentType = false;
                options.enctype = 'multipart/form-data';
            }
            $.ajax(options);
        });
    },
    updateCartCount: function () {
        Shopify.getCart(function (cart) {
            $("#CartCount").find('span').first().text(cart.item_count);
        });
    },
    initAddToCart: function () {
        const _t = this;
        $(".xs-add-to-cart").on("click", async function (e) {
            e.preventDefault();

            let form = $(this).closest('[data-xs-product-add-form]'),
                product_id = form.attr('data-product-id');
            // let variant = form.find(".variant-selected").attr('data-xs-variant-id');
            let variant = form.find('.xs-variant-select').val();
            let qty = form.find('.xs-qty-select').val();
            console.log(variant);

            let do_add = false,
                not_added = [];
            if (_t.essentials.indexOf(product_id) >= 0) {
                do_add = true;
            } else {
                await new Promise((res, rej) => {
                    Shopify.getCart(function (cart) {
                        do_add = true;
                        console.log(cart);
                        _t.essentials.forEach(function (id) {
                            f = false;
                            cart.items.forEach(function (item) {
                                if (item.product_id == id) {
                                    f = true
                                }
                            })
                            if (!f) {
                                do_add = false;
                                not_added.push(id)
                            }
                        });
                        res();
                    });
                });
            }
            console.log(not_added);
            if (!do_add) {
                _t.closeAllDrawers();
                toastr.error("Essential Gear", "Please add all essential gear first.");
                return;
            }
            pdata = {
                store_id: xs_store_id
            };

            let props = {
                '_xs_data': JSON.stringify(pdata)
            };

            form.find("[data-property]").each(function () {
                let n = $(this).attr('name'),
                    v = $(this).val();

                props[n] = v;
            });
            xs.sendRequest("/cart/add.js", {
                items: [{
                    quantity: qty,
                    id: variant,
                    properties: props
                }]
            }).then(data => {
                console.log(data);
                _t.updateCartCount();
                _t.closeAllDrawers();
                toastr.success(data.items[0].product_title, 'Added to Cart');

            }).catch(error => {
                console.log(error);
            });
        });
    },
    initVariants: function () {
        // $("[data-xs-variant-id]").on("click", function (e) {
        //     e.preventDefault();
        //     $(this).addClass('variant-selected').siblings().removeClass('variant-selected');
        // });
    },
    closeAllDrawers: function () {
        $("[data-xs-drawer]").removeClass('open');
    },
    initDrawers: function () {
        console.log(this, "Drawer");
        const _t = this;
        $("[data-xs-drawer]").appendTo($("body"));

        $("[data-xs-open-drawer]").on('click', function () {
            let drawer = $(this).attr('data-xs-open-drawer');
            drawer = "#" + drawer;

            console.log($(drawer));
            if ($(drawer).hasClass('open')) {
                $(drawer).removeClass('open');
            } else {
                _t.closeAllDrawers();
                $(drawer).addClass('open');
            }
        });
        
        $("[data-close-drawer]").on('click', function () {
            $(this).closest('[data-xs-drawer]').removeClass('open');
        });

            let fortnight = new Date(Date.now() + 12096e5);
            $(".xs-product-date-note").text(`Estimated to ship by ${fortnight.toLocaleDateString()}`);
        

        if( window.ximages != undefined ) {
            $('input[data-ximage]').each(function () {
                let key = $(this).attr('data-ximage');
                $(this).val(ximages[key]);
            });
        }
        _t.initVariants();
        _t.initAddToCart();

    },

    setCountdown: function () {
        if( $.fn.countdown == undefined ) {
            xs.loadCountdown();
        }
        const storeContents = $("#store-contents"),
            storeClosed = $("#store-closed"),
            storeTimer = $("#store-timer"),
            storeTimeEl = $("#store-time");

        console.log("setting countdown");
       // console.log(xs_store_time < Date.now());
        if (xs_store_countdown) {
            if (xs_store_time < Date.now()) {
                storeContents.hide().remove();
                storeClosed.show();
            } else {
                storeClosed.hide();
                storeContents.show();
                storeTimer.show();
                storeTimeEl.countdown({
                    until: xs_store_time,
                    onExpiry: function () {
                        storeContents.hide().remove();
                        storeClosed.show();
                        storeTimer.hide();
                    }
                });
            }
        }
    },
    setSearchEvents: function () {
        const _t = this;
        const searchInput = $("[data-search-store-input]");
        const searchBtn = $("#xs-search-stores");
        const loader = $("#store-loader");
        const resultSection = $("#results-section");
        const resultsEl = $("#xs_results");
        const loadMoreWrapper = $("#load-more-wrapper");
        const loadMoreBtn = $("#load-more-btn");
    
        let allData = [];
        let itemsToShow = 1;
        let currentIndex = 0;
    
        function renderItems() {
            const slice = allData.slice(currentIndex, currentIndex + itemsToShow);
    
            slice.forEach((item) => {
                let el = $(`
                  <a href="${item.link}" target="_blank" class="list-group-item list-group-item-action mb-3 shadow-sm p-4 d-flex justify-content-between align-items-center rounded" style="max-width: 800px; margin: 0 auto;">
                    <div class="text-left">
                      <div class="text-uppercase text-muted mb-1" style="font-size: 0.75rem;">Store Name</div>
                      <div class="font-weight-bold mb-2" style="font-size: 1.2rem;">${item.title || ''}</div>
                      <div class="text-uppercase text-muted mb-1" style="font-size: 0.75rem;">Organization</div>
                      <div class="font-weight-bold mb-2" style="font-size: 1.2rem;">${item.organization || ''}</div>
                    </div>
                    <div class="text-right">
                      <img src="${item.logo}" alt="Logo" style="width: 80px; height: 80px; object-fit: contain;">
                    </div>
                  </a>
                `);
            
                resultsEl.append(el.hide().fadeIn(300));
            });            
    
            currentIndex += itemsToShow;
    
            // Hide Load More button if no more items
            if (currentIndex >= allData.length) {
                loadMoreWrapper.hide();
            }
        }
    
        searchBtn.on('click', function () {
            let term = searchInput.val().trim();
            console.log(term);
    
            if (term === "") {
                return;
            }
    
            loader.show();
            resultSection.hide();
            resultsEl.html("");
            loadMoreWrapper.hide(); // Hide Load More while searching
            currentIndex = 0;        // Reset counter
    
            _t.sendRequest("/a/locker/store/", { q: term })
                .then(data => {
                    console.log(data);
    
                    loader.hide();
                    resultSection.show();
    
                    allData = data || [];
    
                    if (allData.length === 0) {
                        resultsEl.append('<div class="list-group-item text-center text-muted">No stores found.</div>');
                    } else {
                        renderItems(); // Show first 5
    
                        if (allData.length > currentIndex) {
                            loadMoreWrapper.show();
                            loadMoreBtn.text('Load More');
                        }
                    }
                })
                .catch(error => {
                    console.error("Search failed:", error);
                    loader.hide();
                    resultSection.show();
                    resultsEl.append('<div class="list-group-item text-center text-danger">Error loading stores.</div>');
                });
        });
    
        // Load More button
        loadMoreBtn.on('click', function () {
            loadMoreBtn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...');
            
            setTimeout(() => {
                renderItems();
                if (currentIndex < allData.length) {
                    loadMoreBtn.text('Load More');
                }
            }, 500); // Small delay for smooth loading feel
        });
    },         
    getEssentials: function () {
        const _t = this;
        _t.essentials = [];
        $("[data-product-essential]").each(function () {
            _t.essentials.push($(this).attr("data-product-essential"));
        });
    },
    filterProducts: function () {
        let activeFilters = $(".xs-active-filter");
        if (activeFilters.length > 0) {
            let products = [];
            $(activeFilters).each(function () {
                let filterEl = $(this);
                let ids = filterEl.attr('data-filter').split(",");
                console.log(products);
                if (products.length < 1) {
                    products = ids;
                } else {
                    ir = [];
                    for (let i = 0; i < products.length; i++) {
                        let id = products[i];
                        if (!ids.includes(id)) {
                            ir.push(i);
                        }
                    }
                    console.log(ir);
                    ir.forEach(function (j) {
                        products.splice(j, 1);
                    });
                }
            });
            console.log(products);

            $("[data-xs-product]").hide();
            products.forEach(function (id) {
                $(`[data-xs-product=${id}]`).show();
            });
        } else {
            $("[data-xs-product]").show();
        }
    },
    setFilters: function () {
        const _t = this;
        $("[data-filter],[data-category]").on('click', function (e) {
            e.preventDefault();
            // $(this).toggleClass('xs-active-filter');
            // _t.filterProducts();

            const t = $(this);
            console.log( t.hasClass('xs-active-filter'));
            if( t.hasClass('xs-active-filter')) {
                t.removeClass('xs-active-filter');
            } else {
                t.closest('ul').find('a').removeClass('xs-active-filter');
                t.addClass('xs-active-filter');
            }
            //console.log(e.target.dataset.filter);
            _t.loadFilters();
        });
    },
    loadFilters: function(){
        let filters = [];
        const all_filters = $(".nav-filter");
        all_filters.each(function(){
            let filter = $(this).find("a.xs-active-filter").data("filter");
            let value = $(this).find("a.xs-active-filter").data("value");
            if(filter){
                filters[filter] = value;
            }  
        });

        console.log(filters);
        const products = document.querySelectorAll('.grid-product'); // Select all product cards

        products.forEach(product => {
            const tags = product.getAttribute('data-filter-tag').toLowerCase().split(','); // Convert tags to lowercase array
            const price = parseFloat(product.getAttribute('data-filter-price')); // Convert price to number
            const brand = product.getAttribute('data-filter-brand').toLowerCase();
            const color = product.getAttribute('data-filter-color').toLowerCase();
    
            // Extract filters and convert to lowercase if present
            const category = filters.category ? filters.category.toLowerCase() : null;
            const department = filters.department ? filters.department.toLowerCase() : null;
            const filterBrand = filters.brand ? filters.brand.toLowerCase() : null;
            const filterColor = filters.color ? filters.color.toLowerCase() : null;
            const priceRange = filters.price ? filters.price.split('-').map(Number) : null;
    
            // Ensure at least one filter is present before proceeding
            if (Object.keys(filters).length === 0) {
                console.warn("No valid filters provided!");
                return; // Exit function if no filters are available
            }
    
            // Dynamic matching conditions (Only check available filters)
            let isMatch = true;
    
            if (category && !tags.includes(category)) isMatch = false;
            if (department && !tags.includes(department)) isMatch = false;
            if (filterBrand && brand !== filterBrand) isMatch = false;
            if (filterColor && color !== filterColor) isMatch = false;
            if (priceRange && !(price >= priceRange[0] && price <= priceRange[1])) isMatch = false;
    
            // Show or hide product based on match status
            product.style.display = isMatch ? "block" : "none";
        });
        
        // let urlParams = xURL.toObj();
        
        // console.log(urlParams);
        // if( $("[data-category].xs-active-filter").length < 1){
        //     delete urlParams.category;
        //     urlParams.p = 1;
        // } else {
        //     newcat = $("[data-category].xs-active-filter").attr('data-id');
        //     if( urlParams.category != newcat) {
        //         urlParams.category = newcat;
        //         urlParams.p = 1;
        //     }
        // }
        // if( $("[data-filter].xs-active-filter").length < 1){
        //     delete urlParams.filter;
        // } 
        // let filterArr = [];
        // $('[data-filter].xs-active-filter').each(function(){
        //     const f = $(this);
        //     const filterid = f.closest('[data-xs-filter]').attr('data-xs-filter-id');
        //     const id = f.attr('data-id')

        //     filterArr.push(`${filterid}_${id}`);
        // });

        // urlParams.filter = filterArr.join(",");

        // location.href = "?" + jQuery.param(urlParams);
    },
    init: function () {
        const _t = this;
        _t.getEssentials();
        _t.initDrawers();
        _t.setSearchEvents();
        _t.setFilters();
    }
};

$(document).on('ready', () => {
    console.log("ready");

   
    window.xs = xs;
    xs.init();
});