
function init()
{
	if (window.console) console.log("init called");
	var publish_btn = document.getElementById("publish_btn");
	publish_btn.onmouseover = showTip;

	 var asset_id = document.getElementById("asset_id");
	 var aid = new UUID();
	 asset_id.innerHTML = aid.toString();
	 if (window.console) console.log("init ended, aid: " + aid.toString());
	 var aid = new UUID();
	 var fields_table = document.getElementById("FieldsTbl");
	 var len = fields_table.rows.length;
	 for (var i=len-1; i>0; i--)
		 fields_table.deleteRow(i);
	AppendNewField(0, true);
	 $("#FieldsTbl td img.rDelete").live("click", function () {
	 		if (window.console) console.log("delete called");
         var srow = $(this).parent().parent();
         var rowIndexClicked = this.parentNode.parentNode.rowIndex;
         var table=document.getElementById("FieldsTbl");
         var rowsInTable =table.rows.length; //includes header
         //if we want to delete the 1st row and there is no other row in the table after deleting 1st row append a new row	            
         if (rowIndexClicked ==1 && (rowsInTable-1) == 1){ 
         	srow.remove();
         	AppendNewField(0, true);	            	
         }
         else{
         srow.remove();
         }
     }); 
	 
	 
	 document.getElementById("asset_name").textContent =  "";
	 document.getElementById("asset_desc").textContent =  "";
	 document.getElementById("asset_data_loc").textContent =  "";
	 document.getElementById("asset_data_src").textContent =  "";
	 document.getElementById("asset_data_geoloc").textContent =  "";
	 document.getElementById("asset_data_quality").textContent =  "";
	 document.getElementById("asset_data_master").textContent =  "";
	 document.getElementById("asset_data_retention").textContent =  "";
	 document.getElementById("asset_data_daily_amt").textContent =  "";
	 document.getElementById("asset_data_freq").textContent =  "";
	 document.getElementById("asset_data_ingest").textContent =  "";
	 document.getElementById("fields_tab").style.background ="#92A1AA";
	 
	 $("#search_text").click(function(){
		    // Select input field contents
		    this.select();
		});

	// var autosave_timer = window.setTimeout("autosave()", 10000);
	 
}

function showEditPanel()
{
	document.getElementById("showEditPanel").style.display = "block";
	var asset_id = document.getElementById("asset_id");
	 asset_id.innerHTML = (new UUID());
}

function AppendNewField(currentIndex, isWritable) {
	if (window.console) console.log("Insert New Field at: " + currentIndex);
	 var table=document.getElementById("FieldsTbl");
	 var row = table.insertRow(currentIndex+1);
	 
	 var cell_name = row.insertCell(0);
	 cell_name.setAttribute("class", 'rFieldInput');
	 cell_name.innerHTML = "<div ContentEditable='true' class='rFieldInput' ></div>";
	 var cell_type = row.insertCell(1);
	 cell_type.innerHTML = "<select><option>int</option><option>double</option><option>string</option><option>float</option><option>long</option><option>time</option><option>date</option>" +
	 		               "<option>dateTime</option><option>boolean</option><option>duration</option><option>list</option><option>enum</option></select>";
	 var cell_desc = row.insertCell(2);
	 cell_desc.setAttribute("class", 'rFieldInput');
	 cell_desc.innerHTML = "<div ContentEditable='true' class='rFieldInput'></div>";
	 var cell_actions = row.insertCell(3);
	 var add_action ="";
	 if (isWritable) {
		 add_action = "onclick='AppendNewField(this.parentNode.parentNode.rowIndex, true)'";
	 }
	 cell_actions.innerHTML = "<img  value= 'Delete' class='rDelete' width=22 height=25 src='pics/trash.png' /> " + 
	 						  "<img  value= 'add' class='rAdd' width=22 height=25 src='pics/add.png'"+add_action+  "/> " +
	 						  " <img width=18 height=23 src='pics/UpDown.png'>";
	 var updown = cell_actions.childNodes[4];
	 if (window.console) console.log("updown src" + updown.src);
	 if (isWritable) {
		 cell_name.setAttribute("ContentEditable", "true");
		 cell_desc.setAttribute("ContentEditable", "true");
		 cell_actions.onmousedown = enableDraggable;
		 cell_actions.onmouseup = disableDraggable;
		 
		 $("#FieldsTbl td img.rDelete").live("click", function () {
		        if (window.console) console.log("delete called");
		        var srow = $(this).parent().parent();
		        srow.remove();
		    }); 
		 /*$("#FieldsTbl td img.rAdd").live("click", function () {
			 if (window.console) console.log(">>>>add to index: " + this.parentNode.parentNode.rowIndex);
			 AppendNewField(this.parentNode.parentNode.rowIndex, isWritable); 
		 	});*/
		 }
	 else {
		 cell_type.firstChild.setAttribute("Disabled", "Disabled");
		 cell_actions.style.opacity = "0.4";
	 }
	 return row;
}

