<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%@ page import="org.json.simple.JSONArray" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="java.util.Date;" %>
<jsp:useBean id="username" scope="request" class="java.lang.String" />
<jsp:useBean id="password" scope="request" class="java.lang.String" />
<jsp:useBean id="backend" scope="request" class="java.lang.String" />
<jsp:useBean id="list" scope="request" class="org.json.simple.JSONArray" />

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<!--<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">  -->
	<title>Data Asset Catalog</title>
	<link rel="stylesheet" type="text/css" href="css/DMR_asset.css" />
 	<script>var backend = "<%=backend %>"; 
 	//alert("backend--->" + backend);
 	</script>	
 	<script src="js/list_handler.js"></script>
 	<script src="js/DMR_editing.js"></script>
 	<script src="js/jquery-1.6.2.js" type="text/javascript"></script>
 	<script src="js/uuidgen.js"></script>
 	<script src="js/util.js"></script>
 	<script src="js/ajax_client.js"></script>

</head>
<body onload="init()">
<div id="content_panel">
	Welcome <b><div id="username" style="display:inline"><%=username %></div></b>!  
		<div id="search_ui">
			Search: <input type="text" id="search_text" size="10" value="search text" />
			<select id="select_options">
				<option>by asset name </option>
				<option>by author</option>
				<option>by asset id</option>
				<option>by description</option>
				<option>in all fields </option>
			</select>
			<input type="button" value="Search" height: 18px; onclick="invokeSearch();"/>
			<div style="clear: both; float: right" onclick="show_advanced_search()"><u>advanced search</u></div><p/>
		</div>
	<br/>
	<div style="font-size:small">If you are not <b><%=username %></b>, 
	please <a onclick="logout()"  style="text-decoration:underline">log out</a> 
	and re-log in.</div>
	<p>
	<div id="list_tabs">
		<div class="Asset_list_tab" id="list_all" onclick="show_list(1)" style="background: #abb299">All published records</div>
		<div class="Asset_list_tab" id="list_mine" onclick="show_list(2)" >My published records</div>
		<div class="Asset_list_tab" id="list_saved" onclick="show_list(3)">My saved records</div>
		<div class="Asset_list_tab" id="list_search" onclick="show_list(4)">Search results</div>
	</div>
	<div id="list_area">
	<table width="680" style='clear: both; table-layout:fixed; padding-left:3px'>
	<col width=164><col width=100"><col width=50><col width=60><col width=220>
	<tr><th>ID</th><th>Name</th><th>Author</th><th>Version</th><th>Last modified</th><th>Actions</th></tr>
	</table>
	<div id="record_list">
	<table id="record_list_table" width="660" style='table-layout:fixed'>
	<col width=164><col width=100"><col width=50><col width=60><col width=220>
	<tbody id="all_list_tbody">
<% for (int i=0; i < list.size(); i++)
	{
	if (i%2==0)
		out.println("<tr style='background: #E5EECC'>");
	else
		out.println("<tr>");
	JSONObject obj = (JSONObject)list.get(i);
	 out.println("<td onclick=show_asset(\'" + obj.get("_id")+ "\',true,this)>" + obj.get("_id") + "</td>");
	 out.println("<td onclick=show_asset(\'" + obj.get("_id")+ "\',true,this)>" + obj.get("name") + "</td>");
	 out.println("<td onclick=show_asset(\'" + obj.get("_id")+ "\',true,this)>" + obj.get("author") + "</td>");
	 out.println("<td onclick=show_asset(\'" + obj.get("_id")+ "\',true,this)>" + obj.get("version") + "</td>");
	 Date d = new Date();
	 d.setTime((Long)obj.get("timestamp"));
	 out.println("<td >" + d + "</td>");
	 out.println("<td><img  value= 'Delete' class='rDelete' width=22 height=25 src='pics/trash.png' onclick=\"delete_record(\'" + obj.get("_id") + "\', true)\"  /></td>");
	 out.println("</tr>");
	}
	%>
	</tbody>	
	<tbody id="my_list_tbody" style="display:none">
	</tbody>	
	<tbody id="save_list_tbody" style="display:none">
	</tbody>	
	<tbody id="search_result_tbody" style="display:none">
	</tbody>	
</table>
	</div>	
	</div>
	<p/>
	<input type="button" value="New Asset Metadata" onclick = "renew()"/>
	<p/>

<div id="asset_edit_panel">
	<div class="bold_title">Asset Metadata record:</div>	<p>
	<div id="record">
		<div class="bold_medium">Basic information:</div>
	<table class="asset_prop_table">
		<tr>
		<td class="bold_cell">  Asset ID</td>
		<td class="long_field_id"  id="asset_id"></td>
		</tr>
		<tr>
		<td class="bold_cell">  Asset Name:</td>
		<td ContentEditable="true" class="long_field" id="asset_name"></td>
		</tr>
		<tr>
			<td class="bold_cell">  Asset Description:</td>
			<td ContentEditable="true" class="long_field" id="asset_desc"></td>
		</tr>
	</table>
	<p/>
