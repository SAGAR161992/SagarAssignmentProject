/* File Created: May 8, 2014 */

function callajaxRef(method, data, servicename, sucess, error, request) {
    var url = "";
    try {
        debugger;
        $.ajax({
            type: (request == undefined ? "POST" : request),
            url: servicename + method,
            data: data,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (req) {
                if (sucess && typeof (sucess) === "function") {
                    sucess(req);
                }
            },
            error: function (xhr, status, thrownError) {
                if (error && typeof (error) === "function") {
                    error(xhr);
                }
            }
        });
    } catch (e) { if (window.console) console.log(e); }
}

function callajaxRef_sync(method, data, servicename, sucess, error, request) {
    var url = "";
    try {
        debugger;
        $.ajax({
            type: (request == undefined ? "POST" : request),
            url: servicename + method,
            data: data,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            async: false,
            success: function (req) {
                if (sucess && typeof (sucess) === "function") {
                    sucess(req);
                }
            },
            error: function (xhr, status, thrownError) {
                if (error && typeof (error) === "function") {
                    error(xhr);
                }
            }
        });
    } catch (e) { if (window.console) console.log(e); }
}