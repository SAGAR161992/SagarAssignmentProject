//please Set Port no localhost:
var PortNo = '60874';

//StringBuilder like C#
function StringBuilder(value) {
    this.strings = new Array();
    this.append(value);
}

StringBuilder.prototype.append = function (value) {
    if (value) {
        this.strings.push(value);
    }
}

StringBuilder.prototype.clear = function () {
    this.strings.length = 0;
}

StringBuilder.prototype.toString = function () {
    return this.strings.join("");
}
//End StringBuilder like C#

function GetDataDataTable() {
    $('#loader').show();
    $("#tbl > tbody").empty();
    var serviceURL = 'http://localhost:' + PortNo + '/home/GetUserVehicleInfo/';
    $.ajax({
        type: "POST",
        url: serviceURL,
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessDatatable,
        failure: function (response) {
            alert(response);
        },
        error: function (response) {
            alert(response);
        }
    });
}

function OnSuccessDatatable(response) {
    debugger;
    $('#loader').hide();
    $("#tbl").DataTable(
        {
            bLengthChange: true,
            lengthMenu: [[5, 10, -1], [5, 10, "All"]],
            bFilter: true,
            bSort: true,
            bPaginate: true,
            data: response,
            columns: [
                { 'data': 'UserID' },
                { 'data': 'Name' },
                { 'data': 'MobileNo' },
                { 'data': 'Organization' },
                { 'data': 'Address' },
                { 'data': 'EmailAddress' },
                { 'data': 'Location' },
                { 'data': 'VehicleNo' },
                { 'data': 'VehicleType' },
                { 'data': 'ChassisNo' },
                { 'data': 'EngineNo' },
                { 'data': 'ManufacturerYear' },
                { 'data': 'LoadCarryingCapacity' },
                { 'data': 'MakeOfVehicle' },
                { 'data': 'ModelNo' },
                { 'data': 'BodyType' },
                { 'data': 'OrganizationName' },
                { 'data': 'DeviceID' }
            ]
        });
};

//Normal Table Bind
//function GetData() {
//    $("#tbl > tbody").empty();
//    var serviceURL = 'http://localhost:' + PortNo + '/home/GetUserVehicleInfo/';
//    $.ajax({
//        type: "POST",
//        url: serviceURL,
//        data: param = "",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: successFunc,
//        error: errorFunc
//    });
//}

//function successFunc(data) {
//    debugger;
//    if (data.length > 0) {
//        $('#loader').show();
//        var tr;
//        for (var i = 0; i < data.length; i++) {
//            tr = $('<tr/>');
//            tr.append("<td>" + data[i].UserID + "</td>");
//            tr.append("<td>" + data[i].Name + "</td>");
//            tr.append("<td>" + data[i].MobileNo + "</td>");
//            tr.append("<td>" + data[i].Organization + "</td>");
//            tr.append("<td>" + data[i].Address + "</td>");


//            tr.append("<td>" + data[i].EmailAddress + "</td>");
//            tr.append("<td>" + data[i].Location + "</td>");

//            tr.append("<td>" + data[i].VehicleNo + "</td>");
//            tr.append("<td>" + data[i].VehicleType + "</td>");

//            tr.append("<td>" + data[i].ChassisNo + "</td>");
//            tr.append("<td>" + data[i].EngineNo + "</td>");

//            tr.append("<td>" + data[i].ManufacturerYear + "</td>");
//            tr.append("<td>" + data[i].LoadCarryingCapacity + "</td>");

//            tr.append("<td>" + data[i].MakeOfVehicle + "</td>");
//            tr.append("<td>" + data[i].ModelNo + "</td>");

//            tr.append("<td>" + data[i].BodyType + "</td>");
//            tr.append("<td>" + data[i].OrganizationName + "</td>");

//            tr.append("<td>" + data[i].DeviceID + "</td>");
//            $('#tbl').append(tr);
//            $('#loader').hide();
//        }
//    } else { $('#loader').hide(); }
//}
// End Normal table Bind

function GetCheckVNo() {
    debugger;
    if ($('#txtVehicleNo').val() != '') {
        var serviceURL = 'http://localhost:' + PortNo + '/home/GetVehicleNoCheck/';
        var data = "{'VehicleNo':'" + $('#txtVehicleNo').val() + "'}";
        $.ajax({
            type: "POST",
            url: serviceURL,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: successFuncCheckVNO,
            error: errorFunc
        });
    }
}

function successFuncCheckVNO(data) {
    try {
        debugger;
        var Result = data.RETURNCODE;
        if (Result != 0) {
            alert("Vehicle No already exists..");
            $('#txtVehicleNo').val("");
        }
    }
    catch (e) { alert(e); }
}

