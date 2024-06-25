
$(function() {
    let dataTable;   

    const datatablesCategoryList = $(".datatables-category-list");
    

    if (datatablesCategoryList.length) {
        dataTable = datatablesCategoryList.DataTable({
            ajax: assetsPath + "json/ecommerce-category-list.json",
            columns: [
                { data: "" },
                { data: "id" },
                { data: "categories" },
                { data: "total_products" },
                { data: "total_earnings" },
                { data: "" }
            ],
            columnDefs: [
                {
                    className: "control",
                    searchable: false,
                    orderable: false,
                    responsivePriority: 1,
                    targets: 0,
                    render: function(e, t, a, o) {
                        return "";
                    }
                },
                {
                    targets: 1,
                    orderable: false,
                    searchable: false,
                    responsivePriority: 4,
                    checkboxes: true,
                    checkboxes: {
                        selectAllRender: '<input type="checkbox" class="form-check-input">'
                    },
                    render: function() {
                        return '<input type="checkbox" class="dt-checkboxes form-check-input">';
                    }
                },
                {
                    targets: 2,
                    responsivePriority: 2,
                    render: function(e, t, a, o) {
                        var s = a.categories,
                            r = a.category_detail,
                            n = "user.png"
                            l = a.id;
                        return '<div class="d-flex align-items-center"><div class="avatar-wrapper me-2 rounded-2 bg-label-secondary"><div class="avatar">' + (n ? '<img src="' + assetsPath + "img/" + n + '" alt="Product-' + l + '" class="rounded-2">' : '<span class="avatar-initial rounded-2 bg-label-' + ["success", "danger", "warning", "info", "dark", "primary", "secondary"][Math.floor(6 * Math.random())] + '">' + ((((n = (s = a.category_detail).match(/\b\w/g) || []).shift() || "") + (n.pop() || "")).toUpperCase()) + "</span>") + '</div></div><div class="d-flex flex-column justify-content-center"><span class="text-body text-wrap fw-medium">' + s + '</span><span class="text-muted text-truncate mb-0 d-none d-sm-block"><small>' + r + "</small></span></div></div>"
                    }
                },
                {
                    targets: 3,
                    responsivePriority: 3,
                    render: function(e, t, a, o) {
                        return '<div class="text-sm-end">' + a.total_products + "</div>"
                    }
                },
                {
                    targets: 4,
                    orderable: false,
                    render: function(e, t, a, o) {
                        return "<div class='h6 mb-0 text-sm-end'>" + a.total_earnings + "</div>"
                    }
                },
                {
                    targets: -1,
                    title: "Actions",
                    searchable: false,
                    orderable: false,
                    render: function(e, t, a, o) {
                        return '<div class="d-flex align-items-sm-center justify-content-sm-center"><button class="btn btn-sm btn-icon delete-record me-2"><i class="ti ti-trash"></i></button><button class="btn btn-sm btn-icon"><i class="ti ti-edit"></i></button></div>'
                    }
                }
            ],
            order: [2, "desc"],
            dom: '<"card-header d-flex flex-wrap pb-2"<f><"d-flex justify-content-center justify-content-md-end align-items-baseline"<"dt-action-buttons d-flex justify-content-center flex-md-row mb-3 mb-md-0 ps-1 ms-1 align-items-baseline"lB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
            lengthMenu: [7, 10, 20, 50, 70, 100],
            language: {
                sLengthMenu: "_MENU_",
                search: "",
                searchPlaceholder: "Search Category"
            },
            buttons: [
                {
                    text: '<i class="ti ti-plus ti-xs me-0 me-sm-2"></i><span class="d-none d-sm-inline-block">Add Category</span>',
                    className: "add-new btn btn-primary ms-2 waves-effect waves-light",
                    attr: {
                        "data-bs-toggle": "offcanvas",
                        "data-bs-target": "#offcanvasEcommerceCategoryList"
                    }
                }
            ],
            responsive: {
                details: {
                    display: $.fn.dataTable.Responsive.display.modal({
                        header: function(e) {
                            return "Details of " + e.data().categories
                        }
                    }),
                    type: "column",
                    renderer: function(e, t, a) {
                        a = $.map(a, function(e, t) {
                            return "" !== e.title ? '<tr data-dt-row="' + e.rowIndex + '" data-dt-column="' + e.columnIndex + '"><td> ' + e.title + ':</td> <td class="ps-0">' + e.data + "</td></tr>" : ""
                        }).join("");
                        return !!a && $('<table class="table"/><tbody />').append(a)
                    }
                }
            }
        });

        $(".dt-action-buttons").addClass("pt-0");
        $(".dataTables_filter").addClass("me-3 ps-0");

        $(".datatables-category-list tbody").on("click", ".delete-record", function() {
            dataTable.row($(this).parents("tr")).remove().draw();
        });

        setTimeout(() => {
            $(".dataTables_filter .form-control").removeClass("form-control-sm");
            $(".dataTables_length .form-select").removeClass("form-select-sm");
        }, 300);
    }

   
});
