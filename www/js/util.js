function formatJson(json) {
    var i           = 0,
        il          = 0,
        tab         = "    ",
        newJson     = "",
        indentLevel = 0,
        inString    = false,
        currentChar = null;
    for (i = 0, il = json.length; i < il; i += 1) { 
        currentChar = json.charAt(i);
        switch (currentChar) {
        case '{': 
        case '[': 
            if (!inString) { 
                newJson += currentChar + "\n" + repeat(tab, indentLevel + 1);
                indentLevel += 1; 
            } else { 
                newJson += currentChar; 
            }
            break; 
        case '}': 
        case ']': 
            if (!inString) { 
                indentLevel -= 1; 
                newJson += "\n" + repeat(tab, indentLevel) + currentChar; 
            } else { 
                newJson += currentChar; 
            } 
            break; 
        case ',': 
            if (!inString) { 
                newJson += ",\n" + repeat(tab, indentLevel); 
            } else { 
                newJson += currentChar; 
            } 
            break; 
        case ':': 
            if (!inString) { 
                newJson += ": "; 
            } else { 
                newJson += currentChar; 
            } 
            break; 
        case ' ':
        case "\n":
        case "\t":
            if (inString) {
                newJson += currentChar;
            }
            break;
        case '"': 
            if (i > 0 && json.charAt(i - 1) !== '\\') {
                inString = !inString; 
            }
            newJson += currentChar; 
            break;
        default: 
            newJson += currentChar; 
            break;                    
        } 
    } 
    return newJson; 
}

function repeat(s, count)
{
	return new Array(count + 1).join(s);
}

function get_asset(asset_id, isPublish)
{
    var obj = new Object();
    if (window.console)
        console.log("username: " + document.getElementById("username").innerHTML);
    obj.asset_id = asset_id;
    obj.command = isPublish?"GET_PUBLISHED_ASSET":"GET_SAVED_ASSET";
    if (window.console)
        console.log("get_asset called : " + JSON.stringify(obj));
    
    if (backend== "DB")
        url = "DACUIDBServlet";
    else
        url = "DACUIServlet";
    
    $.ajax({
           type:       "post",
           url:        url,
           data:      JSON.stringify(obj),
           success:    function(msg) {
           if (window.console)
           console.log("ajax succeeded for get_asset with response data: " + JSON.stringify(msg.asset));
           if (msg != null)
           {
           if (msg.error != "" && msg.error != undefined && msg.error != null)
           {
           alert("Error: " + msg.error);
           if (msg.error.contains(INVALID_SESSION))
           window.location = (backend== "DB")?"loginDB.html":"login.html";
           return;
           }
           // display json as readly or not
           
           if (msg.access != null && msg.access != undefined )
           {
           //console.log(msg.access[0]);
           //console.log(msg.access[0].write);
           setDataFromJSON(msg.asset, msg.access[0].write);
           }
           else if (!isPublish)
           setDataFromJSON(msg.asset, true); // saved asset is always writable by owner
           else
           setDataFromJSON(msg.asset, false);
           return msg.asset;
           }
           
           } // end of function(msg)
           });
}

