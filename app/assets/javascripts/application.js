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
//= require lib_dash/scripts
//= require libs/handlebars.min
//= require libs/cookie.min
//= require libs/uilang
//= require libs/jquery.steps
//= require libs/jquery.validate.min
//= require libs/jquery.serializeJson
//= require libs/fabric.min
//= require libs/domToImage.min
//= require libs/toastr.min
//= require libs/jquery.datetimepicker
//= require libs/colorpicker.min
//= require libs/moment
//= require libs/jquery.filthypillow.min
//= require libs/slick.min
//= require_self
/* Port of strftime() by T. H. Doan (https://thdoan.github.io/strftime/)
 *
 * Day of year (%j) code based on Joe Orost's answer:
 * http://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
 *
 * Week number (%V) code based on Taco van den Broek's prototype:
 * http://techblog.procurios.nl/k/news/view/33796/14863/calculate-iso-8601-week-and-year-in-javascript.html
 */
Date.prototype.strftime = function (sFormat) {
    let date = this;
    if (!(date instanceof Date)) date = new Date();
    var nDay = date.getDay(),
        nDate = date.getDate(),
        nMonth = date.getMonth(),
        nYear = date.getFullYear(),
        nHour = date.getHours(),
        aDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        aMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        aDayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
        isLeapYear = function () {
            return (nYear % 4 === 0 && nYear % 100 !== 0) || nYear % 400 === 0;
        },
        getThursday = function () {
            var target = new Date(date);
            target.setDate(nDate - ((nDay + 6) % 7) + 3);
            return target;
        },
        zeroPad = function (nNum, nPad) {
            return ((Math.pow(10, nPad) + nNum) + '').slice(1);
        };
    return sFormat.replace(/%[a-z]/gi, function (sMatch) {
        return (({
            '%a': aDays[nDay].slice(0, 3),
            '%A': aDays[nDay],
            '%b': aMonths[nMonth].slice(0, 3),
            '%B': aMonths[nMonth],
            '%c': date.toUTCString(),
            '%C': Math.floor(nYear / 100),
            '%d': zeroPad(nDate, 2),
            '%e': nDate,
            '%F': date.toISOString().slice(0, 10),
            '%G': getThursday().getFullYear(),
            '%g': (getThursday().getFullYear() + '').slice(2),
            '%H': zeroPad(nHour, 2),
            '%I': zeroPad((nHour + 11) % 12 + 1, 2),
            '%j': zeroPad(aDayCount[nMonth] + nDate + ((nMonth > 1 && isLeapYear()) ? 1 : 0), 3),
            '%k': nHour,
            '%l': (nHour + 11) % 12 + 1,
            '%m': zeroPad(nMonth + 1, 2),
            '%n': nMonth + 1,
            '%M': zeroPad(date.getMinutes(), 2),
            '%p': (nHour < 12) ? 'AM' : 'PM',
            '%P': (nHour < 12) ? 'am' : 'pm',
            '%s': Math.round(date.getTime() / 1000),
            '%S': zeroPad(date.getSeconds(), 2),
            '%u': nDay || 7,
            '%V': (function () {
                var target = getThursday(),
                    n1stThu = target.valueOf();
                target.setMonth(0, 1);
                var nJan1 = target.getDay();
                if (nJan1 !== 4) target.setMonth(0, 1 + ((4 - nJan1) + 7) % 7);
                return zeroPad(1 + Math.ceil((n1stThu - target) / 604800000), 2);
            })(),
            '%w': nDay,
            '%x': date.toLocaleDateString(),
            '%X': date.toLocaleTimeString(),
            '%y': (nYear + '').slice(2),
            '%Y': nYear,
            '%z': date.toTimeString().replace(/.+GMT([+-]\d+).+/, '$1'),
            '%Z': date.toTimeString().replace(/.+\((.+?)\)$/, '$1')
        } [sMatch] || '') + '') || sMatch;
    });
};
Handlebars.registerHelper('formatMoney', function (price) {
    console.log(price);
    return price;
})


