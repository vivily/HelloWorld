var PATHNAME = window.location.pathname;

function authenticate(username, password)
{
    if (window.console)
        console.log("Authenticate called, username: " + username + " password: " + password);
    if (validateUserPwd(username, password))
        document.forms["loginform"].submit();
}

function validateUserPwd(username, password)
{
    if (username == "" || username == undefined || username == null) 
    {
        alert("Please enter a valid username.");
        return false;
    }
    if (password == "" || password == undefined || password == null) 
    {
        alert("Please enter a valid password.");
        return false;
    }
    return true;
}

function addUser(username, password)
{    
   // alert("addUser called, username: " + username + " password: " + password);
    
    if (!validateUserPwd(username, password))
        return;
    var obj = new Object();
    obj.username = username;
    obj.password = password;
    obj.command = "ADD_USER";
    var url;
    //alert("PATH NAME:" + PATHNAME);
    if (backend== "DB")
        url = "DACUIDBServlet";
    else
        url = "DACUIServlet";
    
    $.ajax({
        type:       "post",
        url:        url,
        data:       JSON.stringify(obj),
        success:    function(msg) {
            if (window.console)
                console.log("msg: " + JSON.stringify(msg));
            //alert("msg: " + JSON.stringify(msg));
            //window.document.write(msg);
            if (msg.error != "" && msg.error != undefined && msg.error != null)
            {
            alert("Error: " + msg.error);
            return;
            }
            else {
                alert("Successfully registered. Please log in with your credential.");
            }
            
        }
    });
}

const INVALID_SESSION = "Invalid session ID.";

// isPublish boolean set to true for publishing job, false for saving job 
function post_asset(asset_id, asset_name, isPublish)
{
    var obj = new Object();
    username = document.getElementById("username").innerHTML;
    if (window.console)
        console.log(username);
    obj.asset_id = asset_id;
    obj.asset_name = asset_name;
    obj.data = asset_obj;
    obj.command = isPublish?"PUBLISH":"SAVE";
    if (window.console)
        console.log("post_asset called : " + JSON.stringify(obj));
    document.getElementById("AssetSummary").style.display = "none";
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
                console.log("ajax succeeded for post_asset with response data: " + msg);
            if (msg != null)
                {
                if (msg.error != "" && msg.error != undefined && msg.error != null)
                    {
                    alert("Error: " + msg.error);
                    if (msg.error.contains(INVALID_SESSION))
                    	window.location = (backend== "DB")?"loginDB.html":"login.html";
                    return;
                    }
                
                if (isPublish)
                    {
                    //alert("Asset metadata successfully published.");
                	show_published_msg();
                    refresh_asset_list();
                    init();
                    }
                else {
                    show_saved_msg();
                    refresh_asset_list();
                    }
                }
        } // end of function(msg)
    });
}

//isPublish boolean set to true for publishing job, false for saving job 
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

var time_delta = 0;
function adjusted_time()
{
    var time = new Date();  
    //console.log("orig time: " + time.getTime() + " adjusted time: " + (time.getTime()+time_delta));
    return (time.getTime()+time_delta).toString();
}

function show_saved_msg()
{
    var saved_info = document.getElementById("saved_info");
    var time = new Date();
    saved_info.innerHTML = "Saved at " + time;
}

function refresh_asset_list()
{
    if (window.console)
        console.log("refresh asset list called, for " + current_list);
    var obj = new Object();
    if (window.console)
        console.log("username: " + document.getElementById("username").innerHTML);
    var c_list = current_list; // save it for refresh table because ajax is asynchronous call.
    obj.command = "GET_"+ c_list;
    if (window.console)
        console.log("refresh_asset_list called : " + JSON.stringify(obj));
    if (backend== "DB")
        url = "DACUIDBServlet";
    else
        url = "DACUIServlet";
    $.ajax({
        type:       "post",
        url:        url,
        data:       JSON.stringify(obj),
        success:    function(msg) {
            if (window.console)
                console.log("ajax succeeded for refresh_asset_list with response data: " + JSON.stringify(msg.list));
            if (msg != null)
                {
                if (msg.error != "" && msg.error != undefined && msg.error != null)
                    {
                    alert("Error: " + msg.error);
                    if (msg.error.contains(INVALID_SESSION))
                    	window.location = (backend== "DB")?"loginDB.html":"login.html";
                    return;
                    }
                else
                    {
                    refresh_record_list_table(msg.list, c_list);
                    }
                return msg.list;
                }
                    
        } // end of function(msg)
    });
}

function delete_record(asset_id, isPublish)
{
    var obj = new Object();
    if (window.console)
        console.log("username: " + document.getElementById("username").innerHTML);
    obj.asset_id = asset_id;
    if (isPublish)
        obj.command = "DELETE_ASSET";
    else
        obj.command = "DELETE_SAVED_ASSET";
    //console.log("post_asset called : " + JSON.stringify(obj));
    if (backend== "DB")
        url = "DACUIDBServlet";
    else
        url = "DACUIServlet";

    $.ajax({
        type:       "post",
        url:        url,
        data:      JSON.stringify(obj),
        success:    function(msg) {
            //console.log("ajax succeeded for get_asset with response data: " + JSON.stringify(msg.asset));
            if (msg != null)
                {
                if (msg.error != "" && msg.error != undefined && msg.error != null)
                    {
                    alert("Error: " + msg.error);
                    if (msg.error.contains(INVALID_SESSION))
                    	window.location = (backend== "DB")?"loginDB.html":"login.html";
                    return;
                    }
                else    refresh_asset_list();
                }
                    
        } // end of function(msg)
    });
}

function submit_search(query) {
    if (window.console)
        console.log("submit_search called for: " + query);
    var obj = new Object();
    //console.log("username: " + document.getElementById("username").innerHTML);
    //obj.username = document.getElementById("username").innerHTML;
    //obj.asset_id = asset_id;
    obj.command = "INDEX_SEARCH";
    obj.query = query;
    //console.log("submit_search called : " + JSON.stringify(obj));
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
                console.log("ajax succeeded for submit_search with response data: " + msg.search_result);
            if (msg != null)
                {
                if (msg.error != "" && msg.error != undefined && msg.error != null)
                    {
                    alert("Error: " + msg.error);
                    if (msg.error.contains(INVALID_SESSION))
                    	window.location = (backend== "DB")?"loginDB.html":"login.html";
                    return;
                    }
                else    {
                    document.getElementById("result_content").innerHTML = formatJson(JSON.stringify(msg.search_result));
                    //document.getElementById("search_result_panel").style.display = "block";
                    refresh_record_list_table(msg.search_result, "SEARCH_LIST");
                    show_list(4);
                    if (window.console)
                    console.log(msg.search_result);
                }
            }
                    
        } // end of function(msg)
    });
}

function logout(){
	var url="logout" + backend;
	location.href = url;
}

function show_published_msg()
{
    var published_info = document.getElementById("published_info");
    var time = new Date();
    published_info.innerHTML = "Last successful publish by you was at " + time;
}