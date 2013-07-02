function init()
{
    $("#products_resource").attr('selected', true);
    updateByResource();
    updateOCAPI();
    updateURL();
    changeFormat("table");
}

function createObjectTable(obj)
{
    if (typeof obj === 'object')
    {
        var result_html = "<table class='result'>";
        for (var field in obj)
        {
            if ((typeof obj[field]) != "function")
                result_html += "<tr><td>" + field + "</td><td>" + createObjectTable(obj[field]) + "</td></tr>";
        }
        result_html += "</table>"
    }
    else if (typeof obj == 'string' && ( endsWith(obj, "jpg") || endsWith(obj, "png") ))
    {
        result_html = "<img src=\"" + obj + "\">";
    }
    
    else
        result_html = "" + obj;
    return result_html;
}

function updateURL()
{
    //alert("udpateURL: "  + $("#OCAPI_method").val());
    var uri = $("#host").val() + "s/" + $("#site").val() + "/dw/shop/" + $("#version").val() +
                $("#OCAPI_method").val() + "?client_id=" + $("#client_id").val();
    
    if (uri.indexOf("({id}, ..., {id})") != -1)
    {
        uri = uri.replace("{id}, ..., {id}", $("#resource_id").val());
    }
    else if (uri.indexOf("{id}") != -1)
    {
        uri = uri.replace("{id}", $("#resource_id").val());
    }
    
    if (!$("#expand").is(':hidden') && $("#expand").val())
        uri +=  "&expand=" + $("#expand").val();
    
    $("#request_uri").val(uri);
}

function updateOCAPI()
{
    var selected_ocapi_text = $("#OCAPI_method :selected").html();
    if (selected_ocapi_text.indexOf("GET") !== -1)
    {
        $("#HTTP_method").html("GET");
        $("#body_data_div").hide();
    }
    else if (selected_ocapi_text.indexOf("POST") !== -1)
    {
        $("#HTTP_method").html("POST");
        $("#body_data_div").show();
    }
    else if (selected_ocapi_text.indexOf("PATCH") !== -1)
    {
        $("#HTTP_method").html("PATCH");
        $("#body_data_div").show();
    }
    
    updateURL();
}