var Moving = false; // a workaround for HTML5 drop event bug
var tmp_row;
var offset = new Object();
function enableDraggable(event)
{
	var table;
	if (window.console) console.log("enableDraggable triggered by " + event.srcElement);
	var table=document.getElementById("FieldsTbl");
	
	for (var i=1; i < table.rows.length; i++)
		{
		var row = table.rows[i];
		table.rows[i].setAttribute('draggable', 'true');
		//if (window.console) console.log("=== row: " + table.rows[i].innerHTML);
	
		// drag start event handler
		 addEvent(row, 'dragstart', function (e) {
				 if (window.console) console.log('dragstart called for target' + e.target.nodeName);
				 var target_row = null;
				 if  (e.target.nodeName == 'IMG')
					 {
					 target_row = e.target.parentNode.parentNode;
					 }
				 else if (e.target.nodeName == 'TD')
					 {
					 target_row = e.target.parentNode;	 
					 }
				 else if (e.target.nodeName == 'TR')
					 {
					 target_row = e.target;
					 }
	
				 if (this.rowIndex != target_row.rowIndex) return;
			 	if (window.console) console.log('dragstart called for ' + target_row.rowIndex + 'th row.');
			      e.dataTransfer.effectAllowed = 'move'; // only dropEffect='move' will be dropable
			      if (target_row.rowIndex!=undefined)
			    	  e.dataTransfer.setData('text', target_row.rowIndex); // required otherwise doesn't work
			      Moving = false;
		    });
		 
		 addEvent(row, 'dragover', function (e) {
			    if (e.preventDefault) e.preventDefault(); // allows us to drop
			    this.className = 'over';
			    e.dataTransfer.dropEffect = 'move';
			    return false;
			  });

		 addEvent(row, 'dragenter', function (e) {
			    this.className = 'over';
			    return false;
			  });	 
		  
		 // drop event handler
		 addEvent(row, 'drop', function (e) {
			 if (Moving) return;
			 var target_row = null;
			 if  (e.target.nodeName == 'IMG')
			 {
			 target_row = e.target.parentNode.parentNode;
			 }
			 else if (e.target.nodeName == 'TD')
			 {
			 target_row = e.target.parentNode;	 
			 }
			 else if (e.target.nodeName == 'TR')
			 {
			 target_row = e.target;
			 }
			 if (target_row.rowIndex != this.rowIndex) return;
			 var toPos = target_row.rowIndex;
			 if (toPos == 0 ) return;
			 Moving = true;
			 if (window.console) console.log("drop called for target: " + e.target + " this index: " + this.rowIndex + " target index: " + toPos);
			 
			 var table=document.getElementById("FieldsTbl");
			 if (window.console) console.log("!!!!!! real drop !!!!!");
			    if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting...why???
			    if (window.console) console.log("drag from " + e.dataTransfer.getData("text"));
			    var toMove = parseInt(e.dataTransfer.getData("text"));
			    toInsertRowHTML = table.rows[toMove].innerHTML;
			    //if (window.console) console.log(toInsertRowHTML);
			    var prev_type_index = table.rows[toMove].getElementsByTagName("select")[0].selectedIndex;
			    table.deleteRow(toMove);
			    var new_row = table.insertRow(toPos);
			    new_row.innerHTML = toInsertRowHTML;
			    var type_sel = new_row.getElementsByTagName("select")[0];
			    type_sel.selectedIndex = prev_type_index;
			    type_sel.options[ prev_type_index].selected =true;
			    disableDraggable();
			    
			    new_row.cells[3].onmousedown = enableDraggable;
				 //cell_actions.onclick = if (window.console) console.log('bbb');
				    
				 $("#FieldsTbl td img.rDelete").live("click", function () {
				        if (window.console) console.log("delete called");
				        var srow = $(this).parent().parent();
				        srow.remove();
				    }); 
			  });
		}
}

