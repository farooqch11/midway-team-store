// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require cable
//= require shopify_app
//= require flash_messages
//= require selectize
//= require libs/handlebars.min
//= require libs/jquery.dataTables.min
//= require libs/jquery.dataTables.bootstrap4.min
//= require libs/fabric.min
//= require libs/colorpicker.min
//= require_self


$(document).on('turbolinks:load', () => {
    const AppBridge = window['app-bridge'];
    const Toast = AppBridge.actions.Toast;

    const categoryProducTemplate = Handlebars.compile($("#categoryProductTemplate").html());
    const productCategoryTemplate = Handlebars.compile($("#productCategoryTemplate").html());
    const productStoreTemplate = Handlebars.compile($("#productStoreTemplate").html());



    function showToast(text) {
        let toastOptions = {
            message: text,
            duration: 3000,
        };
        let toastNotice = Toast.create(app, toastOptions);
        toastNotice.dispatch(Toast.Action.SHOW);
    }
    console.log($);

    const xs = {
        sendRequest: function (url, type, data, formData = false) {
            const _t = this;
            return new Promise((res, rej) => {
                let options = {
                    url: url,
                    data: data,
                    type: type,
                    success: function (data) {
                        res(data);

                    },
                    error: function (error) {
                        rej(error);
                    }
                };
                if (formData) {
                    options.processData = false;
                    options.contentType = false;
                    options.enctype = 'multipart/form-data';
                }
                $.ajax(options);
            });
        }
    };

    // initializing bootstrap tooltips
    $('[data-toggle="tooltip"]').tooltip();

    $("[data-refresh-products]").on("click", function () {
        const btn = $(this).attr('disabled', 'disabled').addClass('btn-disabled');
        showToast('Updating products database');

        $.get('/admin/refresh_products', {}).done(function (e) {
            btn.removeAttr('disabled').removeClass('btn-disabled');
            // showToast('Products Database Updated');
        });
    });
    $("[data-refresh-custom-products]").on("click", function () {
        const btn = $(this).attr('disabled', 'disabled').addClass('btn-disabled');
        showToast('Updating products database');

        $.get('/admin/refresh_custom_products', {}).done(function (e) {
            btn.removeAttr('disabled').removeClass('btn-disabled');
            // showToast('Products Database Updated');
        });
    });


    // image previews
    function readImageUrl(input, fn) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                fn(e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }


    const SELECTORS = {
        CHECK: $("[data-admin-product-select]"),
        ALL_CHECK: $("[data-admin-product-select-all]"),
        SELECT_ACTIONS: $("#selected-product-actions"),
        SELECTED_STATUS: $("[data-selected-products-status]"),
        BULK_PUBLISH: $("[data-bulk-publish]"),
        BULK_UNPUBLISH: $("[data-bulk-unpublish]"),
        PRODUCT_DELETE: $("[data-product-delete]"),
        BULK_DELETE: $("[data-bulk-delete]")
    };
    SELECTORS.SELECT_ACTIONS.hide();

    function setSelectedProductActions() {
        let count = 0;
        $(SELECTORS.CHECK).each(function () {
            if ($(this).is(":checked")) {
                count += 1;
            }
        })
        console.log(count);

        if (count > 0) {
            SELECTORS.SELECT_ACTIONS.show();
        } else {
            SELECTORS.SELECT_ACTIONS.hide();
        }

        SELECTORS.SELECTED_STATUS.text(`${count} Products Selected`);
    };

    function getSelectedProductsIDS() {
        ids = [];
        $(SELECTORS.CHECK).each(function () {
            if ($(this).is(":checked")) {
                ids.push($(this).val());
            }
        })
        return {
            ids
        };
    }
    $(SELECTORS.CHECK).on("change", function () {
        setSelectedProductActions();
        console.log("set the actions");
    });
    $(SELECTORS.ALL_CHECK).on("change", function () {
        $(SELECTORS.CHECK).prop("checked", $(this).prop("checked"));
        setSelectedProductActions();
    });

    function setPublishedButton(product) {
        const btn = $(`[data-toggle-publish=${product.id}]`);
        if (product.published) {
            btn.removeClass("btn-danger").addClass('btn-success').attr('data-original-title', "Un-Publish");
        } else {
            btn.removeClass("btn-success").addClass('btn-danger').attr('data-original-title', "Publish");
        }
    }
    $(SELECTORS.BULK_PUBLISH).on("click", function () {
        xs.sendRequest("/admin/publish_bulk", "POST", getSelectedProductsIDS()).then((data) => {
            // console.log(data);
            data.forEach(product => {
                setPublishedButton(product);
            });
            showToast("Products published");
        });
    });
    $(SELECTORS.BULK_UNPUBLISH).on("click", function () {
        xs.sendRequest("/admin/unpublish_bulk", "POST", getSelectedProductsIDS()).then((data) => {
            // console.log(data);
            data.forEach(product => {
                setPublishedButton(product);
            });
            showToast("Products unpublished");
        });
    });
    $(SELECTORS.PRODUCT_DELETE).on("click", function () {
        const id = $(this).attr('data-product-delete'),
            btn = $(this);
        xs.sendRequest("/admin/product_delete", "POST", {
            id
        }).then((data) => {
            // console.log(data);
            if (data.status == 200) {
                btn.closest("tr").remove();
                showToast("Product deleted");
            }
        });
    });
    $(SELECTORS.BULK_DELETE).on("click", function () {
        const ids = getSelectedProductsIDS();
        xs.sendRequest("/admin/product_bulk_delete", "POST", ids).then((data) => {
            // console.log(data);
            if (data.status == 200) {
                ids.ids.forEach(id => {
                    $(`[data-product-row=${id}]`).remove();
                })
                setSelectedProductActions();
                showToast("Products deleted");
            }
        });
    });


    // product page category add/remove code
    $(".fetch-categories-add-all").each(function () {
        let url = $(this).attr('data-url'),
            addUrl = $(this).attr('data-add-url');
        const options = {
            valueField: "id",
            labelField: "title",
            searchField: 'title',
            placeholder: "Start typing category name...",
            loadThrottle: 100,
            create: false,
            render: {
                option: function (item, escape) {
                    return `<div class='xs-search-item'>
                    <div class='xs-search-item-image'><img src='${item.image_url}' /></div>
                    <div class='xs-search-item-title'>${item.title}</div>
                    </div>`;
                }
            },
            load: function (query, callback) {
                if (!query.length) return callback();
                $.ajax({
                    url: url + encodeURIComponent(query),
                    type: 'GET',
                    error: function () {
                        callback();
                    },
                    success: function (res) {
                        callback(res.categories);
                    }
                })
            },
            onChange: function (value) {
                showToast("Adding Products to category. Please wait..");
                $.ajax({
                    url: addUrl + encodeURIComponent(value),
                    type: 'POST',
                    data: getSelectedProductsIDS(),
                    error: function () {
                        callback();
                    },
                    success: function (res) {
                        showToast("Product added to category");
                        res.forEach(product => {
                            renderProductInfo(product);
                        })
                        // console.log(res);
                    }
                })
            }
        };

        let $select = $(this).selectize(options);
    });
    $(".fetch-categories-remove-all").each(function () {
        let url = $(this).attr('data-url'),
            addUrl = $(this).attr('data-add-url');
        const options = {
            valueField: "id",
            labelField: "title",
            searchField: 'title',
            placeholder: "Start typing category name...",
            loadThrottle: 100,
            create: false,
            render: {
                option: function (item, escape) {
                    return `<div class='xs-search-item'>
                    <div class='xs-search-item-image'><img src='${item.image_url}' /></div>
                    <div class='xs-search-item-title'>${item.title}</div>
                    </div>`;
                }
            },
            load: function (query, callback) {
                if (!query.length) return callback();
                $.ajax({
                    url: url + encodeURIComponent(query),
                    type: 'GET',
                    error: function () {
                        callback();
                    },
                    success: function (res) {
                        callback(res.categories);
                    }
                })
            },
            onChange: function (value) {
                showToast("Removing Products from category. Please wait..");
                $.ajax({
                    url: addUrl + encodeURIComponent(value),
                    type: 'POST',
                    data: getSelectedProductsIDS(),
                    error: function () {
                        callback();
                    },
                    success: function (res) {
                        showToast("Products removed from category");
                        res.forEach(product => {
                            renderProductInfo(product);
                        })
                    }
                })
            }
        };

        let $select = $(this).selectize(options);
    });

    $(".xs-image-field input[type=file]").on("change", function () {
        const v = $(this).val(),
            preview = $(this).siblings(".xs-image-preview").html("");
        if (v != "") {
            readImageUrl($(this)[0], function (url) {
                $("<img />").attr('src', url).appendTo(preview);
            })
        }
    });

    $(".fetch-products-select").each(function () {
        let url = $(this).attr('data-url'),
            addUrl = $(this).attr('data-add-url');
        const options = {
            valueField: "id",
            labelField: "title",
            searchField: 'title',
            placeholder: "Start typing product name...",
            loadThrottle: 100,
            create: false,
            render: {
                option: function (item, escape) {
                    return `<div class='xs-search-item'>
                    <div class='xs-search-item-image'><img src='${item.image_url}' /></div>
                    <div class='xs-search-item-title'>${item.title}</div>
                    </div>`;
                }
            },
            load: function (query, callback) {
                if (!query.length) return callback();
                $.ajax({
                    url: url + encodeURIComponent(query),
                    type: 'GET',
                    error: function () {
                        callback();
                    },
                    success: function (res) {
                        callback(res.products);
                    }
                })
            },
            onChange: function (value) {
                $.ajax({
                    url: addUrl + encodeURIComponent(value),
                    type: 'GET',
                    error: function () {
                        callback();
                    },
                    success: function (res) {
                        showToast("Product added");
                        renderCategoryInfo(res);
                    }
                })
            }
        };

        let $select = $(this).selectize(options);
    });
    $("[data-remove-product-from-category]").on('click', function () {
        let product = $(this).closest("[data-category-product]");
        removeProductFromCategory(product);
    })

    function removeProductFromCategory(product) {
        let id = $(product).attr('data-category-product'),
            cat_id = $(product).closest("[data-category-listing]").attr('data-category-listing');
        $.ajax({
            url: "/admin/remove_product_from_cat/" + cat_id + "/" + id,
            type: 'GET',
            error: function () {},
            success: function (res) {
                showToast("Product removed");
                renderCategoryInfo(res);
            }
        })
    }

    function renderCategoryInfo(data) {
        console.log(data);
        const id = data.id;

        $(`[data-category-products-count=${id}]`).text(data.products_count);

        // filter out which isn't in category
        const listing = $(`[data-category-listing=${id}]`);
        listing.find("[data-category-product]").each(function () {
            let $this = $(this),
                pid = $this.attr('data-category-product');

            let found = false;
            data.products.forEach(function (product) {
                if (product.id == pid) {
                    found = true;
                }
            });

            if (!found) {
                $this.fadeOut(function () {
                    $this.remove();
                });
            }
        });

        // adding new items coming from json
        data.products.forEach(function (product) {
            if (listing.find(`[data-category-product=${product.id}]`).length < 1) {
                let el = categoryProducTemplate(product);
                $(el).appendTo(listing);
                $(el).find("[data-remove-product-from-category]").on('click', function () {
                    let pr = $(this).closest("[data-category-product]");
                    removeProductFromCategory(pr);
                })
            }
        });
    }


    // product page category add/remove code
    $(".fetch-categories-select").each(function () {
        let url = $(this).attr('data-url'),
            addUrl = $(this).attr('data-add-url');
        const options = {
            valueField: "id",
            labelField: "title",
            searchField: 'title',
            placeholder: "Start typing category name...",
            loadThrottle: 100,
            create: false,
            render: {
                option: function (item, escape) {
                    return `<div class='xs-search-item'>
                    <div class='xs-search-item-image'><img src='${item.image_url}' /></div>
                    <div class='xs-search-item-title'>${item.title}</div>
                    </div>`;
                }
            },
            load: function (query, callback) {
                if (!query.length) return callback();
                $.ajax({
                    url: url + encodeURIComponent(query),
                    type: 'GET',
                    error: function () {
                        callback();
                    },
                    success: function (res) {
                        callback(res.categories);
                    }
                })
            },
            onChange: function (value) {
                $.ajax({
                    url: addUrl + encodeURIComponent(value),
                    type: 'GET',
                    error: function () {
                        callback();
                    },
                    success: function (res) {
                        showToast("Product added to category");
                        renderProductInfo(res);
                        console.log(res);
                    }
                })
            }
        };

        let $select = $(this).selectize(options);
    });
    // product page category add/remove code
    $(".fetch-stores-select").each(function () {
        let url = $(this).attr('data-url'),
            addUrl = $(this).attr('data-add-url');
        const options = {
            valueField: "id",
            labelField: "title",
            searchField: 'title',
            placeholder: "Start typing store name...",
            loadThrottle: 100,
            create: false,
            render: {
                option: function (item, escape) {
                    return `<div class='xs-search-item'>
                    <div class='xs-search-item-title'>${item.title}</div>
                    </div>`;
                }
            },
            load: function (query, callback) {
                if (!query.length) return callback();
                $.ajax({
                    url: url + encodeURIComponent(query),
                    type: 'GET',
                    error: function () {
                        callback();
                    },
                    success: function (res) {
                        callback(res.stores);
                    }
                })
            },
            onChange: function (value) {
                $.ajax({
                    url: addUrl + encodeURIComponent(value),
                    type: 'GET',
                    error: function () {
                        callback();
                    },
                    success: function (res) {
                        showToast("Product added to Store");
                        renderProductStoreInfo(res);
                        console.log(res);
                    }
                })
            }
        };

        let $select = $(this).selectize(options);
    });

    $("[data-remove-category-from-product]").on('click', function () {
        let category = $(this).closest("[data-product-category]");
        removeCategoryFromProduct(category);
    })

    $("[data-remove-store-from-product]").on('click', function () {
        let category = $(this).closest("[data-product-store]");
        removeStoreFromProduct(category);
    })


    function removeCategoryFromProduct(category) {
        let id = $(category).attr('data-product-category'),
            product_id = $(category).closest("[data-product-categories]").attr('data-product-categories');
        $.ajax({
            url: "/admin/remove_cat_from_product/" + product_id + "/" + id,
            type: 'GET',
            error: function () {},
            success: function (res) {
                showToast("Category removed");
                renderProductInfo(res);
            }
        })
    }

    function removeStoreFromProduct(store) {
        let id = $(store).attr('data-product-store'),
            product_id = $(store).closest("[data-product-stores]").attr('data-product-stores');
        $.ajax({
            url: "/admin/remove_store_from_product/" + product_id + "/" + id,
            type: 'GET',
            error: function () {},
            success: function (res) {
                showToast("Store removed");
                renderProductStoreInfo(res);
            }
        })
    }

    function renderProductInfo(data) {
        console.log(data);
        const id = data.id;

        $(`[data-product-categories-count=${id}]`).text(data.categories_count);

        // filter out which isn't in category
        const listing = $(`[data-product-categories=${id}]`);
        listing.find("[data-product-category]").each(function () {
            let $this = $(this),
                cid = $this.attr('data-product-category');

            let found = false;
            data.categories.forEach(function (category) {
                if (category.id == cid) {
                    found = true;
                }
            });

            if (!found) {
                $this.fadeOut(function () {
                    $this.remove();
                });
            }
        });

        // adding new items coming from json
        data.categories.forEach(function (category) {
            if (listing.find(`[data-product-category=${category.id}]`).length < 1) {
                let el = productCategoryTemplate(category);
                $(el).appendTo(listing);
                $(el).find("[data-remove-category-from-product]").on('click', function () {
                    let pr = $(this).closest("[data-product-category]");
                    removeCategoryFromProduct(pr);
                })
            }
        });
    }

    function renderProductStoreInfo(data) {
        console.log(data);
        const id = data.id;

        $(`[data-product-stores-count=${id}]`).text(data.stores_count);

        // filter out which isn't in category
        const listing = $(`[data-product-stores=${id}]`);
        listing.find("[data-product-store]").each(function () {
            let $this = $(this),
                cid = $this.attr('data-product-store');

            let found = false;
            data.stores.forEach(function (store) {
                if (store.id == cid) {
                    found = true;
                }
            });

            if (!found) {
                $this.fadeOut(function () {
                    $this.remove();
                });
            }
        });

        // adding new items coming from json
        data.stores.forEach(function (store) {
            if (listing.find(`[data-product-store=${store.id}]`).length < 1) {
                let el = productStoreTemplate(store);
                $(el).appendTo(listing);
                console.log($(el).find("[data-remove-store-from-product]"));
                $(el).find("[data-remove-store-from-product]").on('click', function () {
                    console.log(el);
                    let pr = $(this).closest("[data-product-store]");
                    removeStoreFromProduct(pr);
                })
            }
        });
    }

    // load datatable
    $('.xs-datatable').DataTable({
        "pageLength": 60,
        "oLanguage": {

            "sSearch": "Enter title or tags to search"

        }
    }).on("draw.dt", function () {
        console.log("table ready");
        // product publish unpublish events
        


    });
    $("[data-toggle-publish]").on("click", function () {
        const $this = $(this),
            product_id = $this.attr('data-toggle-publish');

        console.log("toggling");
        $.ajax({
            type: "POST",
            url: "/admin/toggle_publish_product/" + product_id,
            success: function (res) {
                if (res.published) {
                    showToast("Product published.");
                    $this.removeClass('btn-success').addClass('btn-danger').attr('data-original-title', "Un-Publish");
                } else {
                    showToast("Product unpublished.");
                    $this.addClass('btn-success').removeClass('btn-danger').attr('data-original-title', "Publish");
                }
            }
        })
    });
    
    const canvas = new fabric.Canvas('imageParamsCanvas', {
        preserveObjectStacking: true,
    });
    $("#canvasDrawModal").on("shown.bs.modal", function (e) {
        // console.log(e);
        const btn = $(e.relatedTarget);
        if (btn.length < 1) {
            return;
        }
        const id = btn.attr('data-product-id');
        const modal = $(e.target);

        // initialize fabric
        canvas.clear();

        let imgEl = document.getElementById('product-image-' + id);
        let imgWidth = $(imgEl).prop("naturalWidth"),
            imgHeight = $(imgEl).prop("naturalHeight");

        let logoInfoStr = $(imgEl).attr('data-logo-params'),
            logoBoxHeight = 50,
            logoBoxWidth = 90,
            logoBoxX = 50,
            logoBoxY = 50;

        if (logoInfoStr != "null") {
            let logoInfoJSON = JSON.parse(logoInfoStr);
            // console.log(logoInfoJSON);
            logoBoxHeight = logoInfoJSON.height;
            logoBoxWidth = logoInfoJSON.width;
            logoBoxX = logoInfoJSON.pos_x;
            logoBoxY = logoInfoJSON.pos_y;
        }

        let drawHeight = 600.0,
            ratio = parseFloat(imgHeight) / parseFloat(drawHeight),
            drawWidth = parseFloat(imgWidth) / ratio;

        canvas.setDimensions({
            width: drawWidth,
            height: drawHeight
        });

        let ProductImage = new fabric.Image(imgEl, {
            left: 0,
            top: 0,
            angle: 0,
            opacity: 1,
            scaleX: drawWidth / imgWidth,
            scaleY: drawHeight / imgHeight
        });
        ProductImage.setControlsVisibility({
            bl: false,
            br: false,
            mb: false,
            ml: false,
            mr: false,
            mt: false,
            tl: false,
            mtr: false
        });
        ProductImage.lockMovementX = true;
        ProductImage.lockMovementY = true;
        canvas.add(ProductImage);

        // logo drag box
        let logoBox = new fabric.Rect({
            top: logoBoxY,
            left: logoBoxX,
            width: logoBoxWidth,
            height: logoBoxHeight,
            fill: 'red'
        });

        logoBox.setControlsVisibility({
            bl: true,
            br: true,
            mb: true,
            ml: true,
            mr: true,
            mt: true,
            tl: true,
            mtr: false
        });
        logoBox.on("modified", function () {
            updateLogoBoxInfo(logoBox);
        });
        logoBox.on("moving", function () {
            updateLogoBoxInfo(logoBox);
        });
        logoBox.on("scaling", function () {
            updateLogoBoxInfo(logoBox);
        });
        canvas.add(logoBox);
        canvas.setActiveObject(logoBox);
        modal.modal('handleUpdate');

        $("#testBtn").off("click").on('click', function () {

        });
        $("#saveLogoParams").off("click").on('click', function () {
            $.ajax({
                url: "/admin/save_logo_params/" + id,
                type: 'POST',
                data: {
                    info: {
                        pos_y: logoBox.top,
                        pos_x: logoBox.left,
                        width: logoBox.getScaledWidth(),
                        height: logoBox.getScaledHeight()
                    }
                },
                error: function () {},
                success: function (res) {
                    showToast("Product info saved");
                    // renderProductInfo(res);
                    console.log(res);
                    $(imgEl).attr('data-logo-params', JSON.stringify(res.logo_params));

                    $("[data-logo-params-status=" + res.logo_params.product_id + "]").text("Defined").removeClass("label-danger").addClass('label-success');
                    modal.modal("hide");
                }
            })
        });
    });

    function updateLogoBoxInfo(logoBox) {
        let info_obj = {
            pos_y: logoBox.top,
            pos_x: logoBox.left,
            width: logoBox.getScaledWidth(),
            height: logoBox.getScaledHeight()
        };

        $("[data-logo-pos-x]").text(info_obj.pos_x);
        $("[data-logo-pos-y]").text(info_obj.pos_y);
        $("[data-logo-width]").text(info_obj.width);
        $("[data-logo-height]").text(info_obj.height);

    }


    // initializing color picker for each input
    $("[data-xs-color-picker]").each(function () {
        let $this = $(this),
            input = $this.children("input").first();
        const pickr = Pickr.create({
            el: input[0],
            theme: 'nano', // or 'monolith', or 'nano'

            useAsButton: true,
            swatches: [
                'rgba(244, 67, 54, 1)',
                'rgba(233, 30, 99, 0.95)',
                'rgba(156, 39, 176, 0.9)',
                'rgba(103, 58, 183, 0.85)',
                'rgba(63, 81, 181, 0.8)',
                'rgba(33, 150, 243, 0.75)',
                'rgba(3, 169, 244, 0.7)',
                'rgba(0, 188, 212, 0.7)',
                'rgba(0, 150, 136, 0.75)',
                'rgba(76, 175, 80, 0.8)',
                'rgba(139, 195, 74, 0.85)',
                'rgba(205, 220, 57, 0.9)',
                'rgba(255, 235, 59, 0.95)',
                'rgba(255, 193, 7, 1)'
            ],

            components: {

                // Main components
                preview: true,
                opacity: false,
                hue: true,

                // Input / output Options
                interaction: {
                    hex: true,
                    rgba: false,
                    hsla: false,
                    hsva: false,
                    cmyk: false,
                    input: true,
                    clear: false,
                    save: true
                }
            }
        }).on('init', pickr => {
            let c = pickr.getSelectedColor().toHEXA().toString(0);
            c = input.val();
            if (c == "") {
                c = "#000";
            }
            input.val(c);
            pickr.setColor(c);
        }).on('save', color => {
            let c = color.toHEXA().toString(0);
            input.val(c).css("background", c);
            pickr.hide();
        });
    });

    // initalizing attributes adding to prodcuts
    $(".xs-attrib-input").each(function () {
        const $this = $(this);
        // console.log($this);

        const attribTitle = $this.attr("data-title"),
            attribId = $this.attr("data-attrib-id"),
            productId = $this.attr("data-product-id"),
            addUrl = $this.attr('data-add-url'),
            removeUrl = $this.attr('data-remove-url');

        let attribOptions = $this.val().split(",");

        const options = {
            plugins: ['restore_on_backspace', 'remove_button'],
            delimiter: ',',
            persist: false,
            create: function (input) {
                return {
                    value: input,
                    text: input
                }
            }
        };
        let $select = $this.selectize(options);
        let selectize = $select[0].selectize;
        for (let option in attribOptions) {
            selectize.addItem(option);
        }

        // add event
        selectize.on("item_add", function (value, $item) {
            $.ajax({
                url: addUrl,
                type: "POST",
                data: {
                    product_id: productId,
                    attrib_id: attribId,
                    value: value
                },
                success: function (res) {
                    console.log("Added on server");
                    console.log(res);
                }
            })
        });
        // remove event
        selectize.on("item_remove", function (value, $item) {
            $.ajax({
                url: removeUrl,
                type: "POST",
                data: {
                    product_id: productId,
                    attrib_id: attribId,
                    value: value
                },
                success: function (res) {
                    console.log("Removed on server");
                    console.log(res);
                }
            })
        });
        // console.log(selectize);
    });

    // helper function to update current select attributes


    // colors data from server
    let colors = [];
    if ($("[data-xs-colors]").length > 0) {
        colors = JSON.parse($("[data-xs-colors]").attr('data-xs-colors'));
    }
    // initalizing attributes adding to prodcuts
    $(".xs-attrib-color").each(function () {
        const $this = $(this);
        // console.log($this);

        const attribTitle = $this.attr("data-title"),
            attribId = $this.attr("data-attrib-id"),
            productId = $this.attr("data-product-id"),
            addUrl = $this.attr('data-add-url'),
            removeUrl = $this.attr('data-remove-url');

        let attribOptions = $this.val().split(",");

        const options = {
            valueField: "id",
            labelField: "title",
            searchField: 'title',
            placeholder: "Start typing color name...",
            loadThrottle: 100,
            options: colors,
            plugins: ['restore_on_backspace', 'remove_button'],
            delimiter: ',',
            persist: false,
            create: false
        };
        let $select = $this.selectize(options);
        let selectize = $select[0].selectize;
        for (let option in attribOptions) {
            selectize.addItem(option);
        }

        // add event
        selectize.on("item_add", function (value, $item) {
            // console.log(value);
            $.ajax({
                url: addUrl,
                type: "POST",
                data: {
                    product_id: productId,
                    attrib_id: attribId,
                    value: value
                },
                success: function (res) {
                    console.log("Added on server");
                    console.log(res);
                    showToast(`${attribTitle} added`);
                }
            })
        });
        // remove event
        selectize.on("item_remove", function (value, $item) {
            $.ajax({
                url: removeUrl,
                type: "POST",
                data: {
                    product_id: productId,
                    attrib_id: attribId,
                    value: value
                },
                success: function (res) {
                    console.log("Removed on server");
                    console.log(res);
                    showToast(`${attribTitle} removed`);
                }
            })
        });
        console.log(selectize);
    });

    $("[data-gen-team-store-link]").on("click", function () {
        let btn = $(this),
            id = btn.attr('data-gen-team-store-link');

        btn.attr('disabled', 'disabled');
        xs.sendRequest(`/admin/team_admins/${id}/store_gen_token`, "GET", {}).then(data => {
            console.log(data);
            window.open(data.link);
            btn.removeAttr('disabled')
        });
    })
});