/*$("#products_resource").attr('selected', true);
updateByResource();
updateURL();
changeFormat("table");
 */

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function updateByResource()
{
    var example_string = "not defined";
    var resource_id_string = "";
    
    // cleanup the API methods
    var elem = $("#OCAPI_method");
    elem.empty();
    
    
    if ($("#resource").val() == "account")
    {
        example_string = "Not applicable";
        
        elem.append($("<option/>").attr("value", "/account/login").text("POST: /account/login"));
        elem.append($("<option/>").attr("value", "/account/logout").text("POST: /account/logout"));
        elem.append($("<option/>").attr("value", "/account/register").text("POST: /account/register"));
        elem.append($("<option/>").attr("value", "/account/this").text("GET: /account/this"));
        elem.append($("<option/>").attr("value", "/account/this").text("PATCH: /account/this"));
        elem.append($("<option/>").attr("value", "/account/this/addresses").text("GET: /account/this/addresses"));
        
        $("#resource_id_span").hide();
        $("#HTTP_method").html("POST");
    }
    
    else if ($("#resource").val() == "basket")
    {
        example_string = "Not applicable";
        
        elem.append($("<option/>").attr("value", "/basket/this").text("GET: /basket/this"));
        elem.append($("<option/>").attr("value", "/basket/this").text("PATCH: /basket/this"));
        elem.append($("<option/>").attr("value", "/basket/this/add").text("POST: /basket/this/add"));
        elem.append($("<option/>").attr("value", "/account/this/checkout").text("GET: /account/this/checkout"));
        elem.append($("<option/>").attr("value", "/account/this/checkout/payment_methods").text("GET: /account/this/checkout/payment_methods"));
        elem.append($("<option/>").attr("value", "/account/this/checkout/set_billing_address").text("POST: /account/this/checkout/set_billing_address"));
        elem.append($("<option/>").attr("value", "/account/this/checkout/set_customer_info").text("POST: /account/this/checkout/set_customer_info"));
        elem.append($("<option/>").attr("value", "/account/this/checkout/set_payment_method").text("POST: /account/this/checkout/set_payment_method"));
        elem.append($("<option/>").attr("value", "/account/this/checkout/set_shipping_address").text("POST: /account/this/checkout/set_shipping_address"));
        elem.append($("<option/>").attr("value", "/account/this/checkout/set_shipping_method").text("POST: /account/this/checkout/set_shipping_method"));
        elem.append($("<option/>").attr("value", "/account/this/checkout/shipping_methods").text("GET: /account/this/checkout/shipping_methods"));
        elem.append($("<option/>").attr("value", "/account/this/checkout/submit").text("POST: /account/this/checkout/submit"));
        
        $("#resource_id_span").hide();
        $("#HTTP_method").html("GET");
        
    }
    else if ($("#resource").val() == "categories")
    {
        example_string = "IDs: root, womens, electronics, men";
        resource_id_string = "womens";
        
        elem.append($("<option/>").attr("value", "/categories/{id}").text("GET: /categories/{id}"));
        elem.append($("<option/>").attr("value", "/categories/({id}, ..., {id})").text("GET: /categories/({id}, ..., {id})"));
        
        $("#resource_id_span").show();
        $("#HTTP_method").html("GET");
    }
    else if ($("#resource").val() == "products")
    {
        example_string = "IDs: sony-ps3-bundle, apple-ipod-touch, 25592581";
        resource_id_string = "apple-ipod-touch";
        
        elem.append($("<option/>").attr("value", "/products/{id}").text("GET: /products/{id}"));
        elem.append($("<option/>").attr("value", "/products/({id}, ..., {id})").text("GET: /products/({id}, ..., {id})"));
        elem.append($("<option/>").attr("value", "/products/{id}/availability").text("GET: /products/{id}/availability"));
        elem.append($("<option/>").attr("value", "/products/{id}/bundled_products").text("GET: /products/{id}/bundled_products"));
        elem.append($("<option/>").attr("value", "/products/{id}/images").text("GET: /products/{id}/images"));
        elem.append($("<option/>").attr("value", "/products/{id}/links").text("GET: /products/{id}/links"));
        elem.append($("<option/>").attr("value", "/products/{id}/options").text("GET: /products/{id}/options"));
        elem.append($("<option/>").attr("value", "/products/{id}/prices").text("GET: /products/{id}/prices"));
        elem.append($("<option/>").attr("value", "/products/{id}/promotions").text("GET: /products/{id}/promotions"));
        elem.append($("<option/>").attr("value", "/products/{id}/set_products").text("GET: /products/{id}/set_products"));
        elem.append($("<option/>").attr("value", "/products/{id}/variations").text("GET: /products/{id}/variations"));
        
        $("#resource_id_span").show();
        $("#HTTP_method").html("GET");
    }
    else if ($("#resource").val() == "product_search")
    {
        example_string = "Not applicable";
        resource_id_string = "";
        
        elem.append($("<option/>").attr("value", "/product_search").text("GET: /product_search"));
        elem.append($("<option/>").attr("value", "/product_search/availability").text("GET: /product_search/availability"));
        elem.append($("<option/>").attr("value", "/product_search/images").text("GET: /product_search/images"));
        elem.append($("<option/>").attr("value", "/product_search/prices").text("GET: /product_search/prices"));
        elem.append($("<option/>").attr("value", "/product_search/variations").text("GET: /product_search/variations"));
        
        $("#resource_id_span").hide();
        $("#HTTP_method").html("GET");
    }
    else if ($("#resource").val() == "content")
    {
        example_string = "IDs: about-us, Why-leathershoes";
        resource_id_string = "about-us";
        
        elem.append($("<option/>").attr("value", "/content/{id}").text("GET: /content/{id}"));
        elem.append($("<option/>").attr("value", "/content/({id}, ..., {id})").text("GET: /content/({id}, ..., {id})"));
        
        $("#resource_id_span").show();
        $("#HTTP_method").html("GET");
    }
    else if ($("#resource").val() == "content_search")
    {
        example_string = "Not applicable";
        resource_id_string = "";
        
        elem.append($("<option/>").attr("value", "/content_search").text("GET: /content_search"));
        
        $("#resource_id_span").hide();
        $("#HTTP_method").html("GET");
    }
    
    else if ($("#resource").val() == "folders")
    {
        example_string = "IDs: \"about-us\", \"customer-service\", \"AboutShoes\"";
        resource_id_string = "customer-service";
        
        elem.append($("<option/>").attr("value", "/folders/{id}").text("GET: /folders/{id}"));
        elem.append($("<option/>").attr("value", "/folders/({id}, ..., {id})").text("GET: /folders/({id}, ..., {id})"));
        
        $("#resource_id_span").show();
        $("#HTTP_method").html("GET");
    }
    else if ($("#resource").val() == "promotions")
    {
        example_string = "IDs: \"about-us\", \"customer-service\", \"AboutShoes\"";
        resource_id_string = "customer-service";
        
        elem.append($("<option/>").attr("value", "/promotions").text("GET: /promotions"));
        elem.append($("<option/>").attr("value", "/promotions/").text("GET: /promotions/{id}"));
        elem.append($("<option/>").attr("value", "/promotions/").text("GET: /promotions/({id}, ..., {id})"));
    }
    
    // show or hide expand when resource is changed.
    if ($("#resource").val() != "products" && $("#resource").val() != "product_search" )
    {
        $("#expand_div").hide();
        //alert("sesame close!");
    }
    else
    {
        //alert("sesame open!");
        $("#expand_div").show();
    }
    
    $("#example_span").html(example_string);
    //alert("resource_id_string: " + resource_id_string);
    $("#resource_id").val(resource_id_string);
    //alert("#resource_id: " + $("#resource_id").val());
    updateOCAPI();
    updateURL();
}