Asset used for:
	<select onChange="changeType(this.options[selectedIndex].text);" id="select_asset_type">
		<option>Asset Metadata</option>
		<option >Service Definition</option>
	</select>
	<p/>
	<div class="table_tabs">
		<div class="Asset_prop_tab" id="fields_tab" onclick="show_prop_table(1)">Fields</div>
		<div class="Asset_prop_tab" id="physical_tab" onclick="show_prop_table(2)" >Metadata</div>
		<div class="Asset_prop_tab" id="sdf_tab" style="display: none" onclick="show_prop_table(3)">SDF</div>
	</div>
	<div class="prop_tables">
		<table id="FieldsTbl" class="asset_prop_table" style='table-layout:fixed'>
		
		 <col width=100>
		 <col width=70>
		 <col width=250>
		 <col width=100>
			<tr >
			<th >Name</th>
			<th >Type</th>
			<th >Description</th>
			<th >Actions</th>
			</tr>
		</table>
		<table id="asset_physical_table" class="asset_prop_table" style="display:none">
		<col width=140>
		 <col width=300>
		<tr>
			<td class="bold_cell">Data Location:</td>
			<td ContentEditable="true" class="long_field" id="asset_data_loc"></td>
		</tr>
		<tr>
			<td class="bold_cell">Data Source:</td>
			<td ContentEditable="true" class="long_field" id="asset_data_src"></td>
		</tr>
		<tr>
			<td class="bold_cell">Geographical location(s):</td>
			<td ContentEditable="true" class="long_field" id="asset_data_geoloc"></td>
		</tr>
		<tr>
			<td class="bold_cell">Quality metrics:</td>
			<td ContentEditable="true" class="long_field" id="asset_data_quality"></td>
		</tr>
		<tr>
			<td class="bold_cell">Master of data source</td>
			<td ContentEditable="true" class="long_field" id="asset_data_master"></td>
		</tr>
		<tr>
			<td class="bold_cell">Retention duration</td>
			<td ContentEditable="true" class="long_field" id="asset_data_retention"></td>
		</tr>
		<tr>
			<td class="bold_cell">Daily amount</td>
			<td ContentEditable="true" class="long_field" id="asset_data_daily_amt"></td>
		</tr>
		<tr>
			<td class="bold_cell">Frequency</td>
			<td ContentEditable="true" class="long_field" id="asset_data_freq"></td>
		</tr>
		<tr>
			<td class="bold_cell">Ingestion method</td>
			<td ContentEditable="true" class="long_field" id="asset_data_ingest"></td>
		</tr>
		</table>
		<table id="asset_sdf_table" class="asset_prop_table" style="display:none">
			<col width=140>
		 	<col width=300>
		<tr>
			<td class="bold_cell">Service ID:</td>
			<td ContentEditable="true" class="long_field" id="asset_service_id"></td>
		</tr>
		<tr>
			<td class="bold_cell">Credential:</td>
			<td ContentEditable="true" class="long_field" id="asset_data_src"></td>
		</tr>
		<tr><td class="bold_cell">DC Server URL:</td>
			<td ContentEditable="true" class="long_field" id="asset_sdf_server_url"></td>
		</tr>
		<tr><td class="bold_cell">Build Server URL:</td>
			<td ContentEditable="true" class="long_field" id="asset_sdf_build_url"></td>
		</tr>
		<tr><td class="bold_cell">Index Name:</td>
			<td ContentEditable="true" class="long_field" id="asset_sdf_index_name"></td>
		</tr>
	</table>
	</div>
		<p/>
	</div>
	<div id="bottom_btns">
		<div id="publish_btn" onclick='publishAsset()'> Publish </div>
		<div id="save_btn" onclick='saveAsset()'> Save Draft </div>
		<div id="import_btn" onclick='notImplemented()'> Import </div>
		<div id="export_btn" onclick='notImplemented()' > Export </div> 
		</div>

	<div id="AssetSummary" >
		<div class="bold_medium">Adding following record to server?</div>
		<div id="sumary_aname" class="bold_medium">	</div>
		<div class="bold_medium">Details:</div>
		<textarea id="AssetSerialized"></textarea> 
		<div>
		<div id="yes_btn">Yes</div>
		<div id="cancel_btn" onclick="this.parentNode.parentNode.style.display = 'none'">Cancel</div>
		</div>
	</div>
	<div id="search_result_panel" >
		<div class="bold_medium">Search result</div>
		<textarea id="result_content"></textarea> 
		
		<div  onclick="this.parentNode.style.display = 'none'" id="ok_btn">Ok</div>
	</div>
	<div id="advanced_search_panel"><div style= "float:right" onclick="close_advanced_search()">X</div>
	Advanced search with user defined search query:<br/>
	<%
	if (backend == "DC"){
		out.println("<p><b> Examples of Search Query:</b><br/>");
		out.println("To Search by author,please enter author:name of the author<br/>");
		out.println("To Search by asset name,please enter id:name of the asset<br/>");
		out.println("To Search by asset id,please enter model_id:id of the author<br/>");
		out.println("To Search by description,please enter value:the text you want to search<br/>");
		out.println("To Search in all the fields above just enter the text you want to search<br/>");
	}
	%>
	<input id="advanced_query" type="text" size="50"></input>
	<input type="button" value="search" onclick="submit_query()"></input>
	</div><p><p>
<div id="moving_row"/></div>
<div id="saved_info"/></div>
<div id="published_info"/></div>
</div>

</div>

</body>
</html>
