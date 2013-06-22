
<jsp:useBean id="popup" scope="request" class="java.lang.String" />
<html>
<head>
    <title>Data Asset Catalog </title>
    <script src="js/ajax_client.js" ></script>
    <script src="js/jquery-1.6.2.js" ></script>
    <link rel="shortcut icon" href="igloo.jpeg" type="image/x-icon" />
    <link rel="stylesheet" type="text/css" href="css/login.css" />
    <script> var backend = "DC";</script>
    <script>var popup_msg = "<%=popup %>";  
    if (popup_msg) alert(popup_msg);
    </script>   
</head>
<body onload="moveTo(200,100); resizeTo(1200,800);" bgcolor=#E6E6E6>

  <h1>DATA ASSET CATALOG</h1>
  <P><P>
  <h3>The web portal to define and manage your data asset metadata!</h3>


<center>
<form name="login" id="loginform"  ACTION="authen" METHOD="POST">
<table id='login_table'>

<tr><td colspan="2"><center><h3>Login</h3></center></td></tr>

<tr><td align="right">User Name:</td><td>
<input class="tfield" name="username" id="username" type="text" ></td></tr>

<tr><td align="right">Password:</td><td>
<input class="tfield" name="password" id="password" type="password"></td></tr>

<tr><td colspan="2"><center>
<input class="button" type="button" value="Login" onclick="authenticate(document.getElementById('username').value, document.getElementById('password').value)" /></center></td>

<tr><td colspan="2"><center>
<input class="button" type="button" value="Register" 
onClick="addUser(document.getElementById('username').value, document.getElementById('password').value)"/></center></td>

</table>
</form>
<p>

<div id="intro">
This web tool provide a central place to manage the data asset records. 
A data asset record represents <div id="metadata_desc" class="inline_bold" onmouseover='showtip'>metadata </div> for a dataset. It contains metadata to describes the dataset. 
The actual <div id="metadata_desc" class="inline_bold" onmouseover='showtip'> dataset</div> is not considered part of the catalog record. 
</div>
<p><p>
<div class="intro">
<b>Proudly brought to you by M&M scrum team.</b>
</div>

</div>

</body>
</html>