window.jq = $;
$(document).on('turbolinks:load', () => {
    console.log("ready");
    Cookies.set("xs_test", "hello");

    console.log("Security coded working");

    const AppContent = $("#xs-midway-wrap");
    const AppLoading = $("#xs-midway-loading");
    const AppErrors = $("#xs-midway-errors");

    const ProductsList = $("[data-xs-products-list]");
    const StoreProducts = $("[data-xs-added-products]");

    const URLS = {
        LOGIN: $("#xs_url_login").val(),
        LOGOUT: $("#xs_url_logout").val(),
        SIGNUP: $("#xs_url_signup").val(),
        SIGNUP_POST: $("#xs_url_signup_post").val(),
        GET_STARTED: $("#xs_url_get_started").val(),
        VERIFY_ADMIN: $("#xs_url_verify_admin").val(),
        AFTER_LOGIN: $("#xs_url_after_login").val(),
        API: {
            GET_PRODUCTS: $("#xs_url_api_get_products").val()
        },
        STORE: {
            ALL: $("#xs_url_all_stores").val(),
            ADD_PRODUCT: $("#xs_url_store_add_products").val(),
            REMOVE_PRODUCT: $("#xs_url_store_remove_products").val(),
            LOGO_SETUP: $("#xs_url_store_logo_setup").val(),
            PUBLISH: $("#xs_url_store_publish").val(),
            LOGO_UPLOAD: $("#xs_url_store_logo_upload").val(),
            IMAGES_UPLOAD: $("#xs_url_store_images_upload").val(),
            SETUP: $("#xs_url_store_setup").val(),
            MANAGE_LOGOS: $("#xs_url_store_manage_logos").val(),
            CHANGE_PRODUCT_COLOR: $("#xs_url_store_set_product_color").val(),
            CHANGE_PRODUCT_LOGO: $("#xs_url_store_set_product_logo").val(),
            FUNDRAISE: $("#xs_url_store_fundraise").val(),
            COUNTDOWN: $("#xs_url_store_set_countdown").val(),
            TOGGLE_ESSENTIAL: $("#xs_url_store_toggle_essential").val(),
            UPDATE_PRICE_TAG: $("#xs_url_store_update_price_tag").val(),
            DELETE_LOGO_PRODUCT: $("#xs_url_store_delete_logo_product").val(),
            REMOVE_LOGO_IMAGE: $("#xs_url_store_remove_logo_image").val()

        }
    };
    window.xURLS = URLS;
    const Templates = {
        PRODUCT: Handlebars.compile($("#productTemplate").html()),
        ADDED_PRODUCT: Handlebars.compile($("#addedProductTemplate").html())
    };


    let Errors = [];

    window.xs = {
        bar: {
            overlay: $('[data-xs-bar-overlay]'),
            startLoading: function () {
                this.overlay.show();
            },
            stopLoading: function () {
                this.overlay.hide();
            }
        },

        startLoading: function () {
            AppErrors.hide();
            AppContent.slideUp(function () {
                AppLoading.slideDown();
            });
        },
        showContent: function () {
            // AppErrors.hide();
            AppLoading.slideUp(function () {
                AppContent.slideDown();
            });
        },
        showErrors: function () {
            // AppContent.hide();
            AppLoading.slideUp(function () {
                AppErrors.slideDown();
            });
        },
        addError: function (type, text) {
            const _t = this;

            let el = $("<div></div>").addClass(`xs-alert xs-alert-${type}`).text(text).appendTo(AppErrors);
            Errors.push(el);
            let index = Errors.indexOf(el);
            el.on("click", function () {
                _t.removeError(index);
            });
            return index;
        },
        clearErrors: function () {
            Errors.forEach(function (i) {
                i.hide(function () {
                    i.remove();
                });
            });
            Errors = [];
        },
        removeError: function (errorIndex) {
            let error = Errors[errorIndex];
            error.hide(function () {
                error.remove();
                Errors.splice(errorIndex, 1);
            });
        },


        // helper functions
        sendRequest: function (url, data, formData = false) {
            const _t = this;
            return new Promise((res, rej) => {
                let options = {
                    url: url,
                    data: data,
                    type: "post",
                    success: function (data) {
                        if (typeof (data) == "object") {
                            if (data.hasOwnProperty("error")) {
                                // _t.clearErrors();
                                _t.showErrors();
                                _t.addError("danger", data.error)
                                res(false);
                            } else {
                                res(data);
                            }
                            if (data.hasOwnProperty("redirect")) {
                                switch (data.redirect) {
                                    case "login":
                                        if (location.pathname != URLS.LOGIN && location.pathname != URLS.SIGNUP && location.pathname != URLS.GET_STARTED) {
                                            location.href = URLS.LOGIN
                                        }
                                        break;
                                };
                                console.log("here");
                                // _t.clearErrors();
                                res(false);
                            }
                        } else {
                            res(false);
                        }

                    },
                    error: function (error) {
                        _t.showErrors();
                        _t.addError("danger", "An Error Occurred. Please refresh the page.");
                        console.log(error);
                    }
                };
                if (formData) {
                    options.processData = false;
                    options.contentType = false;
                    options.enctype = 'multipart/form-data';
                }
                $.ajax(options);
            });
        },

        // security 
        verifyAdmin: function () {
            const _t = this;

            _t.startLoading();

            _t.iS_GET_STARTED = false;
            const thispath = location.pathname.replace(/\/\s*$/, "");
            if (thispath == URLS.GET_STARTED) {
                _t.iS_GET_STARTED = true;
            }

            _t.is_unique_admin = false;
            if (location.search != "") {
                query = JSON.parse('{"' + decodeURI(location.search.replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/\?/g, "")) + '"}');
                if ($("#xs_unique_admin").val() == "true") {
                    _t.is_unique_admin = true;
                    _t.admin_token = query.uuit;
                    _t.showContent();
                    Cookies.get('xs_admin', false);
                    return;
                }
            }

            let admin = Cookies.get('xs_admin') || false;
            console.log(admin);
            if (admin) {
                const token = Cookies.get("xs_access_token");
                console.log(token);
                if (token) {
                    _t.sendRequest(URLS.VERIFY_ADMIN, {
                        id: admin,
                        token: token
                    }).then((data) => {
                        console.log(data);
                        if (!data) {
                            return;
                        }
                        if (data.status == "success" && data.admin == "verified") {
                            if (thispath == URLS.LOGIN || thispath == URLS.SIGNUP || thispath == URLS.GET_STARTED) {
                                location.href = URLS.AFTER_LOGIN + "?t=" + Cookies.get("xs_access_token") + "&id=" + admin;
                                // console.log("check 1");
                                return;
                            }
                            _t.admin_id = admin;
                            $("[data-xs-admin-id]").val(_t.admin_id);
                            _t.showContent();
                        } else {
                            if (thispath == URLS.LOGIN || thispath == URLS.SIGNUP || thispath == URLS.GET_STARTED) {
                                _t.showContent();
                            } else {
                                location.href = URLS.LOGIN;
                            }
                        }
                    });
                }
            } else {
                if (thispath == URLS.LOGIN || thispath == URLS.SIGNUP || thispath == URLS.GET_STARTED) {
                    _t.showContent();
                    // console.log("check 21");
                } else {
                    console.log(thispath == URLS.GET_STARTED);
                    location.href = URLS.LOGIN;
                    // console.log("check 31");
                }
            }
        },
        setLoginEvents: function () {
            const _t = this;

            const loginForm = $("#login-form");
            loginForm.on("submit", function (e) {
                e.preventDefault();
                _t.startLoading();

                let data = loginForm.serializeArray();
                let url = loginForm.attr('data-url');
                let sData = {};
                data.forEach(function (i) {
                    sData[i.name] = i.value;
                });
                _t.sendRequest(url, sData).then(function (data) {
                    if (data) {
                        if (data.status == "success") {
                            Cookies.set("xs_admin", data.admin_id);
                            Cookies.set("xs_access_token", data.token);
                            // location.href = URLS.AFTER_LOGIN;
                            location.href = URLS.STORE.ALL + `?id=${Cookies.get('xs_admin')}&t=${Cookies.get("xs_access_token")}`;
                        }
                    } else {
                        _t.showContent();
                    }
                    loginForm.find("[type=submit]").removeAttr('disabled');
                })
            });
        },

        // filters 
        getActiveFilters: function () {
            let filters = {
                category: [],
                vendor: [],
                attributes: []
            };
            let attributes = {};

            $("[data-xs-active-filter]").each(function () {
                const $this = $(this);
                let filterType = $this.attr('data-xs-filter');
                let filterVal = $this.attr('data-xs-filter-val');

                if (filterType == "category") {
                    if (!filters.category.includes(filterVal)) {
                        filters.category.push(filterVal);
                    }
                } else if (filterType == "vendor") {
                    if (!filters.vendor.includes(filterVal)) {
                        filters.vendor.push(filterVal);
                    }
                } else {
                    let attribId = $this.attr('data-xs-attrib-id');
                    if (!attributes.hasOwnProperty(attribId)) {
                        attributes[attribId] = [];
                    }

                    if (!attributes[attribId].includes(filterVal)) {
                        attributes[attribId].push(filterVal);
                    }
                }
            });

            filters.attributes = attributes;
            return filters;
        },
        setFilters: function () {
            const _t = this;
            
            const sidebar = $("aside.xs-sidebar");
            _t.cFilterLoading = false;
            _t.pages = {
                requested: true,
                current: 1,
                total: 1
            };
            _t.setupProductsLoading = $("[data-xs-setup-products-loading]").slideDown();
            _t.setupProductsList = $("[data-xs-products-list]").slideUp();
            let categoryFilters = [];
            let attributeFilters = {};

            $("[data-xs-filter]").on("change", function (e) {
                // e.preventDefault();
                const $this = $(this);

                _t.pages.requested = true;

                console.log("Filters loading status: " + _t.cFilterLoading);
                if ( _t.cFilterLoading ) {
                    e.preventDefault();
                    return;
                }

                _t.cFilterLoading = true;
                sidebar.addClass('filter-disabled');

                _t.setupProductsList.slideUp();
                _t.setupProductsLoading.slideDown();
                if (!$this.is(":checked")) {
                    $this.removeAttr('data-xs-active-filter');
                } else {
                    $this.attr("data-xs-active-filter", "");
                }
                let activeFilters = _t.getActiveFilters();

                _t.sendRequest(URLS.API.GET_PRODUCTS, {
                    filters: activeFilters
                }).then((data) => {
                    console.log(data);
                    _t.setupProductsLoading.slideUp();
                    _t.displayProducts(data.products);

                    _t.pages.current = parseInt(data.current_page);
                    _t.pages.total = parseInt(data.total_pages);
                    _t.pages.requested = false;
                    _t.cFilterLoading = false;
                    sidebar.removeClass('filter-disabled');
                    console.log(_t.pages);
                });
            });
            _t.setupProductsList.slideUp();
            _t.setupProductsLoading.slideDown();
            
            _t.cFilterLoading = true;
            sidebar.addClass('filter-disabled');
            _t.sendRequest(URLS.API.GET_PRODUCTS, {
                filters: {}
            }).then((data) => {

                console.log(data);
                _t.displayProducts(data.products);
                _t.pages.current = parseInt(data.current_page);
                _t.pages.total = parseInt(data.total_pages);
                _t.pages.requested = false;

                _t.cFilterLoading = false;
                sidebar.removeClass('filter-disabled');
                console.log(_t.pages);
            });


            $(window).scroll(function () {
                let offset = $(".xs-products-list").offset().top + $(".xs-products-list").height() - 1200;
                if ($(window).scrollTop() >= offset && !_t.pages.requested) {
                    if (_t.pages.total > _t.pages.current) {
                        console.log("more content requested");
                        _t.pages.requested = true;

                        _t.setupProductsLoading.slideDown();

                        let activeFilters = _t.getActiveFilters();
                        _t.sendRequest(URLS.API.GET_PRODUCTS, {
                            filters: activeFilters,
                            page: _t.pages.current + 1
                        }).then((data) => {
                            console.log(data);

                            _t.setupProductsLoading.slideUp();

                            _t.displayProducts(data.products, false);
                            _t.pages.current = parseInt(data.current_page);
                            _t.pages.total = parseInt(data.total_pages);
                            _t.pages.requested = false;

                            console.log(_t.pages);
                        });
                    }
                    // ajax call get data from server and append to the div
                }
            });
        },

        displayProducts: function (data, newResults = true) {
            const _t = this;

            if (newResults) {
                ProductsList.empty();
            }
            let prs = []
            data.forEach(function (product) {
                // console.log(product);
                let p = Templates.PRODUCT({
                    id: product.id,
                    image_url: product.image_url,
                    title: product.title,
                    description: product.description,
                    price: Shopify.formatMoney(product.price, xs_money_format),
                    color_images: product.color_images
                });
                $(p).fadeOut().appendTo(ProductsList);
                prs.push(p);
            });
            $(prs).fadeIn();
            ProductsList.find("[data-close-colors]").off('click').on('click', function () {
                $(this).closest('[data-product-colors]').removeClass('opened');
            });
            ProductsList.find("[data-xs-product-add]").off('click').on('click', function () {
                console.log("clicked");
                if (_t.iS_GET_STARTED) {
                    _t.GET_STARTED_MODAL.modal("show");
                } else {
                    $(this).siblings("[data-product-colors]").addClass('opened');
                }

            });
            ProductsList.find("[data-xs-p-add-color]").off('click').on('click', function () {
                const $this = $(this).closest("[data-product]").find('[data-xs-product-add]'),
                    color_id = $(this).attr('data-xs-p-add-color'),
                    product_id = $this.attr('data-xs-product-add'),
                    store_id = $this.attr('data-store-id');

                _t.sendRequest(URLS.STORE.ADD_PRODUCT, {
                    store_id,
                    product_id,
                    color_id
                }).then((data) => {
                    console.log(data);
                    _t.displayStoreProducts(data.products)
                    toastr.success("Product added");
                })
            });
            console.log($(".xs-product-details-overlay"));
            ProductsList.find("[data-product-details]").off('click').on('click', function () {
                const id = $(this).data('product-details');
                $(`#productDescriptionModal${id}`).modal("show");
            });

            ProductsList.find("[data-xs-add-to-store-modal]").off('click').on('click', function () {
                const $this = $(this),
                    color_id = $this.attr('data-xs-add-to-store-modal'),
                    product_id = $this.attr('data-product-id'),
                    store_id = $this.attr('data-store-id');

                _t.sendRequest(URLS.STORE.ADD_PRODUCT, {
                    store_id,
                    product_id,
                    color_id
                }).then((data) => {
                    // console.log(data);
                    _t.displayStoreProducts(data.products);
                    toastr.success("Product added");
                })
            });
            ProductsList.find("[data-product-thumb]").off('click').on("click", function () {
                let id = $(this).attr('data-product-thumb');
                $(this).closest('[data-xs-product-modal]').find("[data-xs-add-to-store-modal]").attr('data-xs-add-to-store-modal', id);
                $(this).closest('.xs-pd-media').find("[data-product-main-image]").attr('src', $(this).attr('src'));
            })
            _t.setupProductsList.slideDown();
            _t.setupProductsLoading.slideUp();
        },

        setEvents: function () {
            const _t = this;
            _t.setLoginEvents();
            $("[data-xs-log-out]").on('click', function (e) {
                e.preventDefault();
                Cookies.remove("xs_admin");
                Cookies.remove("xs_access_token");
                _t.verifyAdmin();
            });

            $("[data-xs-stores]").on('click', function (e) {
                e.preventDefault();
                location.href = URLS.STORE.ALL + `?id=${Cookies.get('xs_admin')}&t=${Cookies.get("xs_access_token")}`;
            })
            $("[data-authorize-link]").on('click', function (e) {
                e.preventDefault();
                let link = $(this).attr('href');
                location.href = `${link}?t=${Cookies.get("xs_access_token")}`;
            });

            const signupForm = jq("#new_team_admin");
            const loginForm = jq("#signup_login_form");
            console.log(jq.fn.validate);
            signupForm.validate({
                rules: {
                    "team_admin[organization]": {
                        required: true,
                        minlength: 1
                    },
                    "team_admin[team_type]": {
                        required: true,
                        minlength: 1
                    },
                    "team_admin[solution][]": {
                        required: true,
                        minlength: 1
                    },
                    "team_admin[sports][]": {
                        required: true,
                        minlength: 1
                    },
                    "team_admin[confirm_password]": {
                        equalTo: "#team_admin_password"
                    }
                },
                messages: {
                    "team_admin[organization]": {
                        required: "This field is required"
                    },
                    "team_admin[team_type]": {
                        required: "This field is required"
                    },
                    "team_admin[solution][]": {
                        required: "Please select at least one."
                    },
                    "team_admin[sports][]": {
                        required: "Please select at least one."
                    },
                    "team_admin[confirm_password]": {
                        equalTo: "Password does not match"
                    }
                },
                errorPlacement: function errorPlacement(error, element) {
                    console.log(element);
                    if (element.is(":radio") || element.is(":checkbox")) {
                        error.appendTo(element.parents('.xs-wizard-question'));
                    } else { // This is the default behavior 

                        element.before(error);
                    }
                }
            });

            $("#signup-wizard").steps({
                onStepChanging: function (event, currentIndex, newIndex) {
                    if (currentIndex < newIndex) {
                        signupForm.validate().settings.ignore = ":disabled,:hidden";
                        return signupForm.valid();
                    }
                    return true
                },
                onFinishing: function (event, currentIndex) {
                    signupForm.validate().settings.ignore = ":disabled";
                    return signupForm.valid();
                },
                onFinished: function (event, currentIndex) {
                    _t.startLoading();
                    let data = signupForm.serializeJSON();
                    let url = URLS.SIGNUP;
                    // let sData = {};
                    // console.log(data);
                    // data.forEach(function (i) {
                    //     sData[i.name] = i.value;
                    // });
                    _t.sendRequest(url, data).then(function (data) {
                        console.log(data);

                        if (data.status == "signup_error") {
                            // _t.clearErrors();
                            _t.addError("danger", data.text);
                            _t.showErrors();
                            _t.showContent();
                        } else if (data.status == "success") {
                            // _t.clearErrors();
                            // _t.addError("success", data.text);
                            // _t.showErrors();
                            // signupForm.hide();
                            // loginForm.show();
                            // _t.showContent();
                            if (data.status == "success") {
                                Cookies.set("xs_admin", data.admin_id);
                                Cookies.set("xs_access_token", data.token);
                                console.log(data.hasOwnProperty("uniforms"));
                                if (data.hasOwnProperty("uniforms")) {
                                    let div = $("#signup-wizard-div"),
                                        divResponse = $("#signup-wizard-response");
                                    div.hide();
                                    divResponse.find("[data-response-login]").show();
                                    divResponse.find("[data-after-login]").on("click", function (e) {
                                        e.preventDefault();
                                        location.href = URLS.AFTER_LOGIN + "?t=" + Cookies.get("xs_access_token");
                                    })
                                    divResponse.show();

                                    _t.showContent();
                                } else {
                                    // location.href = URLS.AFTER_LOGIN + "?t=" + Cookies.get("xs_access_token");
                                }
                            }
                        }
                    });
                },
                labels: {
                    previous: "Back"
                }
            });


        },
        setGetStartedEvents: function () {
            const _t = this;
            _t.GET_STARTED_MODAL = $("#signupModal");

            $("[data-xs-set-logo]").on("click", function (e) {
                e.preventDefault();
                _t.GET_STARTED_MODAL.modal("show");
            });
            $("[data-xs-get-started-trigger]").on("click", function (e) {
                e.preventDefault();
                _t.GET_STARTED_MODAL.modal("show");
            });

            $("#get_started_form").on('submit', function (e) {
                e.preventDefault();
                _t.startLoading();
                let data = $(this).serializeJSON();
                let url = $(this).attr('action');
                // let sData = {};
                // console.log(data);
                // data.forEach(function (i) {
                //     sData[i.name] = i.value;
                // });
                _t.sendRequest(url, data).then(function (data) {
                    console.log(data);

                    if (data.status == "signup_error") {
                        // _t.clearErrors();
                        _t.addError("danger", data.text);
                        _t.showErrors();
                        _t.showContent();
                    } else if (data.status == "success") {
                        // _t.clearErrors();
                        // _t.addError("success", data.text);
                        // _t.showErrors();
                        // signupForm.hide();
                        // loginForm.show();
                        // _t.showContent();
                        if (data.status == "success") {
                            Cookies.set("xs_admin", data.admin_id);
                            Cookies.set("xs_access_token", data.token);
                            console.log(data.hasOwnProperty("uniforms"));
                            // location.href = URLS.AFTER_LOGIN + "?t=" + Cookies.get("xs_access_token");

                            location.href = data.store_path + "?t=" + Cookies.get("xs_access_token");

                        }
                    }
                });
            });
        },

        // store setup functions
        storeSetup: function () {
            const _t = this;
            _t.setupProductsLoading = $("[data-xs-setup-products-loading]").slideDown();
            _t.setupProductsList = $("[data-xs-products-list]").slideUp();


            $("#openFilterXs").on('click', function () {
                if ($(".xs-sidebar").css('display') == "none") {
                    $(".xs-sidebar").css('display', "flex");
                } else {
                    $(".xs-sidebar").css('display', "none");
                }
            })
            _t.countdownInfo = $("#xs-countdown-info");

            const dateEl = $("#countdownpicker"),
                currentDate = dateEl.data('current');

            let defaultDate = false,
                defaultTime = false;
            if (currentDate) {
                defaultDate = new Date(currentDate);
                defaultTime = defaultDate.strftime("%H:%M");
                _t.countdownInfo.text(`This store will close on ${defaultDate.toString()}`);
            }
            _t.countdownPicker = dateEl;
            // _t.countdownPicker = dateEl.datetimepicker({
            //     inline: true,
            //     minDate: dateEl.data("min"),
            //     defaultDate: defaultDate,
            //     defaultTime: defaultTime
            // });
            dateEl.filthypillow({
                minDateTime: function () {
                    return moment().subtract("seconds", 1);
                },
                initialDateTime: function () {
                    return moment().add("days", 1);
                }
            });

            dateEl.on("focus", function () {
                dateEl.filthypillow("show");
            });
            dateEl.on("fp:save", function (e, dateObj) {
                dateEl.val(dateObj.format("MMM DD YYYY hh:mm A"));
                dateEl.filthypillow("hide");
            });



            $("[data-xs-set-logo]").on('click', function () {
                let check = $(this).data('check-products');
                if (check == false) {
                    // location.href = URLS.STORE.LOGO_SETUP + "?t=" + Cookies.get("xs_access_token");
                    // return;

                    if (_t.is_unique_admin) {
                        location.href = URLS.STORE.LOGO_SETUP + "?uuit=" + _t.admin_token;
                        return;
                    } else {
                        location.href = URLS.STORE.LOGO_SETUP + "?t=" + Cookies.get("xs_access_token");
                        return;
                    }
                }
                if (StoreProducts.children().length > 0) {
                    // location.href = URLS.STORE.LOGO_SETUP + "?t=" + Cookies.get("xs_access_token");
                    if (_t.is_unique_admin) {
                        location.href = URLS.STORE.LOGO_SETUP + "?uuit=" + _t.admin_token;
                        return;
                    } else {
                        location.href = URLS.STORE.LOGO_SETUP + "?t=" + Cookies.get("xs_access_token");
                        return;
                    }
                } else {
                    _t.addError("danger", "Please add at least 1 product to store");
                    _t.showErrors();
                }
            });
            $("[data-xs-products-step]").on("click", function () {
                if (_t.is_unique_admin) {
                    location.href = URLS.STORE.SETUP + "?uuit=" + _t.admin_token;
                } else {
                    location.href = URLS.STORE.SETUP + "?t=" + Cookies.get("xs_access_token");
                }
            });

            $("[data-xs-finish-step]").on("click", async function () {
                const logoSETUP = $("#store-logo-setup"),
                    publishLoading = $("#store-publish-loading"),
                    published = $("#store-publish-done"),
                    progressBar = $("#store-publish-progress"),
                    linkText = $("[data-store-link]"),
                    renameModal = $('#renameModal').modal('hide'),
                    nameInput = $("input#storeName");

                logoSETUP.hide();
                publishLoading.show();
                progressBar.css("width", "100%");
                let purl = URLS.STORE.PUBLISH + "?t=" + Cookies.get("xs_access_token");
                if (_t.is_unique_admin) {
                    purl = URLS.STORE.PUBLISH + "?uuit=" + _t.admin_token;
                }

                _t.sendRequest(purl, {
                    title: nameInput.val()
                }).then((data) => {
                    console.log(data);
                    publishLoading.hide();
                    published.show();
                    let url = location.origin + data.link
                    linkText.attr('href', url).text(url);

                    $('[data-store-g-link]').attr('data-copy-link', data.link);

                    $("[data-store-g-a-link]").each(function () {
                        $(this).attr('href', `${$(this).attr("href")}${data.collection}`)
                    })

                })

            });
            $("[data-go-back]").on("click", function () {
                const logoSETUP = $("#store-logo-setup"),
                    publishLoading = $("#store-publish-loading"),
                    published = $("#store-publish-done");

                published.hide();
                publishLoading.hide();
                logoSETUP.show();
            });
            $("[data-manage-store-logos]").on("click", function () {
                location.href = URLS.STORE.MANAGE_LOGOS + "?t=" + Cookies.get("xs_access_token");
            });

            // logo select boxes events
            // $("input.xs-product-select-checkbox:checked").map(function(){ return $(this).val() }).get();
            function selectedProducts() {
                return $("input.xs-product-select-checkbox:checked").map(function () {
                    return $(this).val()
                }).get();
            };

            function selectedProductsLength() {
                return selectedProducts().length;
            }

            function setButtonsState() {
                if (selectedProductsLength() > 0) {
                    $("[data-select-product-action]").removeAttr('disabled').removeClass('btn-disabled');
                } else {
                    $("[data-select-product-action]").attr('disabled', 'disabled').addClass('btn-disabled');
                }
            }
            $("#xs_select_all_products").on('change', function () {
                let checked = $(this).is(":checked");
                if (checked) {
                    $("input.xs-product-select-checkbox").each(function () {
                        if (!$(this).closest("[data-xs-product]").hasClass("processing")) {
                            $(this).prop("checked", true);
                        }
                    })
                } else {
                    $("input.xs-product-select-checkbox").prop("checked", false);
                }

                setButtonsState();
            });
            $("input.xs-product-select-checkbox").on("change", function () {
                setButtonsState();
            });

            $("[data-change-logo-action]").on('click', function () {
                let pids = selectedProducts();
                _t.showLogoModal().then((logo_id) => {

                    console.log(logo_id);
                    let logo_src = $(`[data-select-product-logo=${logo_id}]`).find('img').attr('src');
                    console.log(logo_src);
                    for (var i in pids) {
                        console.log(i);
                        let c = new fabric.Canvas(`xscanvas${pids[i]}`, {
                            preserveObjectStacking: true,
                        });
                        console.log(c);
                        _t.setProductLogoSrc(pids[i], logo_id);
                        _t.renderProductLogo(c, logo_src, pids[i]);

                    }
                    toastr.success("Logos Succesfully Updated");
                });
            });

            $("[data-set-store-countdown]").on("click", function () {
                _t.showCountdownModal().then((data) => {
                    console.log(data);
                    _t.sendRequest(URLS.STORE.COUNTDOWN, {
                        time: `${data}`
                    }).then((response) => {
                        let defaultDate = new Date(parseFloat(response.countdown));
                        _t.countdownInfo.text(`This store will close on ${defaultDate.toString()}`);

                        toastr.success("Countdown set successfully");
                    })
                });
            })

            $("[data-change-color]").on("click", function () {
                $(this).closest("[data-xs-product]").find("[data-product-colors]").addClass('opened');
            });
            $("[data-change-logo]").on("click", function () {
                $(this).closest("[data-xs-product]").find("[data-product-logos]").addClass('opened');
            });
            $("[data-close-colors]").on("click", function () {
                $(this).closest("[data-product-colors]").removeClass('opened');
            });
            $("[data-close-logos]").on("click", function () {
                $(this).closest("[data-product-logos]").removeClass('opened');
            });

            $("[data-set-product-color]").on("click", function () {
                $(this).siblings().removeClass('active-color');
                $(this).addClass('active-color');
                $(this).closest("[data-product-colors]").removeClass('opened');
                let product = $(this).closest("[data-xs-product]"),
                    pid = product.data('xs-product');

                let $this = $(this),
                    colorId = $this.data("set-product-color"),
                    spId = $this.data('sp-id');


                _t.setProductProcessing(pid);
                _t.sendRequest(URLS.STORE.CHANGE_PRODUCT_COLOR, {
                    product_id: pid,
                    color_id: colorId
                }).then((data) => {
                    console.log(data);
                    console.log("color image loaded");
                    product.find(".xs-o-img").attr('data-image-url', data.image).attr('src', data.image);
                    let c = new fabric.Canvas(`xscanvas${pid}`, {
                        preserveObjectStacking: true,
                    });

                    let logo_src = _t.getProductLogoSrc(pid);
                    _t.renderProductLogo(c, logo_src, pid);

                    toastr.success("Color Processed");
                })
            });


            $("[data-store-fundraise]").on("change", function () {
                let fundraise = $(this).val();
                let purl = URLS.STORE.FUNDRAISE + `?t=${Cookies.get("xs_access_token")}`;
                if (_t.is_unique_admin) {
                    purl = URLS.STORE.FUNDRAISE + "?uuit=" + _t.admin_token;
                }
                _t.sendRequest(purl, {
                    fundraise
                }).then((data) => {
                    console.log(data);
                    data.products.forEach(function (i) {
                        $(`[data-xs-product=${i.id}]`).find('[data-product-price]').text(Shopify.formatMoney(i.price, xs_money_format))
                        // $(`[data-xs-product=${i.id}]`).find('[data-product-price-input]').val(i.price / 100.0);

                    });

                    toastr.success("Price Succesfully Updated");
                })
            })
            _t.setRemoveProductsEvents();

            $("[data-toggle-essential]").on('change', function () {
                let id = $(this).data('toggle-essential'),
                    checkbox = $(this);
                _t.sendRequest(URLS.STORE.TOGGLE_ESSENTIAL, {
                    id
                }).then(data => {
                    console.log(data);
                    // let btn = $(`[data-toggle-essential=${data.id}]`);
                    if (data.essential) {
                        // btn.removeClass("btn-secondary").addClass('btn-success').text("Essential");

                        checkbox.prop("checked", true);
                        toastr.success("Product set as essential now");
                    } else {
                        // btn.removeClass('btn-success').addClass('btn-secondary').text("Not Essential");

                        checkbox.prop("checked", false);
                        toastr.success("Product set as non-essential");
                    }
                })
            });

            $(".xs-update-price-tag-form").on('submit', function (e) {
                e.preventDefault();
                let formData = $(this).serializeJSON();
                const form = $(this);
                console.log(formData);
                _t.sendRequest(URLS.STORE.UPDATE_PRICE_TAG, formData).then(data => {
                    console.log(data);
                    // form.find("[data-product-price-input]").val(parseFloat(data.price) / 100.0);
                    form.closest("[data-xs-product]").find('[data-product-price]').text(Shopify.formatMoney(data.price, xs_money_format));
                    toastr.success("Price Succesfully Updated");

                });
            })

            $("[data-logo-setup-product-remove]").on('click', function (e) {
                e.preventDefault();
                const product = $(this).closest('[data-xs-product]');
                const id = $(this).attr('data-logo-setup-product-remove');
                let purl = URLS.STORE.DELETE_LOGO_PRODUCT;
                _t.sendRequest(purl, {
                    id
                }).then((data) => {
                    console.log(data);
                    product.remove();
                    toastr.success("Product Delete");
                })
            });
            $("[data-remove-xs-logo]").on('click', function (e) {
                e.preventDefault();
                const product = $(this).closest('[data-xs-product]'),
                    imageEl = product.find("[data-logo-product-image]");
                const id = $(this).attr('data-remove-xs-logo');
                let purl = URLS.STORE.REMOVE_LOGO_IMAGE;
                _t.sendRequest(purl, {
                    id
                }).then((data) => {
                    console.log(data);
                    imageEl.attr('src', data.image);
                })
            });


            // if apply logo params has been set
            let search = location.search.substring(1);
            let params = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
            if (params.hasOwnProperty("apply_logo")) {
                _t.applyLogoToAll(params.apply_logo);
            }



        },
        applyLogoToAll: function (logo_id) {
            const _t = this;

            function allProductsIds() {
                return $("input.xs-product-select-checkbox").map(function () {
                    return $(this).val()
                }).get();
            }

            let pids = allProductsIds();
            console.log(pids);
            let logo_src = $(`[data-select-product-logo=${logo_id}]`).find('img').attr('src');
            console.log(logo_src);
            let any_done = false;
            for (var i in pids) {
                let sLogoInput = $(`[data-logo-selected-input='${pids[i]}']`).val();
                console.log(sLogoInput);
                if (parseInt(sLogoInput) != parseInt(logo_id)) {
                    let c = new fabric.Canvas(`xscanvas${pids[i]}`, {
                        preserveObjectStacking: true,
                    });
                    _t.setProductLogoSrc(pids[i], logo_id);
                    _t.renderProductLogo(c, logo_src, pids[i]);
                    any_done = true;
                }
            }
            if (any_done) {
                toastr.success("Logos Succesfully Updated");
            }
        },
        getProductLogoSrc: function (pid) {
            console.log(pid);
            let logo_id = $(`[data-xs-product=${pid}]`).find("[data-logo-selected-input]").val();
            console.log("LOGO ID " + logo_id);
            if (logo_id) {
                return $(`[data-select-product-logo=${logo_id}]`).find('img').attr('src');
            } else {
                return false;
            }
        },
        setProductLogoSrc: function (pid, lid) {
            const _t = this;
            console.log(pid);
            let product = $(`[data-xs-product=${pid}]`);
            let spid = product.data("xs-shopify-pid");

            product.find("[data-logo-selected-input]").val(lid);

            product.find(`[data-select-product-logo=${lid}]`).siblings().removeClass("active-logo");
            product.find(`[data-select-product-logo=${lid}]`).addClass("active-logo");
            _t.sendRequest(URLS.STORE.CHANGE_PRODUCT_LOGO, {
                product_id: pid,
                logo_id: lid
            }).then((data) => {
                console.log(data);
            })
        },
        setProductProcessing: function (pid) {
            $(`[data-xs-product=${pid}]`).addClass("processing").find("input.xs-product-select-checkbox").prop("checked", false);
        },
        setProductProcessed: function (pid) {
            $(`[data-xs-product=${pid}]`).removeClass("processing");
        },
        setupLogoRendering: function () {
            const _t = this;

            const canvas = new fabric.Canvas('productRenderCanvas', {
                preserveObjectStacking: true,
            });

            function readImageUrl(input, fn) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        fn(e.target.result);
                    };

                    reader.readAsDataURL(input.files[0]);
                }
            }

            const logoInput = $("#xs_logo_file");

            $("[data-xs-logo-apply-all]").on("click", function () {
                const $this = $(this),
                    wrap = $this.closest("[data-xs-logo]"),
                    logo_id = wrap.attr('data-xs-logo'),
                    image = wrap.find("[data-xs-logo-image]"),
                    imageUrl = image.attr('src');

                $("[data-logo-selected-input]").val(logo_id);
                $("[data-select-product-logo]").removeClass("active-logo");
                $(`[data-select-product-logo=${logo_id}]`).addClass("active-logo");
                console.log(imageUrl);
                _t.startLoading();
                _t.renderAllLogos(canvas, imageUrl);
            });

            $("[data-select-product-logo]").on("click", function () {
                const $this = $(this),
                    logo_id = $this.attr('data-select-product-logo'),
                    logo_src = $this.find('img').attr("src"),
                    product_id = $this.closest("[data-xs-product]").data('xs-product');

                // if (!$this.hasClass('active-logo')) {
                //     $this.siblings().removeClass("active-logo");
                //     $this.addClass('active-logo');
                //     $(`[data-logo-selected-input=${product_id}]`).val(logo_id);
                // }
                _t.setProductLogoSrc(product_id, logo_id);
                let c = new fabric.Canvas(`xscanvas${product_id}`, {
                    preserveObjectStacking: true,
                });

                _t.renderProductLogo(c, logo_src, product_id);
            });

            const logoFileInput = $("#add_logo_input");
            const logoForm = $("#logo_hidden_form");
            if (_t.is_unique_admin) {
                $(`<input type="hidden" name="uuit" value="${_t.admin_token}">`).prependTo(logoForm);
            }
            $("[data-add-store-logos]").on('click', function () {
                logoFileInput.trigger("click");
            });
            logoFileInput.on('change', function () {
                console.log($(this).val());
                // if ($(this).val() != "") {
                //     $("#xs_logo_upload").trigger("click");
                // }
            });
        },
        uploadLogo: function (formData) {
            const _t = this;

            return new Promise((res, rej) => {
                _t.sendRequest(URLS.STORE.LOGO_UPLOAD, {
                    data: formData
                }, true).then((data) => {
                    console.log('logo data ');
                    console.log(data);
                    res();
                });
            })
        },
        uploadProductImage: function (pid) {
            const _t = this;
            let product = $(`[data-xs-product=${pid}]`),
                product_id = product.data('xs-shopify-pid'),
                image = product.find("[data-logo-product-input]").val();

            if (image == "") {
                return;
            }
            return new Promise(async function (res, rej) {
                await new Promise((res, rej) => {
                    _t.sendRequest(URLS.STORE.IMAGES_UPLOAD, {
                        product_id: pid,
                        image: image
                    }).then((data) => {
                        console.log(data);
                        res();
                    });
                });
                res("done");
            })
        },
        renderProductLogo: async function (canvas, logoUrl, productId) {
            console.log("rendering logos");
            console.log(logoUrl);
            // initialize fabric
            const _t = this;

            _t.setProductProcessing(productId);

            let productImage = $(`[data-xs-product-image=${productId}]`).find(".xs-o-img")[0],
                productImageUrl = $(productImage).attr('src'),
                productGImage = $(productImage).siblings("img.xs-g-img"),
                productInput = $(productImage).siblings('[data-logo-product-input]'),
                params = $(productImage).data('logo-params');

            console.log("Debugging");
            console.log(productImage);
            canvas.clear();
            canvas.off('after:render');
            if (params != null) {
                let productImageWidth = $(productImage).prop("naturalWidth"),
                    productImageHeight = $(productImage).prop("naturalHeight");

                let drawHeight = 600.0,
                    ratio = parseFloat(productImageHeight) / parseFloat(drawHeight),
                    drawWidth = parseFloat(productImageWidth) / ratio;
                canvas.setDimensions({
                    width: drawWidth,
                    height: drawHeight
                });


                await new Promise((res, rej) => {
                    // ADD YOUR CODE HERE
                    var img = new Image();
                    img.crossOrigin = "anonymous"; // important - set crossOrigin before src!
                    img.src = productImageUrl;
                    console.log("Debugging");
                    console.log(productImageUrl);
                    img.onload = function () {
                        canvas.setBackgroundImage(new fabric.Image(img, {
                            scaleX: drawWidth / productImageWidth,
                            scaleY: drawHeight / productImageHeight,
                        }), canvas.renderAll.bind(canvas));
                        res();
                    };

                });

                let logoDrawHeight = params.height,
                    // ratio = parseFloat(logoImageHeight) / parseFloat(logoDrawHeight),
                    // logoDrawWidth = parseFloat(logoImageWidth) / ratio;
                    logoDrawWidth = params.width;

                let LogoImage;
                await new Promise((resss, rej) => {
                    if (logoUrl) {
                        // ADD YOUR CODE HERE
                        var img = new Image();
                        img.crossOrigin = "anonymous"; // important - set crossOrigin before src!
                        img.src = logoUrl;
                        img.onload = async function () {
                            let LogoImage = new fabric.Image(img, {
                                left: params.pos_x,
                                top: params.pos_y,
                                angle: 0,
                                lockUniScaling: true,
                                opacity: 1,
                                crossOrigin: 'anonymous'
                            });

                            LogoImage.scaleToHeight(logoDrawHeight);
                            LogoImage.scaleToWidth(logoDrawWidth);
                            // console.log(logoDrawHeight);
                            // console.log(logoDrawWidth);
                            rPromise = new Promise((res, rej) => {
                                LogoImage.on("added", function () {
                                    canvas.renderAll();
                                    res();
                                });
                            });
                            canvas.add(LogoImage);

                            await rPromise;
                            canvas.renderAll();
                            await new Promise((ress, rej) => {
                                console.log("awaiting");

                                var dataURL = canvas.toDataURL({
                                    format: 'png',
                                    multiplier: 2
                                });
                                productGImage.attr('src', dataURL);
                                productInput.val(dataURL);
                                ress();
                            })

                            resss();
                        };

                    } else {
                        canvas.renderAll();
                        new Promise((res, rej) => {
                            console.log("awaiting");

                            var dataURL = canvas.toDataURL({
                                format: 'png',
                                multiplier: 2
                            });
                            productGImage.attr('src', dataURL);
                            productInput.val(dataURL);
                            res();
                        }).then(() => {
                            resss();
                        })

                    }
                });

                await _t.uploadProductImage(productId);
                console.log("settings processed");
                _t.setProductProcessed(productId);
            }

        },

        // not using anymore
        renderAllLogos: async function (canvas, logoUrl) {
            console.log("rendering logos");
            // initialize fabric
            const _t = this;
            window.xcanvas = canvas;

            let images = $(".xs-product-image");
            for (let i = 0; i < images.length; i++) {
                let productImage = $(images[i]).find(".xs-o-img")[0],
                    productImageUrl = $(productImage).attr('src'),
                    productGImage = $(productImage).siblings("img.xs-g-img"),
                    productInput = $(productImage).siblings('[data-logo-product-input]'),
                    params = $(productImage).data('logo-params');

                canvas.clear();
                canvas.off('after:render');
                if (params != null) {
                    let productImageWidth = $(productImage).prop("naturalWidth"),
                        productImageHeight = $(productImage).prop("naturalHeight");

                    let drawHeight = 600.0,
                        ratio = parseFloat(productImageHeight) / parseFloat(drawHeight),
                        drawWidth = parseFloat(productImageWidth) / ratio;
                    canvas.setDimensions({
                        width: drawWidth,
                        height: drawHeight
                    });


                    await new Promise((res, rej) => {
                        // ADD YOUR CODE HERE
                        var img = new Image();
                        img.crossOrigin = "anonymous"; // important - set crossOrigin before src!
                        img.src = productImageUrl;
                        img.onload = function () {
                            canvas.setBackgroundImage(new fabric.Image(img, {
                                scaleX: drawWidth / productImageWidth,
                                scaleY: drawHeight / productImageHeight,
                            }), canvas.renderAll.bind(canvas));
                            res();
                        };

                    });

                    let logoDrawHeight = params.height,
                        // ratio = parseFloat(logoImageHeight) / parseFloat(logoDrawHeight),
                        // logoDrawWidth = parseFloat(logoImageWidth) / ratio;
                        logoDrawWidth = params.width;

                    let LogoImage;
                    await new Promise((res, rej) => {
                        // ADD YOUR CODE HERE
                        var img = new Image();
                        img.crossOrigin = "anonymous"; // important - set crossOrigin before src!
                        img.src = logoUrl;
                        img.onload = async function () {
                            let LogoImage = new fabric.Image(img, {
                                left: params.pos_x,
                                top: params.pos_y,
                                angle: 0,
                                lockUniScaling: true,
                                opacity: 1,
                                crossOrigin: 'anonymous'
                            });

                            LogoImage.scaleToHeight(logoDrawHeight);
                            LogoImage.scaleToWidth(logoDrawWidth);
                            // console.log(logoDrawHeight);
                            // console.log(logoDrawWidth);
                            rPromise = new Promise((res, rej) => {
                                LogoImage.on("added", function () {
                                    canvas.renderAll();
                                    res();
                                });
                            });
                            canvas.add(LogoImage);

                            await rPromise;
                            canvas.renderAll();
                            await new Promise((res, rej) => {
                                console.log("awaiting");

                                var dataURL = canvas.toDataURL({
                                    format: 'png',
                                    multiplier: 2
                                });
                                productGImage.attr('src', dataURL);
                                productInput.val(dataURL);
                                res();
                            })
                            console.log("awaited");

                            res();
                        };

                    });
                }
            }

            _t.showContent();

        },
        // not using anymore
        generateAllLogos: async function (canvas) {
            let logoUrl = "";
            const _t = this;
            images = $("[data-xs-variant-image]");
            for (let i = 0; i < images.length; i++) {
                let input = $(images[i]),
                    iid = input.attr('data-product-id');

                let pr = $(`[data-xs-product=${iid}]`),
                    productImage = pr.find(".xs-o-img")[0],
                    selectedLogo = pr.find("[data-logo-selected-input]").val(),
                    productImageUrl = input.attr('data-url'),
                    params = $(productImage).data('logo-params');

                if (selectedLogo == "") {
                    continue;
                }
                logoUrl = $(`[data-xs-logo=${selectedLogo}]`).find("[data-xs-logo-image]").attr('src');

                canvas.clear();
                canvas.off('after:render');
                if (params != null) {
                    let productImageWidth = $(productImage).prop("naturalWidth"),
                        productImageHeight = $(productImage).prop("naturalHeight");

                    let drawHeight = 600.0,
                        ratio = parseFloat(productImageHeight) / parseFloat(drawHeight),
                        drawWidth = parseFloat(productImageWidth) / ratio;
                    canvas.setDimensions({
                        width: drawWidth,
                        height: drawHeight
                    });


                    await new Promise((res, rej) => {
                        // ADD YOUR CODE HERE
                        var img = new Image();
                        img.crossOrigin = "anonymous"; // important - set crossOrigin before src!
                        img.src = productImageUrl;
                        img.onload = function () {
                            canvas.setBackgroundImage(new fabric.Image(img, {
                                scaleX: drawWidth / productImageWidth,
                                scaleY: drawHeight / productImageHeight,
                            }), canvas.renderAll.bind(canvas));
                            res();
                        };

                    });

                    let logoDrawHeight = params.height,
                        // ratio = parseFloat(logoImageHeight) / parseFloat(logoDrawHeight),
                        // logoDrawWidth = parseFloat(logoImageWidth) / ratio;
                        logoDrawWidth = params.width;

                    let LogoImage;
                    await new Promise((res, rej) => {
                        // ADD YOUR CODE HERE
                        var img = new Image();
                        img.crossOrigin = "anonymous"; // important - set crossOrigin before src!
                        img.src = logoUrl;
                        img.onload = async function () {
                            let LogoImage = new fabric.Image(img, {
                                left: params.pos_x,
                                top: params.pos_y,
                                angle: 0,
                                lockUniScaling: true,
                                opacity: 1,
                                crossOrigin: 'anonymous'
                            });

                            LogoImage.scaleToHeight(logoDrawHeight);
                            LogoImage.scaleToWidth(logoDrawWidth);
                            // console.log(logoDrawHeight);
                            // console.log(logoDrawWidth);
                            rPromise = new Promise((res, rej) => {
                                LogoImage.on("added", function () {
                                    canvas.renderAll();
                                    res();
                                });
                            });
                            canvas.add(LogoImage);

                            await rPromise;
                            canvas.renderAll();
                            await new Promise((res, rej) => {
                                console.log("awaiting");

                                var dataURL = canvas.toDataURL({
                                    format: 'png',
                                    multiplier: 1
                                });
                                input.val(dataURL);
                                res();
                            })
                            console.log("awaited");

                            res();
                        };

                    });
                }
            }
            _t.showContent();
        },

        displayStoreProducts: function (productsJSON) {
            // console.log(productsJSON);
            const _t = this;
            StoreProducts.empty();
            productsJSON.forEach(function (p) {
                let product = Templates.ADDED_PRODUCT(p);
                // console.log(product);
                StoreProducts.append(product);
            });

            _t.setRemoveProductsEvents();
        },
        setRemoveProductsEvents: function () {
            const _t = this;
            StoreProducts.find("[data-xs-product-remove]").on('click', function () {
                _t.bar.startLoading();

                const $this = $(this),
                    product_id = $this.attr('data-xs-product-remove'),
                    store_id = $this.attr('data-store-id');

                _t.sendRequest(URLS.STORE.REMOVE_PRODUCT, {
                    store_id,
                    product_id
                }).then((data) => {
                    _t.displayStoreProducts(data.products);
                    _t.bar.stopLoading();
                })
            });
        },

        createOverlay: function () {
            this.overlay = $("<div></div>").addClass('xs-overlay').appendTo($("body"));
        },
        showOverlay: function () {
            this.overlay.show();
        },
        hideOverlay: function () {
            this.overlay.hide();
        },
        setupModals: function () {
            $(".xs-modal").each(function () {
                $(this).appendTo($("body"));
            });

        },
        setupLogoModal: function () {
            const _t = this;
            _t.logoModal = $(".xs-change-logo-modal");
            const input = $("#xs-modal-logo");

            $("[data-modal-select-logo]").on('click', function () {
                $(this).siblings().removeClass("logo-selected");
                $(this).addClass('logo-selected');
                let id = $(this).data("modal-select-logo");
                input.val(id);
            });
            _t.logoModal.find("[data-action-cancel]").on('click', function () {
                _t.hideLogoModal();
            });


            const dateEl = $("#allcountdownpicker"),
                currentDate = dateEl.data('current');


            // _t.allcountdownPicker = dateEl.datetimepicker({
            //     inline: true,
            //     minDate: dateEl.data("min"),
            //     defaultDate: false,
            //     defaultTime: false
            // });
            window.xsDateEl = dateEl;
            dateEl.filthypillow({
                minDateTime: function () {
                    return moment().subtract("seconds", 1);
                },
                initialDateTime: function () {
                    return moment().add("days", 1);
                }
            });

            dateEl.on("focus", function () {
                dateEl.filthypillow("show");
            });
            dateEl.on("fp:save", function (e, dateObj) {
                dateEl.val(dateObj.format("MMM DD YYYY hh:mm A"));
                dateEl.filthypillow("hide");
            });

            $('#countdownModal').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget) // Button that triggered the modal
                var store = button.data('store') // Extract info from data-* attributes
                // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
                // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
                var modal = $(this);
                modal.find("input").attr('data-store', store);
            });

            $("#closeAllCountdownModal").on('click', function () {
                let modal = $("#countdownModal");
                modal.modal('hide');
                let input = modal.find("input").first();
                let store_id = input.attr('data-store');
                // let data = _t.allcountdownPicker.datetimepicker("getValue").getTime() / 1000;
                let data = dateEl.filthypillow("getDate").toDate().getTime() / 1000;
                _t.sendRequest("/a/locker/dashboard/store/" + store_id + "/set_countdown", {
                    time: `${data}`
                }).then((response) => {
                    let defaultDate = new Date(parseFloat(response.countdown));

                    toastr.success("Countdown set successfully");
                    toastr.success(`This store will close on ${defaultDate.toString()}`);
                })
            });
        },
        setupCountdownModal: function () {
            const _t = this;
            _t.countdownModal = $(".xs-set-countdown-modal");

            _t.countdownModal.find("[data-action-cancel]").on('click', function () {
                _t.hideCountdownModal();
            });

        },
        showCountdownModal: function () {
            const _t = this;
            _t.showOverlay();
            _t.countdownModal.show();

            return new Promise((res, rej) => {
                _t.countdownModal.find("[data-action-set]").on('click', function () {
                    // let input = $("#xs-modal-logo");
                    $(this).off("click");
                    _t.hideCountdownModal();
                    res(_t.countdownPicker.filthypillow("getDate").toDate().getTime() / 1000);
                });
            });
        },
        hideCountdownModal: function () {
            const _t = this;
            _t.hideOverlay();
            _t.countdownModal.hide();
        },
        showLogoModal: function () {
            const _t = this;
            _t.showOverlay();
            _t.logoModal.show();

            return new Promise((res, rej) => {
                _t.logoModal.find("[data-action-change]").on('click', function () {
                    let input = $("#xs-modal-logo");
                    $(this).off("click");
                    _t.hideLogoModal();
                    res(input.val());
                });
            });
        },
        hideLogoModal: function () {
            const _t = this;
            _t.hideOverlay();
            _t.logoModal.hide();
        },

        setAuthLinks: function () {
            let admin_id = Cookies.get('xs_admin'),
                auth_token = Cookies.get("xs_access_token");

            $("[data-g-url]").each(function () {
                let uri = $(this).attr('data-g-url');
                uri = uri.replace("TOKEN", auth_token);
                uri = uri.replace("ID", admin_id);
                $(this).attr('href', uri);
            });
        },
        init: function () {
            window.$ = jq;
            const _t = this;
            _t.setupModals();
            _t.setupLogoModal();
            _t.setupCountdownModal();
            _t.createOverlay();

            _t.verifyAdmin();
            _t.setEvents();

            _t.setAuthLinks();
            $('[data-toggle="tooltip"]').tooltip();
            $("[data-copy-link]").on('click', function () {
                let val = $(this).data('copy-link');
                copy_to_clipboard(location.origin + val);
                let btn = $(this).text("Copied");
                setTimeout(() => {
                    btn.text("Copy Link")
                }, 2000);
            });

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

            $("#xs_logo_file").on('change', function () {
                let input = this;
                console.log('emitted');
                if (input.files && input.files[0]) {
                    console.log(input.files);
                    $("#logo_file_form").submit();
                }
            });
        }
    };

    xs.init();
});

function copy_to_clipboard(text) {
    var input = document.createElement('textarea');
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
}