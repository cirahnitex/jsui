Util.jsonp = function(path, data, callback, onerror) {
    if(!onerror) onerror = function(){};
    var script = document.createElement('script');

    document.body.appendChild(script);
    var funcName = Util.uniqueName();

    window[funcName] = function(r) {
        callback(r);
        document.body.removeChild(script);
    };

    data.callback = funcName;

    script.src = path + '?' + Util.post.data_encode(data);
    script.onerror = onerror;

};
Util.post.data_encode = function(data) {
    var ele;
    var PostArray = [];
    if(data) {
        for(ele in data) {
            if(!data.hasOwnProperty(ele))continue;
            if(data[ele] instanceof Array) {
                for(var i in data[ele]) {
                    if(!data[ele].hasOwnProperty(i))continue;
                    PostArray.push(encodeURIComponent(ele) + '[]=' + encodeURIComponent(data[ele][i]));
                }
            }
            else {
                PostArray.push(encodeURIComponent(ele) + '=' + encodeURIComponent(data[ele]));
            }
        }
        PostStr = PostArray.join("&");
    }
    return PostStr;
};
Util.ajaxPost = function (path,data,call_back,onerror)
{
    if(!onerror) onerror = function(){};
    var xmlhttp, ele;
    if (typeof XDomainRequest != "undefined") {
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xmlhttp = new XDomainRequest();
        xmlhttp.open('POST', path);

    }
    else {
        xmlhttp=new XMLHttpRequest();
        xmlhttp.open('POST', path,true);
    }

    xmlhttp.withCredentials = true;

    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    var PostStr = Util.post.data_encode(data);

    //send request
    xmlhttp.onerror=onerror;
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 )
        {
            xmlhttp.Completed=true;
            if(xmlhttp.status==200)
            {
                call_back(xmlhttp.responseText);
            }

        }
    };

    xmlhttp.send(PostStr);
};
Util.get = function(path, onsuccess, onerror) {
    onerror = onerror || function(){};
    var xmlhttp, ele;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open('GET',path,true);

    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    //send request
    xmlhttp.onerror=function()
    {
        onerror("{error:'request timed out'}");
    };
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 )
        {
            xmlhttp.Completed=true;
            if(xmlhttp.status==200)
            {
                onsuccess(xmlhttp.responseText);
            }
            else
            {
                onerror("{error:'status "+ xmlhttp.status +"'}");
            }

        }
    };
    var time_out=function()
    {
        if(!xmlhttp.Completed)
        {
            xmlhttp.onerror();
        }
    };
    setTimeout(time_out,20000);
    xmlhttp.send();
};