function changeFormat(format)
{
    if (format == 'table')
    {
        $("#format_btn_table").addClass("tab_btn_selected").removeClass("tab_btn_unselected");
        $("#format_btn_json").addClass("tab_btn_unselected").removeClass("tab_btn_selected");
        $("#format_btn_sitegen").addClass("tab_btn_unselected").removeClass("tab_btn_selected");
        
        $("#resp_data_table_format").show();
        $("#resp_data_json_format").hide();
        $("#resp_data_sitegen_format").hide();
        
    }
    else if (format == 'json')
    {
        $("#format_btn_table").addClass("tab_btn_unselected").removeClass("tab_btn_selected");
        $("#format_btn_json").addClass("tab_btn_selected").removeClass("tab_btn_unselected");
        $("#format_btn_sitegen").addClass("tab_btn_unselected").removeClass("tab_btn_selected");
        
        $("#resp_data_table_format").hide();
        $("#resp_data_json_format").show();
        $("#resp_data_sitegen_format").hide();
        var height = $("#json_textarea").prop('scrollHeight')/13;
        $("#json_textarea").attr('rows', height>50? 50:height);
    }
    else if (format == 'sitegen')
    {
        $("#format_btn_table").addClass("tab_btn_unselected").removeClass("tab_btn_selected");
        $("#format_btn_json").addClass("tab_btn_unselected").removeClass("tab_btn_selected");
        $("#format_btn_sitegen").addClass("tab_btn_selected").removeClass("tab_btn_unselected");
        
        $("#resp_data_table_format").hide();
        $("#resp_data_json_format").hide();
        $("#resp_data_sitegen_format").show();
    }
}