function disableDraggable()
{
	if (window.console) console.log("disableDraggable");
	var table=document.getElementById("FieldsTbl");
	for (var i=1; i< table.rows.length; i++)
		{
		table.rows[i].setAttribute('draggable', 'false');
		}
}

function showTip(evt)
{
if (window.console) console.log("showTip called");
if (window.console) console.log(evt);
var metadata_tip = "Metadata is descriptive information about a data asset. It may be created automatically using software or entered by hand.";
}

var asset_obj;
function publishAsset()
{
	if (window.console) console.log(arguments.callee.name);
	asset_obj = getAssetObj(true);
	if (asset_obj == null) return;
	
    AssetSerialized = JSON.stringify(asset_obj);
    if (window.console) console.log("+++++++" + formatJson(AssetSerialized));
    document.getElementById("AssetSerialized").innerHTML = formatJson(AssetSerialized);
    document.getElementById("sumary_aname").innerHTML = asset_obj[0].name;
    document.getElementById("AssetSummary").style.display = "block";
    var post_call = 'post_asset(\'' + asset_obj[0]._id + '\', \'' + asset_obj[0].name + '\', true)';
    if (window.console) console.log("post_call: "+ post_call);
    document.getElementById("yes_btn").setAttribute("onclick", post_call);
    if (window.console) console.log("onclick yes: " + document.getElementById("yes_btn").onclick);
}
var AssetSerialized;
function saveAsset(silent)
{
	if (window.console) console.log(arguments.callee.name);
	asset_obj = getAssetObj(false);
	if (asset_obj == null) return;
	
    AssetSerialized = JSON.stringify(asset_obj);
    if (!silent)
    	{
	    if (window.console) console.log("+++++++" + formatJson(AssetSerialized));
	    document.getElementById("AssetSerialized").innerHTML = formatJson(AssetSerialized);
	    document.getElementById("sumary_aname").innerHTML = asset_obj[0].name;
	    document.getElementById("AssetSummary").style.display = "block";
	    	
	    var post_call = 'post_asset(\'' + asset_obj[0]._id + '\', \'' + asset_obj[0].name + '\', false)';
	    if (window.console) console.log("post_call: "+ post_call);
	    document.getElementById("yes_btn").setAttribute("onclick", post_call);
	    if (window.console) console.log("onclick yes: " + document.getElementById("yes_btn").onclick);
    	}
    else
    	{
    	if (window.console) console.log("-------" + formatJson(AssetSerialized));
    	post_asset(asset_obj[0]._id , asset_obj[0].name, false);
    	}
}