$(document).ready(function () {
    $("#txtVehicleNo").blur(function () {
        if ($('#txtVehicleNo').val() != '')
            GetCheckVNo($('#txtVehicleNo').val());
    });

    $('#InputDivID').find('input:text').val('');

    GetDataDataTable();

    (function ($) {
        $.fn.inputFilter = function (inputFilter) {
            return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                } else {
                    this.value = "";
                }
            });
        };
    }(jQuery));

    $("#txtMobileNo").inputFilter(function (value) {
        return /^-?\d*$/.test(value);
        //  return /^-?\d*[.,]?\d{0,2}$/.test(value);
    });
    $("#txtDeviceID").inputFilter(function (value) {
        return /^-?\d*$/.test(value);
        //  return /^-?\d*[.,]?\d{0,2}$/.test(value);
    });

    $("#txtManufacturerYear").inputFilter(function (value) {
        return /^-?\d*$/.test(value);
        //  return /^-?\d*[.,]?\d{0,2}$/.test(value);
    });

    $("#txtLoadCarryingCapacity").inputFilter(function (value) {
        return /^-?\d*$/.test(value);
        //  return /^-?\d*[.,]?\d{0,2}$/.test(value);
    });



    $(document).on("click", "#tbl tbody tr", function () {
        debugger;
        $("#txtVehicleNo").prop('disabled', true);
        $("#btnSubmit").val("Update");

        $("#hdnUserID").val($(this).closest("tr").find('td:eq(0)').text());
        $("#txtName").val($(this).closest("tr").find('td:eq(1)').text());
        $("#txtMobileNo").val($(this).closest("tr").find('td:eq(2)').text());
        $("#txtOrganization").val($(this).closest("tr").find('td:eq(3)').text());

        $("#txtAddress").val($(this).closest("tr").find('td:eq(4)').text());
        $("#txtEmailAddress").val($(this).closest("tr").find('td:eq(5)').text());
        $("#txtLocation").val($(this).closest("tr").find('td:eq(6)').text());

        $("#txtVehicleNo").val($(this).closest("tr").find('td:eq(7)').text());

        $("#txtVehicleType").val($(this).closest("tr").find('td:eq(8)').text());
        $("#txtChassisNo").val($(this).closest("tr").find('td:eq(9)').text());
        $("#txtEngineNo").val($(this).closest("tr").find('td:eq(10)').text());
        $("#txtManufacturerYear").val($(this).closest("tr").find('td:eq(11)').text());

        $("#txtLoadCarryingCapacity").val($(this).closest("tr").find('td:eq(12)').text());
        $("#txtMakeOfVehicle").val($(this).closest("tr").find('td:eq(13)').text());
        $("#txtModelNo").val($(this).closest("tr").find('td:eq(14)').text());
        $("#txtBodyType").val($(this).closest("tr").find('td:eq(15)').text());

        $("#txtOrganizationName").val($(this).closest("tr").find('td:eq(16)').text());
        $("#txtDeviceID").val($(this).closest("tr").find('td:eq(17)').text());
    });


    $('#btnClear').click(function (e) {
        $("#btnSubmit").val("Submit");
        $('#InputDivID').find('input:text').val('');
        $("#txtVehicleNo").prop('disabled', false);
    });

    $('#btnSubmit').click(function (e) {
        debugger;
        var valid = true;
        $('input[required]').each(function (i, el) {
            if (valid && $(el).val() == '') valid = false;
        })


        if (valid) {
            if ($("#btnSubmit").val() == 'Submit') {
                ActionData('I');
            } else {
                ActionData('U');
            }
            $('#InputDivID').find('input:text').val('');
            $("#btnSubmit").val("Submit");

        }
    });
});

function ActionData(ActionModde) {
    try {
        var sb = new StringBuilder();
        sb.append("<XMLElement>");
        sb.append("<Action>" + ActionModde + "</Action>");
        sb.append("<Name>" + $("#txtName").val() + "</Name>");
        sb.append("<UserID>" + $("#hdnUserID").val() + "</UserID>");
        sb.append("<Name>" + $("#txtName").val() + "</Name>");
        sb.append("<MobileNo>" + $("#txtMobileNo").val() + "</MobileNo>");
        sb.append("<Organization>" + $("#txtOrganization").val() + "</Organization>");
        sb.append("<Address>" + $("#txtAddress").val() + "</Address>");
        sb.append("<EmailAddress>" + $("#txtEmailAddress").val() + "</EmailAddress>");
        sb.append("<Location>" + $("#txtLocation").val() + "</Location>");
        sb.append("<VehicleNo>" + $("#txtVehicleNo").val() + "</VehicleNo>");
        sb.append("<VehicleType>" + $("#txtVehicleType").val() + "</VehicleType>");
        sb.append("<ChassisNo>" + $("#txtChassisNo").val() + "</ChassisNo>");

        sb.append("<EngineNo>" + $("#txtEngineNo").val() + "</EngineNo>");
        sb.append("<ManufacturerYear>" + $("#txtManufacturerYear").val() + "</ManufacturerYear>");
        sb.append("<LoadCarryingCapacity>" + $("#txtLoadCarryingCapacity").val() + "</LoadCarryingCapacity>");
        sb.append("<MakeOfVehicle>" + $("#txtMakeOfVehicle").val() + "</MakeOfVehicle>");
        sb.append("<ModelNo>" + $("#txtModelNo").val() + "</ModelNo>");
        sb.append("<BodyType>" + $("#txtBodyType").val() + "</BodyType>");
        sb.append("<OrganizationName>" + $("#txtOrganizationName").val() + "</OrganizationName>");
        sb.append("<DeviceID>" + $("#txtDeviceID").val() + "</DeviceID>");
        sb.append("</XMLElement>");

        var serviceURL = 'http://localhost:' + PortNo + '/home/ActionUserVehicleUserVehicleInfo/';
        var Details = "{'Details': '" + sb.toString() + "'}";
        $.ajax({
            type: "POST",
            url: serviceURL,
            data: Details,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: successFuncAction,
            error: errorFunc
        });
    }
    catch (e) { alert(e); }
}

function successFuncAction(data) {
    try {
        debugger;
        var Result = data.RETURNCODE;
        if (Result == 1) {
            alert("Data Insert Successfully..");
        } else {
            alert("Data Update Successfully..");
        }
        window.location.reload();
        //GetDataDataTable();
        $('#btnClear').click();
    }
    catch (e) { alert(e); }
}

function errorFunc() {
    alert('error');
}

