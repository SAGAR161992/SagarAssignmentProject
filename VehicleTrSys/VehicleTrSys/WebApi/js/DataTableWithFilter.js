
function DataTableBind(GvcontrolId, SumColumnIndex, LblTotalShow) {
    //AddTHEAD('');
    var table = $(GvcontrolId).DataTable({
        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]]
    });
    $(LblTotalShow).html(table.column(SumColumnIndex).data().sum());
    table.on('search.dt', function () {
        $(LblTotalShow).html(table.column(SumColumnIndex, { "filter": "applied" }).data().sum());
    });
}


//function AddTHEAD(tableName) {
//    var table = document.getElementById('ContentPlaceHolder1_GvPolicy');
//    if (table != null) {
//        var head = document.createElement("THEAD");
//        head.style.display = "table-header-group";
//        head.appendChild(table.rows[0]);
//        table.insertBefore(head, table.childNodes[0]);
//    }
//}