// validate means we validate while serializing the asset.
function getAssetObj(validate){
	if (window.console) console.log("getAssetObj called");
	var prefix_fieldtype = "http://dataOS.nokia.com/catalog#Field";
    var FieldTable=document.getElementById("FieldsTbl");
    var rows = FieldTable.rows; //includes the header so when we traverse we have to deduct -1      
    var serializedObjArr = new Array();
    var ErrorOccured = false;
    var ErrorMsgsArray = new Array(4);
   
    // first part of asset is asset basic info + physical info
    var asset_info = new Object();
    asset_info._id = document.getElementById("asset_id").innerHTML;
    asset_info._type =removeNLWS("http://dataOS.nokia.com/catalog#Entry");
    //Firefox does not recognize innerText, so replacing with textContent 
    asset_info.name =removeNLWS(document.getElementById("asset_name").textContent);
    if (validate){
    	if(asset_info.name ==""){
           ErrorOccured = true;
           var assetNameEmpty="Error :Asset Name can't be empty";
           ErrorMsgsArray.push(assetNameEmpty);
        }
    	if(containInvalidChars(asset_info.name)){
    		ErrorOccured = true;
            var assetNameHasError="Error :Asset Name can contain only alphanumeric characters and underscore";
            ErrorMsgsArray.push(assetNameHasError);
    		  		
    	}
    	/*if(containSpaces(asset_info.name)){
        	ErrorOccured = true;
            var assetNameHasSpace="Error :Asset Name can't have space";
            ErrorMsgsArray.push(assetNameHasSpace);
           }
    	if(containSlashes(asset_info.name)){
    		ErrorOccured = true;
            var assetNameHasSlash="Error :Asset Name can't have slahes";
            ErrorMsgsArray.push(assetNameHasSlash);
    		}*/
    	
    }
    asset_info.comment = removeNLWS(document.getElementById("asset_desc").textContent);
    if (validate){   
    	 if (asset_info.comment ==""){
    		 ErrorOccured = true;
    		 var assetDescEmpty="Error :Enter asset description";
    		 ErrorMsgsArray.push(assetDescEmpty);
    	 }
    	/* if (containInvalidCommnt(asset_info.comment)){
    		 ErrorOccured = true;
    		 var assetDescInvld="Error :Asset Description can contain only alphanumeric characters, spaces and underscore";
    		 ErrorMsgsArray.push(assetDescInvld);
    		 
    	 }*/
    }
    asset_info.data_location = removeNLWS(document.getElementById("asset_data_loc").textContent);
    asset_info.data_source = removeNLWS(document.getElementById("asset_data_src").textContent);
    asset_info.data_geoloc = removeNLWS(document.getElementById("asset_data_geoloc").textContent);
    asset_info.data_quality = removeNLWS(document.getElementById("asset_data_quality").textContent);
    asset_info.data_master = removeNLWS(document.getElementById("asset_data_master").textContent);
    asset_info.data_retention = removeNLWS(document.getElementById("asset_data_retention").textContent);
    asset_info.data_dailyAmount = removeNLWS(document.getElementById("asset_data_daily_amt").textContent);
    asset_info.data_frequency = removeNLWS(document.getElementById("asset_data_freq").textContent);
    asset_info.data_ingestMethod = removeNLWS(document.getElementById("asset_data_ingest").textContent);
    serializedObjArr[0] = asset_info;
    
    for (var i=1; i < rows.length ; i++) { 
    	var field = new Object;// to keep the dynamic info
        // reserved _id and _type
        field._id = (new UUID()).toString();
        field._type = prefix_fieldtype;  
        var cells = rows[i].cells;
        field.name = removeNLWS((cells[0].textContent));
        if (validate){
        	if(field.name==""){
        		ErrorOccured = true;
        		var fieldNameEmpty = "Error :Field Name can't be empty.";
        		if (!contains(ErrorMsgsArray,fieldNameEmpty)){
        		   // we want to show this msg only once not for each row
        		   ErrorMsgsArray.push(fieldNameEmpty);
        		}
        	}
        	if(containInvalidChars(field.name)){
        		ErrorOccured = true;
                var fldNameHasError="Error :Field Name can contain only alphanumeric characters and underscore";
                if (!contains(ErrorMsgsArray,fldNameHasError)){
         		   // we want to show this msg only once not for each row
                	ErrorMsgsArray.push(fldNameHasError);
                } 		
        	}
        	       	
        }
        if (window.console) console.log(cells[1]);
        selectbox = cells[1].firstChild;
        if (window.console) console.log(selectbox);
        if (window.console) console.log(selectbox.selectedIndex);
        field.dataType = selectbox.options[selectbox.selectedIndex].value;
        field.comment = removeNLWS(cells[2].textContent);
        if (validate){
        	if(field.comment==""){
           	   ErrorOccured = true;
           	   var fieldCommentEmpty ="Error :Enter field description.";
           	   if (!contains(ErrorMsgsArray,fieldCommentEmpty)){
     		   // we want to show this msg only once not for each row
           	   ErrorMsgsArray.push(fieldCommentEmpty);
           	   }
           	}
        /*	if (containInvalidCommnt(field.comment)){
       		 ErrorOccured = true;
       		 var fieldCommentInvld="Error :Fields Description can contain only alphanumeric characters, spaces and underscore";
       		 if (!contains(ErrorMsgsArray,fieldCommentInvld)){
      		     //we want to show this msg only once not for each row
       			 ErrorMsgsArray.push(fieldCommentInvld);
       		 }
       	 }*/
        }
        field.isFieldOf = removeNLWS("http://dataOS.nokia.com/catalog#" + asset_info.name);
        field.sequence = i;  
        serializedObjArr[i] = field;
        
    }
    
    if(!ErrorOccured){// If there is error then don't display the information
    	return serializedObjArr;
     }
     else{
    	var DisplayMsgs ="";
    	if (window.console) console.log("display error: " + ErrorMsgsArray.length);
    	for (var i=0; i <ErrorMsgsArray.length; i++ ){
    		
    	     if(ErrorMsgsArray[i] != null){
    	    	
    	        if (DisplayMsgs == "")
    			    DisplayMsgs= DisplayMsgs + ErrorMsgsArray[i];
    	    	else
    				 DisplayMsgs= DisplayMsgs + "\n" + ErrorMsgsArray[i];
    			}		 
    	 }
    	 if (DisplayMsgs != null){
    		 alert(DisplayMsgs);
    		/* if (contains(ErrorMsgsArray,assetNameEmpty)){
	    		 alert("suchi");
	    		 document.getElementById("asset_name").style.backgroundColor="red"; 
	    		 //need to add code that onclick it should clear the bg color
	    	 } */	    
    		 
    		 if (window.console) console.log(DisplayMsgs);
    	 }
     }//end of else
    return null;
}

