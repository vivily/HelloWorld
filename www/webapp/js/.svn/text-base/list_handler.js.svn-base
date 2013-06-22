var current_list = "PUBLISHED_LIST";

function refresh_record_list_table(list, list_type)
{
	var list_tbody = null;
	var isPublished = "true";
	if (list_type == "PUBLISHED_LIST")
		list_tbody = document.getElementById("all_list_tbody");
	else if(list_type == "PUBLISHED_LIST_BY_AUTHOR")
		list_tbody = document.getElementById("my_list_tbody");
	else if(list_type == "SAVED_LIST")
		{
		list_tbody = document.getElementById("save_list_tbody");
		isPublished = "false";
		}
	else if (list_type == "SEARCH_LIST")
		{
		list_tbody = document.getElementById("search_result_tbody");
		}
	if (list_tbody == null ) alert("list type not found!!" + list_type)
	if (window.console) console.log("record_list_table:");

	var old_len = list_tbody.rows.length;
	for (var i=0; i<old_len; i++)
		list_tbody.deleteRow(0);
	if (window.console) console.log(list.length);
	
	var new_len = list.length;
	var table_content = list_tbody.innerHTML;
	if (window.console) console.log("!!!!!!!!!" + table_content);
	for (var j = 0; j < new_len; j++)
		{
		var obj = list[j];
		if (j%2==0)
			table_content += "<tr style='background: #E5EECC'>";
		else
			table_content += "<tr>";
		table_content += "<td onclick=show_asset(\'" + obj._id + "\'," + obj.publish +",this)>" + obj._id + "</td>";
		table_content += "<td onclick=show_asset(\'" + obj._id + "\'," + obj.publish +",this)>" + obj.name + "</td>";
		table_content += "<td onclick=show_asset(\'" + obj._id + "\'," + obj.publish +",this)>" + obj.author + "</td>";
		table_content += "<td onclick=show_asset(\'" + obj._id + "\'," + obj.publish +",this)>" + obj.version + "</td>";
		var d = new Date(obj.timestamp);
		table_content += "<td >" + d + "</td>";
		table_content += "<td><img  value= 'Delete' class='rDelete' width=22 height=25 src='pics/trash.png' onclick=\"delete_record(\'" + obj._id + "\', "+ obj.publish +")\" /></td>";
		if (window.console) console.log("<td><img  value= 'Delete' class='rDelete' width=22 height=25 src='pics/trash.png' onclick=\"delete_record(\'" + obj._id + "\', "+ obj.publish +")\" /></td>");
		table_content += "</tr>";
		if (window.console) console.log("=======");
		}
	list_tbody.innerHTML = table_content;
}

function show_list(list_no)
{
	if (window.console) console.log("show_list called for list_no: " + list_no);
	var tab1 = document.getElementById("list_all");
	if (window.console) console.log(tab1);
	if (window.console) console.log(tab1.style);
	var tab2 = document.getElementById("list_mine");
	var tab3 = document.getElementById("list_saved");
	var tab4 = document.getElementById("list_search");
	
	var list_tbody1 = document.getElementById("all_list_tbody");
	var list_tbody2 = document.getElementById("my_list_tbody");
	var list_tbody3 = document.getElementById("save_list_tbody");
	var list_tbody4 = document.getElementById("search_result_tbody");
	
	tab1.style.background = "#e5eecc";
	tab2.style.background = "#e5eecc";
	tab3.style.background = "#e5eecc";
	tab4.style.background = "#e5eecc";
	list_tbody1.style.display = "none";
	list_tbody2.style.display = "none";
	list_tbody3.style.display = "none";
	if (list_tbody4)
	list_tbody4.style.display = "none";
	
	if (list_no == 1 ) // display all list
		{
		if (window.console) console.log("show all");
		tab1.style.background = "#abb299";
		list_tbody1.style.display = "table-row-group";
		current_list = "PUBLISHED_LIST";
		}
	else if (list_no == 2)
	{
		if (window.console) console.log("show my list");
		tab2.style.background = "#abb299";
		list_tbody2.style.display = "table-row-group";
		current_list = "PUBLISHED_LIST_BY_AUTHOR";
		}
	else if (list_no == 3)
	{
		if (window.console) console.log("show saved");
		tab3.style.background = "#abb299";
		list_tbody3.style.display = "table-row-group";	
		current_list = "SAVED_LIST";
		}
	else if (list_no == 4)
		{
		if (window.console) console.log("show searched result");
		tab4.style.background = "#abb299";
		list_tbody4.style.display = "table-row-group";	
		current_list = "SEARCH_LIST";
		}
	if (list_no != 4)
		refresh_asset_list();
}