/* function to check valid chracters (allow ONLY alphanumeric keys, and underscore), */
/* this can be altered for any "checkOK" string we desire*/

function containInvalidChars(checkStr){
	
	var validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
	
	for (i = 0;  i < checkStr.length;  i++)
	{
		ch = checkStr.charAt(i);
		if(validChars.indexOf(ch) != -1) {
			continue;
		}
		else
			return true;
	}
	/*var allValid = true;
	for (i = 0;  i < checkStr.length;  i++)
	{
	ch = checkStr.charAt(i);
	for (j = 0;  j < validChars.length;  j++)
	if (ch == validChars.charAt(j))
	break;
	if (j == validChars.length)
	{
	allValid = false;
	break;
	}
	}
	if (!allValid)
	{
	//alert("Please enter only letter and numeric characters in the \"Asset Name\" field.");
	//theForm.Alias.focus();
		return true;
	}*/
	
	return false;
	
}


function containInvalidCommnt(checkStr){

	var validChars = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
	//var allValid = true;

	for (i = 0;  i < checkStr.length;  i++)
	{
		ch = checkStr.charAt(i);
		if(validChars.indexOf(ch) != -1) {
			//alert ("suchi continue:" +i);
			continue;
		}
		else
			return true;
	}
	return false;
}

/* function to check a msg already exist in ErrorMsgsArray or not
 *  a is an Array and obj is the string to check does it exist or not
 *  returns true/false
 */

function contains(a, obj) {
	  var i = a.length;
	  while (i--) {
	    if (a[i] === obj) {
	    	return true;
	    }
	  }
	  return false;
	}

/* function to remove Newline,CarriageReturn,Tab characters and whiteSpace
 *  strg  string to be processed
 *  returns new string
 */
function removeNLWS(s) {
	
	var r = "";
	
	if (s != null){
		// Firefox enters <br _moz_dirty="" > for space or line break when we extract the the text from contentEditable div element
		// to take care of this issue we replaced <br> with /n in Mozilla browser.
		/*if ($.browser.mozilla) {if (s.search('/<br>/i')){s = s.replace('<br>', '\n');}}*/
		
		// 1st remove NewLine, CarriageReturn and Tab characters from a String
		for (var i=0; i < s.length; i++) {
			if (s.charAt(i) != '\n' &&
				s.charAt(i) != '\r' &&
				s.charAt(i) != '\t') {
				r += s.charAt(i);
				}
			}
	/*
	 *  Now replace the whitespace
	 *  logics behind the regular expression /^\s+|\s+$/g saying that find one ore more spaces at the start of the line, also one or more spaces at the end of a line, and replace them with ''.
	 *  / =start the regular expression
	 *  ^ =match the START of the line and then... \s =match spaces + =one or more of them
	 *  | =OR (think of this as ALSO)
	 *  \s =match spaces + =one or more of them... $ =to the END of the line  / =end of the regular expression
	 *  g =GLOBAL (do this for EVERY MATCHING CASE) this will cause the expression to match the start, and then go on to the end. Otherwise it would quit after the first match (the start of the line).
	 *  
	 */
   
	r = r.replace(/^\s+|\s+$/g, "");
	
	}
		
	return r;	  
}

/* check for spaces */
function containSpaces(s){
	var invalid = " ";
	if (s.indexOf(invalid) > -1) {
		return true;
	}
	return false;
}

/* check for slashes */
function containSlashes(s){
	
	for (var i=0; i < s.length; i++)
	{
		var temp = "" + s.substring(i, i+1);
		// if character is backslash or frontslash return true
		if ((temp == "\\") || (temp == "/")){
			return true;
		}
	}
	return false;
}

function show_asset(a_id, isPublished, cell) {
	if (window.console) console.log("show asset for: " + a_id + " cell: " +  cell);
	console.log(cell.parentNode);
	var table = cell.parentNode.parentNode;
	for (var i=0; i < table.rows.length; i++)
		{
		if (i%2 == 0)
			table.rows[i].style.background = '#E5EECC';
		else 
			table.rows[i].style.background = '#f0f0f0';
		}
	cell.parentNode.style.background = '#9bb08b';
	get_asset(a_id, isPublished);  //get asset from published list, will change later
}

function renew() {
  init();
  var fields = document.getElementsByClassName('long_field'); 
  for (var len = fields.length, i=0;  i < len; i++ )
		{
		fields[i].setAttribute("ContentEditable", true);
		}
  document.getElementById("select_asset_type").removeAttribute("Disabled");
 
}

/*
* 
* Populate HTML static/dynamic fields by parsing the JSON data returned from server
*/

function setDataFromJSON(data, isWritable) {
	if (data.length >1)
		{
		//clear fields table for populating fields
		var fields_table = document.getElementById("FieldsTbl");
		 var len = fields_table.rows.length;
		 for (var x=len-1; x>0; x--)
			 fields_table.deleteRow(x);
		}
	var i=0;
	if (window.console) console.log("setDataFromJSON called for length: " + data.length);
	for(i=0;i<data.length;i++)
	{  
		if (i==0){// 1st field contains Asset info
			//==== set asset id ====
			var asset_id = document.getElementById("asset_id");
			//now extract and assign the asset_id
			asset_id.innerHTML = data[i]._id;
			//==== set asset name====
			var asset_name = document.getElementById("asset_name");
			asset_name.textContent = data[i].name;
			//==== set asset description====
			var asset_comment = document.getElementById("asset_desc");
			asset_comment.textContent = data[i].comment;
			//==== set asset datalocation ====
			var asset_dataLoc = document.getElementById("asset_data_loc");
			asset_dataLoc.textContent = data[i].data_location;
			//==== set asset dataSrc ====
			var asset_datasrc = document.getElementById("asset_data_src");
			asset_datasrc.textContent = data[i].data_source;
			//==== set asset dataGeolocation====
			var asset_dataGeoLoc = document.getElementById("asset_data_geoloc");
			asset_dataGeoLoc.textContent = data[i].data_geoloc;
			//=== set asset dataQuality ===
			var asset_dataQuality = document.getElementById("asset_data_quality");
			asset_dataQuality.textContent = data[i].data_quality;
			//=== set asset dataMaster ===
			var asset_dataMaster =document.getElementById("asset_data_master");
			asset_dataMaster.textContent = data[i].data_master;
			//=== set asset dataRetention ===
			var asset_dataRetention =document.getElementById("asset_data_retention");
			asset_dataRetention.textContent = data[i].data_retention;
			//=== set asset dataDailyAmt ===
			var asset_dataDailyAmt =document.getElementById("asset_data_daily_amt");
			asset_dataDailyAmt.textContent = data[i].data_dailyAmount;
			//=== set asset dataFrequency ===
			var asset_dataFrequency =document.getElementById("asset_data_freq");
			asset_dataFrequency.textContent = data[i].data_frequency;
			//=== set asset dataIngestMethod ===
			var asset_dataIngestMethod =document.getElementById("asset_data_ingest");
			asset_dataIngestMethod.textContent = data[i].data_ingestMethod;
						
		}
		else if (i>0){// now set up the field info
			if (window.console) console.log("data[i].name  where i:" + i );
			 
			for (var j=i-1; j < ((data.length)-1); j++)
			{
				if (window.console) console.log("append at: " + j);
				var row = AppendNewField(j, isWritable);
				row.cells[0].innerHTML= data[i].name;
				row.cells[2].innerHTML= data[i].comment;
				if (window.console) console.log("cell 1");
				if (window.console) console.log(row.cells[1].firstChild);
				var Len =  row.cells[1].firstChild.options.length;
				var select = row.cells[1].firstChild;
				var type= data[i].dataType;
			    
				//onsole.log("suchi type:" + type + "number of types: " + Len);
				//traverse through the options and select the one matches with type
				for(var k = 0; k < Len; k++){
					
				    if(select.options[k].value == type){
				    	select.selectedIndex = k;
				    	select.options[k].selected =true;
				    	  if (window.console) console.log("selectedIndex" + select.selectedIndex);
				    	  break;
				    }                  
				}
				if (!isWritable)
					select.setAttribute("disabled", "disabled");
				else
					select.removeAttribute("disabled");
				break;
			}
	}
	}//end of outer for loop
	if (!isWritable)
	{
	  var fields = document.getElementsByClassName('long_field'); 
	  for (var len1 = fields.length, z=0;  z < len1; z++ )
			{
			fields[z].setAttribute("ContentEditable", false);
			}
	  var field_inputs = document.getElementsByClassName('rFieldInput'); 
	  for (var length = field_inputs.length, t=0;  t < length; t++ )
			{
		  if (window.console) console.log("!!!field input " + t +": "+ field_inputs[t]);
		  	field_inputs[t].setAttribute("ContentEditable", false);
			}
	  document.getElementById("select_asset_type").setAttribute("disabled", "disabled");
	}
	else
		{
		var fields = document.getElementsByClassName('long_field'); 
		  for (var len1 = fields.length, z=0;  z < len1; z++ )
				{
				fields[z].setAttribute("ContentEditable", true);
				}
		  document.getElementById("select_asset_type").removeAttribute("disabled");
		}
}

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

function repeat(s, count) {
    return new Array(count + 1).join(s);
}


function autosave()
{
	saveAsset(true);
	//window.setTimeout("autosave()", 10000);
}

function changeType(type)
{
	if (type == "Asset Metadata")
		{
		document.getElementById("sdf_tab").style.display = "none";
		document.getElementById("physical_tab").style.display = "block";
		document.getElementById("fields_tab").style.background ="#92A1AA";
		document.getElementById("physical_tab").style.background ="#c9d0d5";
		}
	else if(type == "Service Definition")
		{
		document.getElementById("sdf_tab").style.display = "block";
		document.getElementById("physical_tab").style.display = "none";		
		document.getElementById("fields_tab").style.background ="#92A1AA";
		document.getElementById("sdf_tab").style.background ="#c9d0d5";
		}
	document.getElementById("FieldsTbl").style.display = "block";
	document.getElementById("asset_physical_table").style.display = "none";
	document.getElementById("asset_sdf_table").style.display = "none";
}

function show_prop_table(table_no)
{
	if (window.console) console.log("show_prop_table called with table no " + table_no);
	if (table_no == 1) // prop table
		{
		document.getElementById("FieldsTbl").style.display = "block";
		document.getElementById("asset_physical_table").style.display = "none";
		document.getElementById("asset_sdf_table").style.display = "none";
		
		document.getElementById("fields_tab").style.background ="#92A1AA";
		document.getElementById("physical_tab").style.background ="#c9d0d5";
		document.getElementById("sdf_tab").style.background ="#c9d0d5";
		}
	else if (table_no == 2) // physical table
		{
		document.getElementById("FieldsTbl").style.display = "none";
		document.getElementById("asset_physical_table").style.display = "block";
		document.getElementById("asset_sdf_table").style.display = "none";
		
		document.getElementById("fields_tab").style.background ="#c9d0d5";
		document.getElementById("physical_tab").style.background ="#92A1AA";
		document.getElementById("sdf_tab").style.background ="#c9d0d5";
		}
	else if (table_no == 3) // sdf table
		{
		document.getElementById("FieldsTbl").style.display = "none";
		document.getElementById("asset_physical_table").style.display = "none";
		document.getElementById("asset_sdf_table").style.display = "block";
		
		document.getElementById("fields_tab").style.background ="#c9d0d5";
		document.getElementById("physical_tab").style.background ="#c9d0d5";
		document.getElementById("sdf_tab").style.background ="#92A1AA";
		}
}

function invokeSearch()
{
	var search_query = "";
		
	if (backend == "DC"){
		// call a function here to form query for DC 
		search_query = formQueryforDC();		
	}
	else if(backend == "DB"){
		// call a function here to form query for DB
		search_query = formQueryforDB();	
	}
	
	submit_search(search_query);
	//set it to default
	document.getElementById("search_text").value ="search text";
	
}

function formQueryforDC()
{

	var search_query = "";	

	var filter = " AND (propertyprefix:rdfs AND Property:label) "+
	"&fl=model_id,timestamp,id,value,published,version,author&sort=timestamp desc";

	var filter_fields = " &fl=model_id,timestamp,id,value,published,version,author&sort=timestamp desc";

	search_select = document.getElementById("select_options");
	var search_by = search_select.options[search_select.selectedIndex].text;
	var searchText = document.getElementById("search_text").value;

	if (search_by == "by author")
	{
		search_query = "author:" + searchText + filter;

	}
	else if (search_by == "by asset name")
	{
		search_query = "id:" + searchText +  filter_fields ;

	}
	else if (search_by == "by asset id")
	{
		search_query = "model_id:" + searchText + filter;
	}
	else if (search_by == "by description")
	{	
		/*asset_descrptn has to be within double quote to support space in
		asset description */
		search_query = "value:" + '\"'+ searchText+'\"'	+filter_fields;
		
	}
	else if (search_by == "in all fields")
	{
		var asset_descrptn = '\"'+document.getElementById("search_text").value+'\"';
		
		search_query = "(" +"author: " + searchText +" "+"OR" +" "+
		               "id:"+ searchText +" " +"OR" +" "+ "model_id:" + searchText +" " +"OR" 
		               +" "+"value:" +asset_descrptn +")"+" AND (propertyprefix:rdfs AND Property:label) "+filter_fields;
		
	}

	return search_query;
		
}

function formQueryforDB()
{
	var search_query = "";

	search_select = document.getElementById("select_options");    
	var search_by = search_select.options[search_select.selectedIndex].text;
	var searchText = document.getElementById("search_text").value;
	//in MYSQL we need to escape the single quotes in the search string by adding one more single quote.
	searchText = searchText.split("'").join("''");
	

	if (search_by == "by author")
	{
		search_query = "author.username like \'%" + searchText  + "%\'";
		
	}
	else if (search_by == "by asset name")
	{
		search_query ="asset.name like \'%" + searchText + "%\'";
		
	}
	else if (search_by == "by asset id")
	{
		search_query = "asset.uuid like \'%" + searchText + "%\'";
		
	}
	else if (search_by == "by description")
	{
		search_query = "asset.description like \'%" + searchText + "%\'";
		
	}
	else if (search_by == "in all fields")
	{
		search_query = "author.username like \'%" + searchText  + "%\'"+" "+
		"OR" + " " +"asset.name like \'%" + searchText  + "%\'"+" "
		+"OR" + " " +"asset.uuid like \'%" + searchText  + "%\'"+" "
		+"OR" + " " +"asset.description like \'%" + searchText + "%\'";
		
	}

	return search_query;

	
}

function show_advanced_search()
{
	document.getElementById("advanced_search_panel").style.display = "block";
	}

function close_advanced_search()
{
	document.getElementById("advanced_search_panel").style.display = "none";
	}

/* function submit_query() gets called when we use the advanced search feature */
function submit_query()
{
	var query = document.getElementById("advanced_query").value;
	
	if (backend == "DC"){ // for DC backend we need to filter the search query	

		var filter = " AND (propertyprefix:rdfs AND Property:label) "+
		"&fl=model_id,timestamp,id,value,published,version,author&sort=timestamp desc";

		var filter_fields = " &fl=model_id,timestamp,id,value,published,version,author&sort=timestamp desc";
		var splitQuery = query.split(":");
		var searchBy = splitQuery[0];
		var searchText=splitQuery[1];

		if (searchBy == "author")
		{
			query = query + filter;
		}
		else if (searchBy == "id")
		{
			query = query + filter_fields ;

		}
		else if (searchBy == "model_id")
		{
			query = query + filter;

		}
		else if (searchBy == "value")
		{	
			/*asset_descrptn has to be within double quote to support space in
		asset description */
			query = "value:" + '\"'+ searchText+'\"'+filter_fields;

		}
		else{ // this is for search in all fields
            
		   query = "(" +"author: " +  query +" "+"OR" +" "+"id:"+ query +" " +"OR" +" "+ "model_id:" + query +" " +"OR" 
           +" "+"value:" +'\"'+ query+'\"'+")"+" AND (propertyprefix:rdfs AND Property:label) "+filter_fields;
		   alert("suchi all field:" + query);
           
		}

	}
	submit_search(query);
	
	// clear the text in the search box now
	document.getElementById("advanced_query").value = "";	
	document.getElementById("advanced_search_panel").style.display = "none";
}

function notImplemented(){
	
	alert(" This functionality is not Implemented yet");
	
	
}
