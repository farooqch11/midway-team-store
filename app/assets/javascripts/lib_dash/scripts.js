/*!
 * Bootstrap v4.5.0 (https://getbootstrap.com/)
 * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery")) : "function" == typeof define && define.amd ? define(["exports", "jquery"], e) : e((t = t || self).bootstrap = {}, t.jQuery)
}(this, (function (t, e) {
    "use strict";

    function n(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    function i(t, e, i) {
        return e && n(t.prototype, e), i && n(t, i), t
    }

    function o(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function r(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(t);
            e && (i = i.filter((function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }))), n.push.apply(n, i)
        }
        return n
    }

    function s(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? r(Object(n), !0).forEach((function (e) {
                o(t, e, n[e])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : r(Object(n)).forEach((function (e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
            }))
        }
        return t
    }
    e = e && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;

    function a(t) {
        var n = this,
            i = !1;
        return e(this).one(l.TRANSITION_END, (function () {
            i = !0
        })), setTimeout((function () {
            i || l.triggerTransitionEnd(n)
        }), t), this
    }
    var l = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function (t) {
            do {
                t += ~~(1e6 * Math.random())
            } while (document.getElementById(t));
            return t
        },
        getSelectorFromElement: function (t) {
            var e = t.getAttribute("data-target");
            if (!e || "#" === e) {
                var n = t.getAttribute("href");
                e = n && "#" !== n ? n.trim() : ""
            }
            try {
                return document.querySelector(e) ? e : null
            } catch (t) {
                return null
            }
        },
        getTransitionDurationFromElement: function (t) {
            if (!t) return 0;
            var n = e(t).css("transition-duration"),
                i = e(t).css("transition-delay"),
                o = parseFloat(n),
                r = parseFloat(i);
            return o || r ? (n = n.split(",")[0], i = i.split(",")[0], 1e3 * (parseFloat(n) + parseFloat(i))) : 0
        },
        reflow: function (t) {
            return t.offsetHeight
        },
        triggerTransitionEnd: function (t) {
            e(t).trigger("transitionend")
        },
        supportsTransitionEnd: function () {
            return Boolean("transitionend")
        },
        isElement: function (t) {
            return (t[0] || t).nodeType
        },
        typeCheckConfig: function (t, e, n) {
            for (var i in n)
                if (Object.prototype.hasOwnProperty.call(n, i)) {
                    var o = n[i],
                        r = e[i],
                        s = r && l.isElement(r) ? "element" : null === (a = r) || "undefined" == typeof a ? "" + a : {}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase();
                    if (!new RegExp(o).test(s)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + s + '" but expected type "' + o + '".')
                } var a
        },
        findShadowRoot: function (t) {
            if (!document.documentElement.attachShadow) return null;
            if ("function" == typeof t.getRootNode) {
                var e = t.getRootNode();
                return e instanceof ShadowRoot ? e : null
            }
            return t instanceof ShadowRoot ? t : t.parentNode ? l.findShadowRoot(t.parentNode) : null
        },
        jQueryDetection: function () {
            if ("undefined" == typeof e) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
            var t = e.fn.jquery.split(" ")[0].split(".");
            if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || t[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
        }
    };
    l.jQueryDetection(), e.fn.emulateTransitionEnd = a, e.event.special[l.TRANSITION_END] = {
        bindType: "transitionend",
        delegateType: "transitionend",
        handle: function (t) {
            if (e(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
        }
    };
    var c = "alert",
        u = e.fn[c],
        h = function () {
            function t(t) {
                this._element = t
            }
            var n = t.prototype;
            return n.close = function (t) {
                var e = this._element;
                t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
            }, n.dispose = function () {
                e.removeData(this._element, "bs.alert"), this._element = null
            }, n._getRootElement = function (t) {
                var n = l.getSelectorFromElement(t),
                    i = !1;
                return n && (i = document.querySelector(n)), i || (i = e(t).closest(".alert")[0]), i
            }, n._triggerCloseEvent = function (t) {
                var n = e.Event("close.bs.alert");
                return e(t).trigger(n), n
            }, n._removeElement = function (t) {
                var n = this;
                if (e(t).removeClass("show"), e(t).hasClass("fade")) {
                    var i = l.getTransitionDurationFromElement(t);
                    e(t).one(l.TRANSITION_END, (function (e) {
                        return n._destroyElement(t, e)
                    })).emulateTransitionEnd(i)
                } else this._destroyElement(t)
            }, n._destroyElement = function (t) {
                e(t).detach().trigger("closed.bs.alert").remove()
            }, t._jQueryInterface = function (n) {
                return this.each((function () {
                    var i = e(this),
                        o = i.data("bs.alert");
                    o || (o = new t(this), i.data("bs.alert", o)), "close" === n && o[n](this)
                }))
            }, t._handleDismiss = function (t) {
                return function (e) {
                    e && e.preventDefault(), t.close(this)
                }
            }, i(t, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }]), t
        }();
    e(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', h._handleDismiss(new h)), e.fn[c] = h._jQueryInterface, e.fn[c].Constructor = h, e.fn[c].noConflict = function () {
        return e.fn[c] = u, h._jQueryInterface
    };
    var f = e.fn.button,
        d = function () {
            function t(t) {
                this._element = t
            }
            var n = t.prototype;
            return n.toggle = function () {
                var t = !0,
                    n = !0,
                    i = e(this._element).closest('[data-toggle="buttons"]')[0];
                if (i) {
                    var o = this._element.querySelector('input:not([type="hidden"])');
                    if (o) {
                        if ("radio" === o.type)
                            if (o.checked && this._element.classList.contains("active")) t = !1;
                            else {
                                var r = i.querySelector(".active");
                                r && e(r).removeClass("active")
                            } t && ("checkbox" !== o.type && "radio" !== o.type || (o.checked = !this._element.classList.contains("active")), e(o).trigger("change")), o.focus(), n = !1
                    }
                }
                this._element.hasAttribute("disabled") || this._element.classList.contains("disabled") || (n && this._element.setAttribute("aria-pressed", !this._element.classList.contains("active")), t && e(this._element).toggleClass("active"))
            }, n.dispose = function () {
                e.removeData(this._element, "bs.button"), this._element = null
            }, t._jQueryInterface = function (n) {
                return this.each((function () {
                    var i = e(this).data("bs.button");
                    i || (i = new t(this), e(this).data("bs.button", i)), "toggle" === n && i[n]()
                }))
            }, i(t, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }]), t
        }();
    e(document).on("click.bs.button.data-api", '[data-toggle^="button"]', (function (t) {
        var n = t.target,
            i = n;
        if (e(n).hasClass("btn") || (n = e(n).closest(".btn")[0]), !n || n.hasAttribute("disabled") || n.classList.contains("disabled")) t.preventDefault();
        else {
            var o = n.querySelector('input:not([type="hidden"])');
            if (o && (o.hasAttribute("disabled") || o.classList.contains("disabled"))) return void t.preventDefault();
            "LABEL" === i.tagName && o && "checkbox" === o.type && t.preventDefault(), d._jQueryInterface.call(e(n), "toggle")
        }
    })).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', (function (t) {
        var n = e(t.target).closest(".btn")[0];
        e(n).toggleClass("focus", /^focus(in)?$/.test(t.type))
    })), e(window).on("load.bs.button.data-api", (function () {
        for (var t = [].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')), e = 0, n = t.length; e < n; e++) {
            var i = t[e],
                o = i.querySelector('input:not([type="hidden"])');
            o.checked || o.hasAttribute("checked") ? i.classList.add("active") : i.classList.remove("active")
        }
        for (var r = 0, s = (t = [].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length; r < s; r++) {
            var a = t[r];
            "true" === a.getAttribute("aria-pressed") ? a.classList.add("active") : a.classList.remove("active")
        }
    })), e.fn.button = d._jQueryInterface, e.fn.button.Constructor = d, e.fn.button.noConflict = function () {
        return e.fn.button = f, d._jQueryInterface
    };
    var p = "carousel",
        m = ".bs.carousel",
        g = e.fn[p],
        v = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0
        },
        _ = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        },
        b = {
            TOUCH: "touch",
            PEN: "pen"
        },
        y = function () {
            function t(t, e) {
                this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(".carousel-indicators"), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
            }
            var n = t.prototype;
            return n.next = function () {
                this._isSliding || this._slide("next")
            }, n.nextWhenVisible = function () {
                !document.hidden && e(this._element).is(":visible") && "hidden" !== e(this._element).css("visibility") && this.next()
            }, n.prev = function () {
                this._isSliding || this._slide("prev")
            }, n.pause = function (t) {
                t || (this._isPaused = !0), this._element.querySelector(".carousel-item-next, .carousel-item-prev") && (l.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
            }, n.cycle = function (t) {
                t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            }, n.to = function (t) {
                var n = this;
                this._activeElement = this._element.querySelector(".active.carousel-item");
                var i = this._getItemIndex(this._activeElement);
                if (!(t > this._items.length - 1 || t < 0))
                    if (this._isSliding) e(this._element).one("slid.bs.carousel", (function () {
                        return n.to(t)
                    }));
                    else {
                        if (i === t) return this.pause(), void this.cycle();
                        var o = t > i ? "next" : "prev";
                        this._slide(o, this._items[t])
                    }
            }, n.dispose = function () {
                e(this._element).off(m), e.removeData(this._element, "bs.carousel"), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
            }, n._getConfig = function (t) {
                return t = s(s({}, v), t), l.typeCheckConfig(p, t, _), t
            }, n._handleSwipe = function () {
                var t = Math.abs(this.touchDeltaX);
                if (!(t <= 40)) {
                    var e = t / this.touchDeltaX;
                    this.touchDeltaX = 0, e > 0 && this.prev(), e < 0 && this.next()
                }
            }, n._addEventListeners = function () {
                var t = this;
                this._config.keyboard && e(this._element).on("keydown.bs.carousel", (function (e) {
                    return t._keydown(e)
                })), "hover" === this._config.pause && e(this._element).on("mouseenter.bs.carousel", (function (e) {
                    return t.pause(e)
                })).on("mouseleave.bs.carousel", (function (e) {
                    return t.cycle(e)
                })), this._config.touch && this._addTouchEventListeners()
            }, n._addTouchEventListeners = function () {
                var t = this;
                if (this._touchSupported) {
                    var n = function (e) {
                            t._pointerEvent && b[e.originalEvent.pointerType.toUpperCase()] ? t.touchStartX = e.originalEvent.clientX : t._pointerEvent || (t.touchStartX = e.originalEvent.touches[0].clientX)
                        },
                        i = function (e) {
                            t._pointerEvent && b[e.originalEvent.pointerType.toUpperCase()] && (t.touchDeltaX = e.originalEvent.clientX - t.touchStartX), t._handleSwipe(), "hover" === t._config.pause && (t.pause(), t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout((function (e) {
                                return t.cycle(e)
                            }), 500 + t._config.interval))
                        };
                    e(this._element.querySelectorAll(".carousel-item img")).on("dragstart.bs.carousel", (function (t) {
                        return t.preventDefault()
                    })), this._pointerEvent ? (e(this._element).on("pointerdown.bs.carousel", (function (t) {
                        return n(t)
                    })), e(this._element).on("pointerup.bs.carousel", (function (t) {
                        return i(t)
                    })), this._element.classList.add("pointer-event")) : (e(this._element).on("touchstart.bs.carousel", (function (t) {
                        return n(t)
                    })), e(this._element).on("touchmove.bs.carousel", (function (e) {
                        return function (e) {
                            e.originalEvent.touches && e.originalEvent.touches.length > 1 ? t.touchDeltaX = 0 : t.touchDeltaX = e.originalEvent.touches[0].clientX - t.touchStartX
                        }(e)
                    })), e(this._element).on("touchend.bs.carousel", (function (t) {
                        return i(t)
                    })))
                }
            }, n._keydown = function (t) {
                if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                    case 37:
                        t.preventDefault(), this.prev();
                        break;
                    case 39:
                        t.preventDefault(), this.next()
                }
            }, n._getItemIndex = function (t) {
                return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(".carousel-item")) : [], this._items.indexOf(t)
            }, n._getItemByDirection = function (t, e) {
                var n = "next" === t,
                    i = "prev" === t,
                    o = this._getItemIndex(e),
                    r = this._items.length - 1;
                if ((i && 0 === o || n && o === r) && !this._config.wrap) return e;
                var s = (o + ("prev" === t ? -1 : 1)) % this._items.length;
                return -1 === s ? this._items[this._items.length - 1] : this._items[s]
            }, n._triggerSlideEvent = function (t, n) {
                var i = this._getItemIndex(t),
                    o = this._getItemIndex(this._element.querySelector(".active.carousel-item")),
                    r = e.Event("slide.bs.carousel", {
                        relatedTarget: t,
                        direction: n,
                        from: o,
                        to: i
                    });
                return e(this._element).trigger(r), r
            }, n._setActiveIndicatorElement = function (t) {
                if (this._indicatorsElement) {
                    var n = [].slice.call(this._indicatorsElement.querySelectorAll(".active"));
                    e(n).removeClass("active");
                    var i = this._indicatorsElement.children[this._getItemIndex(t)];
                    i && e(i).addClass("active")
                }
            }, n._slide = function (t, n) {
                var i, o, r, s = this,
                    a = this._element.querySelector(".active.carousel-item"),
                    c = this._getItemIndex(a),
                    u = n || a && this._getItemByDirection(t, a),
                    h = this._getItemIndex(u),
                    f = Boolean(this._interval);
                if ("next" === t ? (i = "carousel-item-left", o = "carousel-item-next", r = "left") : (i = "carousel-item-right", o = "carousel-item-prev", r = "right"), u && e(u).hasClass("active")) this._isSliding = !1;
                else if (!this._triggerSlideEvent(u, r).isDefaultPrevented() && a && u) {
                    this._isSliding = !0, f && this.pause(), this._setActiveIndicatorElement(u);
                    var d = e.Event("slid.bs.carousel", {
                        relatedTarget: u,
                        direction: r,
                        from: c,
                        to: h
                    });
                    if (e(this._element).hasClass("slide")) {
                        e(u).addClass(o), l.reflow(u), e(a).addClass(i), e(u).addClass(i);
                        var p = parseInt(u.getAttribute("data-interval"), 10);
                        p ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = p) : this._config.interval = this._config.defaultInterval || this._config.interval;
                        var m = l.getTransitionDurationFromElement(a);
                        e(a).one(l.TRANSITION_END, (function () {
                            e(u).removeClass(i + " " + o).addClass("active"), e(a).removeClass("active " + o + " " + i), s._isSliding = !1, setTimeout((function () {
                                return e(s._element).trigger(d)
                            }), 0)
                        })).emulateTransitionEnd(m)
                    } else e(a).removeClass("active"), e(u).addClass("active"), this._isSliding = !1, e(this._element).trigger(d);
                    f && this.cycle()
                }
            }, t._jQueryInterface = function (n) {
                return this.each((function () {
                    var i = e(this).data("bs.carousel"),
                        o = s(s({}, v), e(this).data());
                    "object" == typeof n && (o = s(s({}, o), n));
                    var r = "string" == typeof n ? n : o.slide;
                    if (i || (i = new t(this, o), e(this).data("bs.carousel", i)), "number" == typeof n) i.to(n);
                    else if ("string" == typeof r) {
                        if ("undefined" == typeof i[r]) throw new TypeError('No method named "' + r + '"');
                        i[r]()
                    } else o.interval && o.ride && (i.pause(), i.cycle())
                }))
            }, t._dataApiClickHandler = function (n) {
                var i = l.getSelectorFromElement(this);
                if (i) {
                    var o = e(i)[0];
                    if (o && e(o).hasClass("carousel")) {
                        var r = s(s({}, e(o).data()), e(this).data()),
                            a = this.getAttribute("data-slide-to");
                        a && (r.interval = !1), t._jQueryInterface.call(e(o), r), a && e(o).data("bs.carousel").to(a), n.preventDefault()
                    }
                }
            }, i(t, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }, {
                key: "Default",
                get: function () {
                    return v
                }
            }]), t
        }();
    e(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", y._dataApiClickHandler), e(window).on("load.bs.carousel.data-api", (function () {
        for (var t = [].slice.call(document.querySelectorAll('[data-ride="carousel"]')), n = 0, i = t.length; n < i; n++) {
            var o = e(t[n]);
            y._jQueryInterface.call(o, o.data())
        }
    })), e.fn[p] = y._jQueryInterface, e.fn[p].Constructor = y, e.fn[p].noConflict = function () {
        return e.fn[p] = g, y._jQueryInterface
    };
    var w = "collapse",
        E = e.fn[w],
        T = {
            toggle: !0,
            parent: ""
        },
        C = {
            toggle: "boolean",
            parent: "(string|element)"
        },
        S = function () {
            function t(t, e) {
                this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));
                for (var n = [].slice.call(document.querySelectorAll('[data-toggle="collapse"]')), i = 0, o = n.length; i < o; i++) {
                    var r = n[i],
                        s = l.getSelectorFromElement(r),
                        a = [].slice.call(document.querySelectorAll(s)).filter((function (e) {
                            return e === t
                        }));
                    null !== s && a.length > 0 && (this._selector = s, this._triggerArray.push(r))
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
            }
            var n = t.prototype;
            return n.toggle = function () {
                e(this._element).hasClass("show") ? this.hide() : this.show()
            }, n.show = function () {
                var n, i, o = this;
                if (!this._isTransitioning && !e(this._element).hasClass("show") && (this._parent && 0 === (n = [].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter((function (t) {
                        return "string" == typeof o._config.parent ? t.getAttribute("data-parent") === o._config.parent : t.classList.contains("collapse")
                    }))).length && (n = null), !(n && (i = e(n).not(this._selector).data("bs.collapse")) && i._isTransitioning))) {
                    var r = e.Event("show.bs.collapse");
                    if (e(this._element).trigger(r), !r.isDefaultPrevented()) {
                        n && (t._jQueryInterface.call(e(n).not(this._selector), "hide"), i || e(n).data("bs.collapse", null));
                        var s = this._getDimension();
                        e(this._element).removeClass("collapse").addClass("collapsing"), this._element.style[s] = 0, this._triggerArray.length && e(this._triggerArray).removeClass("collapsed").attr("aria-expanded", !0), this.setTransitioning(!0);
                        var a = "scroll" + (s[0].toUpperCase() + s.slice(1)),
                            c = l.getTransitionDurationFromElement(this._element);
                        e(this._element).one(l.TRANSITION_END, (function () {
                            e(o._element).removeClass("collapsing").addClass("collapse show"), o._element.style[s] = "", o.setTransitioning(!1), e(o._element).trigger("shown.bs.collapse")
                        })).emulateTransitionEnd(c), this._element.style[s] = this._element[a] + "px"
                    }
                }
            }, n.hide = function () {
                var t = this;
                if (!this._isTransitioning && e(this._element).hasClass("show")) {
                    var n = e.Event("hide.bs.collapse");
                    if (e(this._element).trigger(n), !n.isDefaultPrevented()) {
                        var i = this._getDimension();
                        this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", l.reflow(this._element), e(this._element).addClass("collapsing").removeClass("collapse show");
                        var o = this._triggerArray.length;
                        if (o > 0)
                            for (var r = 0; r < o; r++) {
                                var s = this._triggerArray[r],
                                    a = l.getSelectorFromElement(s);
                                if (null !== a) e([].slice.call(document.querySelectorAll(a))).hasClass("show") || e(s).addClass("collapsed").attr("aria-expanded", !1)
                            }
                        this.setTransitioning(!0);
                        this._element.style[i] = "";
                        var c = l.getTransitionDurationFromElement(this._element);
                        e(this._element).one(l.TRANSITION_END, (function () {
                            t.setTransitioning(!1), e(t._element).removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                        })).emulateTransitionEnd(c)
                    }
                }
            }, n.setTransitioning = function (t) {
                this._isTransitioning = t
            }, n.dispose = function () {
                e.removeData(this._element, "bs.collapse"), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
            }, n._getConfig = function (t) {
                return (t = s(s({}, T), t)).toggle = Boolean(t.toggle), l.typeCheckConfig(w, t, C), t
            }, n._getDimension = function () {
                return e(this._element).hasClass("width") ? "width" : "height"
            }, n._getParent = function () {
                var n, i = this;
                l.isElement(this._config.parent) ? (n = this._config.parent, "undefined" != typeof this._config.parent.jquery && (n = this._config.parent[0])) : n = document.querySelector(this._config.parent);
                var o = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
                    r = [].slice.call(n.querySelectorAll(o));
                return e(r).each((function (e, n) {
                    i._addAriaAndCollapsedClass(t._getTargetFromElement(n), [n])
                })), n
            }, n._addAriaAndCollapsedClass = function (t, n) {
                var i = e(t).hasClass("show");
                n.length && e(n).toggleClass("collapsed", !i).attr("aria-expanded", i)
            }, t._getTargetFromElement = function (t) {
                var e = l.getSelectorFromElement(t);
                return e ? document.querySelector(e) : null
            }, t._jQueryInterface = function (n) {
                return this.each((function () {
                    var i = e(this),
                        o = i.data("bs.collapse"),
                        r = s(s(s({}, T), i.data()), "object" == typeof n && n ? n : {});
                    if (!o && r.toggle && "string" == typeof n && /show|hide/.test(n) && (r.toggle = !1), o || (o = new t(this, r), i.data("bs.collapse", o)), "string" == typeof n) {
                        if ("undefined" == typeof o[n]) throw new TypeError('No method named "' + n + '"');
                        o[n]()
                    }
                }))
            }, i(t, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }, {
                key: "Default",
                get: function () {
                    return T
                }
            }]), t
        }();
    e(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', (function (t) {
        "A" === t.currentTarget.tagName && t.preventDefault();
        var n = e(this),
            i = l.getSelectorFromElement(this),
            o = [].slice.call(document.querySelectorAll(i));
        e(o).each((function () {
            var t = e(this),
                i = t.data("bs.collapse") ? "toggle" : n.data();
            S._jQueryInterface.call(t, i)
        }))
    })), e.fn[w] = S._jQueryInterface, e.fn[w].Constructor = S, e.fn[w].noConflict = function () {
        return e.fn[w] = E, S._jQueryInterface
    };
    var D = "undefined" != typeof window && "undefined" != typeof document && "undefined" != typeof navigator,
        k = function () {
            for (var t = ["Edge", "Trident", "Firefox"], e = 0; e < t.length; e += 1)
                if (D && navigator.userAgent.indexOf(t[e]) >= 0) return 1;
            return 0
        }();
    var N = D && window.Promise ? function (t) {
        var e = !1;
        return function () {
            e || (e = !0, window.Promise.resolve().then((function () {
                e = !1, t()
            })))
        }
    } : function (t) {
        var e = !1;
        return function () {
            e || (e = !0, setTimeout((function () {
                e = !1, t()
            }), k))
        }
    };

    function O(t) {
        return t && "[object Function]" === {}.toString.call(t)
    }

    function A(t, e) {
        if (1 !== t.nodeType) return [];
        var n = t.ownerDocument.defaultView.getComputedStyle(t, null);
        return e ? n[e] : n
    }

    function I(t) {
        return "HTML" === t.nodeName ? t : t.parentNode || t.host
    }

    function x(t) {
        if (!t) return document.body;
        switch (t.nodeName) {
            case "HTML":
            case "BODY":
                return t.ownerDocument.body;
            case "#document":
                return t.body
        }
        var e = A(t),
            n = e.overflow,
            i = e.overflowX,
            o = e.overflowY;
        return /(auto|scroll|overlay)/.test(n + o + i) ? t : x(I(t))
    }

    function j(t) {
        return t && t.referenceNode ? t.referenceNode : t
    }
    var L = D && !(!window.MSInputMethodContext || !document.documentMode),
        P = D && /MSIE 10/.test(navigator.userAgent);

    function F(t) {
        return 11 === t ? L : 10 === t ? P : L || P
    }

    function R(t) {
        if (!t) return document.documentElement;
        for (var e = F(10) ? document.body : null, n = t.offsetParent || null; n === e && t.nextElementSibling;) n = (t = t.nextElementSibling).offsetParent;
        var i = n && n.nodeName;
        return i && "BODY" !== i && "HTML" !== i ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === A(n, "position") ? R(n) : n : t ? t.ownerDocument.documentElement : document.documentElement
    }

    function M(t) {
        return null !== t.parentNode ? M(t.parentNode) : t
    }

    function B(t, e) {
        if (!(t && t.nodeType && e && e.nodeType)) return document.documentElement;
        var n = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
            i = n ? t : e,
            o = n ? e : t,
            r = document.createRange();
        r.setStart(i, 0), r.setEnd(o, 0);
        var s, a, l = r.commonAncestorContainer;
        if (t !== l && e !== l || i.contains(o)) return "BODY" === (a = (s = l).nodeName) || "HTML" !== a && R(s.firstElementChild) !== s ? R(l) : l;
        var c = M(t);
        return c.host ? B(c.host, e) : B(t, M(e).host)
    }

    function q(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top",
            n = "top" === e ? "scrollTop" : "scrollLeft",
            i = t.nodeName;
        if ("BODY" === i || "HTML" === i) {
            var o = t.ownerDocument.documentElement,
                r = t.ownerDocument.scrollingElement || o;
            return r[n]
        }
        return t[n]
    }

    function H(t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            i = q(e, "top"),
            o = q(e, "left"),
            r = n ? -1 : 1;
        return t.top += i * r, t.bottom += i * r, t.left += o * r, t.right += o * r, t
    }

    function Q(t, e) {
        var n = "x" === e ? "Left" : "Top",
            i = "Left" === n ? "Right" : "Bottom";
        return parseFloat(t["border" + n + "Width"], 10) + parseFloat(t["border" + i + "Width"], 10)
    }

    function W(t, e, n, i) {
        return Math.max(e["offset" + t], e["scroll" + t], n["client" + t], n["offset" + t], n["scroll" + t], F(10) ? parseInt(n["offset" + t]) + parseInt(i["margin" + ("Height" === t ? "Top" : "Left")]) + parseInt(i["margin" + ("Height" === t ? "Bottom" : "Right")]) : 0)
    }

    function U(t) {
        var e = t.body,
            n = t.documentElement,
            i = F(10) && getComputedStyle(n);
        return {
            height: W("Height", e, n, i),
            width: W("Width", e, n, i)
        }
    }
    var V = function (t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        },
        Y = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }
            return function (e, n, i) {
                return n && t(e.prototype, n), i && t(e, i), e
            }
        }(),
        z = function (t, e, n) {
            return e in t ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = n, t
        },
        X = Object.assign || function (t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
            }
            return t
        };

    function K(t) {
        return X({}, t, {
            right: t.left + t.width,
            bottom: t.top + t.height
        })
    }

    function G(t) {
        var e = {};
        try {
            if (F(10)) {
                e = t.getBoundingClientRect();
                var n = q(t, "top"),
                    i = q(t, "left");
                e.top += n, e.left += i, e.bottom += n, e.right += i
            } else e = t.getBoundingClientRect()
        } catch (t) {}
        var o = {
                left: e.left,
                top: e.top,
                width: e.right - e.left,
                height: e.bottom - e.top
            },
            r = "HTML" === t.nodeName ? U(t.ownerDocument) : {},
            s = r.width || t.clientWidth || o.width,
            a = r.height || t.clientHeight || o.height,
            l = t.offsetWidth - s,
            c = t.offsetHeight - a;
        if (l || c) {
            var u = A(t);
            l -= Q(u, "x"), c -= Q(u, "y"), o.width -= l, o.height -= c
        }
        return K(o)
    }

    function $(t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            i = F(10),
            o = "HTML" === e.nodeName,
            r = G(t),
            s = G(e),
            a = x(t),
            l = A(e),
            c = parseFloat(l.borderTopWidth, 10),
            u = parseFloat(l.borderLeftWidth, 10);
        n && o && (s.top = Math.max(s.top, 0), s.left = Math.max(s.left, 0));
        var h = K({
            top: r.top - s.top - c,
            left: r.left - s.left - u,
            width: r.width,
            height: r.height
        });
        if (h.marginTop = 0, h.marginLeft = 0, !i && o) {
            var f = parseFloat(l.marginTop, 10),
                d = parseFloat(l.marginLeft, 10);
            h.top -= c - f, h.bottom -= c - f, h.left -= u - d, h.right -= u - d, h.marginTop = f, h.marginLeft = d
        }
        return (i && !n ? e.contains(a) : e === a && "BODY" !== a.nodeName) && (h = H(h, e)), h
    }

    function J(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = t.ownerDocument.documentElement,
            i = $(t, n),
            o = Math.max(n.clientWidth, window.innerWidth || 0),
            r = Math.max(n.clientHeight, window.innerHeight || 0),
            s = e ? 0 : q(n),
            a = e ? 0 : q(n, "left"),
            l = {
                top: s - i.top + i.marginTop,
                left: a - i.left + i.marginLeft,
                width: o,
                height: r
            };
        return K(l)
    }

    function Z(t) {
        var e = t.nodeName;
        if ("BODY" === e || "HTML" === e) return !1;
        if ("fixed" === A(t, "position")) return !0;
        var n = I(t);
        return !!n && Z(n)
    }

    function tt(t) {
        if (!t || !t.parentElement || F()) return document.documentElement;
        for (var e = t.parentElement; e && "none" === A(e, "transform");) e = e.parentElement;
        return e || document.documentElement
    }

    function et(t, e, n, i) {
        var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
            r = {
                top: 0,
                left: 0
            },
            s = o ? tt(t) : B(t, j(e));
        if ("viewport" === i) r = J(s, o);
        else {
            var a = void 0;
            "scrollParent" === i ? "BODY" === (a = x(I(e))).nodeName && (a = t.ownerDocument.documentElement) : a = "window" === i ? t.ownerDocument.documentElement : i;
            var l = $(a, s, o);
            if ("HTML" !== a.nodeName || Z(s)) r = l;
            else {
                var c = U(t.ownerDocument),
                    u = c.height,
                    h = c.width;
                r.top += l.top - l.marginTop, r.bottom = u + l.top, r.left += l.left - l.marginLeft, r.right = h + l.left
            }
        }
        var f = "number" == typeof (n = n || 0);
        return r.left += f ? n : n.left || 0, r.top += f ? n : n.top || 0, r.right -= f ? n : n.right || 0, r.bottom -= f ? n : n.bottom || 0, r
    }

    function nt(t) {
        return t.width * t.height
    }

    function it(t, e, n, i, o) {
        var r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === t.indexOf("auto")) return t;
        var s = et(n, i, r, o),
            a = {
                top: {
                    width: s.width,
                    height: e.top - s.top
                },
                right: {
                    width: s.right - e.right,
                    height: s.height
                },
                bottom: {
                    width: s.width,
                    height: s.bottom - e.bottom
                },
                left: {
                    width: e.left - s.left,
                    height: s.height
                }
            },
            l = Object.keys(a).map((function (t) {
                return X({
                    key: t
                }, a[t], {
                    area: nt(a[t])
                })
            })).sort((function (t, e) {
                return e.area - t.area
            })),
            c = l.filter((function (t) {
                var e = t.width,
                    i = t.height;
                return e >= n.clientWidth && i >= n.clientHeight
            })),
            u = c.length > 0 ? c[0].key : l[0].key,
            h = t.split("-")[1];
        return u + (h ? "-" + h : "")
    }

    function ot(t, e, n) {
        var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
            o = i ? tt(e) : B(e, j(n));
        return $(n, o, i)
    }

    function rt(t) {
        var e = t.ownerDocument.defaultView.getComputedStyle(t),
            n = parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
            i = parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0);
        return {
            width: t.offsetWidth + i,
            height: t.offsetHeight + n
        }
    }

    function st(t) {
        var e = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return t.replace(/left|right|bottom|top/g, (function (t) {
            return e[t]
        }))
    }

    function at(t, e, n) {
        n = n.split("-")[0];
        var i = rt(t),
            o = {
                width: i.width,
                height: i.height
            },
            r = -1 !== ["right", "left"].indexOf(n),
            s = r ? "top" : "left",
            a = r ? "left" : "top",
            l = r ? "height" : "width",
            c = r ? "width" : "height";
        return o[s] = e[s] + e[l] / 2 - i[l] / 2, o[a] = n === a ? e[a] - i[c] : e[st(a)], o
    }

    function lt(t, e) {
        return Array.prototype.find ? t.find(e) : t.filter(e)[0]
    }

    function ct(t, e, n) {
        return (void 0 === n ? t : t.slice(0, function (t, e, n) {
            if (Array.prototype.findIndex) return t.findIndex((function (t) {
                return t[e] === n
            }));
            var i = lt(t, (function (t) {
                return t[e] === n
            }));
            return t.indexOf(i)
        }(t, "name", n))).forEach((function (t) {
            t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var n = t.function || t.fn;
            t.enabled && O(n) && (e.offsets.popper = K(e.offsets.popper), e.offsets.reference = K(e.offsets.reference), e = n(e, t))
        })), e
    }

    function ut() {
        if (!this.state.isDestroyed) {
            var t = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            t.offsets.reference = ot(this.state, this.popper, this.reference, this.options.positionFixed), t.placement = it(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.positionFixed = this.options.positionFixed, t.offsets.popper = at(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", t = ct(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t))
        }
    }

    function ht(t, e) {
        return t.some((function (t) {
            var n = t.name;
            return t.enabled && n === e
        }))
    }

    function ft(t) {
        for (var e = [!1, "ms", "Webkit", "Moz", "O"], n = t.charAt(0).toUpperCase() + t.slice(1), i = 0; i < e.length; i++) {
            var o = e[i],
                r = o ? "" + o + n : t;
            if ("undefined" != typeof document.body.style[r]) return r
        }
        return null
    }

    function dt() {
        return this.state.isDestroyed = !0, ht(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[ft("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }

    function pt(t) {
        var e = t.ownerDocument;
        return e ? e.defaultView : window
    }

    function mt(t, e, n, i) {
        n.updateBound = i, pt(t).addEventListener("resize", n.updateBound, {
            passive: !0
        });
        var o = x(t);
        return function t(e, n, i, o) {
            var r = "BODY" === e.nodeName,
                s = r ? e.ownerDocument.defaultView : e;
            s.addEventListener(n, i, {
                passive: !0
            }), r || t(x(s.parentNode), n, i, o), o.push(s)
        }(o, "scroll", n.updateBound, n.scrollParents), n.scrollElement = o, n.eventsEnabled = !0, n
    }

    function gt() {
        this.state.eventsEnabled || (this.state = mt(this.reference, this.options, this.state, this.scheduleUpdate))
    }

    function vt() {
        var t, e;
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = (t = this.reference, e = this.state, pt(t).removeEventListener("resize", e.updateBound), e.scrollParents.forEach((function (t) {
            t.removeEventListener("scroll", e.updateBound)
        })), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e))
    }

    function _t(t) {
        return "" !== t && !isNaN(parseFloat(t)) && isFinite(t)
    }

    function bt(t, e) {
        Object.keys(e).forEach((function (n) {
            var i = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && _t(e[n]) && (i = "px"), t.style[n] = e[n] + i
        }))
    }
    var yt = D && /Firefox/i.test(navigator.userAgent);

    function wt(t, e, n) {
        var i = lt(t, (function (t) {
                return t.name === e
            })),
            o = !!i && t.some((function (t) {
                return t.name === n && t.enabled && t.order < i.order
            }));
        if (!o) {
            var r = "`" + e + "`",
                s = "`" + n + "`";
            console.warn(s + " modifier is required by " + r + " modifier in order to work, be sure to include it before " + r + "!")
        }
        return o
    }
    var Et = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        Tt = Et.slice(3);

    function Ct(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = Tt.indexOf(t),
            i = Tt.slice(n + 1).concat(Tt.slice(0, n));
        return e ? i.reverse() : i
    }
    var St = "flip",
        Dt = "clockwise",
        kt = "counterclockwise";

    function Nt(t, e, n, i) {
        var o = [0, 0],
            r = -1 !== ["right", "left"].indexOf(i),
            s = t.split(/(\+|\-)/).map((function (t) {
                return t.trim()
            })),
            a = s.indexOf(lt(s, (function (t) {
                return -1 !== t.search(/,|\s/)
            })));
        s[a] && -1 === s[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var l = /\s*,\s*|\s+/,
            c = -1 !== a ? [s.slice(0, a).concat([s[a].split(l)[0]]), [s[a].split(l)[1]].concat(s.slice(a + 1))] : [s];
        return (c = c.map((function (t, i) {
            var o = (1 === i ? !r : r) ? "height" : "width",
                s = !1;
            return t.reduce((function (t, e) {
                return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e, s = !0, t) : s ? (t[t.length - 1] += e, s = !1, t) : t.concat(e)
            }), []).map((function (t) {
                return function (t, e, n, i) {
                    var o = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                        r = +o[1],
                        s = o[2];
                    if (!r) return t;
                    if (0 === s.indexOf("%")) {
                        var a = void 0;
                        switch (s) {
                            case "%p":
                                a = n;
                                break;
                            case "%":
                            case "%r":
                            default:
                                a = i
                        }
                        return K(a)[e] / 100 * r
                    }
                    if ("vh" === s || "vw" === s) {
                        return ("vh" === s ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * r
                    }
                    return r
                }(t, o, e, n)
            }))
        }))).forEach((function (t, e) {
            t.forEach((function (n, i) {
                _t(n) && (o[e] += n * ("-" === t[i - 1] ? -1 : 1))
            }))
        })), o
    }
    var Ot = {
            placement: "bottom",
            positionFixed: !1,
            eventsEnabled: !0,
            removeOnDestroy: !1,
            onCreate: function () {},
            onUpdate: function () {},
            modifiers: {
                shift: {
                    order: 100,
                    enabled: !0,
                    fn: function (t) {
                        var e = t.placement,
                            n = e.split("-")[0],
                            i = e.split("-")[1];
                        if (i) {
                            var o = t.offsets,
                                r = o.reference,
                                s = o.popper,
                                a = -1 !== ["bottom", "top"].indexOf(n),
                                l = a ? "left" : "top",
                                c = a ? "width" : "height",
                                u = {
                                    start: z({}, l, r[l]),
                                    end: z({}, l, r[l] + r[c] - s[c])
                                };
                            t.offsets.popper = X({}, s, u[i])
                        }
                        return t
                    }
                },
                offset: {
                    order: 200,
                    enabled: !0,
                    fn: function (t, e) {
                        var n = e.offset,
                            i = t.placement,
                            o = t.offsets,
                            r = o.popper,
                            s = o.reference,
                            a = i.split("-")[0],
                            l = void 0;
                        return l = _t(+n) ? [+n, 0] : Nt(n, r, s, a), "left" === a ? (r.top += l[0], r.left -= l[1]) : "right" === a ? (r.top += l[0], r.left += l[1]) : "top" === a ? (r.left += l[0], r.top -= l[1]) : "bottom" === a && (r.left += l[0], r.top += l[1]), t.popper = r, t
                    },
                    offset: 0
                },
                preventOverflow: {
                    order: 300,
                    enabled: !0,
                    fn: function (t, e) {
                        var n = e.boundariesElement || R(t.instance.popper);
                        t.instance.reference === n && (n = R(n));
                        var i = ft("transform"),
                            o = t.instance.popper.style,
                            r = o.top,
                            s = o.left,
                            a = o[i];
                        o.top = "", o.left = "", o[i] = "";
                        var l = et(t.instance.popper, t.instance.reference, e.padding, n, t.positionFixed);
                        o.top = r, o.left = s, o[i] = a, e.boundaries = l;
                        var c = e.priority,
                            u = t.offsets.popper,
                            h = {
                                primary: function (t) {
                                    var n = u[t];
                                    return u[t] < l[t] && !e.escapeWithReference && (n = Math.max(u[t], l[t])), z({}, t, n)
                                },
                                secondary: function (t) {
                                    var n = "right" === t ? "left" : "top",
                                        i = u[n];
                                    return u[t] > l[t] && !e.escapeWithReference && (i = Math.min(u[n], l[t] - ("right" === t ? u.width : u.height))), z({}, n, i)
                                }
                            };
                        return c.forEach((function (t) {
                            var e = -1 !== ["left", "top"].indexOf(t) ? "primary" : "secondary";
                            u = X({}, u, h[e](t))
                        })), t.offsets.popper = u, t
                    },
                    priority: ["left", "right", "top", "bottom"],
                    padding: 5,
                    boundariesElement: "scrollParent"
                },
                keepTogether: {
                    order: 400,
                    enabled: !0,
                    fn: function (t) {
                        var e = t.offsets,
                            n = e.popper,
                            i = e.reference,
                            o = t.placement.split("-")[0],
                            r = Math.floor,
                            s = -1 !== ["top", "bottom"].indexOf(o),
                            a = s ? "right" : "bottom",
                            l = s ? "left" : "top",
                            c = s ? "width" : "height";
                        return n[a] < r(i[l]) && (t.offsets.popper[l] = r(i[l]) - n[c]), n[l] > r(i[a]) && (t.offsets.popper[l] = r(i[a])), t
                    }
                },
                arrow: {
                    order: 500,
                    enabled: !0,
                    fn: function (t, e) {
                        var n;
                        if (!wt(t.instance.modifiers, "arrow", "keepTogether")) return t;
                        var i = e.element;
                        if ("string" == typeof i) {
                            if (!(i = t.instance.popper.querySelector(i))) return t
                        } else if (!t.instance.popper.contains(i)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t;
                        var o = t.placement.split("-")[0],
                            r = t.offsets,
                            s = r.popper,
                            a = r.reference,
                            l = -1 !== ["left", "right"].indexOf(o),
                            c = l ? "height" : "width",
                            u = l ? "Top" : "Left",
                            h = u.toLowerCase(),
                            f = l ? "left" : "top",
                            d = l ? "bottom" : "right",
                            p = rt(i)[c];
                        a[d] - p < s[h] && (t.offsets.popper[h] -= s[h] - (a[d] - p)), a[h] + p > s[d] && (t.offsets.popper[h] += a[h] + p - s[d]), t.offsets.popper = K(t.offsets.popper);
                        var m = a[h] + a[c] / 2 - p / 2,
                            g = A(t.instance.popper),
                            v = parseFloat(g["margin" + u], 10),
                            _ = parseFloat(g["border" + u + "Width"], 10),
                            b = m - t.offsets.popper[h] - v - _;
                        return b = Math.max(Math.min(s[c] - p, b), 0), t.arrowElement = i, t.offsets.arrow = (z(n = {}, h, Math.round(b)), z(n, f, ""), n), t
                    },
                    element: "[x-arrow]"
                },
                flip: {
                    order: 600,
                    enabled: !0,
                    fn: function (t, e) {
                        if (ht(t.instance.modifiers, "inner")) return t;
                        if (t.flipped && t.placement === t.originalPlacement) return t;
                        var n = et(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement, t.positionFixed),
                            i = t.placement.split("-")[0],
                            o = st(i),
                            r = t.placement.split("-")[1] || "",
                            s = [];
                        switch (e.behavior) {
                            case St:
                                s = [i, o];
                                break;
                            case Dt:
                                s = Ct(i);
                                break;
                            case kt:
                                s = Ct(i, !0);
                                break;
                            default:
                                s = e.behavior
                        }
                        return s.forEach((function (a, l) {
                            if (i !== a || s.length === l + 1) return t;
                            i = t.placement.split("-")[0], o = st(i);
                            var c = t.offsets.popper,
                                u = t.offsets.reference,
                                h = Math.floor,
                                f = "left" === i && h(c.right) > h(u.left) || "right" === i && h(c.left) < h(u.right) || "top" === i && h(c.bottom) > h(u.top) || "bottom" === i && h(c.top) < h(u.bottom),
                                d = h(c.left) < h(n.left),
                                p = h(c.right) > h(n.right),
                                m = h(c.top) < h(n.top),
                                g = h(c.bottom) > h(n.bottom),
                                v = "left" === i && d || "right" === i && p || "top" === i && m || "bottom" === i && g,
                                _ = -1 !== ["top", "bottom"].indexOf(i),
                                b = !!e.flipVariations && (_ && "start" === r && d || _ && "end" === r && p || !_ && "start" === r && m || !_ && "end" === r && g),
                                y = !!e.flipVariationsByContent && (_ && "start" === r && p || _ && "end" === r && d || !_ && "start" === r && g || !_ && "end" === r && m),
                                w = b || y;
                            (f || v || w) && (t.flipped = !0, (f || v) && (i = s[l + 1]), w && (r = function (t) {
                                return "end" === t ? "start" : "start" === t ? "end" : t
                            }(r)), t.placement = i + (r ? "-" + r : ""), t.offsets.popper = X({}, t.offsets.popper, at(t.instance.popper, t.offsets.reference, t.placement)), t = ct(t.instance.modifiers, t, "flip"))
                        })), t
                    },
                    behavior: "flip",
                    padding: 5,
                    boundariesElement: "viewport",
                    flipVariations: !1,
                    flipVariationsByContent: !1
                },
                inner: {
                    order: 700,
                    enabled: !1,
                    fn: function (t) {
                        var e = t.placement,
                            n = e.split("-")[0],
                            i = t.offsets,
                            o = i.popper,
                            r = i.reference,
                            s = -1 !== ["left", "right"].indexOf(n),
                            a = -1 === ["top", "left"].indexOf(n);
                        return o[s ? "left" : "top"] = r[n] - (a ? o[s ? "width" : "height"] : 0), t.placement = st(e), t.offsets.popper = K(o), t
                    }
                },
                hide: {
                    order: 800,
                    enabled: !0,
                    fn: function (t) {
                        if (!wt(t.instance.modifiers, "hide", "preventOverflow")) return t;
                        var e = t.offsets.reference,
                            n = lt(t.instance.modifiers, (function (t) {
                                return "preventOverflow" === t.name
                            })).boundaries;
                        if (e.bottom < n.top || e.left > n.right || e.top > n.bottom || e.right < n.left) {
                            if (!0 === t.hide) return t;
                            t.hide = !0, t.attributes["x-out-of-boundaries"] = ""
                        } else {
                            if (!1 === t.hide) return t;
                            t.hide = !1, t.attributes["x-out-of-boundaries"] = !1
                        }
                        return t
                    }
                },
                computeStyle: {
                    order: 850,
                    enabled: !0,
                    fn: function (t, e) {
                        var n = e.x,
                            i = e.y,
                            o = t.offsets.popper,
                            r = lt(t.instance.modifiers, (function (t) {
                                return "applyStyle" === t.name
                            })).gpuAcceleration;
                        void 0 !== r && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                        var s = void 0 !== r ? r : e.gpuAcceleration,
                            a = R(t.instance.popper),
                            l = G(a),
                            c = {
                                position: o.position
                            },
                            u = function (t, e) {
                                var n = t.offsets,
                                    i = n.popper,
                                    o = n.reference,
                                    r = Math.round,
                                    s = Math.floor,
                                    a = function (t) {
                                        return t
                                    },
                                    l = r(o.width),
                                    c = r(i.width),
                                    u = -1 !== ["left", "right"].indexOf(t.placement),
                                    h = -1 !== t.placement.indexOf("-"),
                                    f = e ? u || h || l % 2 == c % 2 ? r : s : a,
                                    d = e ? r : a;
                                return {
                                    left: f(l % 2 == 1 && c % 2 == 1 && !h && e ? i.left - 1 : i.left),
                                    top: d(i.top),
                                    bottom: d(i.bottom),
                                    right: f(i.right)
                                }
                            }(t, window.devicePixelRatio < 2 || !yt),
                            h = "bottom" === n ? "top" : "bottom",
                            f = "right" === i ? "left" : "right",
                            d = ft("transform"),
                            p = void 0,
                            m = void 0;
                        if (m = "bottom" === h ? "HTML" === a.nodeName ? -a.clientHeight + u.bottom : -l.height + u.bottom : u.top, p = "right" === f ? "HTML" === a.nodeName ? -a.clientWidth + u.right : -l.width + u.right : u.left, s && d) c[d] = "translate3d(" + p + "px, " + m + "px, 0)", c[h] = 0, c[f] = 0, c.willChange = "transform";
                        else {
                            var g = "bottom" === h ? -1 : 1,
                                v = "right" === f ? -1 : 1;
                            c[h] = m * g, c[f] = p * v, c.willChange = h + ", " + f
                        }
                        var _ = {
                            "x-placement": t.placement
                        };
                        return t.attributes = X({}, _, t.attributes), t.styles = X({}, c, t.styles), t.arrowStyles = X({}, t.offsets.arrow, t.arrowStyles), t
                    },
                    gpuAcceleration: !0,
                    x: "bottom",
                    y: "right"
                },
                applyStyle: {
                    order: 900,
                    enabled: !0,
                    fn: function (t) {
                        var e, n;
                        return bt(t.instance.popper, t.styles), e = t.instance.popper, n = t.attributes, Object.keys(n).forEach((function (t) {
                            !1 !== n[t] ? e.setAttribute(t, n[t]) : e.removeAttribute(t)
                        })), t.arrowElement && Object.keys(t.arrowStyles).length && bt(t.arrowElement, t.arrowStyles), t
                    },
                    onLoad: function (t, e, n, i, o) {
                        var r = ot(o, e, t, n.positionFixed),
                            s = it(n.placement, r, e, t, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
                        return e.setAttribute("x-placement", s), bt(e, {
                            position: n.positionFixed ? "fixed" : "absolute"
                        }), n
                    },
                    gpuAcceleration: void 0
                }
            }
        },
        At = function () {
            function t(e, n) {
                var i = this,
                    o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                V(this, t), this.scheduleUpdate = function () {
                    return requestAnimationFrame(i.update)
                }, this.update = N(this.update.bind(this)), this.options = X({}, t.Defaults, o), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = e && e.jquery ? e[0] : e, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(X({}, t.Defaults.modifiers, o.modifiers)).forEach((function (e) {
                    i.options.modifiers[e] = X({}, t.Defaults.modifiers[e] || {}, o.modifiers ? o.modifiers[e] : {})
                })), this.modifiers = Object.keys(this.options.modifiers).map((function (t) {
                    return X({
                        name: t
                    }, i.options.modifiers[t])
                })).sort((function (t, e) {
                    return t.order - e.order
                })), this.modifiers.forEach((function (t) {
                    t.enabled && O(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state)
                })), this.update();
                var r = this.options.eventsEnabled;
                r && this.enableEventListeners(), this.state.eventsEnabled = r
            }
            return Y(t, [{
                key: "update",
                value: function () {
                    return ut.call(this)
                }
            }, {
                key: "destroy",
                value: function () {
                    return dt.call(this)
                }
            }, {
                key: "enableEventListeners",
                value: function () {
                    return gt.call(this)
                }
            }, {
                key: "disableEventListeners",
                value: function () {
                    return vt.call(this)
                }
            }]), t
        }();
    At.Utils = ("undefined" != typeof window ? window : global).PopperUtils, At.placements = Et, At.Defaults = Ot;
    var It = "dropdown",
        xt = e.fn[It],
        jt = new RegExp("38|40|27"),
        Lt = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic",
            popperConfig: null
        },
        Pt = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string",
            popperConfig: "(null|object)"
        },
        Ft = function () {
            function t(t, e) {
                this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
            }
            var n = t.prototype;
            return n.toggle = function () {
                if (!this._element.disabled && !e(this._element).hasClass("disabled")) {
                    var n = e(this._menu).hasClass("show");
                    t._clearMenus(), n || this.show(!0)
                }
            }, n.show = function (n) {
                if (void 0 === n && (n = !1), !(this._element.disabled || e(this._element).hasClass("disabled") || e(this._menu).hasClass("show"))) {
                    var i = {
                            relatedTarget: this._element
                        },
                        o = e.Event("show.bs.dropdown", i),
                        r = t._getParentFromElement(this._element);
                    if (e(r).trigger(o), !o.isDefaultPrevented()) {
                        if (!this._inNavbar && n) {
                            if ("undefined" == typeof At) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                            var s = this._element;
                            "parent" === this._config.reference ? s = r : l.isElement(this._config.reference) && (s = this._config.reference, "undefined" != typeof this._config.reference.jquery && (s = this._config.reference[0])), "scrollParent" !== this._config.boundary && e(r).addClass("position-static"), this._popper = new At(s, this._menu, this._getPopperConfig())
                        }
                        "ontouchstart" in document.documentElement && 0 === e(r).closest(".navbar-nav").length && e(document.body).children().on("mouseover", null, e.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), e(this._menu).toggleClass("show"), e(r).toggleClass("show").trigger(e.Event("shown.bs.dropdown", i))
                    }
                }
            }, n.hide = function () {
                if (!this._element.disabled && !e(this._element).hasClass("disabled") && e(this._menu).hasClass("show")) {
                    var n = {
                            relatedTarget: this._element
                        },
                        i = e.Event("hide.bs.dropdown", n),
                        o = t._getParentFromElement(this._element);
                    e(o).trigger(i), i.isDefaultPrevented() || (this._popper && this._popper.destroy(), e(this._menu).toggleClass("show"), e(o).toggleClass("show").trigger(e.Event("hidden.bs.dropdown", n)))
                }
            }, n.dispose = function () {
                e.removeData(this._element, "bs.dropdown"), e(this._element).off(".bs.dropdown"), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
            }, n.update = function () {
                this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
            }, n._addEventListeners = function () {
                var t = this;
                e(this._element).on("click.bs.dropdown", (function (e) {
                    e.preventDefault(), e.stopPropagation(), t.toggle()
                }))
            }, n._getConfig = function (t) {
                return t = s(s(s({}, this.constructor.Default), e(this._element).data()), t), l.typeCheckConfig(It, t, this.constructor.DefaultType), t
            }, n._getMenuElement = function () {
                if (!this._menu) {
                    var e = t._getParentFromElement(this._element);
                    e && (this._menu = e.querySelector(".dropdown-menu"))
                }
                return this._menu
            }, n._getPlacement = function () {
                var t = e(this._element.parentNode),
                    n = "bottom-start";
                return t.hasClass("dropup") ? n = e(this._menu).hasClass("dropdown-menu-right") ? "top-end" : "top-start" : t.hasClass("dropright") ? n = "right-start" : t.hasClass("dropleft") ? n = "left-start" : e(this._menu).hasClass("dropdown-menu-right") && (n = "bottom-end"), n
            }, n._detectNavbar = function () {
                return e(this._element).closest(".navbar").length > 0
            }, n._getOffset = function () {
                var t = this,
                    e = {};
                return "function" == typeof this._config.offset ? e.fn = function (e) {
                    return e.offsets = s(s({}, e.offsets), t._config.offset(e.offsets, t._element) || {}), e
                } : e.offset = this._config.offset, e
            }, n._getPopperConfig = function () {
                var t = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            enabled: this._config.flip
                        },
                        preventOverflow: {
                            boundariesElement: this._config.boundary
                        }
                    }
                };
                return "static" === this._config.display && (t.modifiers.applyStyle = {
                    enabled: !1
                }), s(s({}, t), this._config.popperConfig)
            }, t._jQueryInterface = function (n) {
                return this.each((function () {
                    var i = e(this).data("bs.dropdown");
                    if (i || (i = new t(this, "object" == typeof n ? n : null), e(this).data("bs.dropdown", i)), "string" == typeof n) {
                        if ("undefined" == typeof i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n]()
                    }
                }))
            }, t._clearMenus = function (n) {
                if (!n || 3 !== n.which && ("keyup" !== n.type || 9 === n.which))
                    for (var i = [].slice.call(document.querySelectorAll('[data-toggle="dropdown"]')), o = 0, r = i.length; o < r; o++) {
                        var s = t._getParentFromElement(i[o]),
                            a = e(i[o]).data("bs.dropdown"),
                            l = {
                                relatedTarget: i[o]
                            };
                        if (n && "click" === n.type && (l.clickEvent = n), a) {
                            var c = a._menu;
                            if (e(s).hasClass("show") && !(n && ("click" === n.type && /input|textarea/i.test(n.target.tagName) || "keyup" === n.type && 9 === n.which) && e.contains(s, n.target))) {
                                var u = e.Event("hide.bs.dropdown", l);
                                e(s).trigger(u), u.isDefaultPrevented() || ("ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop), i[o].setAttribute("aria-expanded", "false"), a._popper && a._popper.destroy(), e(c).removeClass("show"), e(s).removeClass("show").trigger(e.Event("hidden.bs.dropdown", l)))
                            }
                        }
                    }
            }, t._getParentFromElement = function (t) {
                var e, n = l.getSelectorFromElement(t);
                return n && (e = document.querySelector(n)), e || t.parentNode
            }, t._dataApiKeydownHandler = function (n) {
                if (!(/input|textarea/i.test(n.target.tagName) ? 32 === n.which || 27 !== n.which && (40 !== n.which && 38 !== n.which || e(n.target).closest(".dropdown-menu").length) : !jt.test(n.which)) && !this.disabled && !e(this).hasClass("disabled")) {
                    var i = t._getParentFromElement(this),
                        o = e(i).hasClass("show");
                    if (o || 27 !== n.which) {
                        if (n.preventDefault(), n.stopPropagation(), !o || o && (27 === n.which || 32 === n.which)) return 27 === n.which && e(i.querySelector('[data-toggle="dropdown"]')).trigger("focus"), void e(this).trigger("click");
                        var r = [].slice.call(i.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter((function (t) {
                            return e(t).is(":visible")
                        }));
                        if (0 !== r.length) {
                            var s = r.indexOf(n.target);
                            38 === n.which && s > 0 && s--, 40 === n.which && s < r.length - 1 && s++, s < 0 && (s = 0), r[s].focus()
                        }
                    }
                }
            }, i(t, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }, {
                key: "Default",
                get: function () {
                    return Lt
                }
            }, {
                key: "DefaultType",
                get: function () {
                    return Pt
                }
            }]), t
        }();
    e(document).on("keydown.bs.dropdown.data-api", '[data-toggle="dropdown"]', Ft._dataApiKeydownHandler).on("keydown.bs.dropdown.data-api", ".dropdown-menu", Ft._dataApiKeydownHandler).on("click.bs.dropdown.data-api keyup.bs.dropdown.data-api", Ft._clearMenus).on("click.bs.dropdown.data-api", '[data-toggle="dropdown"]', (function (t) {
        t.preventDefault(), t.stopPropagation(), Ft._jQueryInterface.call(e(this), "toggle")
    })).on("click.bs.dropdown.data-api", ".dropdown form", (function (t) {
        t.stopPropagation()
    })), e.fn[It] = Ft._jQueryInterface, e.fn[It].Constructor = Ft, e.fn[It].noConflict = function () {
        return e.fn[It] = xt, Ft._jQueryInterface
    };
    var Rt = e.fn.modal,
        Mt = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        },
        Bt = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        },
        qt = function () {
            function t(t, e) {
                this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(".modal-dialog"), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
            }
            var n = t.prototype;
            return n.toggle = function (t) {
                return this._isShown ? this.hide() : this.show(t)
            }, n.show = function (t) {
                var n = this;
                if (!this._isShown && !this._isTransitioning) {
                    e(this._element).hasClass("fade") && (this._isTransitioning = !0);
                    var i = e.Event("show.bs.modal", {
                        relatedTarget: t
                    });
                    e(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), e(this._element).on("click.dismiss.bs.modal", '[data-dismiss="modal"]', (function (t) {
                        return n.hide(t)
                    })), e(this._dialog).on("mousedown.dismiss.bs.modal", (function () {
                        e(n._element).one("mouseup.dismiss.bs.modal", (function (t) {
                            e(t.target).is(n._element) && (n._ignoreBackdropClick = !0)
                        }))
                    })), this._showBackdrop((function () {
                        return n._showElement(t)
                    })))
                }
            }, n.hide = function (t) {
                var n = this;
                if (t && t.preventDefault(), this._isShown && !this._isTransitioning) {
                    var i = e.Event("hide.bs.modal");
                    if (e(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
                        this._isShown = !1;
                        var o = e(this._element).hasClass("fade");
                        if (o && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), e(document).off("focusin.bs.modal"), e(this._element).removeClass("show"), e(this._element).off("click.dismiss.bs.modal"), e(this._dialog).off("mousedown.dismiss.bs.modal"), o) {
                            var r = l.getTransitionDurationFromElement(this._element);
                            e(this._element).one(l.TRANSITION_END, (function (t) {
                                return n._hideModal(t)
                            })).emulateTransitionEnd(r)
                        } else this._hideModal()
                    }
                }
            }, n.dispose = function () {
                [window, this._element, this._dialog].forEach((function (t) {
                    return e(t).off(".bs.modal")
                })), e(document).off("focusin.bs.modal"), e.removeData(this._element, "bs.modal"), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
            }, n.handleUpdate = function () {
                this._adjustDialog()
            }, n._getConfig = function (t) {
                return t = s(s({}, Mt), t), l.typeCheckConfig("modal", t, Bt), t
            }, n._triggerBackdropTransition = function () {
                var t = this;
                if ("static" === this._config.backdrop) {
                    var n = e.Event("hidePrevented.bs.modal");
                    if (e(this._element).trigger(n), n.defaultPrevented) return;
                    this._element.classList.add("modal-static");
                    var i = l.getTransitionDurationFromElement(this._element);
                    e(this._element).one(l.TRANSITION_END, (function () {
                        t._element.classList.remove("modal-static")
                    })).emulateTransitionEnd(i), this._element.focus()
                } else this.hide()
            }, n._showElement = function (t) {
                var n = this,
                    i = e(this._element).hasClass("fade"),
                    o = this._dialog ? this._dialog.querySelector(".modal-body") : null;
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), e(this._dialog).hasClass("modal-dialog-scrollable") && o ? o.scrollTop = 0 : this._element.scrollTop = 0, i && l.reflow(this._element), e(this._element).addClass("show"), this._config.focus && this._enforceFocus();
                var r = e.Event("shown.bs.modal", {
                        relatedTarget: t
                    }),
                    s = function () {
                        n._config.focus && n._element.focus(), n._isTransitioning = !1, e(n._element).trigger(r)
                    };
                if (i) {
                    var a = l.getTransitionDurationFromElement(this._dialog);
                    e(this._dialog).one(l.TRANSITION_END, s).emulateTransitionEnd(a)
                } else s()
            }, n._enforceFocus = function () {
                var t = this;
                e(document).off("focusin.bs.modal").on("focusin.bs.modal", (function (n) {
                    document !== n.target && t._element !== n.target && 0 === e(t._element).has(n.target).length && t._element.focus()
                }))
            }, n._setEscapeEvent = function () {
                var t = this;
                this._isShown ? e(this._element).on("keydown.dismiss.bs.modal", (function (e) {
                    t._config.keyboard && 27 === e.which ? (e.preventDefault(), t.hide()) : t._config.keyboard || 27 !== e.which || t._triggerBackdropTransition()
                })) : this._isShown || e(this._element).off("keydown.dismiss.bs.modal")
            }, n._setResizeEvent = function () {
                var t = this;
                this._isShown ? e(window).on("resize.bs.modal", (function (e) {
                    return t.handleUpdate(e)
                })) : e(window).off("resize.bs.modal")
            }, n._hideModal = function () {
                var t = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop((function () {
                    e(document.body).removeClass("modal-open"), t._resetAdjustments(), t._resetScrollbar(), e(t._element).trigger("hidden.bs.modal")
                }))
            }, n._removeBackdrop = function () {
                this._backdrop && (e(this._backdrop).remove(), this._backdrop = null)
            }, n._showBackdrop = function (t) {
                var n = this,
                    i = e(this._element).hasClass("fade") ? "fade" : "";
                if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", i && this._backdrop.classList.add(i), e(this._backdrop).appendTo(document.body), e(this._element).on("click.dismiss.bs.modal", (function (t) {
                            n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : t.target === t.currentTarget && n._triggerBackdropTransition()
                        })), i && l.reflow(this._backdrop), e(this._backdrop).addClass("show"), !t) return;
                    if (!i) return void t();
                    var o = l.getTransitionDurationFromElement(this._backdrop);
                    e(this._backdrop).one(l.TRANSITION_END, t).emulateTransitionEnd(o)
                } else if (!this._isShown && this._backdrop) {
                    e(this._backdrop).removeClass("show");
                    var r = function () {
                        n._removeBackdrop(), t && t()
                    };
                    if (e(this._element).hasClass("fade")) {
                        var s = l.getTransitionDurationFromElement(this._backdrop);
                        e(this._backdrop).one(l.TRANSITION_END, r).emulateTransitionEnd(s)
                    } else r()
                } else t && t()
            }, n._adjustDialog = function () {
                var t = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, n._resetAdjustments = function () {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, n._checkScrollbar = function () {
                var t = document.body.getBoundingClientRect();
                this._isBodyOverflowing = Math.round(t.left + t.right) < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, n._setScrollbar = function () {
                var t = this;
                if (this._isBodyOverflowing) {
                    var n = [].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")),
                        i = [].slice.call(document.querySelectorAll(".sticky-top"));
                    e(n).each((function (n, i) {
                        var o = i.style.paddingRight,
                            r = e(i).css("padding-right");
                        e(i).data("padding-right", o).css("padding-right", parseFloat(r) + t._scrollbarWidth + "px")
                    })), e(i).each((function (n, i) {
                        var o = i.style.marginRight,
                            r = e(i).css("margin-right");
                        e(i).data("margin-right", o).css("margin-right", parseFloat(r) - t._scrollbarWidth + "px")
                    }));
                    var o = document.body.style.paddingRight,
                        r = e(document.body).css("padding-right");
                    e(document.body).data("padding-right", o).css("padding-right", parseFloat(r) + this._scrollbarWidth + "px")
                }
                e(document.body).addClass("modal-open")
            }, n._resetScrollbar = function () {
                var t = [].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"));
                e(t).each((function (t, n) {
                    var i = e(n).data("padding-right");
                    e(n).removeData("padding-right"), n.style.paddingRight = i || ""
                }));
                var n = [].slice.call(document.querySelectorAll(".sticky-top"));
                e(n).each((function (t, n) {
                    var i = e(n).data("margin-right");
                    "undefined" != typeof i && e(n).css("margin-right", i).removeData("margin-right")
                }));
                var i = e(document.body).data("padding-right");
                e(document.body).removeData("padding-right"), document.body.style.paddingRight = i || ""
            }, n._getScrollbarWidth = function () {
                var t = document.createElement("div");
                t.className = "modal-scrollbar-measure", document.body.appendChild(t);
                var e = t.getBoundingClientRect().width - t.clientWidth;
                return document.body.removeChild(t), e
            }, t._jQueryInterface = function (n, i) {
                return this.each((function () {
                    var o = e(this).data("bs.modal"),
                        r = s(s(s({}, Mt), e(this).data()), "object" == typeof n && n ? n : {});
                    if (o || (o = new t(this, r), e(this).data("bs.modal", o)), "string" == typeof n) {
                        if ("undefined" == typeof o[n]) throw new TypeError('No method named "' + n + '"');
                        o[n](i)
                    } else r.show && o.show(i)
                }))
            }, i(t, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }, {
                key: "Default",
                get: function () {
                    return Mt
                }
            }]), t
        }();
    e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', (function (t) {
        var n, i = this,
            o = l.getSelectorFromElement(this);
        o && (n = document.querySelector(o));
        var r = e(n).data("bs.modal") ? "toggle" : s(s({}, e(n).data()), e(this).data());
        "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
        var a = e(n).one("show.bs.modal", (function (t) {
            t.isDefaultPrevented() || a.one("hidden.bs.modal", (function () {
                e(i).is(":visible") && i.focus()
            }))
        }));
        qt._jQueryInterface.call(e(n), r, this)
    })), e.fn.modal = qt._jQueryInterface, e.fn.modal.Constructor = qt, e.fn.modal.noConflict = function () {
        return e.fn.modal = Rt, qt._jQueryInterface
    };
    var Ht = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
        Qt = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "srcset", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        },
        Wt = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
        Ut = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

    function Vt(t, e, n) {
        if (0 === t.length) return t;
        if (n && "function" == typeof n) return n(t);
        for (var i = (new window.DOMParser).parseFromString(t, "text/html"), o = Object.keys(e), r = [].slice.call(i.body.querySelectorAll("*")), s = function (t, n) {
                var i = r[t],
                    s = i.nodeName.toLowerCase();
                if (-1 === o.indexOf(i.nodeName.toLowerCase())) return i.parentNode.removeChild(i), "continue";
                var a = [].slice.call(i.attributes),
                    l = [].concat(e["*"] || [], e[s] || []);
                a.forEach((function (t) {
                    (function (t, e) {
                        var n = t.nodeName.toLowerCase();
                        if (-1 !== e.indexOf(n)) return -1 === Ht.indexOf(n) || Boolean(t.nodeValue.match(Wt) || t.nodeValue.match(Ut));
                        for (var i = e.filter((function (t) {
                                return t instanceof RegExp
                            })), o = 0, r = i.length; o < r; o++)
                            if (n.match(i[o])) return !0;
                        return !1
                    })(t, l) || i.removeAttribute(t.nodeName)
                }))
            }, a = 0, l = r.length; a < l; a++) s(a);
        return i.body.innerHTML
    }
    var Yt = "tooltip",
        zt = e.fn[Yt],
        Xt = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
        Kt = ["sanitize", "whiteList", "sanitizeFn"],
        Gt = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object",
            popperConfig: "(null|object)"
        },
        $t = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left"
        },
        Jt = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: Qt,
            popperConfig: null
        },
        Zt = {
            HIDE: "hide.bs.tooltip",
            HIDDEN: "hidden.bs.tooltip",
            SHOW: "show.bs.tooltip",
            SHOWN: "shown.bs.tooltip",
            INSERTED: "inserted.bs.tooltip",
            CLICK: "click.bs.tooltip",
            FOCUSIN: "focusin.bs.tooltip",
            FOCUSOUT: "focusout.bs.tooltip",
            MOUSEENTER: "mouseenter.bs.tooltip",
            MOUSELEAVE: "mouseleave.bs.tooltip"
        },
        te = function () {
            function t(t, e) {
                if ("undefined" == typeof At) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
            }
            var n = t.prototype;
            return n.enable = function () {
                this._isEnabled = !0
            }, n.disable = function () {
                this._isEnabled = !1
            }, n.toggleEnabled = function () {
                this._isEnabled = !this._isEnabled
            }, n.toggle = function (t) {
                if (this._isEnabled)
                    if (t) {
                        var n = this.constructor.DATA_KEY,
                            i = e(t.currentTarget).data(n);
                        i || (i = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
                    } else {
                        if (e(this.getTipElement()).hasClass("show")) return void this._leave(null, this);
                        this._enter(null, this)
                    }
            }, n.dispose = function () {
                clearTimeout(this._timeout), e.removeData(this.element, this.constructor.DATA_KEY), e(this.element).off(this.constructor.EVENT_KEY), e(this.element).closest(".modal").off("hide.bs.modal", this._hideModalHandler), this.tip && e(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
            }, n.show = function () {
                var t = this;
                if ("none" === e(this.element).css("display")) throw new Error("Please use show on visible elements");
                var n = e.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                    e(this.element).trigger(n);
                    var i = l.findShadowRoot(this.element),
                        o = e.contains(null !== i ? i : this.element.ownerDocument.documentElement, this.element);
                    if (n.isDefaultPrevented() || !o) return;
                    var r = this.getTipElement(),
                        s = l.getUID(this.constructor.NAME);
                    r.setAttribute("id", s), this.element.setAttribute("aria-describedby", s), this.setContent(), this.config.animation && e(r).addClass("fade");
                    var a = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
                        c = this._getAttachment(a);
                    this.addAttachmentClass(c);
                    var u = this._getContainer();
                    e(r).data(this.constructor.DATA_KEY, this), e.contains(this.element.ownerDocument.documentElement, this.tip) || e(r).appendTo(u), e(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new At(this.element, r, this._getPopperConfig(c)), e(r).addClass("show"), "ontouchstart" in document.documentElement && e(document.body).children().on("mouseover", null, e.noop);
                    var h = function () {
                        t.config.animation && t._fixTransition();
                        var n = t._hoverState;
                        t._hoverState = null, e(t.element).trigger(t.constructor.Event.SHOWN), "out" === n && t._leave(null, t)
                    };
                    if (e(this.tip).hasClass("fade")) {
                        var f = l.getTransitionDurationFromElement(this.tip);
                        e(this.tip).one(l.TRANSITION_END, h).emulateTransitionEnd(f)
                    } else h()
                }
            }, n.hide = function (t) {
                var n = this,
                    i = this.getTipElement(),
                    o = e.Event(this.constructor.Event.HIDE),
                    r = function () {
                        "show" !== n._hoverState && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), e(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), t && t()
                    };
                if (e(this.element).trigger(o), !o.isDefaultPrevented()) {
                    if (e(i).removeClass("show"), "ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop), this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1, e(this.tip).hasClass("fade")) {
                        var s = l.getTransitionDurationFromElement(i);
                        e(i).one(l.TRANSITION_END, r).emulateTransitionEnd(s)
                    } else r();
                    this._hoverState = ""
                }
            }, n.update = function () {
                null !== this._popper && this._popper.scheduleUpdate()
            }, n.isWithContent = function () {
                return Boolean(this.getTitle())
            }, n.addAttachmentClass = function (t) {
                e(this.getTipElement()).addClass("bs-tooltip-" + t)
            }, n.getTipElement = function () {
                return this.tip = this.tip || e(this.config.template)[0], this.tip
            }, n.setContent = function () {
                var t = this.getTipElement();
                this.setElementContent(e(t.querySelectorAll(".tooltip-inner")), this.getTitle()), e(t).removeClass("fade show")
            }, n.setElementContent = function (t, n) {
                "object" != typeof n || !n.nodeType && !n.jquery ? this.config.html ? (this.config.sanitize && (n = Vt(n, this.config.whiteList, this.config.sanitizeFn)), t.html(n)) : t.text(n) : this.config.html ? e(n).parent().is(t) || t.empty().append(n) : t.text(e(n).text())
            }, n.getTitle = function () {
                var t = this.element.getAttribute("data-original-title");
                return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
            }, n._getPopperConfig = function (t) {
                var e = this;
                return s(s({}, {
                    placement: t,
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            behavior: this.config.fallbackPlacement
                        },
                        arrow: {
                            element: ".arrow"
                        },
                        preventOverflow: {
                            boundariesElement: this.config.boundary
                        }
                    },
                    onCreate: function (t) {
                        t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                    },
                    onUpdate: function (t) {
                        return e._handlePopperPlacementChange(t)
                    }
                }), this.config.popperConfig)
            }, n._getOffset = function () {
                var t = this,
                    e = {};
                return "function" == typeof this.config.offset ? e.fn = function (e) {
                    return e.offsets = s(s({}, e.offsets), t.config.offset(e.offsets, t.element) || {}), e
                } : e.offset = this.config.offset, e
            }, n._getContainer = function () {
                return !1 === this.config.container ? document.body : l.isElement(this.config.container) ? e(this.config.container) : e(document).find(this.config.container)
            }, n._getAttachment = function (t) {
                return $t[t.toUpperCase()]
            }, n._setListeners = function () {
                var t = this;
                this.config.trigger.split(" ").forEach((function (n) {
                    if ("click" === n) e(t.element).on(t.constructor.Event.CLICK, t.config.selector, (function (e) {
                        return t.toggle(e)
                    }));
                    else if ("manual" !== n) {
                        var i = "hover" === n ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
                            o = "hover" === n ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
                        e(t.element).on(i, t.config.selector, (function (e) {
                            return t._enter(e)
                        })).on(o, t.config.selector, (function (e) {
                            return t._leave(e)
                        }))
                    }
                })), this._hideModalHandler = function () {
                    t.element && t.hide()
                }, e(this.element).closest(".modal").on("hide.bs.modal", this._hideModalHandler), this.config.selector ? this.config = s(s({}, this.config), {}, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, n._fixTitle = function () {
                var t = typeof this.element.getAttribute("data-original-title");
                (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
            }, n._enter = function (t, n) {
                var i = this.constructor.DATA_KEY;
                (n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusin" === t.type ? "focus" : "hover"] = !0), e(n.getTipElement()).hasClass("show") || "show" === n._hoverState ? n._hoverState = "show" : (clearTimeout(n._timeout), n._hoverState = "show", n.config.delay && n.config.delay.show ? n._timeout = setTimeout((function () {
                    "show" === n._hoverState && n.show()
                }), n.config.delay.show) : n.show())
            }, n._leave = function (t, n) {
                var i = this.constructor.DATA_KEY;
                (n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusout" === t.type ? "focus" : "hover"] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = "out", n.config.delay && n.config.delay.hide ? n._timeout = setTimeout((function () {
                    "out" === n._hoverState && n.hide()
                }), n.config.delay.hide) : n.hide())
            }, n._isWithActiveTrigger = function () {
                for (var t in this._activeTrigger)
                    if (this._activeTrigger[t]) return !0;
                return !1
            }, n._getConfig = function (t) {
                var n = e(this.element).data();
                return Object.keys(n).forEach((function (t) {
                    -1 !== Kt.indexOf(t) && delete n[t]
                })), "number" == typeof (t = s(s(s({}, this.constructor.Default), n), "object" == typeof t && t ? t : {})).delay && (t.delay = {
                    show: t.delay,
                    hide: t.delay
                }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), l.typeCheckConfig(Yt, t, this.constructor.DefaultType), t.sanitize && (t.template = Vt(t.template, t.whiteList, t.sanitizeFn)), t
            }, n._getDelegateConfig = function () {
                var t = {};
                if (this.config)
                    for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                return t
            }, n._cleanTipClass = function () {
                var t = e(this.getTipElement()),
                    n = t.attr("class").match(Xt);
                null !== n && n.length && t.removeClass(n.join(""))
            }, n._handlePopperPlacementChange = function (t) {
                this.tip = t.instance.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
            }, n._fixTransition = function () {
                var t = this.getTipElement(),
                    n = this.config.animation;
                null === t.getAttribute("x-placement") && (e(t).removeClass("fade"), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n)
            }, t._jQueryInterface = function (n) {
                return this.each((function () {
                    var i = e(this).data("bs.tooltip"),
                        o = "object" == typeof n && n;
                    if ((i || !/dispose|hide/.test(n)) && (i || (i = new t(this, o), e(this).data("bs.tooltip", i)), "string" == typeof n)) {
                        if ("undefined" == typeof i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n]()
                    }
                }))
            }, i(t, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }, {
                key: "Default",
                get: function () {
                    return Jt
                }
            }, {
                key: "NAME",
                get: function () {
                    return Yt
                }
            }, {
                key: "DATA_KEY",
                get: function () {
                    return "bs.tooltip"
                }
            }, {
                key: "Event",
                get: function () {
                    return Zt
                }
            }, {
                key: "EVENT_KEY",
                get: function () {
                    return ".bs.tooltip"
                }
            }, {
                key: "DefaultType",
                get: function () {
                    return Gt
                }
            }]), t
        }();
    e.fn[Yt] = te._jQueryInterface, e.fn[Yt].Constructor = te, e.fn[Yt].noConflict = function () {
        return e.fn[Yt] = zt, te._jQueryInterface
    };
    var ee = "popover",
        ne = e.fn[ee],
        ie = new RegExp("(^|\\s)bs-popover\\S+", "g"),
        oe = s(s({}, te.Default), {}, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }),
        re = s(s({}, te.DefaultType), {}, {
            content: "(string|element|function)"
        }),
        se = {
            HIDE: "hide.bs.popover",
            HIDDEN: "hidden.bs.popover",
            SHOW: "show.bs.popover",
            SHOWN: "shown.bs.popover",
            INSERTED: "inserted.bs.popover",
            CLICK: "click.bs.popover",
            FOCUSIN: "focusin.bs.popover",
            FOCUSOUT: "focusout.bs.popover",
            MOUSEENTER: "mouseenter.bs.popover",
            MOUSELEAVE: "mouseleave.bs.popover"
        },
        ae = function (t) {
            var n, o;

            function r() {
                return t.apply(this, arguments) || this
            }
            o = t, (n = r).prototype = Object.create(o.prototype), n.prototype.constructor = n, n.__proto__ = o;
            var s = r.prototype;
            return s.isWithContent = function () {
                return this.getTitle() || this._getContent()
            }, s.addAttachmentClass = function (t) {
                e(this.getTipElement()).addClass("bs-popover-" + t)
            }, s.getTipElement = function () {
                return this.tip = this.tip || e(this.config.template)[0], this.tip
            }, s.setContent = function () {
                var t = e(this.getTipElement());
                this.setElementContent(t.find(".popover-header"), this.getTitle());
                var n = this._getContent();
                "function" == typeof n && (n = n.call(this.element)), this.setElementContent(t.find(".popover-body"), n), t.removeClass("fade show")
            }, s._getContent = function () {
                return this.element.getAttribute("data-content") || this.config.content
            }, s._cleanTipClass = function () {
                var t = e(this.getTipElement()),
                    n = t.attr("class").match(ie);
                null !== n && n.length > 0 && t.removeClass(n.join(""))
            }, r._jQueryInterface = function (t) {
                return this.each((function () {
                    var n = e(this).data("bs.popover"),
                        i = "object" == typeof t ? t : null;
                    if ((n || !/dispose|hide/.test(t)) && (n || (n = new r(this, i), e(this).data("bs.popover", n)), "string" == typeof t)) {
                        if ("undefined" == typeof n[t]) throw new TypeError('No method named "' + t + '"');
                        n[t]()
                    }
                }))
            }, i(r, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }, {
                key: "Default",
                get: function () {
                    return oe
                }
            }, {
                key: "NAME",
                get: function () {
                    return ee
                }
            }, {
                key: "DATA_KEY",
                get: function () {
                    return "bs.popover"
                }
            }, {
                key: "Event",
                get: function () {
                    return se
                }
            }, {
                key: "EVENT_KEY",
                get: function () {
                    return ".bs.popover"
                }
            }, {
                key: "DefaultType",
                get: function () {
                    return re
                }
            }]), r
        }(te);
    e.fn[ee] = ae._jQueryInterface, e.fn[ee].Constructor = ae, e.fn[ee].noConflict = function () {
        return e.fn[ee] = ne, ae._jQueryInterface
    };
    var le = "scrollspy",
        ce = e.fn[le],
        ue = {
            offset: 10,
            method: "auto",
            target: ""
        },
        he = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        },
        fe = function () {
            function t(t, n) {
                var i = this;
                this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(n), this._selector = this._config.target + " .nav-link," + this._config.target + " .list-group-item," + this._config.target + " .dropdown-item", this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, e(this._scrollElement).on("scroll.bs.scrollspy", (function (t) {
                    return i._process(t)
                })), this.refresh(), this._process()
            }
            var n = t.prototype;
            return n.refresh = function () {
                var t = this,
                    n = this._scrollElement === this._scrollElement.window ? "offset" : "position",
                    i = "auto" === this._config.method ? n : this._config.method,
                    o = "position" === i ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map((function (t) {
                    var n, r = l.getSelectorFromElement(t);
                    if (r && (n = document.querySelector(r)), n) {
                        var s = n.getBoundingClientRect();
                        if (s.width || s.height) return [e(n)[i]().top + o, r]
                    }
                    return null
                })).filter((function (t) {
                    return t
                })).sort((function (t, e) {
                    return t[0] - e[0]
                })).forEach((function (e) {
                    t._offsets.push(e[0]), t._targets.push(e[1])
                }))
            }, n.dispose = function () {
                e.removeData(this._element, "bs.scrollspy"), e(this._scrollElement).off(".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, n._getConfig = function (t) {
                if ("string" != typeof (t = s(s({}, ue), "object" == typeof t && t ? t : {})).target && l.isElement(t.target)) {
                    var n = e(t.target).attr("id");
                    n || (n = l.getUID(le), e(t.target).attr("id", n)), t.target = "#" + n
                }
                return l.typeCheckConfig(le, t, he), t
            }, n._getScrollTop = function () {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, n._getScrollHeight = function () {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, n._getOffsetHeight = function () {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
            }, n._process = function () {
                var t = this._getScrollTop() + this._config.offset,
                    e = this._getScrollHeight(),
                    n = this._config.offset + e - this._getOffsetHeight();
                if (this._scrollHeight !== e && this.refresh(), t >= n) {
                    var i = this._targets[this._targets.length - 1];
                    this._activeTarget !== i && this._activate(i)
                } else {
                    if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
                    for (var o = this._offsets.length; o--;) {
                        this._activeTarget !== this._targets[o] && t >= this._offsets[o] && ("undefined" == typeof this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o])
                    }
                }
            }, n._activate = function (t) {
                this._activeTarget = t, this._clear();
                var n = this._selector.split(",").map((function (e) {
                        return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                    })),
                    i = e([].slice.call(document.querySelectorAll(n.join(","))));
                i.hasClass("dropdown-item") ? (i.closest(".dropdown").find(".dropdown-toggle").addClass("active"), i.addClass("active")) : (i.addClass("active"), i.parents(".nav, .list-group").prev(".nav-link, .list-group-item").addClass("active"), i.parents(".nav, .list-group").prev(".nav-item").children(".nav-link").addClass("active")), e(this._scrollElement).trigger("activate.bs.scrollspy", {
                    relatedTarget: t
                })
            }, n._clear = function () {
                [].slice.call(document.querySelectorAll(this._selector)).filter((function (t) {
                    return t.classList.contains("active")
                })).forEach((function (t) {
                    return t.classList.remove("active")
                }))
            }, t._jQueryInterface = function (n) {
                return this.each((function () {
                    var i = e(this).data("bs.scrollspy");
                    if (i || (i = new t(this, "object" == typeof n && n), e(this).data("bs.scrollspy", i)), "string" == typeof n) {
                        if ("undefined" == typeof i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n]()
                    }
                }))
            }, i(t, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }, {
                key: "Default",
                get: function () {
                    return ue
                }
            }]), t
        }();
    e(window).on("load.bs.scrollspy.data-api", (function () {
        for (var t = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')), n = t.length; n--;) {
            var i = e(t[n]);
            fe._jQueryInterface.call(i, i.data())
        }
    })), e.fn[le] = fe._jQueryInterface, e.fn[le].Constructor = fe, e.fn[le].noConflict = function () {
        return e.fn[le] = ce, fe._jQueryInterface
    };
    var de = e.fn.tab,
        pe = function () {
            function t(t) {
                this._element = t
            }
            var n = t.prototype;
            return n.show = function () {
                var t = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && e(this._element).hasClass("active") || e(this._element).hasClass("disabled"))) {
                    var n, i, o = e(this._element).closest(".nav, .list-group")[0],
                        r = l.getSelectorFromElement(this._element);
                    if (o) {
                        var s = "UL" === o.nodeName || "OL" === o.nodeName ? "> li > .active" : ".active";
                        i = (i = e.makeArray(e(o).find(s)))[i.length - 1]
                    }
                    var a = e.Event("hide.bs.tab", {
                            relatedTarget: this._element
                        }),
                        c = e.Event("show.bs.tab", {
                            relatedTarget: i
                        });
                    if (i && e(i).trigger(a), e(this._element).trigger(c), !c.isDefaultPrevented() && !a.isDefaultPrevented()) {
                        r && (n = document.querySelector(r)), this._activate(this._element, o);
                        var u = function () {
                            var n = e.Event("hidden.bs.tab", {
                                    relatedTarget: t._element
                                }),
                                o = e.Event("shown.bs.tab", {
                                    relatedTarget: i
                                });
                            e(i).trigger(n), e(t._element).trigger(o)
                        };
                        n ? this._activate(n, n.parentNode, u) : u()
                    }
                }
            }, n.dispose = function () {
                e.removeData(this._element, "bs.tab"), this._element = null
            }, n._activate = function (t, n, i) {
                var o = this,
                    r = (!n || "UL" !== n.nodeName && "OL" !== n.nodeName ? e(n).children(".active") : e(n).find("> li > .active"))[0],
                    s = i && r && e(r).hasClass("fade"),
                    a = function () {
                        return o._transitionComplete(t, r, i)
                    };
                if (r && s) {
                    var c = l.getTransitionDurationFromElement(r);
                    e(r).removeClass("show").one(l.TRANSITION_END, a).emulateTransitionEnd(c)
                } else a()
            }, n._transitionComplete = function (t, n, i) {
                if (n) {
                    e(n).removeClass("active");
                    var o = e(n.parentNode).find("> .dropdown-menu .active")[0];
                    o && e(o).removeClass("active"), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1)
                }
                if (e(t).addClass("active"), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), l.reflow(t), t.classList.contains("fade") && t.classList.add("show"), t.parentNode && e(t.parentNode).hasClass("dropdown-menu")) {
                    var r = e(t).closest(".dropdown")[0];
                    if (r) {
                        var s = [].slice.call(r.querySelectorAll(".dropdown-toggle"));
                        e(s).addClass("active")
                    }
                    t.setAttribute("aria-expanded", !0)
                }
                i && i()
            }, t._jQueryInterface = function (n) {
                return this.each((function () {
                    var i = e(this),
                        o = i.data("bs.tab");
                    if (o || (o = new t(this), i.data("bs.tab", o)), "string" == typeof n) {
                        if ("undefined" == typeof o[n]) throw new TypeError('No method named "' + n + '"');
                        o[n]()
                    }
                }))
            }, i(t, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }]), t
        }();
    e(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', (function (t) {
        t.preventDefault(), pe._jQueryInterface.call(e(this), "show")
    })), e.fn.tab = pe._jQueryInterface, e.fn.tab.Constructor = pe, e.fn.tab.noConflict = function () {
        return e.fn.tab = de, pe._jQueryInterface
    };
    var me = e.fn.toast,
        ge = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        ve = {
            animation: !0,
            autohide: !0,
            delay: 500
        },
        _e = function () {
            function t(t, e) {
                this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners()
            }
            var n = t.prototype;
            return n.show = function () {
                var t = this,
                    n = e.Event("show.bs.toast");
                if (e(this._element).trigger(n), !n.isDefaultPrevented()) {
                    this._config.animation && this._element.classList.add("fade");
                    var i = function () {
                        t._element.classList.remove("showing"), t._element.classList.add("show"), e(t._element).trigger("shown.bs.toast"), t._config.autohide && (t._timeout = setTimeout((function () {
                            t.hide()
                        }), t._config.delay))
                    };
                    if (this._element.classList.remove("hide"), l.reflow(this._element), this._element.classList.add("showing"), this._config.animation) {
                        var o = l.getTransitionDurationFromElement(this._element);
                        e(this._element).one(l.TRANSITION_END, i).emulateTransitionEnd(o)
                    } else i()
                }
            }, n.hide = function () {
                if (this._element.classList.contains("show")) {
                    var t = e.Event("hide.bs.toast");
                    e(this._element).trigger(t), t.isDefaultPrevented() || this._close()
                }
            }, n.dispose = function () {
                clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains("show") && this._element.classList.remove("show"), e(this._element).off("click.dismiss.bs.toast"), e.removeData(this._element, "bs.toast"), this._element = null, this._config = null
            }, n._getConfig = function (t) {
                return t = s(s(s({}, ve), e(this._element).data()), "object" == typeof t && t ? t : {}), l.typeCheckConfig("toast", t, this.constructor.DefaultType), t
            }, n._setListeners = function () {
                var t = this;
                e(this._element).on("click.dismiss.bs.toast", '[data-dismiss="toast"]', (function () {
                    return t.hide()
                }))
            }, n._close = function () {
                var t = this,
                    n = function () {
                        t._element.classList.add("hide"), e(t._element).trigger("hidden.bs.toast")
                    };
                if (this._element.classList.remove("show"), this._config.animation) {
                    var i = l.getTransitionDurationFromElement(this._element);
                    e(this._element).one(l.TRANSITION_END, n).emulateTransitionEnd(i)
                } else n()
            }, t._jQueryInterface = function (n) {
                return this.each((function () {
                    var i = e(this),
                        o = i.data("bs.toast");
                    if (o || (o = new t(this, "object" == typeof n && n), i.data("bs.toast", o)), "string" == typeof n) {
                        if ("undefined" == typeof o[n]) throw new TypeError('No method named "' + n + '"');
                        o[n](this)
                    }
                }))
            }, i(t, null, [{
                key: "VERSION",
                get: function () {
                    return "4.5.0"
                }
            }, {
                key: "DefaultType",
                get: function () {
                    return ge
                }
            }, {
                key: "Default",
                get: function () {
                    return ve
                }
            }]), t
        }();
    e.fn.toast = _e._jQueryInterface, e.fn.toast.Constructor = _e, e.fn.toast.noConflict = function () {
        return e.fn.toast = me, _e._jQueryInterface
    }, t.Alert = h, t.Button = d, t.Carousel = y, t.Collapse = S, t.Dropdown = Ft, t.Modal = qt, t.Popover = ae, t.Scrollspy = fe, t.Tab = pe, t.Toast = _e, t.Tooltip = te, t.Util = l, Object.defineProperty(t, "__esModule", {
        value: !0
    })
}));
//# sourceMappingURL=bootstrap.bundle.min.js.map


(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], function ($) {
            return factory($)
        })
    } else if (typeof module === "object" && typeof module.exports === "object") {
        exports = factory(require("jquery"))
    } else {
        factory(jQuery)
    }
})(function ($) {
    $.easing.jswing = $.easing.swing;
    var pow = Math.pow,
        sqrt = Math.sqrt,
        sin = Math.sin,
        cos = Math.cos,
        PI = Math.PI,
        c1 = 1.70158,
        c2 = c1 * 1.525,
        c3 = c1 + 1,
        c4 = 2 * PI / 3,
        c5 = 2 * PI / 4.5;

    function bounceOut(x) {
        var n1 = 7.5625,
            d1 = 2.75;
        if (x < 1 / d1) {
            return n1 * x * x
        } else if (x < 2 / d1) {
            return n1 * (x -= 1.5 / d1) * x + .75
        } else if (x < 2.5 / d1) {
            return n1 * (x -= 2.25 / d1) * x + .9375
        } else {
            return n1 * (x -= 2.625 / d1) * x + .984375
        }
    }
    $.extend($.easing, {
        def: "easeOutQuad",
        swing: function (x) {
            return $.easing[$.easing.def](x)
        },
        easeInQuad: function (x) {
            return x * x
        },
        easeOutQuad: function (x) {
            return 1 - (1 - x) * (1 - x)
        },
        easeInOutQuad: function (x) {
            return x < .5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2
        },
        easeInCubic: function (x) {
            return x * x * x
        },
        easeOutCubic: function (x) {
            return 1 - pow(1 - x, 3)
        },
        easeInOutCubic: function (x) {
            return x < .5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2
        },
        easeInQuart: function (x) {
            return x * x * x * x
        },
        easeOutQuart: function (x) {
            return 1 - pow(1 - x, 4)
        },
        easeInOutQuart: function (x) {
            return x < .5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2
        },
        easeInQuint: function (x) {
            return x * x * x * x * x
        },
        easeOutQuint: function (x) {
            return 1 - pow(1 - x, 5)
        },
        easeInOutQuint: function (x) {
            return x < .5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2
        },
        easeInSine: function (x) {
            return 1 - cos(x * PI / 2)
        },
        easeOutSine: function (x) {
            return sin(x * PI / 2)
        },
        easeInOutSine: function (x) {
            return -(cos(PI * x) - 1) / 2
        },
        easeInExpo: function (x) {
            return x === 0 ? 0 : pow(2, 10 * x - 10)
        },
        easeOutExpo: function (x) {
            return x === 1 ? 1 : 1 - pow(2, -10 * x)
        },
        easeInOutExpo: function (x) {
            return x === 0 ? 0 : x === 1 ? 1 : x < .5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2
        },
        easeInCirc: function (x) {
            return 1 - sqrt(1 - pow(x, 2))
        },
        easeOutCirc: function (x) {
            return sqrt(1 - pow(x - 1, 2))
        },
        easeInOutCirc: function (x) {
            return x < .5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2
        },
        easeInElastic: function (x) {
            return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4)
        },
        easeOutElastic: function (x) {
            return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - .75) * c4) + 1
        },
        easeInOutElastic: function (x) {
            return x === 0 ? 0 : x === 1 ? 1 : x < .5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1
        },
        easeInBack: function (x) {
            return c3 * x * x * x - c1 * x * x
        },
        easeOutBack: function (x) {
            return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2)
        },
        easeInOutBack: function (x) {
            return x < .5 ? pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2
        },
        easeInBounce: function (x) {
            return 1 - bounceOut(1 - x)
        },
        easeOutBounce: bounceOut,
        easeInOutBounce: function (x) {
            return x < .5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2
        }
    })
});


/*!
 * Start Bootstrap - SB Admin 2 v4.1.1 (https://startbootstrap.com/themes/sb-admin-2)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin-2/blob/master/LICENSE)
 */

! function (s) {
    "use strict";
    s("#sidebarToggle, #sidebarToggleTop").on("click", function (e) {
        s("body").toggleClass("sidebar-toggled"), s(".sidebar").toggleClass("toggled"), s(".sidebar").hasClass("toggled") && s(".sidebar .collapse").collapse("hide")
    }), s(window).resize(function () {
        s(window).width() < 768 && s(".sidebar .collapse").collapse("hide"), s(window).width() < 480 && !s(".sidebar").hasClass("toggled") && (s("body").addClass("sidebar-toggled"), s(".sidebar").addClass("toggled"), s(".sidebar .collapse").collapse("hide"))
    }), s("body.fixed-nav .sidebar").on("mousewheel DOMMouseScroll wheel", function (e) {
        if (768 < s(window).width()) {
            var o = e.originalEvent,
                l = o.wheelDelta || -o.detail;
            this.scrollTop += 30 * (l < 0 ? 1 : -1), e.preventDefault()
        }
    }), s(document).on("scroll", function () {
        100 < s(this).scrollTop() ? s(".scroll-to-top").fadeIn() : s(".scroll-to-top").fadeOut()
    }), s(document).on("click", "a.scroll-to-top", function (e) {
        var o = s(this);
        s("html, body").stop().animate({
            scrollTop: s(o.attr("href")).offset().top
        }, 1e3, "easeInOutExpo"), e.preventDefault()
    })
}(jQuery);

/*!
 * Chart.js v2.9.3
 * https://www.chartjs.org
 * (c) 2019 Chart.js Contributors
 * Released under the MIT License
 */
! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e(function () {
        try {
            return require("moment")
        } catch (t) {}
    }()) : "function" == typeof define && define.amd ? define(["require"], (function (t) {
        return e(function () {
            try {
                return t("moment")
            } catch (t) {}
        }())
    })) : (t = t || self).Chart = e(t.moment)
}(this, (function (t) {
    "use strict";
    t = t && t.hasOwnProperty("default") ? t.default : t;
    var e = {
            aliceblue: [240, 248, 255],
            antiquewhite: [250, 235, 215],
            aqua: [0, 255, 255],
            aquamarine: [127, 255, 212],
            azure: [240, 255, 255],
            beige: [245, 245, 220],
            bisque: [255, 228, 196],
            black: [0, 0, 0],
            blanchedalmond: [255, 235, 205],
            blue: [0, 0, 255],
            blueviolet: [138, 43, 226],
            brown: [165, 42, 42],
            burlywood: [222, 184, 135],
            cadetblue: [95, 158, 160],
            chartreuse: [127, 255, 0],
            chocolate: [210, 105, 30],
            coral: [255, 127, 80],
            cornflowerblue: [100, 149, 237],
            cornsilk: [255, 248, 220],
            crimson: [220, 20, 60],
            cyan: [0, 255, 255],
            darkblue: [0, 0, 139],
            darkcyan: [0, 139, 139],
            darkgoldenrod: [184, 134, 11],
            darkgray: [169, 169, 169],
            darkgreen: [0, 100, 0],
            darkgrey: [169, 169, 169],
            darkkhaki: [189, 183, 107],
            darkmagenta: [139, 0, 139],
            darkolivegreen: [85, 107, 47],
            darkorange: [255, 140, 0],
            darkorchid: [153, 50, 204],
            darkred: [139, 0, 0],
            darksalmon: [233, 150, 122],
            darkseagreen: [143, 188, 143],
            darkslateblue: [72, 61, 139],
            darkslategray: [47, 79, 79],
            darkslategrey: [47, 79, 79],
            darkturquoise: [0, 206, 209],
            darkviolet: [148, 0, 211],
            deeppink: [255, 20, 147],
            deepskyblue: [0, 191, 255],
            dimgray: [105, 105, 105],
            dimgrey: [105, 105, 105],
            dodgerblue: [30, 144, 255],
            firebrick: [178, 34, 34],
            floralwhite: [255, 250, 240],
            forestgreen: [34, 139, 34],
            fuchsia: [255, 0, 255],
            gainsboro: [220, 220, 220],
            ghostwhite: [248, 248, 255],
            gold: [255, 215, 0],
            goldenrod: [218, 165, 32],
            gray: [128, 128, 128],
            green: [0, 128, 0],
            greenyellow: [173, 255, 47],
            grey: [128, 128, 128],
            honeydew: [240, 255, 240],
            hotpink: [255, 105, 180],
            indianred: [205, 92, 92],
            indigo: [75, 0, 130],
            ivory: [255, 255, 240],
            khaki: [240, 230, 140],
            lavender: [230, 230, 250],
            lavenderblush: [255, 240, 245],
            lawngreen: [124, 252, 0],
            lemonchiffon: [255, 250, 205],
            lightblue: [173, 216, 230],
            lightcoral: [240, 128, 128],
            lightcyan: [224, 255, 255],
            lightgoldenrodyellow: [250, 250, 210],
            lightgray: [211, 211, 211],
            lightgreen: [144, 238, 144],
            lightgrey: [211, 211, 211],
            lightpink: [255, 182, 193],
            lightsalmon: [255, 160, 122],
            lightseagreen: [32, 178, 170],
            lightskyblue: [135, 206, 250],
            lightslategray: [119, 136, 153],
            lightslategrey: [119, 136, 153],
            lightsteelblue: [176, 196, 222],
            lightyellow: [255, 255, 224],
            lime: [0, 255, 0],
            limegreen: [50, 205, 50],
            linen: [250, 240, 230],
            magenta: [255, 0, 255],
            maroon: [128, 0, 0],
            mediumaquamarine: [102, 205, 170],
            mediumblue: [0, 0, 205],
            mediumorchid: [186, 85, 211],
            mediumpurple: [147, 112, 219],
            mediumseagreen: [60, 179, 113],
            mediumslateblue: [123, 104, 238],
            mediumspringgreen: [0, 250, 154],
            mediumturquoise: [72, 209, 204],
            mediumvioletred: [199, 21, 133],
            midnightblue: [25, 25, 112],
            mintcream: [245, 255, 250],
            mistyrose: [255, 228, 225],
            moccasin: [255, 228, 181],
            navajowhite: [255, 222, 173],
            navy: [0, 0, 128],
            oldlace: [253, 245, 230],
            olive: [128, 128, 0],
            olivedrab: [107, 142, 35],
            orange: [255, 165, 0],
            orangered: [255, 69, 0],
            orchid: [218, 112, 214],
            palegoldenrod: [238, 232, 170],
            palegreen: [152, 251, 152],
            paleturquoise: [175, 238, 238],
            palevioletred: [219, 112, 147],
            papayawhip: [255, 239, 213],
            peachpuff: [255, 218, 185],
            peru: [205, 133, 63],
            pink: [255, 192, 203],
            plum: [221, 160, 221],
            powderblue: [176, 224, 230],
            purple: [128, 0, 128],
            rebeccapurple: [102, 51, 153],
            red: [255, 0, 0],
            rosybrown: [188, 143, 143],
            royalblue: [65, 105, 225],
            saddlebrown: [139, 69, 19],
            salmon: [250, 128, 114],
            sandybrown: [244, 164, 96],
            seagreen: [46, 139, 87],
            seashell: [255, 245, 238],
            sienna: [160, 82, 45],
            silver: [192, 192, 192],
            skyblue: [135, 206, 235],
            slateblue: [106, 90, 205],
            slategray: [112, 128, 144],
            slategrey: [112, 128, 144],
            snow: [255, 250, 250],
            springgreen: [0, 255, 127],
            steelblue: [70, 130, 180],
            tan: [210, 180, 140],
            teal: [0, 128, 128],
            thistle: [216, 191, 216],
            tomato: [255, 99, 71],
            turquoise: [64, 224, 208],
            violet: [238, 130, 238],
            wheat: [245, 222, 179],
            white: [255, 255, 255],
            whitesmoke: [245, 245, 245],
            yellow: [255, 255, 0],
            yellowgreen: [154, 205, 50]
        },
        n = function (t, e) {
            return t(e = {
                exports: {}
            }, e.exports), e.exports
        }((function (t) {
            var n = {};
            for (var i in e) e.hasOwnProperty(i) && (n[e[i]] = i);
            var a = t.exports = {
                rgb: {
                    channels: 3,
                    labels: "rgb"
                },
                hsl: {
                    channels: 3,
                    labels: "hsl"
                },
                hsv: {
                    channels: 3,
                    labels: "hsv"
                },
                hwb: {
                    channels: 3,
                    labels: "hwb"
                },
                cmyk: {
                    channels: 4,
                    labels: "cmyk"
                },
                xyz: {
                    channels: 3,
                    labels: "xyz"
                },
                lab: {
                    channels: 3,
                    labels: "lab"
                },
                lch: {
                    channels: 3,
                    labels: "lch"
                },
                hex: {
                    channels: 1,
                    labels: ["hex"]
                },
                keyword: {
                    channels: 1,
                    labels: ["keyword"]
                },
                ansi16: {
                    channels: 1,
                    labels: ["ansi16"]
                },
                ansi256: {
                    channels: 1,
                    labels: ["ansi256"]
                },
                hcg: {
                    channels: 3,
                    labels: ["h", "c", "g"]
                },
                apple: {
                    channels: 3,
                    labels: ["r16", "g16", "b16"]
                },
                gray: {
                    channels: 1,
                    labels: ["gray"]
                }
            };
            for (var r in a)
                if (a.hasOwnProperty(r)) {
                    if (!("channels" in a[r])) throw new Error("missing channels property: " + r);
                    if (!("labels" in a[r])) throw new Error("missing channel labels property: " + r);
                    if (a[r].labels.length !== a[r].channels) throw new Error("channel and label counts mismatch: " + r);
                    var o = a[r].channels,
                        s = a[r].labels;
                    delete a[r].channels, delete a[r].labels, Object.defineProperty(a[r], "channels", {
                        value: o
                    }), Object.defineProperty(a[r], "labels", {
                        value: s
                    })
                } a.rgb.hsl = function (t) {
                var e, n, i = t[0] / 255,
                    a = t[1] / 255,
                    r = t[2] / 255,
                    o = Math.min(i, a, r),
                    s = Math.max(i, a, r),
                    l = s - o;
                return s === o ? e = 0 : i === s ? e = (a - r) / l : a === s ? e = 2 + (r - i) / l : r === s && (e = 4 + (i - a) / l), (e = Math.min(60 * e, 360)) < 0 && (e += 360), n = (o + s) / 2, [e, 100 * (s === o ? 0 : n <= .5 ? l / (s + o) : l / (2 - s - o)), 100 * n]
            }, a.rgb.hsv = function (t) {
                var e, n, i, a, r, o = t[0] / 255,
                    s = t[1] / 255,
                    l = t[2] / 255,
                    u = Math.max(o, s, l),
                    d = u - Math.min(o, s, l),
                    h = function (t) {
                        return (u - t) / 6 / d + .5
                    };
                return 0 === d ? a = r = 0 : (r = d / u, e = h(o), n = h(s), i = h(l), o === u ? a = i - n : s === u ? a = 1 / 3 + e - i : l === u && (a = 2 / 3 + n - e), a < 0 ? a += 1 : a > 1 && (a -= 1)), [360 * a, 100 * r, 100 * u]
            }, a.rgb.hwb = function (t) {
                var e = t[0],
                    n = t[1],
                    i = t[2];
                return [a.rgb.hsl(t)[0], 100 * (1 / 255 * Math.min(e, Math.min(n, i))), 100 * (i = 1 - 1 / 255 * Math.max(e, Math.max(n, i)))]
            }, a.rgb.cmyk = function (t) {
                var e, n = t[0] / 255,
                    i = t[1] / 255,
                    a = t[2] / 255;
                return [100 * ((1 - n - (e = Math.min(1 - n, 1 - i, 1 - a))) / (1 - e) || 0), 100 * ((1 - i - e) / (1 - e) || 0), 100 * ((1 - a - e) / (1 - e) || 0), 100 * e]
            }, a.rgb.keyword = function (t) {
                var i = n[t];
                if (i) return i;
                var a, r, o, s = 1 / 0;
                for (var l in e)
                    if (e.hasOwnProperty(l)) {
                        var u = e[l],
                            d = (r = t, o = u, Math.pow(r[0] - o[0], 2) + Math.pow(r[1] - o[1], 2) + Math.pow(r[2] - o[2], 2));
                        d < s && (s = d, a = l)
                    } return a
            }, a.keyword.rgb = function (t) {
                return e[t]
            }, a.rgb.xyz = function (t) {
                var e = t[0] / 255,
                    n = t[1] / 255,
                    i = t[2] / 255;
                return [100 * (.4124 * (e = e > .04045 ? Math.pow((e + .055) / 1.055, 2.4) : e / 12.92) + .3576 * (n = n > .04045 ? Math.pow((n + .055) / 1.055, 2.4) : n / 12.92) + .1805 * (i = i > .04045 ? Math.pow((i + .055) / 1.055, 2.4) : i / 12.92)), 100 * (.2126 * e + .7152 * n + .0722 * i), 100 * (.0193 * e + .1192 * n + .9505 * i)]
            }, a.rgb.lab = function (t) {
                var e = a.rgb.xyz(t),
                    n = e[0],
                    i = e[1],
                    r = e[2];
                return i /= 100, r /= 108.883, n = (n /= 95.047) > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116, [116 * (i = i > .008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116) - 16, 500 * (n - i), 200 * (i - (r = r > .008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116))]
            }, a.hsl.rgb = function (t) {
                var e, n, i, a, r, o = t[0] / 360,
                    s = t[1] / 100,
                    l = t[2] / 100;
                if (0 === s) return [r = 255 * l, r, r];
                e = 2 * l - (n = l < .5 ? l * (1 + s) : l + s - l * s), a = [0, 0, 0];
                for (var u = 0; u < 3; u++)(i = o + 1 / 3 * -(u - 1)) < 0 && i++, i > 1 && i--, r = 6 * i < 1 ? e + 6 * (n - e) * i : 2 * i < 1 ? n : 3 * i < 2 ? e + (n - e) * (2 / 3 - i) * 6 : e, a[u] = 255 * r;
                return a
            }, a.hsl.hsv = function (t) {
                var e = t[0],
                    n = t[1] / 100,
                    i = t[2] / 100,
                    a = n,
                    r = Math.max(i, .01);
                return n *= (i *= 2) <= 1 ? i : 2 - i, a *= r <= 1 ? r : 2 - r, [e, 100 * (0 === i ? 2 * a / (r + a) : 2 * n / (i + n)), 100 * ((i + n) / 2)]
            }, a.hsv.rgb = function (t) {
                var e = t[0] / 60,
                    n = t[1] / 100,
                    i = t[2] / 100,
                    a = Math.floor(e) % 6,
                    r = e - Math.floor(e),
                    o = 255 * i * (1 - n),
                    s = 255 * i * (1 - n * r),
                    l = 255 * i * (1 - n * (1 - r));
                switch (i *= 255, a) {
                    case 0:
                        return [i, l, o];
                    case 1:
                        return [s, i, o];
                    case 2:
                        return [o, i, l];
                    case 3:
                        return [o, s, i];
                    case 4:
                        return [l, o, i];
                    case 5:
                        return [i, o, s]
                }
            }, a.hsv.hsl = function (t) {
                var e, n, i, a = t[0],
                    r = t[1] / 100,
                    o = t[2] / 100,
                    s = Math.max(o, .01);
                return i = (2 - r) * o, n = r * s, [a, 100 * (n = (n /= (e = (2 - r) * s) <= 1 ? e : 2 - e) || 0), 100 * (i /= 2)]
            }, a.hwb.rgb = function (t) {
                var e, n, i, a, r, o, s, l = t[0] / 360,
                    u = t[1] / 100,
                    d = t[2] / 100,
                    h = u + d;
                switch (h > 1 && (u /= h, d /= h), i = 6 * l - (e = Math.floor(6 * l)), 0 != (1 & e) && (i = 1 - i), a = u + i * ((n = 1 - d) - u), e) {
                    default:
                    case 6:
                    case 0:
                        r = n, o = a, s = u;
                        break;
                    case 1:
                        r = a, o = n, s = u;
                        break;
                    case 2:
                        r = u, o = n, s = a;
                        break;
                    case 3:
                        r = u, o = a, s = n;
                        break;
                    case 4:
                        r = a, o = u, s = n;
                        break;
                    case 5:
                        r = n, o = u, s = a
                }
                return [255 * r, 255 * o, 255 * s]
            }, a.cmyk.rgb = function (t) {
                var e = t[0] / 100,
                    n = t[1] / 100,
                    i = t[2] / 100,
                    a = t[3] / 100;
                return [255 * (1 - Math.min(1, e * (1 - a) + a)), 255 * (1 - Math.min(1, n * (1 - a) + a)), 255 * (1 - Math.min(1, i * (1 - a) + a))]
            }, a.xyz.rgb = function (t) {
                var e, n, i, a = t[0] / 100,
                    r = t[1] / 100,
                    o = t[2] / 100;
                return n = -.9689 * a + 1.8758 * r + .0415 * o, i = .0557 * a + -.204 * r + 1.057 * o, e = (e = 3.2406 * a + -1.5372 * r + -.4986 * o) > .0031308 ? 1.055 * Math.pow(e, 1 / 2.4) - .055 : 12.92 * e, n = n > .0031308 ? 1.055 * Math.pow(n, 1 / 2.4) - .055 : 12.92 * n, i = i > .0031308 ? 1.055 * Math.pow(i, 1 / 2.4) - .055 : 12.92 * i, [255 * (e = Math.min(Math.max(0, e), 1)), 255 * (n = Math.min(Math.max(0, n), 1)), 255 * (i = Math.min(Math.max(0, i), 1))]
            }, a.xyz.lab = function (t) {
                var e = t[0],
                    n = t[1],
                    i = t[2];
                return n /= 100, i /= 108.883, e = (e /= 95.047) > .008856 ? Math.pow(e, 1 / 3) : 7.787 * e + 16 / 116, [116 * (n = n > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116) - 16, 500 * (e - n), 200 * (n - (i = i > .008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116))]
            }, a.lab.xyz = function (t) {
                var e, n, i, a = t[0];
                e = t[1] / 500 + (n = (a + 16) / 116), i = n - t[2] / 200;
                var r = Math.pow(n, 3),
                    o = Math.pow(e, 3),
                    s = Math.pow(i, 3);
                return n = r > .008856 ? r : (n - 16 / 116) / 7.787, e = o > .008856 ? o : (e - 16 / 116) / 7.787, i = s > .008856 ? s : (i - 16 / 116) / 7.787, [e *= 95.047, n *= 100, i *= 108.883]
            }, a.lab.lch = function (t) {
                var e, n = t[0],
                    i = t[1],
                    a = t[2];
                return (e = 360 * Math.atan2(a, i) / 2 / Math.PI) < 0 && (e += 360), [n, Math.sqrt(i * i + a * a), e]
            }, a.lch.lab = function (t) {
                var e, n = t[0],
                    i = t[1];
                return e = t[2] / 360 * 2 * Math.PI, [n, i * Math.cos(e), i * Math.sin(e)]
            }, a.rgb.ansi16 = function (t) {
                var e = t[0],
                    n = t[1],
                    i = t[2],
                    r = 1 in arguments ? arguments[1] : a.rgb.hsv(t)[2];
                if (0 === (r = Math.round(r / 50))) return 30;
                var o = 30 + (Math.round(i / 255) << 2 | Math.round(n / 255) << 1 | Math.round(e / 255));
                return 2 === r && (o += 60), o
            }, a.hsv.ansi16 = function (t) {
                return a.rgb.ansi16(a.hsv.rgb(t), t[2])
            }, a.rgb.ansi256 = function (t) {
                var e = t[0],
                    n = t[1],
                    i = t[2];
                return e === n && n === i ? e < 8 ? 16 : e > 248 ? 231 : Math.round((e - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(e / 255 * 5) + 6 * Math.round(n / 255 * 5) + Math.round(i / 255 * 5)
            }, a.ansi16.rgb = function (t) {
                var e = t % 10;
                if (0 === e || 7 === e) return t > 50 && (e += 3.5), [e = e / 10.5 * 255, e, e];
                var n = .5 * (1 + ~~(t > 50));
                return [(1 & e) * n * 255, (e >> 1 & 1) * n * 255, (e >> 2 & 1) * n * 255]
            }, a.ansi256.rgb = function (t) {
                if (t >= 232) {
                    var e = 10 * (t - 232) + 8;
                    return [e, e, e]
                }
                var n;
                return t -= 16, [Math.floor(t / 36) / 5 * 255, Math.floor((n = t % 36) / 6) / 5 * 255, n % 6 / 5 * 255]
            }, a.rgb.hex = function (t) {
                var e = (((255 & Math.round(t[0])) << 16) + ((255 & Math.round(t[1])) << 8) + (255 & Math.round(t[2]))).toString(16).toUpperCase();
                return "000000".substring(e.length) + e
            }, a.hex.rgb = function (t) {
                var e = t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
                if (!e) return [0, 0, 0];
                var n = e[0];
                3 === e[0].length && (n = n.split("").map((function (t) {
                    return t + t
                })).join(""));
                var i = parseInt(n, 16);
                return [i >> 16 & 255, i >> 8 & 255, 255 & i]
            }, a.rgb.hcg = function (t) {
                var e, n = t[0] / 255,
                    i = t[1] / 255,
                    a = t[2] / 255,
                    r = Math.max(Math.max(n, i), a),
                    o = Math.min(Math.min(n, i), a),
                    s = r - o;
                return e = s <= 0 ? 0 : r === n ? (i - a) / s % 6 : r === i ? 2 + (a - n) / s : 4 + (n - i) / s + 4, e /= 6, [360 * (e %= 1), 100 * s, 100 * (s < 1 ? o / (1 - s) : 0)]
            }, a.hsl.hcg = function (t) {
                var e = t[1] / 100,
                    n = t[2] / 100,
                    i = 1,
                    a = 0;
                return (i = n < .5 ? 2 * e * n : 2 * e * (1 - n)) < 1 && (a = (n - .5 * i) / (1 - i)), [t[0], 100 * i, 100 * a]
            }, a.hsv.hcg = function (t) {
                var e = t[1] / 100,
                    n = t[2] / 100,
                    i = e * n,
                    a = 0;
                return i < 1 && (a = (n - i) / (1 - i)), [t[0], 100 * i, 100 * a]
            }, a.hcg.rgb = function (t) {
                var e = t[0] / 360,
                    n = t[1] / 100,
                    i = t[2] / 100;
                if (0 === n) return [255 * i, 255 * i, 255 * i];
                var a, r = [0, 0, 0],
                    o = e % 1 * 6,
                    s = o % 1,
                    l = 1 - s;
                switch (Math.floor(o)) {
                    case 0:
                        r[0] = 1, r[1] = s, r[2] = 0;
                        break;
                    case 1:
                        r[0] = l, r[1] = 1, r[2] = 0;
                        break;
                    case 2:
                        r[0] = 0, r[1] = 1, r[2] = s;
                        break;
                    case 3:
                        r[0] = 0, r[1] = l, r[2] = 1;
                        break;
                    case 4:
                        r[0] = s, r[1] = 0, r[2] = 1;
                        break;
                    default:
                        r[0] = 1, r[1] = 0, r[2] = l
                }
                return a = (1 - n) * i, [255 * (n * r[0] + a), 255 * (n * r[1] + a), 255 * (n * r[2] + a)]
            }, a.hcg.hsv = function (t) {
                var e = t[1] / 100,
                    n = e + t[2] / 100 * (1 - e),
                    i = 0;
                return n > 0 && (i = e / n), [t[0], 100 * i, 100 * n]
            }, a.hcg.hsl = function (t) {
                var e = t[1] / 100,
                    n = t[2] / 100 * (1 - e) + .5 * e,
                    i = 0;
                return n > 0 && n < .5 ? i = e / (2 * n) : n >= .5 && n < 1 && (i = e / (2 * (1 - n))), [t[0], 100 * i, 100 * n]
            }, a.hcg.hwb = function (t) {
                var e = t[1] / 100,
                    n = e + t[2] / 100 * (1 - e);
                return [t[0], 100 * (n - e), 100 * (1 - n)]
            }, a.hwb.hcg = function (t) {
                var e = t[1] / 100,
                    n = 1 - t[2] / 100,
                    i = n - e,
                    a = 0;
                return i < 1 && (a = (n - i) / (1 - i)), [t[0], 100 * i, 100 * a]
            }, a.apple.rgb = function (t) {
                return [t[0] / 65535 * 255, t[1] / 65535 * 255, t[2] / 65535 * 255]
            }, a.rgb.apple = function (t) {
                return [t[0] / 255 * 65535, t[1] / 255 * 65535, t[2] / 255 * 65535]
            }, a.gray.rgb = function (t) {
                return [t[0] / 100 * 255, t[0] / 100 * 255, t[0] / 100 * 255]
            }, a.gray.hsl = a.gray.hsv = function (t) {
                return [0, 0, t[0]]
            }, a.gray.hwb = function (t) {
                return [0, 100, t[0]]
            }, a.gray.cmyk = function (t) {
                return [0, 0, 0, t[0]]
            }, a.gray.lab = function (t) {
                return [t[0], 0, 0]
            }, a.gray.hex = function (t) {
                var e = 255 & Math.round(t[0] / 100 * 255),
                    n = ((e << 16) + (e << 8) + e).toString(16).toUpperCase();
                return "000000".substring(n.length) + n
            }, a.rgb.gray = function (t) {
                return [(t[0] + t[1] + t[2]) / 3 / 255 * 100]
            }
        }));
    n.rgb, n.hsl, n.hsv, n.hwb, n.cmyk, n.xyz, n.lab, n.lch, n.hex, n.keyword, n.ansi16, n.ansi256, n.hcg, n.apple, n.gray;

    function i(t) {
        var e = function () {
                for (var t = {}, e = Object.keys(n), i = e.length, a = 0; a < i; a++) t[e[a]] = {
                    distance: -1,
                    parent: null
                };
                return t
            }(),
            i = [t];
        for (e[t].distance = 0; i.length;)
            for (var a = i.pop(), r = Object.keys(n[a]), o = r.length, s = 0; s < o; s++) {
                var l = r[s],
                    u = e[l]; - 1 === u.distance && (u.distance = e[a].distance + 1, u.parent = a, i.unshift(l))
            }
        return e
    }

    function a(t, e) {
        return function (n) {
            return e(t(n))
        }
    }

    function r(t, e) {
        for (var i = [e[t].parent, t], r = n[e[t].parent][t], o = e[t].parent; e[o].parent;) i.unshift(e[o].parent), r = a(n[e[o].parent][o], r), o = e[o].parent;
        return r.conversion = i, r
    }
    var o = {};
    Object.keys(n).forEach((function (t) {
        o[t] = {}, Object.defineProperty(o[t], "channels", {
            value: n[t].channels
        }), Object.defineProperty(o[t], "labels", {
            value: n[t].labels
        });
        var e = function (t) {
            for (var e = i(t), n = {}, a = Object.keys(e), o = a.length, s = 0; s < o; s++) {
                var l = a[s];
                null !== e[l].parent && (n[l] = r(l, e))
            }
            return n
        }(t);
        Object.keys(e).forEach((function (n) {
            var i = e[n];
            o[t][n] = function (t) {
                var e = function (e) {
                    if (null == e) return e;
                    arguments.length > 1 && (e = Array.prototype.slice.call(arguments));
                    var n = t(e);
                    if ("object" == typeof n)
                        for (var i = n.length, a = 0; a < i; a++) n[a] = Math.round(n[a]);
                    return n
                };
                return "conversion" in t && (e.conversion = t.conversion), e
            }(i), o[t][n].raw = function (t) {
                var e = function (e) {
                    return null == e ? e : (arguments.length > 1 && (e = Array.prototype.slice.call(arguments)), t(e))
                };
                return "conversion" in t && (e.conversion = t.conversion), e
            }(i)
        }))
    }));
    var s = o,
        l = {
            aliceblue: [240, 248, 255],
            antiquewhite: [250, 235, 215],
            aqua: [0, 255, 255],
            aquamarine: [127, 255, 212],
            azure: [240, 255, 255],
            beige: [245, 245, 220],
            bisque: [255, 228, 196],
            black: [0, 0, 0],
            blanchedalmond: [255, 235, 205],
            blue: [0, 0, 255],
            blueviolet: [138, 43, 226],
            brown: [165, 42, 42],
            burlywood: [222, 184, 135],
            cadetblue: [95, 158, 160],
            chartreuse: [127, 255, 0],
            chocolate: [210, 105, 30],
            coral: [255, 127, 80],
            cornflowerblue: [100, 149, 237],
            cornsilk: [255, 248, 220],
            crimson: [220, 20, 60],
            cyan: [0, 255, 255],
            darkblue: [0, 0, 139],
            darkcyan: [0, 139, 139],
            darkgoldenrod: [184, 134, 11],
            darkgray: [169, 169, 169],
            darkgreen: [0, 100, 0],
            darkgrey: [169, 169, 169],
            darkkhaki: [189, 183, 107],
            darkmagenta: [139, 0, 139],
            darkolivegreen: [85, 107, 47],
            darkorange: [255, 140, 0],
            darkorchid: [153, 50, 204],
            darkred: [139, 0, 0],
            darksalmon: [233, 150, 122],
            darkseagreen: [143, 188, 143],
            darkslateblue: [72, 61, 139],
            darkslategray: [47, 79, 79],
            darkslategrey: [47, 79, 79],
            darkturquoise: [0, 206, 209],
            darkviolet: [148, 0, 211],
            deeppink: [255, 20, 147],
            deepskyblue: [0, 191, 255],
            dimgray: [105, 105, 105],
            dimgrey: [105, 105, 105],
            dodgerblue: [30, 144, 255],
            firebrick: [178, 34, 34],
            floralwhite: [255, 250, 240],
            forestgreen: [34, 139, 34],
            fuchsia: [255, 0, 255],
            gainsboro: [220, 220, 220],
            ghostwhite: [248, 248, 255],
            gold: [255, 215, 0],
            goldenrod: [218, 165, 32],
            gray: [128, 128, 128],
            green: [0, 128, 0],
            greenyellow: [173, 255, 47],
            grey: [128, 128, 128],
            honeydew: [240, 255, 240],
            hotpink: [255, 105, 180],
            indianred: [205, 92, 92],
            indigo: [75, 0, 130],
            ivory: [255, 255, 240],
            khaki: [240, 230, 140],
            lavender: [230, 230, 250],
            lavenderblush: [255, 240, 245],
            lawngreen: [124, 252, 0],
            lemonchiffon: [255, 250, 205],
            lightblue: [173, 216, 230],
            lightcoral: [240, 128, 128],
            lightcyan: [224, 255, 255],
            lightgoldenrodyellow: [250, 250, 210],
            lightgray: [211, 211, 211],
            lightgreen: [144, 238, 144],
            lightgrey: [211, 211, 211],
            lightpink: [255, 182, 193],
            lightsalmon: [255, 160, 122],
            lightseagreen: [32, 178, 170],
            lightskyblue: [135, 206, 250],
            lightslategray: [119, 136, 153],
            lightslategrey: [119, 136, 153],
            lightsteelblue: [176, 196, 222],
            lightyellow: [255, 255, 224],
            lime: [0, 255, 0],
            limegreen: [50, 205, 50],
            linen: [250, 240, 230],
            magenta: [255, 0, 255],
            maroon: [128, 0, 0],
            mediumaquamarine: [102, 205, 170],
            mediumblue: [0, 0, 205],
            mediumorchid: [186, 85, 211],
            mediumpurple: [147, 112, 219],
            mediumseagreen: [60, 179, 113],
            mediumslateblue: [123, 104, 238],
            mediumspringgreen: [0, 250, 154],
            mediumturquoise: [72, 209, 204],
            mediumvioletred: [199, 21, 133],
            midnightblue: [25, 25, 112],
            mintcream: [245, 255, 250],
            mistyrose: [255, 228, 225],
            moccasin: [255, 228, 181],
            navajowhite: [255, 222, 173],
            navy: [0, 0, 128],
            oldlace: [253, 245, 230],
            olive: [128, 128, 0],
            olivedrab: [107, 142, 35],
            orange: [255, 165, 0],
            orangered: [255, 69, 0],
            orchid: [218, 112, 214],
            palegoldenrod: [238, 232, 170],
            palegreen: [152, 251, 152],
            paleturquoise: [175, 238, 238],
            palevioletred: [219, 112, 147],
            papayawhip: [255, 239, 213],
            peachpuff: [255, 218, 185],
            peru: [205, 133, 63],
            pink: [255, 192, 203],
            plum: [221, 160, 221],
            powderblue: [176, 224, 230],
            purple: [128, 0, 128],
            rebeccapurple: [102, 51, 153],
            red: [255, 0, 0],
            rosybrown: [188, 143, 143],
            royalblue: [65, 105, 225],
            saddlebrown: [139, 69, 19],
            salmon: [250, 128, 114],
            sandybrown: [244, 164, 96],
            seagreen: [46, 139, 87],
            seashell: [255, 245, 238],
            sienna: [160, 82, 45],
            silver: [192, 192, 192],
            skyblue: [135, 206, 235],
            slateblue: [106, 90, 205],
            slategray: [112, 128, 144],
            slategrey: [112, 128, 144],
            snow: [255, 250, 250],
            springgreen: [0, 255, 127],
            steelblue: [70, 130, 180],
            tan: [210, 180, 140],
            teal: [0, 128, 128],
            thistle: [216, 191, 216],
            tomato: [255, 99, 71],
            turquoise: [64, 224, 208],
            violet: [238, 130, 238],
            wheat: [245, 222, 179],
            white: [255, 255, 255],
            whitesmoke: [245, 245, 245],
            yellow: [255, 255, 0],
            yellowgreen: [154, 205, 50]
        },
        u = {
            getRgba: d,
            getHsla: h,
            getRgb: function (t) {
                var e = d(t);
                return e && e.slice(0, 3)
            },
            getHsl: function (t) {
                var e = h(t);
                return e && e.slice(0, 3)
            },
            getHwb: c,
            getAlpha: function (t) {
                var e = d(t);
                if (e) return e[3];
                if (e = h(t)) return e[3];
                if (e = c(t)) return e[3]
            },
            hexString: function (t, e) {
                e = void 0 !== e && 3 === t.length ? e : t[3];
                return "#" + v(t[0]) + v(t[1]) + v(t[2]) + (e >= 0 && e < 1 ? v(Math.round(255 * e)) : "")
            },
            rgbString: function (t, e) {
                if (e < 1 || t[3] && t[3] < 1) return f(t, e);
                return "rgb(" + t[0] + ", " + t[1] + ", " + t[2] + ")"
            },
            rgbaString: f,
            percentString: function (t, e) {
                if (e < 1 || t[3] && t[3] < 1) return g(t, e);
                var n = Math.round(t[0] / 255 * 100),
                    i = Math.round(t[1] / 255 * 100),
                    a = Math.round(t[2] / 255 * 100);
                return "rgb(" + n + "%, " + i + "%, " + a + "%)"
            },
            percentaString: g,
            hslString: function (t, e) {
                if (e < 1 || t[3] && t[3] < 1) return p(t, e);
                return "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)"
            },
            hslaString: p,
            hwbString: function (t, e) {
                void 0 === e && (e = void 0 !== t[3] ? t[3] : 1);
                return "hwb(" + t[0] + ", " + t[1] + "%, " + t[2] + "%" + (void 0 !== e && 1 !== e ? ", " + e : "") + ")"
            },
            keyword: function (t) {
                return b[t.slice(0, 3)]
            }
        };

    function d(t) {
        if (t) {
            var e = [0, 0, 0],
                n = 1,
                i = t.match(/^#([a-fA-F0-9]{3,4})$/i),
                a = "";
            if (i) {
                a = (i = i[1])[3];
                for (var r = 0; r < e.length; r++) e[r] = parseInt(i[r] + i[r], 16);
                a && (n = Math.round(parseInt(a + a, 16) / 255 * 100) / 100)
            } else if (i = t.match(/^#([a-fA-F0-9]{6}([a-fA-F0-9]{2})?)$/i)) {
                a = i[2], i = i[1];
                for (r = 0; r < e.length; r++) e[r] = parseInt(i.slice(2 * r, 2 * r + 2), 16);
                a && (n = Math.round(parseInt(a, 16) / 255 * 100) / 100)
            } else if (i = t.match(/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i)) {
                for (r = 0; r < e.length; r++) e[r] = parseInt(i[r + 1]);
                n = parseFloat(i[4])
            } else if (i = t.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i)) {
                for (r = 0; r < e.length; r++) e[r] = Math.round(2.55 * parseFloat(i[r + 1]));
                n = parseFloat(i[4])
            } else if (i = t.match(/(\w+)/)) {
                if ("transparent" == i[1]) return [0, 0, 0, 0];
                if (!(e = l[i[1]])) return
            }
            for (r = 0; r < e.length; r++) e[r] = m(e[r], 0, 255);
            return n = n || 0 == n ? m(n, 0, 1) : 1, e[3] = n, e
        }
    }

    function h(t) {
        if (t) {
            var e = t.match(/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);
            if (e) {
                var n = parseFloat(e[4]);
                return [m(parseInt(e[1]), 0, 360), m(parseFloat(e[2]), 0, 100), m(parseFloat(e[3]), 0, 100), m(isNaN(n) ? 1 : n, 0, 1)]
            }
        }
    }

    function c(t) {
        if (t) {
            var e = t.match(/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);
            if (e) {
                var n = parseFloat(e[4]);
                return [m(parseInt(e[1]), 0, 360), m(parseFloat(e[2]), 0, 100), m(parseFloat(e[3]), 0, 100), m(isNaN(n) ? 1 : n, 0, 1)]
            }
        }
    }

    function f(t, e) {
        return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "rgba(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + e + ")"
    }

    function g(t, e) {
        return "rgba(" + Math.round(t[0] / 255 * 100) + "%, " + Math.round(t[1] / 255 * 100) + "%, " + Math.round(t[2] / 255 * 100) + "%, " + (e || t[3] || 1) + ")"
    }

    function p(t, e) {
        return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + e + ")"
    }

    function m(t, e, n) {
        return Math.min(Math.max(e, t), n)
    }

    function v(t) {
        var e = t.toString(16).toUpperCase();
        return e.length < 2 ? "0" + e : e
    }
    var b = {};
    for (var x in l) b[l[x]] = x;
    var y = function (t) {
        return t instanceof y ? t : this instanceof y ? (this.valid = !1, this.values = {
            rgb: [0, 0, 0],
            hsl: [0, 0, 0],
            hsv: [0, 0, 0],
            hwb: [0, 0, 0],
            cmyk: [0, 0, 0, 0],
            alpha: 1
        }, void("string" == typeof t ? (e = u.getRgba(t)) ? this.setValues("rgb", e) : (e = u.getHsla(t)) ? this.setValues("hsl", e) : (e = u.getHwb(t)) && this.setValues("hwb", e) : "object" == typeof t && (void 0 !== (e = t).r || void 0 !== e.red ? this.setValues("rgb", e) : void 0 !== e.l || void 0 !== e.lightness ? this.setValues("hsl", e) : void 0 !== e.v || void 0 !== e.value ? this.setValues("hsv", e) : void 0 !== e.w || void 0 !== e.whiteness ? this.setValues("hwb", e) : void 0 === e.c && void 0 === e.cyan || this.setValues("cmyk", e)))) : new y(t);
        var e
    };
    y.prototype = {
        isValid: function () {
            return this.valid
        },
        rgb: function () {
            return this.setSpace("rgb", arguments)
        },
        hsl: function () {
            return this.setSpace("hsl", arguments)
        },
        hsv: function () {
            return this.setSpace("hsv", arguments)
        },
        hwb: function () {
            return this.setSpace("hwb", arguments)
        },
        cmyk: function () {
            return this.setSpace("cmyk", arguments)
        },
        rgbArray: function () {
            return this.values.rgb
        },
        hslArray: function () {
            return this.values.hsl
        },
        hsvArray: function () {
            return this.values.hsv
        },
        hwbArray: function () {
            var t = this.values;
            return 1 !== t.alpha ? t.hwb.concat([t.alpha]) : t.hwb
        },
        cmykArray: function () {
            return this.values.cmyk
        },
        rgbaArray: function () {
            var t = this.values;
            return t.rgb.concat([t.alpha])
        },
        hslaArray: function () {
            var t = this.values;
            return t.hsl.concat([t.alpha])
        },
        alpha: function (t) {
            return void 0 === t ? this.values.alpha : (this.setValues("alpha", t), this)
        },
        red: function (t) {
            return this.setChannel("rgb", 0, t)
        },
        green: function (t) {
            return this.setChannel("rgb", 1, t)
        },
        blue: function (t) {
            return this.setChannel("rgb", 2, t)
        },
        hue: function (t) {
            return t && (t = (t %= 360) < 0 ? 360 + t : t), this.setChannel("hsl", 0, t)
        },
        saturation: function (t) {
            return this.setChannel("hsl", 1, t)
        },
        lightness: function (t) {
            return this.setChannel("hsl", 2, t)
        },
        saturationv: function (t) {
            return this.setChannel("hsv", 1, t)
        },
        whiteness: function (t) {
            return this.setChannel("hwb", 1, t)
        },
        blackness: function (t) {
            return this.setChannel("hwb", 2, t)
        },
        value: function (t) {
            return this.setChannel("hsv", 2, t)
        },
        cyan: function (t) {
            return this.setChannel("cmyk", 0, t)
        },
        magenta: function (t) {
            return this.setChannel("cmyk", 1, t)
        },
        yellow: function (t) {
            return this.setChannel("cmyk", 2, t)
        },
        black: function (t) {
            return this.setChannel("cmyk", 3, t)
        },
        hexString: function () {
            return u.hexString(this.values.rgb)
        },
        rgbString: function () {
            return u.rgbString(this.values.rgb, this.values.alpha)
        },
        rgbaString: function () {
            return u.rgbaString(this.values.rgb, this.values.alpha)
        },
        percentString: function () {
            return u.percentString(this.values.rgb, this.values.alpha)
        },
        hslString: function () {
            return u.hslString(this.values.hsl, this.values.alpha)
        },
        hslaString: function () {
            return u.hslaString(this.values.hsl, this.values.alpha)
        },
        hwbString: function () {
            return u.hwbString(this.values.hwb, this.values.alpha)
        },
        keyword: function () {
            return u.keyword(this.values.rgb, this.values.alpha)
        },
        rgbNumber: function () {
            var t = this.values.rgb;
            return t[0] << 16 | t[1] << 8 | t[2]
        },
        luminosity: function () {
            for (var t = this.values.rgb, e = [], n = 0; n < t.length; n++) {
                var i = t[n] / 255;
                e[n] = i <= .03928 ? i / 12.92 : Math.pow((i + .055) / 1.055, 2.4)
            }
            return .2126 * e[0] + .7152 * e[1] + .0722 * e[2]
        },
        contrast: function (t) {
            var e = this.luminosity(),
                n = t.luminosity();
            return e > n ? (e + .05) / (n + .05) : (n + .05) / (e + .05)
        },
        level: function (t) {
            var e = this.contrast(t);
            return e >= 7.1 ? "AAA" : e >= 4.5 ? "AA" : ""
        },
        dark: function () {
            var t = this.values.rgb;
            return (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3 < 128
        },
        light: function () {
            return !this.dark()
        },
        negate: function () {
            for (var t = [], e = 0; e < 3; e++) t[e] = 255 - this.values.rgb[e];
            return this.setValues("rgb", t), this
        },
        lighten: function (t) {
            var e = this.values.hsl;
            return e[2] += e[2] * t, this.setValues("hsl", e), this
        },
        darken: function (t) {
            var e = this.values.hsl;
            return e[2] -= e[2] * t, this.setValues("hsl", e), this
        },
        saturate: function (t) {
            var e = this.values.hsl;
            return e[1] += e[1] * t, this.setValues("hsl", e), this
        },
        desaturate: function (t) {
            var e = this.values.hsl;
            return e[1] -= e[1] * t, this.setValues("hsl", e), this
        },
        whiten: function (t) {
            var e = this.values.hwb;
            return e[1] += e[1] * t, this.setValues("hwb", e), this
        },
        blacken: function (t) {
            var e = this.values.hwb;
            return e[2] += e[2] * t, this.setValues("hwb", e), this
        },
        greyscale: function () {
            var t = this.values.rgb,
                e = .3 * t[0] + .59 * t[1] + .11 * t[2];
            return this.setValues("rgb", [e, e, e]), this
        },
        clearer: function (t) {
            var e = this.values.alpha;
            return this.setValues("alpha", e - e * t), this
        },
        opaquer: function (t) {
            var e = this.values.alpha;
            return this.setValues("alpha", e + e * t), this
        },
        rotate: function (t) {
            var e = this.values.hsl,
                n = (e[0] + t) % 360;
            return e[0] = n < 0 ? 360 + n : n, this.setValues("hsl", e), this
        },
        mix: function (t, e) {
            var n = t,
                i = void 0 === e ? .5 : e,
                a = 2 * i - 1,
                r = this.alpha() - n.alpha(),
                o = ((a * r == -1 ? a : (a + r) / (1 + a * r)) + 1) / 2,
                s = 1 - o;
            return this.rgb(o * this.red() + s * n.red(), o * this.green() + s * n.green(), o * this.blue() + s * n.blue()).alpha(this.alpha() * i + n.alpha() * (1 - i))
        },
        toJSON: function () {
            return this.rgb()
        },
        clone: function () {
            var t, e, n = new y,
                i = this.values,
                a = n.values;
            for (var r in i) i.hasOwnProperty(r) && (t = i[r], "[object Array]" === (e = {}.toString.call(t)) ? a[r] = t.slice(0) : "[object Number]" === e ? a[r] = t : console.error("unexpected color value:", t));
            return n
        }
    }, y.prototype.spaces = {
        rgb: ["red", "green", "blue"],
        hsl: ["hue", "saturation", "lightness"],
        hsv: ["hue", "saturation", "value"],
        hwb: ["hue", "whiteness", "blackness"],
        cmyk: ["cyan", "magenta", "yellow", "black"]
    }, y.prototype.maxes = {
        rgb: [255, 255, 255],
        hsl: [360, 100, 100],
        hsv: [360, 100, 100],
        hwb: [360, 100, 100],
        cmyk: [100, 100, 100, 100]
    }, y.prototype.getValues = function (t) {
        for (var e = this.values, n = {}, i = 0; i < t.length; i++) n[t.charAt(i)] = e[t][i];
        return 1 !== e.alpha && (n.a = e.alpha), n
    }, y.prototype.setValues = function (t, e) {
        var n, i, a = this.values,
            r = this.spaces,
            o = this.maxes,
            l = 1;
        if (this.valid = !0, "alpha" === t) l = e;
        else if (e.length) a[t] = e.slice(0, t.length), l = e[t.length];
        else if (void 0 !== e[t.charAt(0)]) {
            for (n = 0; n < t.length; n++) a[t][n] = e[t.charAt(n)];
            l = e.a
        } else if (void 0 !== e[r[t][0]]) {
            var u = r[t];
            for (n = 0; n < t.length; n++) a[t][n] = e[u[n]];
            l = e.alpha
        }
        if (a.alpha = Math.max(0, Math.min(1, void 0 === l ? a.alpha : l)), "alpha" === t) return !1;
        for (n = 0; n < t.length; n++) i = Math.max(0, Math.min(o[t][n], a[t][n])), a[t][n] = Math.round(i);
        for (var d in r) d !== t && (a[d] = s[t][d](a[t]));
        return !0
    }, y.prototype.setSpace = function (t, e) {
        var n = e[0];
        return void 0 === n ? this.getValues(t) : ("number" == typeof n && (n = Array.prototype.slice.call(e)), this.setValues(t, n), this)
    }, y.prototype.setChannel = function (t, e, n) {
        var i = this.values[t];
        return void 0 === n ? i[e] : n === i[e] ? this : (i[e] = n, this.setValues(t, i), this)
    }, "undefined" != typeof window && (window.Color = y);
    var _, k = y,
        w = {
            noop: function () {},
            uid: (_ = 0, function () {
                return _++
            }),
            isNullOrUndef: function (t) {
                return null == t
            },
            isArray: function (t) {
                if (Array.isArray && Array.isArray(t)) return !0;
                var e = Object.prototype.toString.call(t);
                return "[object" === e.substr(0, 7) && "Array]" === e.substr(-6)
            },
            isObject: function (t) {
                return null !== t && "[object Object]" === Object.prototype.toString.call(t)
            },
            isFinite: function (t) {
                return ("number" == typeof t || t instanceof Number) && isFinite(t)
            },
            valueOrDefault: function (t, e) {
                return void 0 === t ? e : t
            },
            valueAtIndexOrDefault: function (t, e, n) {
                return w.valueOrDefault(w.isArray(t) ? t[e] : t, n)
            },
            callback: function (t, e, n) {
                if (t && "function" == typeof t.call) return t.apply(n, e)
            },
            each: function (t, e, n, i) {
                var a, r, o;
                if (w.isArray(t))
                    if (r = t.length, i)
                        for (a = r - 1; a >= 0; a--) e.call(n, t[a], a);
                    else
                        for (a = 0; a < r; a++) e.call(n, t[a], a);
                else if (w.isObject(t))
                    for (r = (o = Object.keys(t)).length, a = 0; a < r; a++) e.call(n, t[o[a]], o[a])
            },
            arrayEquals: function (t, e) {
                var n, i, a, r;
                if (!t || !e || t.length !== e.length) return !1;
                for (n = 0, i = t.length; n < i; ++n)
                    if (a = t[n], r = e[n], a instanceof Array && r instanceof Array) {
                        if (!w.arrayEquals(a, r)) return !1
                    } else if (a !== r) return !1;
                return !0
            },
            clone: function (t) {
                if (w.isArray(t)) return t.map(w.clone);
                if (w.isObject(t)) {
                    for (var e = {}, n = Object.keys(t), i = n.length, a = 0; a < i; ++a) e[n[a]] = w.clone(t[n[a]]);
                    return e
                }
                return t
            },
            _merger: function (t, e, n, i) {
                var a = e[t],
                    r = n[t];
                w.isObject(a) && w.isObject(r) ? w.merge(a, r, i) : e[t] = w.clone(r)
            },
            _mergerIf: function (t, e, n) {
                var i = e[t],
                    a = n[t];
                w.isObject(i) && w.isObject(a) ? w.mergeIf(i, a) : e.hasOwnProperty(t) || (e[t] = w.clone(a))
            },
            merge: function (t, e, n) {
                var i, a, r, o, s, l = w.isArray(e) ? e : [e],
                    u = l.length;
                if (!w.isObject(t)) return t;
                for (i = (n = n || {}).merger || w._merger, a = 0; a < u; ++a)
                    if (e = l[a], w.isObject(e))
                        for (s = 0, o = (r = Object.keys(e)).length; s < o; ++s) i(r[s], t, e, n);
                return t
            },
            mergeIf: function (t, e) {
                return w.merge(t, e, {
                    merger: w._mergerIf
                })
            },
            extend: Object.assign || function (t) {
                return w.merge(t, [].slice.call(arguments, 1), {
                    merger: function (t, e, n) {
                        e[t] = n[t]
                    }
                })
            },
            inherits: function (t) {
                var e = this,
                    n = t && t.hasOwnProperty("constructor") ? t.constructor : function () {
                        return e.apply(this, arguments)
                    },
                    i = function () {
                        this.constructor = n
                    };
                return i.prototype = e.prototype, n.prototype = new i, n.extend = w.inherits, t && w.extend(n.prototype, t), n.__super__ = e.prototype, n
            },
            _deprecated: function (t, e, n, i) {
                void 0 !== e && console.warn(t + ': "' + n + '" is deprecated. Please use "' + i + '" instead')
            }
        },
        M = w;
    w.callCallback = w.callback, w.indexOf = function (t, e, n) {
        return Array.prototype.indexOf.call(t, e, n)
    }, w.getValueOrDefault = w.valueOrDefault, w.getValueAtIndexOrDefault = w.valueAtIndexOrDefault;
    var S = {
            linear: function (t) {
                return t
            },
            easeInQuad: function (t) {
                return t * t
            },
            easeOutQuad: function (t) {
                return -t * (t - 2)
            },
            easeInOutQuad: function (t) {
                return (t /= .5) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
            },
            easeInCubic: function (t) {
                return t * t * t
            },
            easeOutCubic: function (t) {
                return (t -= 1) * t * t + 1
            },
            easeInOutCubic: function (t) {
                return (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
            },
            easeInQuart: function (t) {
                return t * t * t * t
            },
            easeOutQuart: function (t) {
                return -((t -= 1) * t * t * t - 1)
            },
            easeInOutQuart: function (t) {
                return (t /= .5) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
            },
            easeInQuint: function (t) {
                return t * t * t * t * t
            },
            easeOutQuint: function (t) {
                return (t -= 1) * t * t * t * t + 1
            },
            easeInOutQuint: function (t) {
                return (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
            },
            easeInSine: function (t) {
                return 1 - Math.cos(t * (Math.PI / 2))
            },
            easeOutSine: function (t) {
                return Math.sin(t * (Math.PI / 2))
            },
            easeInOutSine: function (t) {
                return -.5 * (Math.cos(Math.PI * t) - 1)
            },
            easeInExpo: function (t) {
                return 0 === t ? 0 : Math.pow(2, 10 * (t - 1))
            },
            easeOutExpo: function (t) {
                return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
            },
            easeInOutExpo: function (t) {
                return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * --t))
            },
            easeInCirc: function (t) {
                return t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1)
            },
            easeOutCirc: function (t) {
                return Math.sqrt(1 - (t -= 1) * t)
            },
            easeInOutCirc: function (t) {
                return (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
            },
            easeInElastic: function (t) {
                var e = 1.70158,
                    n = 0,
                    i = 1;
                return 0 === t ? 0 : 1 === t ? 1 : (n || (n = .3), i < 1 ? (i = 1, e = n / 4) : e = n / (2 * Math.PI) * Math.asin(1 / i), -i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / n))
            },
            easeOutElastic: function (t) {
                var e = 1.70158,
                    n = 0,
                    i = 1;
                return 0 === t ? 0 : 1 === t ? 1 : (n || (n = .3), i < 1 ? (i = 1, e = n / 4) : e = n / (2 * Math.PI) * Math.asin(1 / i), i * Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / n) + 1)
            },
            easeInOutElastic: function (t) {
                var e = 1.70158,
                    n = 0,
                    i = 1;
                return 0 === t ? 0 : 2 == (t /= .5) ? 1 : (n || (n = .45), i < 1 ? (i = 1, e = n / 4) : e = n / (2 * Math.PI) * Math.asin(1 / i), t < 1 ? i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / n) * -.5 : i * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / n) * .5 + 1)
            },
            easeInBack: function (t) {
                var e = 1.70158;
                return t * t * ((e + 1) * t - e)
            },
            easeOutBack: function (t) {
                var e = 1.70158;
                return (t -= 1) * t * ((e + 1) * t + e) + 1
            },
            easeInOutBack: function (t) {
                var e = 1.70158;
                return (t /= .5) < 1 ? t * t * ((1 + (e *= 1.525)) * t - e) * .5 : .5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2)
            },
            easeInBounce: function (t) {
                return 1 - S.easeOutBounce(1 - t)
            },
            easeOutBounce: function (t) {
                return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
            },
            easeInOutBounce: function (t) {
                return t < .5 ? .5 * S.easeInBounce(2 * t) : .5 * S.easeOutBounce(2 * t - 1) + .5
            }
        },
        C = {
            effects: S
        };
    M.easingEffects = S;
    var P = Math.PI,
        A = P / 180,
        D = 2 * P,
        T = P / 2,
        I = P / 4,
        F = 2 * P / 3,
        L = {
            clear: function (t) {
                t.ctx.clearRect(0, 0, t.width, t.height)
            },
            roundedRect: function (t, e, n, i, a, r) {
                if (r) {
                    var o = Math.min(r, a / 2, i / 2),
                        s = e + o,
                        l = n + o,
                        u = e + i - o,
                        d = n + a - o;
                    t.moveTo(e, l), s < u && l < d ? (t.arc(s, l, o, -P, -T), t.arc(u, l, o, -T, 0), t.arc(u, d, o, 0, T), t.arc(s, d, o, T, P)) : s < u ? (t.moveTo(s, n), t.arc(u, l, o, -T, T), t.arc(s, l, o, T, P + T)) : l < d ? (t.arc(s, l, o, -P, 0), t.arc(s, d, o, 0, P)) : t.arc(s, l, o, -P, P), t.closePath(), t.moveTo(e, n)
                } else t.rect(e, n, i, a)
            },
            drawPoint: function (t, e, n, i, a, r) {
                var o, s, l, u, d, h = (r || 0) * A;
                if (e && "object" == typeof e && ("[object HTMLImageElement]" === (o = e.toString()) || "[object HTMLCanvasElement]" === o)) return t.save(), t.translate(i, a), t.rotate(h), t.drawImage(e, -e.width / 2, -e.height / 2, e.width, e.height), void t.restore();
                if (!(isNaN(n) || n <= 0)) {
                    switch (t.beginPath(), e) {
                        default:
                            t.arc(i, a, n, 0, D), t.closePath();
                            break;
                        case "triangle":
                            t.moveTo(i + Math.sin(h) * n, a - Math.cos(h) * n), h += F, t.lineTo(i + Math.sin(h) * n, a - Math.cos(h) * n), h += F, t.lineTo(i + Math.sin(h) * n, a - Math.cos(h) * n), t.closePath();
                            break;
                        case "rectRounded":
                            u = n - (d = .516 * n), s = Math.cos(h + I) * u, l = Math.sin(h + I) * u, t.arc(i - s, a - l, d, h - P, h - T), t.arc(i + l, a - s, d, h - T, h), t.arc(i + s, a + l, d, h, h + T), t.arc(i - l, a + s, d, h + T, h + P), t.closePath();
                            break;
                        case "rect":
                            if (!r) {
                                u = Math.SQRT1_2 * n, t.rect(i - u, a - u, 2 * u, 2 * u);
                                break
                            }
                            h += I;
                        case "rectRot":
                            s = Math.cos(h) * n, l = Math.sin(h) * n, t.moveTo(i - s, a - l), t.lineTo(i + l, a - s), t.lineTo(i + s, a + l), t.lineTo(i - l, a + s), t.closePath();
                            break;
                        case "crossRot":
                            h += I;
                        case "cross":
                            s = Math.cos(h) * n, l = Math.sin(h) * n, t.moveTo(i - s, a - l), t.lineTo(i + s, a + l), t.moveTo(i + l, a - s), t.lineTo(i - l, a + s);
                            break;
                        case "star":
                            s = Math.cos(h) * n, l = Math.sin(h) * n, t.moveTo(i - s, a - l), t.lineTo(i + s, a + l), t.moveTo(i + l, a - s), t.lineTo(i - l, a + s), h += I, s = Math.cos(h) * n, l = Math.sin(h) * n, t.moveTo(i - s, a - l), t.lineTo(i + s, a + l), t.moveTo(i + l, a - s), t.lineTo(i - l, a + s);
                            break;
                        case "line":
                            s = Math.cos(h) * n, l = Math.sin(h) * n, t.moveTo(i - s, a - l), t.lineTo(i + s, a + l);
                            break;
                        case "dash":
                            t.moveTo(i, a), t.lineTo(i + Math.cos(h) * n, a + Math.sin(h) * n)
                    }
                    t.fill(), t.stroke()
                }
            },
            _isPointInArea: function (t, e) {
                return t.x > e.left - 1e-6 && t.x < e.right + 1e-6 && t.y > e.top - 1e-6 && t.y < e.bottom + 1e-6
            },
            clipArea: function (t, e) {
                t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip()
            },
            unclipArea: function (t) {
                t.restore()
            },
            lineTo: function (t, e, n, i) {
                var a = n.steppedLine;
                if (a) {
                    if ("middle" === a) {
                        var r = (e.x + n.x) / 2;
                        t.lineTo(r, i ? n.y : e.y), t.lineTo(r, i ? e.y : n.y)
                    } else "after" === a && !i || "after" !== a && i ? t.lineTo(e.x, n.y) : t.lineTo(n.x, e.y);
                    t.lineTo(n.x, n.y)
                } else n.tension ? t.bezierCurveTo(i ? e.controlPointPreviousX : e.controlPointNextX, i ? e.controlPointPreviousY : e.controlPointNextY, i ? n.controlPointNextX : n.controlPointPreviousX, i ? n.controlPointNextY : n.controlPointPreviousY, n.x, n.y) : t.lineTo(n.x, n.y)
            }
        },
        O = L;
    M.clear = L.clear, M.drawRoundedRectangle = function (t) {
        t.beginPath(), L.roundedRect.apply(L, arguments)
    };
    var R = {
        _set: function (t, e) {
            return M.merge(this[t] || (this[t] = {}), e)
        }
    };
    R._set("global", {
        defaultColor: "rgba(0,0,0,0.1)",
        defaultFontColor: "#666",
        defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        defaultFontSize: 12,
        defaultFontStyle: "normal",
        defaultLineHeight: 1.2,
        showLines: !0
    });
    var z = R,
        N = M.valueOrDefault;
    var B = {
            toLineHeight: function (t, e) {
                var n = ("" + t).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);
                if (!n || "normal" === n[1]) return 1.2 * e;
                switch (t = +n[2], n[3]) {
                    case "px":
                        return t;
                    case "%":
                        t /= 100
                }
                return e * t
            },
            toPadding: function (t) {
                var e, n, i, a;
                return M.isObject(t) ? (e = +t.top || 0, n = +t.right || 0, i = +t.bottom || 0, a = +t.left || 0) : e = n = i = a = +t || 0, {
                    top: e,
                    right: n,
                    bottom: i,
                    left: a,
                    height: e + i,
                    width: a + n
                }
            },
            _parseFont: function (t) {
                var e = z.global,
                    n = N(t.fontSize, e.defaultFontSize),
                    i = {
                        family: N(t.fontFamily, e.defaultFontFamily),
                        lineHeight: M.options.toLineHeight(N(t.lineHeight, e.defaultLineHeight), n),
                        size: n,
                        style: N(t.fontStyle, e.defaultFontStyle),
                        weight: null,
                        string: ""
                    };
                return i.string = function (t) {
                    return !t || M.isNullOrUndef(t.size) || M.isNullOrUndef(t.family) ? null : (t.style ? t.style + " " : "") + (t.weight ? t.weight + " " : "") + t.size + "px " + t.family
                }(i), i
            },
            resolve: function (t, e, n, i) {
                var a, r, o, s = !0;
                for (a = 0, r = t.length; a < r; ++a)
                    if (void 0 !== (o = t[a]) && (void 0 !== e && "function" == typeof o && (o = o(e), s = !1), void 0 !== n && M.isArray(o) && (o = o[n], s = !1), void 0 !== o)) return i && !s && (i.cacheable = !1), o
            }
        },
        E = {
            _factorize: function (t) {
                var e, n = [],
                    i = Math.sqrt(t);
                for (e = 1; e < i; e++) t % e == 0 && (n.push(e), n.push(t / e));
                return i === (0 | i) && n.push(i), n.sort((function (t, e) {
                    return t - e
                })).pop(), n
            },
            log10: Math.log10 || function (t) {
                var e = Math.log(t) * Math.LOG10E,
                    n = Math.round(e);
                return t === Math.pow(10, n) ? n : e
            }
        },
        W = E;
    M.log10 = E.log10;
    var V = M,
        H = C,
        j = O,
        q = B,
        U = W,
        Y = {
            getRtlAdapter: function (t, e, n) {
                return t ? function (t, e) {
                    return {
                        x: function (n) {
                            return t + t + e - n
                        },
                        setWidth: function (t) {
                            e = t
                        },
                        textAlign: function (t) {
                            return "center" === t ? t : "right" === t ? "left" : "right"
                        },
                        xPlus: function (t, e) {
                            return t - e
                        },
                        leftForLtr: function (t, e) {
                            return t - e
                        }
                    }
                }(e, n) : {
                    x: function (t) {
                        return t
                    },
                    setWidth: function (t) {},
                    textAlign: function (t) {
                        return t
                    },
                    xPlus: function (t, e) {
                        return t + e
                    },
                    leftForLtr: function (t, e) {
                        return t
                    }
                }
            },
            overrideTextDirection: function (t, e) {
                var n, i;
                "ltr" !== e && "rtl" !== e || (i = [(n = t.canvas.style).getPropertyValue("direction"), n.getPropertyPriority("direction")], n.setProperty("direction", e, "important"), t.prevTextDirection = i)
            },
            restoreTextDirection: function (t) {
                var e = t.prevTextDirection;
                void 0 !== e && (delete t.prevTextDirection, t.canvas.style.setProperty("direction", e[0], e[1]))
            }
        };
    V.easing = H, V.canvas = j, V.options = q, V.math = U, V.rtl = Y;
    var G = function (t) {
        V.extend(this, t), this.initialize.apply(this, arguments)
    };
    V.extend(G.prototype, {
        _type: void 0,
        initialize: function () {
            this.hidden = !1
        },
        pivot: function () {
            var t = this;
            return t._view || (t._view = V.extend({}, t._model)), t._start = {}, t
        },
        transition: function (t) {
            var e = this,
                n = e._model,
                i = e._start,
                a = e._view;
            return n && 1 !== t ? (a || (a = e._view = {}), i || (i = e._start = {}), function (t, e, n, i) {
                var a, r, o, s, l, u, d, h, c, f = Object.keys(n);
                for (a = 0, r = f.length; a < r; ++a)
                    if (u = n[o = f[a]], e.hasOwnProperty(o) || (e[o] = u), (s = e[o]) !== u && "_" !== o[0]) {
                        if (t.hasOwnProperty(o) || (t[o] = s), (d = typeof u) === typeof (l = t[o]))
                            if ("string" === d) {
                                if ((h = k(l)).valid && (c = k(u)).valid) {
                                    e[o] = c.mix(h, i).rgbString();
                                    continue
                                }
                            } else if (V.isFinite(l) && V.isFinite(u)) {
                            e[o] = l + (u - l) * i;
                            continue
                        }
                        e[o] = u
                    }
            }(i, a, n, t), e) : (e._view = V.extend({}, n), e._start = null, e)
        },
        tooltipPosition: function () {
            return {
                x: this._model.x,
                y: this._model.y
            }
        },
        hasValue: function () {
            return V.isNumber(this._model.x) && V.isNumber(this._model.y)
        }
    }), G.extend = V.inherits;
    var X = G,
        K = X.extend({
            chart: null,
            currentStep: 0,
            numSteps: 60,
            easing: "",
            render: null,
            onAnimationProgress: null,
            onAnimationComplete: null
        }),
        Z = K;
    Object.defineProperty(K.prototype, "animationObject", {
        get: function () {
            return this
        }
    }), Object.defineProperty(K.prototype, "chartInstance", {
        get: function () {
            return this.chart
        },
        set: function (t) {
            this.chart = t
        }
    }), z._set("global", {
        animation: {
            duration: 1e3,
            easing: "easeOutQuart",
            onProgress: V.noop,
            onComplete: V.noop
        }
    });
    var $ = {
            animations: [],
            request: null,
            addAnimation: function (t, e, n, i) {
                var a, r, o = this.animations;
                for (e.chart = t, e.startTime = Date.now(), e.duration = n, i || (t.animating = !0), a = 0, r = o.length; a < r; ++a)
                    if (o[a].chart === t) return void(o[a] = e);
                o.push(e), 1 === o.length && this.requestAnimationFrame()
            },
            cancelAnimation: function (t) {
                var e = V.findIndex(this.animations, (function (e) {
                    return e.chart === t
                })); - 1 !== e && (this.animations.splice(e, 1), t.animating = !1)
            },
            requestAnimationFrame: function () {
                var t = this;
                null === t.request && (t.request = V.requestAnimFrame.call(window, (function () {
                    t.request = null, t.startDigest()
                })))
            },
            startDigest: function () {
                this.advance(), this.animations.length > 0 && this.requestAnimationFrame()
            },
            advance: function () {
                for (var t, e, n, i, a = this.animations, r = 0; r < a.length;) e = (t = a[r]).chart, n = t.numSteps, i = Math.floor((Date.now() - t.startTime) / t.duration * n) + 1, t.currentStep = Math.min(i, n), V.callback(t.render, [e, t], e), V.callback(t.onAnimationProgress, [t], e), t.currentStep >= n ? (V.callback(t.onAnimationComplete, [t], e), e.animating = !1, a.splice(r, 1)) : ++r
            }
        },
        J = V.options.resolve,
        Q = ["push", "pop", "shift", "splice", "unshift"];

    function tt(t, e) {
        var n = t._chartjs;
        if (n) {
            var i = n.listeners,
                a = i.indexOf(e); - 1 !== a && i.splice(a, 1), i.length > 0 || (Q.forEach((function (e) {
                delete t[e]
            })), delete t._chartjs)
        }
    }
    var et = function (t, e) {
        this.initialize(t, e)
    };
    V.extend(et.prototype, {
        datasetElementType: null,
        dataElementType: null,
        _datasetElementOptions: ["backgroundColor", "borderCapStyle", "borderColor", "borderDash", "borderDashOffset", "borderJoinStyle", "borderWidth"],
        _dataElementOptions: ["backgroundColor", "borderColor", "borderWidth", "pointStyle"],
        initialize: function (t, e) {
            var n = this;
            n.chart = t, n.index = e, n.linkScales(), n.addElements(), n._type = n.getMeta().type
        },
        updateIndex: function (t) {
            this.index = t
        },
        linkScales: function () {
            var t = this.getMeta(),
                e = this.chart,
                n = e.scales,
                i = this.getDataset(),
                a = e.options.scales;
            null !== t.xAxisID && t.xAxisID in n && !i.xAxisID || (t.xAxisID = i.xAxisID || a.xAxes[0].id), null !== t.yAxisID && t.yAxisID in n && !i.yAxisID || (t.yAxisID = i.yAxisID || a.yAxes[0].id)
        },
        getDataset: function () {
            return this.chart.data.datasets[this.index]
        },
        getMeta: function () {
            return this.chart.getDatasetMeta(this.index)
        },
        getScaleForId: function (t) {
            return this.chart.scales[t]
        },
        _getValueScaleId: function () {
            return this.getMeta().yAxisID
        },
        _getIndexScaleId: function () {
            return this.getMeta().xAxisID
        },
        _getValueScale: function () {
            return this.getScaleForId(this._getValueScaleId())
        },
        _getIndexScale: function () {
            return this.getScaleForId(this._getIndexScaleId())
        },
        reset: function () {
            this._update(!0)
        },
        destroy: function () {
            this._data && tt(this._data, this)
        },
        createMetaDataset: function () {
            var t = this.datasetElementType;
            return t && new t({
                _chart: this.chart,
                _datasetIndex: this.index
            })
        },
        createMetaData: function (t) {
            var e = this.dataElementType;
            return e && new e({
                _chart: this.chart,
                _datasetIndex: this.index,
                _index: t
            })
        },
        addElements: function () {
            var t, e, n = this.getMeta(),
                i = this.getDataset().data || [],
                a = n.data;
            for (t = 0, e = i.length; t < e; ++t) a[t] = a[t] || this.createMetaData(t);
            n.dataset = n.dataset || this.createMetaDataset()
        },
        addElementAndReset: function (t) {
            var e = this.createMetaData(t);
            this.getMeta().data.splice(t, 0, e), this.updateElement(e, t, !0)
        },
        buildOrUpdateElements: function () {
            var t, e, n = this,
                i = n.getDataset(),
                a = i.data || (i.data = []);
            n._data !== a && (n._data && tt(n._data, n), a && Object.isExtensible(a) && (e = n, (t = a)._chartjs ? t._chartjs.listeners.push(e) : (Object.defineProperty(t, "_chartjs", {
                configurable: !0,
                enumerable: !1,
                value: {
                    listeners: [e]
                }
            }), Q.forEach((function (e) {
                var n = "onData" + e.charAt(0).toUpperCase() + e.slice(1),
                    i = t[e];
                Object.defineProperty(t, e, {
                    configurable: !0,
                    enumerable: !1,
                    value: function () {
                        var e = Array.prototype.slice.call(arguments),
                            a = i.apply(this, e);
                        return V.each(t._chartjs.listeners, (function (t) {
                            "function" == typeof t[n] && t[n].apply(t, e)
                        })), a
                    }
                })
            })))), n._data = a), n.resyncElements()
        },
        _configure: function () {
            this._config = V.merge({}, [this.chart.options.datasets[this._type], this.getDataset()], {
                merger: function (t, e, n) {
                    "_meta" !== t && "data" !== t && V._merger(t, e, n)
                }
            })
        },
        _update: function (t) {
            this._configure(), this._cachedDataOpts = null, this.update(t)
        },
        update: V.noop,
        transition: function (t) {
            for (var e = this.getMeta(), n = e.data || [], i = n.length, a = 0; a < i; ++a) n[a].transition(t);
            e.dataset && e.dataset.transition(t)
        },
        draw: function () {
            var t = this.getMeta(),
                e = t.data || [],
                n = e.length,
                i = 0;
            for (t.dataset && t.dataset.draw(); i < n; ++i) e[i].draw()
        },
        getStyle: function (t) {
            var e, n = this.getMeta(),
                i = n.dataset;
            return this._configure(), i && void 0 === t ? e = this._resolveDatasetElementOptions(i || {}) : (t = t || 0, e = this._resolveDataElementOptions(n.data[t] || {}, t)), !1 !== e.fill && null !== e.fill || (e.backgroundColor = e.borderColor), e
        },
        _resolveDatasetElementOptions: function (t, e) {
            var n, i, a, r, o = this,
                s = o.chart,
                l = o._config,
                u = t.custom || {},
                d = s.options.elements[o.datasetElementType.prototype._type] || {},
                h = o._datasetElementOptions,
                c = {},
                f = {
                    chart: s,
                    dataset: o.getDataset(),
                    datasetIndex: o.index,
                    hover: e
                };
            for (n = 0, i = h.length; n < i; ++n) a = h[n], r = e ? "hover" + a.charAt(0).toUpperCase() + a.slice(1) : a, c[a] = J([u[r], l[r], d[r]], f);
            return c
        },
        _resolveDataElementOptions: function (t, e) {
            var n = this,
                i = t && t.custom,
                a = n._cachedDataOpts;
            if (a && !i) return a;
            var r, o, s, l, u = n.chart,
                d = n._config,
                h = u.options.elements[n.dataElementType.prototype._type] || {},
                c = n._dataElementOptions,
                f = {},
                g = {
                    chart: u,
                    dataIndex: e,
                    dataset: n.getDataset(),
                    datasetIndex: n.index
                },
                p = {
                    cacheable: !i
                };
            if (i = i || {}, V.isArray(c))
                for (o = 0, s = c.length; o < s; ++o) f[l = c[o]] = J([i[l], d[l], h[l]], g, e, p);
            else
                for (o = 0, s = (r = Object.keys(c)).length; o < s; ++o) f[l = r[o]] = J([i[l], d[c[l]], d[l], h[l]], g, e, p);
            return p.cacheable && (n._cachedDataOpts = Object.freeze(f)), f
        },
        removeHoverStyle: function (t) {
            V.merge(t._model, t.$previousStyle || {}), delete t.$previousStyle
        },
        setHoverStyle: function (t) {
            var e = this.chart.data.datasets[t._datasetIndex],
                n = t._index,
                i = t.custom || {},
                a = t._model,
                r = V.getHoverColor;
            t.$previousStyle = {
                backgroundColor: a.backgroundColor,
                borderColor: a.borderColor,
                borderWidth: a.borderWidth
            }, a.backgroundColor = J([i.hoverBackgroundColor, e.hoverBackgroundColor, r(a.backgroundColor)], void 0, n), a.borderColor = J([i.hoverBorderColor, e.hoverBorderColor, r(a.borderColor)], void 0, n), a.borderWidth = J([i.hoverBorderWidth, e.hoverBorderWidth, a.borderWidth], void 0, n)
        },
        _removeDatasetHoverStyle: function () {
            var t = this.getMeta().dataset;
            t && this.removeHoverStyle(t)
        },
        _setDatasetHoverStyle: function () {
            var t, e, n, i, a, r, o = this.getMeta().dataset,
                s = {};
            if (o) {
                for (r = o._model, a = this._resolveDatasetElementOptions(o, !0), t = 0, e = (i = Object.keys(a)).length; t < e; ++t) s[n = i[t]] = r[n], r[n] = a[n];
                o.$previousStyle = s
            }
        },
        resyncElements: function () {
            var t = this.getMeta(),
                e = this.getDataset().data,
                n = t.data.length,
                i = e.length;
            i < n ? t.data.splice(i, n - i) : i > n && this.insertElements(n, i - n)
        },
        insertElements: function (t, e) {
            for (var n = 0; n < e; ++n) this.addElementAndReset(t + n)
        },
        onDataPush: function () {
            var t = arguments.length;
            this.insertElements(this.getDataset().data.length - t, t)
        },
        onDataPop: function () {
            this.getMeta().data.pop()
        },
        onDataShift: function () {
            this.getMeta().data.shift()
        },
        onDataSplice: function (t, e) {
            this.getMeta().data.splice(t, e), this.insertElements(t, arguments.length - 2)
        },
        onDataUnshift: function () {
            this.insertElements(0, arguments.length)
        }
    }), et.extend = V.inherits;
    var nt = et,
        it = 2 * Math.PI;

    function at(t, e) {
        var n = e.startAngle,
            i = e.endAngle,
            a = e.pixelMargin,
            r = a / e.outerRadius,
            o = e.x,
            s = e.y;
        t.beginPath(), t.arc(o, s, e.outerRadius, n - r, i + r), e.innerRadius > a ? (r = a / e.innerRadius, t.arc(o, s, e.innerRadius - a, i + r, n - r, !0)) : t.arc(o, s, a, i + Math.PI / 2, n - Math.PI / 2), t.closePath(), t.clip()
    }

    function rt(t, e, n) {
        var i = "inner" === e.borderAlign;
        i ? (t.lineWidth = 2 * e.borderWidth, t.lineJoin = "round") : (t.lineWidth = e.borderWidth, t.lineJoin = "bevel"), n.fullCircles && function (t, e, n, i) {
            var a, r = n.endAngle;
            for (i && (n.endAngle = n.startAngle + it, at(t, n), n.endAngle = r, n.endAngle === n.startAngle && n.fullCircles && (n.endAngle += it, n.fullCircles--)), t.beginPath(), t.arc(n.x, n.y, n.innerRadius, n.startAngle + it, n.startAngle, !0), a = 0; a < n.fullCircles; ++a) t.stroke();
            for (t.beginPath(), t.arc(n.x, n.y, e.outerRadius, n.startAngle, n.startAngle + it), a = 0; a < n.fullCircles; ++a) t.stroke()
        }(t, e, n, i), i && at(t, n), t.beginPath(), t.arc(n.x, n.y, e.outerRadius, n.startAngle, n.endAngle), t.arc(n.x, n.y, n.innerRadius, n.endAngle, n.startAngle, !0), t.closePath(), t.stroke()
    }
    z._set("global", {
        elements: {
            arc: {
                backgroundColor: z.global.defaultColor,
                borderColor: "#fff",
                borderWidth: 2,
                borderAlign: "center"
            }
        }
    });
    var ot = X.extend({
            _type: "arc",
            inLabelRange: function (t) {
                var e = this._view;
                return !!e && Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hoverRadius, 2)
            },
            inRange: function (t, e) {
                var n = this._view;
                if (n) {
                    for (var i = V.getAngleFromPoint(n, {
                            x: t,
                            y: e
                        }), a = i.angle, r = i.distance, o = n.startAngle, s = n.endAngle; s < o;) s += it;
                    for (; a > s;) a -= it;
                    for (; a < o;) a += it;
                    var l = a >= o && a <= s,
                        u = r >= n.innerRadius && r <= n.outerRadius;
                    return l && u
                }
                return !1
            },
            getCenterPoint: function () {
                var t = this._view,
                    e = (t.startAngle + t.endAngle) / 2,
                    n = (t.innerRadius + t.outerRadius) / 2;
                return {
                    x: t.x + Math.cos(e) * n,
                    y: t.y + Math.sin(e) * n
                }
            },
            getArea: function () {
                var t = this._view;
                return Math.PI * ((t.endAngle - t.startAngle) / (2 * Math.PI)) * (Math.pow(t.outerRadius, 2) - Math.pow(t.innerRadius, 2))
            },
            tooltipPosition: function () {
                var t = this._view,
                    e = t.startAngle + (t.endAngle - t.startAngle) / 2,
                    n = (t.outerRadius - t.innerRadius) / 2 + t.innerRadius;
                return {
                    x: t.x + Math.cos(e) * n,
                    y: t.y + Math.sin(e) * n
                }
            },
            draw: function () {
                var t, e = this._chart.ctx,
                    n = this._view,
                    i = "inner" === n.borderAlign ? .33 : 0,
                    a = {
                        x: n.x,
                        y: n.y,
                        innerRadius: n.innerRadius,
                        outerRadius: Math.max(n.outerRadius - i, 0),
                        pixelMargin: i,
                        startAngle: n.startAngle,
                        endAngle: n.endAngle,
                        fullCircles: Math.floor(n.circumference / it)
                    };
                if (e.save(), e.fillStyle = n.backgroundColor, e.strokeStyle = n.borderColor, a.fullCircles) {
                    for (a.endAngle = a.startAngle + it, e.beginPath(), e.arc(a.x, a.y, a.outerRadius, a.startAngle, a.endAngle), e.arc(a.x, a.y, a.innerRadius, a.endAngle, a.startAngle, !0), e.closePath(), t = 0; t < a.fullCircles; ++t) e.fill();
                    a.endAngle = a.startAngle + n.circumference % it
                }
                e.beginPath(), e.arc(a.x, a.y, a.outerRadius, a.startAngle, a.endAngle), e.arc(a.x, a.y, a.innerRadius, a.endAngle, a.startAngle, !0), e.closePath(), e.fill(), n.borderWidth && rt(e, n, a), e.restore()
            }
        }),
        st = V.valueOrDefault,
        lt = z.global.defaultColor;
    z._set("global", {
        elements: {
            line: {
                tension: .4,
                backgroundColor: lt,
                borderWidth: 3,
                borderColor: lt,
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0,
                borderJoinStyle: "miter",
                capBezierPoints: !0,
                fill: !0
            }
        }
    });
    var ut = X.extend({
            _type: "line",
            draw: function () {
                var t, e, n, i = this,
                    a = i._view,
                    r = i._chart.ctx,
                    o = a.spanGaps,
                    s = i._children.slice(),
                    l = z.global,
                    u = l.elements.line,
                    d = -1,
                    h = i._loop;
                if (s.length) {
                    if (i._loop) {
                        for (t = 0; t < s.length; ++t)
                            if (e = V.previousItem(s, t), !s[t]._view.skip && e._view.skip) {
                                s = s.slice(t).concat(s.slice(0, t)), h = o;
                                break
                            } h && s.push(s[0])
                    }
                    for (r.save(), r.lineCap = a.borderCapStyle || u.borderCapStyle, r.setLineDash && r.setLineDash(a.borderDash || u.borderDash), r.lineDashOffset = st(a.borderDashOffset, u.borderDashOffset), r.lineJoin = a.borderJoinStyle || u.borderJoinStyle, r.lineWidth = st(a.borderWidth, u.borderWidth), r.strokeStyle = a.borderColor || l.defaultColor, r.beginPath(), (n = s[0]._view).skip || (r.moveTo(n.x, n.y), d = 0), t = 1; t < s.length; ++t) n = s[t]._view, e = -1 === d ? V.previousItem(s, t) : s[d], n.skip || (d !== t - 1 && !o || -1 === d ? r.moveTo(n.x, n.y) : V.canvas.lineTo(r, e._view, n), d = t);
                    h && r.closePath(), r.stroke(), r.restore()
                }
            }
        }),
        dt = V.valueOrDefault,
        ht = z.global.defaultColor;

    function ct(t) {
        var e = this._view;
        return !!e && Math.abs(t - e.x) < e.radius + e.hitRadius
    }
    z._set("global", {
        elements: {
            point: {
                radius: 3,
                pointStyle: "circle",
                backgroundColor: ht,
                borderColor: ht,
                borderWidth: 1,
                hitRadius: 1,
                hoverRadius: 4,
                hoverBorderWidth: 1
            }
        }
    });
    var ft = X.extend({
            _type: "point",
            inRange: function (t, e) {
                var n = this._view;
                return !!n && Math.pow(t - n.x, 2) + Math.pow(e - n.y, 2) < Math.pow(n.hitRadius + n.radius, 2)
            },
            inLabelRange: ct,
            inXRange: ct,
            inYRange: function (t) {
                var e = this._view;
                return !!e && Math.abs(t - e.y) < e.radius + e.hitRadius
            },
            getCenterPoint: function () {
                var t = this._view;
                return {
                    x: t.x,
                    y: t.y
                }
            },
            getArea: function () {
                return Math.PI * Math.pow(this._view.radius, 2)
            },
            tooltipPosition: function () {
                var t = this._view;
                return {
                    x: t.x,
                    y: t.y,
                    padding: t.radius + t.borderWidth
                }
            },
            draw: function (t) {
                var e = this._view,
                    n = this._chart.ctx,
                    i = e.pointStyle,
                    a = e.rotation,
                    r = e.radius,
                    o = e.x,
                    s = e.y,
                    l = z.global,
                    u = l.defaultColor;
                e.skip || (void 0 === t || V.canvas._isPointInArea(e, t)) && (n.strokeStyle = e.borderColor || u, n.lineWidth = dt(e.borderWidth, l.elements.point.borderWidth), n.fillStyle = e.backgroundColor || u, V.canvas.drawPoint(n, i, r, o, s, a))
            }
        }),
        gt = z.global.defaultColor;

    function pt(t) {
        return t && void 0 !== t.width
    }

    function mt(t) {
        var e, n, i, a, r;
        return pt(t) ? (r = t.width / 2, e = t.x - r, n = t.x + r, i = Math.min(t.y, t.base), a = Math.max(t.y, t.base)) : (r = t.height / 2, e = Math.min(t.x, t.base), n = Math.max(t.x, t.base), i = t.y - r, a = t.y + r), {
            left: e,
            top: i,
            right: n,
            bottom: a
        }
    }

    function vt(t, e, n) {
        return t === e ? n : t === n ? e : t
    }

    function bt(t, e, n) {
        var i, a, r, o, s = t.borderWidth,
            l = function (t) {
                var e = t.borderSkipped,
                    n = {};
                return e ? (t.horizontal ? t.base > t.x && (e = vt(e, "left", "right")) : t.base < t.y && (e = vt(e, "bottom", "top")), n[e] = !0, n) : n
            }(t);
        return V.isObject(s) ? (i = +s.top || 0, a = +s.right || 0, r = +s.bottom || 0, o = +s.left || 0) : i = a = r = o = +s || 0, {
            t: l.top || i < 0 ? 0 : i > n ? n : i,
            r: l.right || a < 0 ? 0 : a > e ? e : a,
            b: l.bottom || r < 0 ? 0 : r > n ? n : r,
            l: l.left || o < 0 ? 0 : o > e ? e : o
        }
    }

    function xt(t, e, n) {
        var i = null === e,
            a = null === n,
            r = !(!t || i && a) && mt(t);
        return r && (i || e >= r.left && e <= r.right) && (a || n >= r.top && n <= r.bottom)
    }
    z._set("global", {
        elements: {
            rectangle: {
                backgroundColor: gt,
                borderColor: gt,
                borderSkipped: "bottom",
                borderWidth: 0
            }
        }
    });
    var yt = X.extend({
            _type: "rectangle",
            draw: function () {
                var t = this._chart.ctx,
                    e = this._view,
                    n = function (t) {
                        var e = mt(t),
                            n = e.right - e.left,
                            i = e.bottom - e.top,
                            a = bt(t, n / 2, i / 2);
                        return {
                            outer: {
                                x: e.left,
                                y: e.top,
                                w: n,
                                h: i
                            },
                            inner: {
                                x: e.left + a.l,
                                y: e.top + a.t,
                                w: n - a.l - a.r,
                                h: i - a.t - a.b
                            }
                        }
                    }(e),
                    i = n.outer,
                    a = n.inner;
                t.fillStyle = e.backgroundColor, t.fillRect(i.x, i.y, i.w, i.h), i.w === a.w && i.h === a.h || (t.save(), t.beginPath(), t.rect(i.x, i.y, i.w, i.h), t.clip(), t.fillStyle = e.borderColor, t.rect(a.x, a.y, a.w, a.h), t.fill("evenodd"), t.restore())
            },
            height: function () {
                var t = this._view;
                return t.base - t.y
            },
            inRange: function (t, e) {
                return xt(this._view, t, e)
            },
            inLabelRange: function (t, e) {
                var n = this._view;
                return pt(n) ? xt(n, t, null) : xt(n, null, e)
            },
            inXRange: function (t) {
                return xt(this._view, t, null)
            },
            inYRange: function (t) {
                return xt(this._view, null, t)
            },
            getCenterPoint: function () {
                var t, e, n = this._view;
                return pt(n) ? (t = n.x, e = (n.y + n.base) / 2) : (t = (n.x + n.base) / 2, e = n.y), {
                    x: t,
                    y: e
                }
            },
            getArea: function () {
                var t = this._view;
                return pt(t) ? t.width * Math.abs(t.y - t.base) : t.height * Math.abs(t.x - t.base)
            },
            tooltipPosition: function () {
                var t = this._view;
                return {
                    x: t.x,
                    y: t.y
                }
            }
        }),
        _t = {},
        kt = ot,
        wt = ut,
        Mt = ft,
        St = yt;
    _t.Arc = kt, _t.Line = wt, _t.Point = Mt, _t.Rectangle = St;
    var Ct = V._deprecated,
        Pt = V.valueOrDefault;

    function At(t, e, n) {
        var i, a, r = n.barThickness,
            o = e.stackCount,
            s = e.pixels[t],
            l = V.isNullOrUndef(r) ? function (t, e) {
                var n, i, a, r, o = t._length;
                for (a = 1, r = e.length; a < r; ++a) o = Math.min(o, Math.abs(e[a] - e[a - 1]));
                for (a = 0, r = t.getTicks().length; a < r; ++a) i = t.getPixelForTick(a), o = a > 0 ? Math.min(o, Math.abs(i - n)) : o, n = i;
                return o
            }(e.scale, e.pixels) : -1;
        return V.isNullOrUndef(r) ? (i = l * n.categoryPercentage, a = n.barPercentage) : (i = r * o, a = 1), {
            chunk: i / o,
            ratio: a,
            start: s - i / 2
        }
    }
    z._set("bar", {
        hover: {
            mode: "label"
        },
        scales: {
            xAxes: [{
                type: "category",
                offset: !0,
                gridLines: {
                    offsetGridLines: !0
                }
            }],
            yAxes: [{
                type: "linear"
            }]
        }
    }), z._set("global", {
        datasets: {
            bar: {
                categoryPercentage: .8,
                barPercentage: .9
            }
        }
    });
    var Dt = nt.extend({
            dataElementType: _t.Rectangle,
            _dataElementOptions: ["backgroundColor", "borderColor", "borderSkipped", "borderWidth", "barPercentage", "barThickness", "categoryPercentage", "maxBarThickness", "minBarLength"],
            initialize: function () {
                var t, e, n = this;
                nt.prototype.initialize.apply(n, arguments), (t = n.getMeta()).stack = n.getDataset().stack, t.bar = !0, e = n._getIndexScale().options, Ct("bar chart", e.barPercentage, "scales.[x/y]Axes.barPercentage", "dataset.barPercentage"), Ct("bar chart", e.barThickness, "scales.[x/y]Axes.barThickness", "dataset.barThickness"), Ct("bar chart", e.categoryPercentage, "scales.[x/y]Axes.categoryPercentage", "dataset.categoryPercentage"), Ct("bar chart", n._getValueScale().options.minBarLength, "scales.[x/y]Axes.minBarLength", "dataset.minBarLength"), Ct("bar chart", e.maxBarThickness, "scales.[x/y]Axes.maxBarThickness", "dataset.maxBarThickness")
            },
            update: function (t) {
                var e, n, i = this.getMeta().data;
                for (this._ruler = this.getRuler(), e = 0, n = i.length; e < n; ++e) this.updateElement(i[e], e, t)
            },
            updateElement: function (t, e, n) {
                var i = this,
                    a = i.getMeta(),
                    r = i.getDataset(),
                    o = i._resolveDataElementOptions(t, e);
                t._xScale = i.getScaleForId(a.xAxisID), t._yScale = i.getScaleForId(a.yAxisID), t._datasetIndex = i.index, t._index = e, t._model = {
                    backgroundColor: o.backgroundColor,
                    borderColor: o.borderColor,
                    borderSkipped: o.borderSkipped,
                    borderWidth: o.borderWidth,
                    datasetLabel: r.label,
                    label: i.chart.data.labels[e]
                }, V.isArray(r.data[e]) && (t._model.borderSkipped = null), i._updateElementGeometry(t, e, n, o), t.pivot()
            },
            _updateElementGeometry: function (t, e, n, i) {
                var a = this,
                    r = t._model,
                    o = a._getValueScale(),
                    s = o.getBasePixel(),
                    l = o.isHorizontal(),
                    u = a._ruler || a.getRuler(),
                    d = a.calculateBarValuePixels(a.index, e, i),
                    h = a.calculateBarIndexPixels(a.index, e, u, i);
                r.horizontal = l, r.base = n ? s : d.base, r.x = l ? n ? s : d.head : h.center, r.y = l ? h.center : n ? s : d.head, r.height = l ? h.size : void 0, r.width = l ? void 0 : h.size
            },
            _getStacks: function (t) {
                var e, n, i = this._getIndexScale(),
                    a = i._getMatchingVisibleMetas(this._type),
                    r = i.options.stacked,
                    o = a.length,
                    s = [];
                for (e = 0; e < o && (n = a[e], (!1 === r || -1 === s.indexOf(n.stack) || void 0 === r && void 0 === n.stack) && s.push(n.stack), n.index !== t); ++e);
                return s
            },
            getStackCount: function () {
                return this._getStacks().length
            },
            getStackIndex: function (t, e) {
                var n = this._getStacks(t),
                    i = void 0 !== e ? n.indexOf(e) : -1;
                return -1 === i ? n.length - 1 : i
            },
            getRuler: function () {
                var t, e, n = this._getIndexScale(),
                    i = [];
                for (t = 0, e = this.getMeta().data.length; t < e; ++t) i.push(n.getPixelForValue(null, t, this.index));
                return {
                    pixels: i,
                    start: n._startPixel,
                    end: n._endPixel,
                    stackCount: this.getStackCount(),
                    scale: n
                }
            },
            calculateBarValuePixels: function (t, e, n) {
                var i, a, r, o, s, l, u, d = this.chart,
                    h = this._getValueScale(),
                    c = h.isHorizontal(),
                    f = d.data.datasets,
                    g = h._getMatchingVisibleMetas(this._type),
                    p = h._parseValue(f[t].data[e]),
                    m = n.minBarLength,
                    v = h.options.stacked,
                    b = this.getMeta().stack,
                    x = void 0 === p.start ? 0 : p.max >= 0 && p.min >= 0 ? p.min : p.max,
                    y = void 0 === p.start ? p.end : p.max >= 0 && p.min >= 0 ? p.max - p.min : p.min - p.max,
                    _ = g.length;
                if (v || void 0 === v && void 0 !== b)
                    for (i = 0; i < _ && (a = g[i]).index !== t; ++i) a.stack === b && (r = void 0 === (u = h._parseValue(f[a.index].data[e])).start ? u.end : u.min >= 0 && u.max >= 0 ? u.max : u.min, (p.min < 0 && r < 0 || p.max >= 0 && r > 0) && (x += r));
                return o = h.getPixelForValue(x), l = (s = h.getPixelForValue(x + y)) - o, void 0 !== m && Math.abs(l) < m && (l = m, s = y >= 0 && !c || y < 0 && c ? o - m : o + m), {
                    size: l,
                    base: o,
                    head: s,
                    center: s + l / 2
                }
            },
            calculateBarIndexPixels: function (t, e, n, i) {
                var a = "flex" === i.barThickness ? function (t, e, n) {
                        var i, a = e.pixels,
                            r = a[t],
                            o = t > 0 ? a[t - 1] : null,
                            s = t < a.length - 1 ? a[t + 1] : null,
                            l = n.categoryPercentage;
                        return null === o && (o = r - (null === s ? e.end - e.start : s - r)), null === s && (s = r + r - o), i = r - (r - Math.min(o, s)) / 2 * l, {
                            chunk: Math.abs(s - o) / 2 * l / e.stackCount,
                            ratio: n.barPercentage,
                            start: i
                        }
                    }(e, n, i) : At(e, n, i),
                    r = this.getStackIndex(t, this.getMeta().stack),
                    o = a.start + a.chunk * r + a.chunk / 2,
                    s = Math.min(Pt(i.maxBarThickness, 1 / 0), a.chunk * a.ratio);
                return {
                    base: o - s / 2,
                    head: o + s / 2,
                    center: o,
                    size: s
                }
            },
            draw: function () {
                var t = this.chart,
                    e = this._getValueScale(),
                    n = this.getMeta().data,
                    i = this.getDataset(),
                    a = n.length,
                    r = 0;
                for (V.canvas.clipArea(t.ctx, t.chartArea); r < a; ++r) {
                    var o = e._parseValue(i.data[r]);
                    isNaN(o.min) || isNaN(o.max) || n[r].draw()
                }
                V.canvas.unclipArea(t.ctx)
            },
            _resolveDataElementOptions: function () {
                var t = this,
                    e = V.extend({}, nt.prototype._resolveDataElementOptions.apply(t, arguments)),
                    n = t._getIndexScale().options,
                    i = t._getValueScale().options;
                return e.barPercentage = Pt(n.barPercentage, e.barPercentage), e.barThickness = Pt(n.barThickness, e.barThickness), e.categoryPercentage = Pt(n.categoryPercentage, e.categoryPercentage), e.maxBarThickness = Pt(n.maxBarThickness, e.maxBarThickness), e.minBarLength = Pt(i.minBarLength, e.minBarLength), e
            }
        }),
        Tt = V.valueOrDefault,
        It = V.options.resolve;
    z._set("bubble", {
        hover: {
            mode: "single"
        },
        scales: {
            xAxes: [{
                type: "linear",
                position: "bottom",
                id: "x-axis-0"
            }],
            yAxes: [{
                type: "linear",
                position: "left",
                id: "y-axis-0"
            }]
        },
        tooltips: {
            callbacks: {
                title: function () {
                    return ""
                },
                label: function (t, e) {
                    var n = e.datasets[t.datasetIndex].label || "",
                        i = e.datasets[t.datasetIndex].data[t.index];
                    return n + ": (" + t.xLabel + ", " + t.yLabel + ", " + i.r + ")"
                }
            }
        }
    });
    var Ft = nt.extend({
            dataElementType: _t.Point,
            _dataElementOptions: ["backgroundColor", "borderColor", "borderWidth", "hoverBackgroundColor", "hoverBorderColor", "hoverBorderWidth", "hoverRadius", "hitRadius", "pointStyle", "rotation"],
            update: function (t) {
                var e = this,
                    n = e.getMeta().data;
                V.each(n, (function (n, i) {
                    e.updateElement(n, i, t)
                }))
            },
            updateElement: function (t, e, n) {
                var i = this,
                    a = i.getMeta(),
                    r = t.custom || {},
                    o = i.getScaleForId(a.xAxisID),
                    s = i.getScaleForId(a.yAxisID),
                    l = i._resolveDataElementOptions(t, e),
                    u = i.getDataset().data[e],
                    d = i.index,
                    h = n ? o.getPixelForDecimal(.5) : o.getPixelForValue("object" == typeof u ? u : NaN, e, d),
                    c = n ? s.getBasePixel() : s.getPixelForValue(u, e, d);
                t._xScale = o, t._yScale = s, t._options = l, t._datasetIndex = d, t._index = e, t._model = {
                    backgroundColor: l.backgroundColor,
                    borderColor: l.borderColor,
                    borderWidth: l.borderWidth,
                    hitRadius: l.hitRadius,
                    pointStyle: l.pointStyle,
                    rotation: l.rotation,
                    radius: n ? 0 : l.radius,
                    skip: r.skip || isNaN(h) || isNaN(c),
                    x: h,
                    y: c
                }, t.pivot()
            },
            setHoverStyle: function (t) {
                var e = t._model,
                    n = t._options,
                    i = V.getHoverColor;
                t.$previousStyle = {
                    backgroundColor: e.backgroundColor,
                    borderColor: e.borderColor,
                    borderWidth: e.borderWidth,
                    radius: e.radius
                }, e.backgroundColor = Tt(n.hoverBackgroundColor, i(n.backgroundColor)), e.borderColor = Tt(n.hoverBorderColor, i(n.borderColor)), e.borderWidth = Tt(n.hoverBorderWidth, n.borderWidth), e.radius = n.radius + n.hoverRadius
            },
            _resolveDataElementOptions: function (t, e) {
                var n = this,
                    i = n.chart,
                    a = n.getDataset(),
                    r = t.custom || {},
                    o = a.data[e] || {},
                    s = nt.prototype._resolveDataElementOptions.apply(n, arguments),
                    l = {
                        chart: i,
                        dataIndex: e,
                        dataset: a,
                        datasetIndex: n.index
                    };
                return n._cachedDataOpts === s && (s = V.extend({}, s)), s.radius = It([r.radius, o.r, n._config.radius, i.options.elements.point.radius], l, e), s
            }
        }),
        Lt = V.valueOrDefault,
        Ot = Math.PI,
        Rt = 2 * Ot,
        zt = Ot / 2;
    z._set("doughnut", {
        animation: {
            animateRotate: !0,
            animateScale: !1
        },
        hover: {
            mode: "single"
        },
        legendCallback: function (t) {
            var e, n, i, a = document.createElement("ul"),
                r = t.data,
                o = r.datasets,
                s = r.labels;
            if (a.setAttribute("class", t.id + "-legend"), o.length)
                for (e = 0, n = o[0].data.length; e < n; ++e)(i = a.appendChild(document.createElement("li"))).appendChild(document.createElement("span")).style.backgroundColor = o[0].backgroundColor[e], s[e] && i.appendChild(document.createTextNode(s[e]));
            return a.outerHTML
        },
        legend: {
            labels: {
                generateLabels: function (t) {
                    var e = t.data;
                    return e.labels.length && e.datasets.length ? e.labels.map((function (n, i) {
                        var a = t.getDatasetMeta(0),
                            r = a.controller.getStyle(i);
                        return {
                            text: n,
                            fillStyle: r.backgroundColor,
                            strokeStyle: r.borderColor,
                            lineWidth: r.borderWidth,
                            hidden: isNaN(e.datasets[0].data[i]) || a.data[i].hidden,
                            index: i
                        }
                    })) : []
                }
            },
            onClick: function (t, e) {
                var n, i, a, r = e.index,
                    o = this.chart;
                for (n = 0, i = (o.data.datasets || []).length; n < i; ++n)(a = o.getDatasetMeta(n)).data[r] && (a.data[r].hidden = !a.data[r].hidden);
                o.update()
            }
        },
        cutoutPercentage: 50,
        rotation: -zt,
        circumference: Rt,
        tooltips: {
            callbacks: {
                title: function () {
                    return ""
                },
                label: function (t, e) {
                    var n = e.labels[t.index],
                        i = ": " + e.datasets[t.datasetIndex].data[t.index];
                    return V.isArray(n) ? (n = n.slice())[0] += i : n += i, n
                }
            }
        }
    });
    var Nt = nt.extend({
        dataElementType: _t.Arc,
        linkScales: V.noop,
        _dataElementOptions: ["backgroundColor", "borderColor", "borderWidth", "borderAlign", "hoverBackgroundColor", "hoverBorderColor", "hoverBorderWidth"],
        getRingIndex: function (t) {
            for (var e = 0, n = 0; n < t; ++n) this.chart.isDatasetVisible(n) && ++e;
            return e
        },
        update: function (t) {
            var e, n, i, a, r = this,
                o = r.chart,
                s = o.chartArea,
                l = o.options,
                u = 1,
                d = 1,
                h = 0,
                c = 0,
                f = r.getMeta(),
                g = f.data,
                p = l.cutoutPercentage / 100 || 0,
                m = l.circumference,
                v = r._getRingWeight(r.index);
            if (m < Rt) {
                var b = l.rotation % Rt,
                    x = (b += b >= Ot ? -Rt : b < -Ot ? Rt : 0) + m,
                    y = Math.cos(b),
                    _ = Math.sin(b),
                    k = Math.cos(x),
                    w = Math.sin(x),
                    M = b <= 0 && x >= 0 || x >= Rt,
                    S = b <= zt && x >= zt || x >= Rt + zt,
                    C = b <= -zt && x >= -zt || x >= Ot + zt,
                    P = b === -Ot || x >= Ot ? -1 : Math.min(y, y * p, k, k * p),
                    A = C ? -1 : Math.min(_, _ * p, w, w * p),
                    D = M ? 1 : Math.max(y, y * p, k, k * p),
                    T = S ? 1 : Math.max(_, _ * p, w, w * p);
                u = (D - P) / 2, d = (T - A) / 2, h = -(D + P) / 2, c = -(T + A) / 2
            }
            for (i = 0, a = g.length; i < a; ++i) g[i]._options = r._resolveDataElementOptions(g[i], i);
            for (o.borderWidth = r.getMaxBorderWidth(), e = (s.right - s.left - o.borderWidth) / u, n = (s.bottom - s.top - o.borderWidth) / d, o.outerRadius = Math.max(Math.min(e, n) / 2, 0), o.innerRadius = Math.max(o.outerRadius * p, 0), o.radiusLength = (o.outerRadius - o.innerRadius) / (r._getVisibleDatasetWeightTotal() || 1), o.offsetX = h * o.outerRadius, o.offsetY = c * o.outerRadius, f.total = r.calculateTotal(), r.outerRadius = o.outerRadius - o.radiusLength * r._getRingWeightOffset(r.index), r.innerRadius = Math.max(r.outerRadius - o.radiusLength * v, 0), i = 0, a = g.length; i < a; ++i) r.updateElement(g[i], i, t)
        },
        updateElement: function (t, e, n) {
            var i = this,
                a = i.chart,
                r = a.chartArea,
                o = a.options,
                s = o.animation,
                l = (r.left + r.right) / 2,
                u = (r.top + r.bottom) / 2,
                d = o.rotation,
                h = o.rotation,
                c = i.getDataset(),
                f = n && s.animateRotate ? 0 : t.hidden ? 0 : i.calculateCircumference(c.data[e]) * (o.circumference / Rt),
                g = n && s.animateScale ? 0 : i.innerRadius,
                p = n && s.animateScale ? 0 : i.outerRadius,
                m = t._options || {};
            V.extend(t, {
                _datasetIndex: i.index,
                _index: e,
                _model: {
                    backgroundColor: m.backgroundColor,
                    borderColor: m.borderColor,
                    borderWidth: m.borderWidth,
                    borderAlign: m.borderAlign,
                    x: l + a.offsetX,
                    y: u + a.offsetY,
                    startAngle: d,
                    endAngle: h,
                    circumference: f,
                    outerRadius: p,
                    innerRadius: g,
                    label: V.valueAtIndexOrDefault(c.label, e, a.data.labels[e])
                }
            });
            var v = t._model;
            n && s.animateRotate || (v.startAngle = 0 === e ? o.rotation : i.getMeta().data[e - 1]._model.endAngle, v.endAngle = v.startAngle + v.circumference), t.pivot()
        },
        calculateTotal: function () {
            var t, e = this.getDataset(),
                n = this.getMeta(),
                i = 0;
            return V.each(n.data, (function (n, a) {
                t = e.data[a], isNaN(t) || n.hidden || (i += Math.abs(t))
            })), i
        },
        calculateCircumference: function (t) {
            var e = this.getMeta().total;
            return e > 0 && !isNaN(t) ? Rt * (Math.abs(t) / e) : 0
        },
        getMaxBorderWidth: function (t) {
            var e, n, i, a, r, o, s, l, u = 0,
                d = this.chart;
            if (!t)
                for (e = 0, n = d.data.datasets.length; e < n; ++e)
                    if (d.isDatasetVisible(e)) {
                        t = (i = d.getDatasetMeta(e)).data, e !== this.index && (r = i.controller);
                        break
                    } if (!t) return 0;
            for (e = 0, n = t.length; e < n; ++e) a = t[e], r ? (r._configure(), o = r._resolveDataElementOptions(a, e)) : o = a._options, "inner" !== o.borderAlign && (s = o.borderWidth, u = (l = o.hoverBorderWidth) > (u = s > u ? s : u) ? l : u);
            return u
        },
        setHoverStyle: function (t) {
            var e = t._model,
                n = t._options,
                i = V.getHoverColor;
            t.$previousStyle = {
                backgroundColor: e.backgroundColor,
                borderColor: e.borderColor,
                borderWidth: e.borderWidth
            }, e.backgroundColor = Lt(n.hoverBackgroundColor, i(n.backgroundColor)), e.borderColor = Lt(n.hoverBorderColor, i(n.borderColor)), e.borderWidth = Lt(n.hoverBorderWidth, n.borderWidth)
        },
        _getRingWeightOffset: function (t) {
            for (var e = 0, n = 0; n < t; ++n) this.chart.isDatasetVisible(n) && (e += this._getRingWeight(n));
            return e
        },
        _getRingWeight: function (t) {
            return Math.max(Lt(this.chart.data.datasets[t].weight, 1), 0)
        },
        _getVisibleDatasetWeightTotal: function () {
            return this._getRingWeightOffset(this.chart.data.datasets.length)
        }
    });
    z._set("horizontalBar", {
        hover: {
            mode: "index",
            axis: "y"
        },
        scales: {
            xAxes: [{
                type: "linear",
                position: "bottom"
            }],
            yAxes: [{
                type: "category",
                position: "left",
                offset: !0,
                gridLines: {
                    offsetGridLines: !0
                }
            }]
        },
        elements: {
            rectangle: {
                borderSkipped: "left"
            }
        },
        tooltips: {
            mode: "index",
            axis: "y"
        }
    }), z._set("global", {
        datasets: {
            horizontalBar: {
                categoryPercentage: .8,
                barPercentage: .9
            }
        }
    });
    var Bt = Dt.extend({
            _getValueScaleId: function () {
                return this.getMeta().xAxisID
            },
            _getIndexScaleId: function () {
                return this.getMeta().yAxisID
            }
        }),
        Et = V.valueOrDefault,
        Wt = V.options.resolve,
        Vt = V.canvas._isPointInArea;

    function Ht(t, e) {
        var n = t && t.options.ticks || {},
            i = n.reverse,
            a = void 0 === n.min ? e : 0,
            r = void 0 === n.max ? e : 0;
        return {
            start: i ? r : a,
            end: i ? a : r
        }
    }

    function jt(t, e, n) {
        var i = n / 2,
            a = Ht(t, i),
            r = Ht(e, i);
        return {
            top: r.end,
            right: a.end,
            bottom: r.start,
            left: a.start
        }
    }

    function qt(t) {
        var e, n, i, a;
        return V.isObject(t) ? (e = t.top, n = t.right, i = t.bottom, a = t.left) : e = n = i = a = t, {
            top: e,
            right: n,
            bottom: i,
            left: a
        }
    }
    z._set("line", {
        showLines: !0,
        spanGaps: !1,
        hover: {
            mode: "label"
        },
        scales: {
            xAxes: [{
                type: "category",
                id: "x-axis-0"
            }],
            yAxes: [{
                type: "linear",
                id: "y-axis-0"
            }]
        }
    });
    var Ut = nt.extend({
            datasetElementType: _t.Line,
            dataElementType: _t.Point,
            _datasetElementOptions: ["backgroundColor", "borderCapStyle", "borderColor", "borderDash", "borderDashOffset", "borderJoinStyle", "borderWidth", "cubicInterpolationMode", "fill"],
            _dataElementOptions: {
                backgroundColor: "pointBackgroundColor",
                borderColor: "pointBorderColor",
                borderWidth: "pointBorderWidth",
                hitRadius: "pointHitRadius",
                hoverBackgroundColor: "pointHoverBackgroundColor",
                hoverBorderColor: "pointHoverBorderColor",
                hoverBorderWidth: "pointHoverBorderWidth",
                hoverRadius: "pointHoverRadius",
                pointStyle: "pointStyle",
                radius: "pointRadius",
                rotation: "pointRotation"
            },
            update: function (t) {
                var e, n, i = this,
                    a = i.getMeta(),
                    r = a.dataset,
                    o = a.data || [],
                    s = i.chart.options,
                    l = i._config,
                    u = i._showLine = Et(l.showLine, s.showLines);
                for (i._xScale = i.getScaleForId(a.xAxisID), i._yScale = i.getScaleForId(a.yAxisID), u && (void 0 !== l.tension && void 0 === l.lineTension && (l.lineTension = l.tension), r._scale = i._yScale, r._datasetIndex = i.index, r._children = o, r._model = i._resolveDatasetElementOptions(r), r.pivot()), e = 0, n = o.length; e < n; ++e) i.updateElement(o[e], e, t);
                for (u && 0 !== r._model.tension && i.updateBezierControlPoints(), e = 0, n = o.length; e < n; ++e) o[e].pivot()
            },
            updateElement: function (t, e, n) {
                var i, a, r = this,
                    o = r.getMeta(),
                    s = t.custom || {},
                    l = r.getDataset(),
                    u = r.index,
                    d = l.data[e],
                    h = r._xScale,
                    c = r._yScale,
                    f = o.dataset._model,
                    g = r._resolveDataElementOptions(t, e);
                i = h.getPixelForValue("object" == typeof d ? d : NaN, e, u), a = n ? c.getBasePixel() : r.calculatePointY(d, e, u), t._xScale = h, t._yScale = c, t._options = g, t._datasetIndex = u, t._index = e, t._model = {
                    x: i,
                    y: a,
                    skip: s.skip || isNaN(i) || isNaN(a),
                    radius: g.radius,
                    pointStyle: g.pointStyle,
                    rotation: g.rotation,
                    backgroundColor: g.backgroundColor,
                    borderColor: g.borderColor,
                    borderWidth: g.borderWidth,
                    tension: Et(s.tension, f ? f.tension : 0),
                    steppedLine: !!f && f.steppedLine,
                    hitRadius: g.hitRadius
                }
            },
            _resolveDatasetElementOptions: function (t) {
                var e = this,
                    n = e._config,
                    i = t.custom || {},
                    a = e.chart.options,
                    r = a.elements.line,
                    o = nt.prototype._resolveDatasetElementOptions.apply(e, arguments);
                return o.spanGaps = Et(n.spanGaps, a.spanGaps), o.tension = Et(n.lineTension, r.tension), o.steppedLine = Wt([i.steppedLine, n.steppedLine, r.stepped]), o.clip = qt(Et(n.clip, jt(e._xScale, e._yScale, o.borderWidth))), o
            },
            calculatePointY: function (t, e, n) {
                var i, a, r, o, s, l, u, d = this.chart,
                    h = this._yScale,
                    c = 0,
                    f = 0;
                if (h.options.stacked) {
                    for (s = +h.getRightValue(t), u = (l = d._getSortedVisibleDatasetMetas()).length, i = 0; i < u && (r = l[i]).index !== n; ++i) a = d.data.datasets[r.index], "line" === r.type && r.yAxisID === h.id && ((o = +h.getRightValue(a.data[e])) < 0 ? f += o || 0 : c += o || 0);
                    return s < 0 ? h.getPixelForValue(f + s) : h.getPixelForValue(c + s)
                }
                return h.getPixelForValue(t)
            },
            updateBezierControlPoints: function () {
                var t, e, n, i, a = this.chart,
                    r = this.getMeta(),
                    o = r.dataset._model,
                    s = a.chartArea,
                    l = r.data || [];

                function u(t, e, n) {
                    return Math.max(Math.min(t, n), e)
                }
                if (o.spanGaps && (l = l.filter((function (t) {
                        return !t._model.skip
                    }))), "monotone" === o.cubicInterpolationMode) V.splineCurveMonotone(l);
                else
                    for (t = 0, e = l.length; t < e; ++t) n = l[t]._model, i = V.splineCurve(V.previousItem(l, t)._model, n, V.nextItem(l, t)._model, o.tension), n.controlPointPreviousX = i.previous.x, n.controlPointPreviousY = i.previous.y, n.controlPointNextX = i.next.x, n.controlPointNextY = i.next.y;
                if (a.options.elements.line.capBezierPoints)
                    for (t = 0, e = l.length; t < e; ++t) n = l[t]._model, Vt(n, s) && (t > 0 && Vt(l[t - 1]._model, s) && (n.controlPointPreviousX = u(n.controlPointPreviousX, s.left, s.right), n.controlPointPreviousY = u(n.controlPointPreviousY, s.top, s.bottom)), t < l.length - 1 && Vt(l[t + 1]._model, s) && (n.controlPointNextX = u(n.controlPointNextX, s.left, s.right), n.controlPointNextY = u(n.controlPointNextY, s.top, s.bottom)))
            },
            draw: function () {
                var t, e = this.chart,
                    n = this.getMeta(),
                    i = n.data || [],
                    a = e.chartArea,
                    r = e.canvas,
                    o = 0,
                    s = i.length;
                for (this._showLine && (t = n.dataset._model.clip, V.canvas.clipArea(e.ctx, {
                        left: !1 === t.left ? 0 : a.left - t.left,
                        right: !1 === t.right ? r.width : a.right + t.right,
                        top: !1 === t.top ? 0 : a.top - t.top,
                        bottom: !1 === t.bottom ? r.height : a.bottom + t.bottom
                    }), n.dataset.draw(), V.canvas.unclipArea(e.ctx)); o < s; ++o) i[o].draw(a)
            },
            setHoverStyle: function (t) {
                var e = t._model,
                    n = t._options,
                    i = V.getHoverColor;
                t.$previousStyle = {
                    backgroundColor: e.backgroundColor,
                    borderColor: e.borderColor,
                    borderWidth: e.borderWidth,
                    radius: e.radius
                }, e.backgroundColor = Et(n.hoverBackgroundColor, i(n.backgroundColor)), e.borderColor = Et(n.hoverBorderColor, i(n.borderColor)), e.borderWidth = Et(n.hoverBorderWidth, n.borderWidth), e.radius = Et(n.hoverRadius, n.radius)
            }
        }),
        Yt = V.options.resolve;
    z._set("polarArea", {
        scale: {
            type: "radialLinear",
            angleLines: {
                display: !1
            },
            gridLines: {
                circular: !0
            },
            pointLabels: {
                display: !1
            },
            ticks: {
                beginAtZero: !0
            }
        },
        animation: {
            animateRotate: !0,
            animateScale: !0
        },
        startAngle: -.5 * Math.PI,
        legendCallback: function (t) {
            var e, n, i, a = document.createElement("ul"),
                r = t.data,
                o = r.datasets,
                s = r.labels;
            if (a.setAttribute("class", t.id + "-legend"), o.length)
                for (e = 0, n = o[0].data.length; e < n; ++e)(i = a.appendChild(document.createElement("li"))).appendChild(document.createElement("span")).style.backgroundColor = o[0].backgroundColor[e], s[e] && i.appendChild(document.createTextNode(s[e]));
            return a.outerHTML
        },
        legend: {
            labels: {
                generateLabels: function (t) {
                    var e = t.data;
                    return e.labels.length && e.datasets.length ? e.labels.map((function (n, i) {
                        var a = t.getDatasetMeta(0),
                            r = a.controller.getStyle(i);
                        return {
                            text: n,
                            fillStyle: r.backgroundColor,
                            strokeStyle: r.borderColor,
                            lineWidth: r.borderWidth,
                            hidden: isNaN(e.datasets[0].data[i]) || a.data[i].hidden,
                            index: i
                        }
                    })) : []
                }
            },
            onClick: function (t, e) {
                var n, i, a, r = e.index,
                    o = this.chart;
                for (n = 0, i = (o.data.datasets || []).length; n < i; ++n)(a = o.getDatasetMeta(n)).data[r].hidden = !a.data[r].hidden;
                o.update()
            }
        },
        tooltips: {
            callbacks: {
                title: function () {
                    return ""
                },
                label: function (t, e) {
                    return e.labels[t.index] + ": " + t.yLabel
                }
            }
        }
    });
    var Gt = nt.extend({
        dataElementType: _t.Arc,
        linkScales: V.noop,
        _dataElementOptions: ["backgroundColor", "borderColor", "borderWidth", "borderAlign", "hoverBackgroundColor", "hoverBorderColor", "hoverBorderWidth"],
        _getIndexScaleId: function () {
            return this.chart.scale.id
        },
        _getValueScaleId: function () {
            return this.chart.scale.id
        },
        update: function (t) {
            var e, n, i, a = this,
                r = a.getDataset(),
                o = a.getMeta(),
                s = a.chart.options.startAngle || 0,
                l = a._starts = [],
                u = a._angles = [],
                d = o.data;
            for (a._updateRadius(), o.count = a.countVisibleElements(), e = 0, n = r.data.length; e < n; e++) l[e] = s, i = a._computeAngle(e), u[e] = i, s += i;
            for (e = 0, n = d.length; e < n; ++e) d[e]._options = a._resolveDataElementOptions(d[e], e), a.updateElement(d[e], e, t)
        },
        _updateRadius: function () {
            var t = this,
                e = t.chart,
                n = e.chartArea,
                i = e.options,
                a = Math.min(n.right - n.left, n.bottom - n.top);
            e.outerRadius = Math.max(a / 2, 0), e.innerRadius = Math.max(i.cutoutPercentage ? e.outerRadius / 100 * i.cutoutPercentage : 1, 0), e.radiusLength = (e.outerRadius - e.innerRadius) / e.getVisibleDatasetCount(), t.outerRadius = e.outerRadius - e.radiusLength * t.index, t.innerRadius = t.outerRadius - e.radiusLength
        },
        updateElement: function (t, e, n) {
            var i = this,
                a = i.chart,
                r = i.getDataset(),
                o = a.options,
                s = o.animation,
                l = a.scale,
                u = a.data.labels,
                d = l.xCenter,
                h = l.yCenter,
                c = o.startAngle,
                f = t.hidden ? 0 : l.getDistanceFromCenterForValue(r.data[e]),
                g = i._starts[e],
                p = g + (t.hidden ? 0 : i._angles[e]),
                m = s.animateScale ? 0 : l.getDistanceFromCenterForValue(r.data[e]),
                v = t._options || {};
            V.extend(t, {
                _datasetIndex: i.index,
                _index: e,
                _scale: l,
                _model: {
                    backgroundColor: v.backgroundColor,
                    borderColor: v.borderColor,
                    borderWidth: v.borderWidth,
                    borderAlign: v.borderAlign,
                    x: d,
                    y: h,
                    innerRadius: 0,
                    outerRadius: n ? m : f,
                    startAngle: n && s.animateRotate ? c : g,
                    endAngle: n && s.animateRotate ? c : p,
                    label: V.valueAtIndexOrDefault(u, e, u[e])
                }
            }), t.pivot()
        },
        countVisibleElements: function () {
            var t = this.getDataset(),
                e = this.getMeta(),
                n = 0;
            return V.each(e.data, (function (e, i) {
                isNaN(t.data[i]) || e.hidden || n++
            })), n
        },
        setHoverStyle: function (t) {
            var e = t._model,
                n = t._options,
                i = V.getHoverColor,
                a = V.valueOrDefault;
            t.$previousStyle = {
                backgroundColor: e.backgroundColor,
                borderColor: e.borderColor,
                borderWidth: e.borderWidth
            }, e.backgroundColor = a(n.hoverBackgroundColor, i(n.backgroundColor)), e.borderColor = a(n.hoverBorderColor, i(n.borderColor)), e.borderWidth = a(n.hoverBorderWidth, n.borderWidth)
        },
        _computeAngle: function (t) {
            var e = this,
                n = this.getMeta().count,
                i = e.getDataset(),
                a = e.getMeta();
            if (isNaN(i.data[t]) || a.data[t].hidden) return 0;
            var r = {
                chart: e.chart,
                dataIndex: t,
                dataset: i,
                datasetIndex: e.index
            };
            return Yt([e.chart.options.elements.arc.angle, 2 * Math.PI / n], r, t)
        }
    });
    z._set("pie", V.clone(z.doughnut)), z._set("pie", {
        cutoutPercentage: 0
    });
    var Xt = Nt,
        Kt = V.valueOrDefault;
    z._set("radar", {
        spanGaps: !1,
        scale: {
            type: "radialLinear"
        },
        elements: {
            line: {
                fill: "start",
                tension: 0
            }
        }
    });
    var Zt = nt.extend({
        datasetElementType: _t.Line,
        dataElementType: _t.Point,
        linkScales: V.noop,
        _datasetElementOptions: ["backgroundColor", "borderWidth", "borderColor", "borderCapStyle", "borderDash", "borderDashOffset", "borderJoinStyle", "fill"],
        _dataElementOptions: {
            backgroundColor: "pointBackgroundColor",
            borderColor: "pointBorderColor",
            borderWidth: "pointBorderWidth",
            hitRadius: "pointHitRadius",
            hoverBackgroundColor: "pointHoverBackgroundColor",
            hoverBorderColor: "pointHoverBorderColor",
            hoverBorderWidth: "pointHoverBorderWidth",
            hoverRadius: "pointHoverRadius",
            pointStyle: "pointStyle",
            radius: "pointRadius",
            rotation: "pointRotation"
        },
        _getIndexScaleId: function () {
            return this.chart.scale.id
        },
        _getValueScaleId: function () {
            return this.chart.scale.id
        },
        update: function (t) {
            var e, n, i = this,
                a = i.getMeta(),
                r = a.dataset,
                o = a.data || [],
                s = i.chart.scale,
                l = i._config;
            for (void 0 !== l.tension && void 0 === l.lineTension && (l.lineTension = l.tension), r._scale = s, r._datasetIndex = i.index, r._children = o, r._loop = !0, r._model = i._resolveDatasetElementOptions(r), r.pivot(), e = 0, n = o.length; e < n; ++e) i.updateElement(o[e], e, t);
            for (i.updateBezierControlPoints(), e = 0, n = o.length; e < n; ++e) o[e].pivot()
        },
        updateElement: function (t, e, n) {
            var i = this,
                a = t.custom || {},
                r = i.getDataset(),
                o = i.chart.scale,
                s = o.getPointPositionForValue(e, r.data[e]),
                l = i._resolveDataElementOptions(t, e),
                u = i.getMeta().dataset._model,
                d = n ? o.xCenter : s.x,
                h = n ? o.yCenter : s.y;
            t._scale = o, t._options = l, t._datasetIndex = i.index, t._index = e, t._model = {
                x: d,
                y: h,
                skip: a.skip || isNaN(d) || isNaN(h),
                radius: l.radius,
                pointStyle: l.pointStyle,
                rotation: l.rotation,
                backgroundColor: l.backgroundColor,
                borderColor: l.borderColor,
                borderWidth: l.borderWidth,
                tension: Kt(a.tension, u ? u.tension : 0),
                hitRadius: l.hitRadius
            }
        },
        _resolveDatasetElementOptions: function () {
            var t = this,
                e = t._config,
                n = t.chart.options,
                i = nt.prototype._resolveDatasetElementOptions.apply(t, arguments);
            return i.spanGaps = Kt(e.spanGaps, n.spanGaps), i.tension = Kt(e.lineTension, n.elements.line.tension), i
        },
        updateBezierControlPoints: function () {
            var t, e, n, i, a = this.getMeta(),
                r = this.chart.chartArea,
                o = a.data || [];

            function s(t, e, n) {
                return Math.max(Math.min(t, n), e)
            }
            for (a.dataset._model.spanGaps && (o = o.filter((function (t) {
                    return !t._model.skip
                }))), t = 0, e = o.length; t < e; ++t) n = o[t]._model, i = V.splineCurve(V.previousItem(o, t, !0)._model, n, V.nextItem(o, t, !0)._model, n.tension), n.controlPointPreviousX = s(i.previous.x, r.left, r.right), n.controlPointPreviousY = s(i.previous.y, r.top, r.bottom), n.controlPointNextX = s(i.next.x, r.left, r.right), n.controlPointNextY = s(i.next.y, r.top, r.bottom)
        },
        setHoverStyle: function (t) {
            var e = t._model,
                n = t._options,
                i = V.getHoverColor;
            t.$previousStyle = {
                backgroundColor: e.backgroundColor,
                borderColor: e.borderColor,
                borderWidth: e.borderWidth,
                radius: e.radius
            }, e.backgroundColor = Kt(n.hoverBackgroundColor, i(n.backgroundColor)), e.borderColor = Kt(n.hoverBorderColor, i(n.borderColor)), e.borderWidth = Kt(n.hoverBorderWidth, n.borderWidth), e.radius = Kt(n.hoverRadius, n.radius)
        }
    });
    z._set("scatter", {
        hover: {
            mode: "single"
        },
        scales: {
            xAxes: [{
                id: "x-axis-1",
                type: "linear",
                position: "bottom"
            }],
            yAxes: [{
                id: "y-axis-1",
                type: "linear",
                position: "left"
            }]
        },
        tooltips: {
            callbacks: {
                title: function () {
                    return ""
                },
                label: function (t) {
                    return "(" + t.xLabel + ", " + t.yLabel + ")"
                }
            }
        }
    }), z._set("global", {
        datasets: {
            scatter: {
                showLine: !1
            }
        }
    });
    var $t = {
        bar: Dt,
        bubble: Ft,
        doughnut: Nt,
        horizontalBar: Bt,
        line: Ut,
        polarArea: Gt,
        pie: Xt,
        radar: Zt,
        scatter: Ut
    };

    function Jt(t, e) {
        return t.native ? {
            x: t.x,
            y: t.y
        } : V.getRelativePosition(t, e)
    }

    function Qt(t, e) {
        var n, i, a, r, o, s, l = t._getSortedVisibleDatasetMetas();
        for (i = 0, r = l.length; i < r; ++i)
            for (a = 0, o = (n = l[i].data).length; a < o; ++a)(s = n[a])._view.skip || e(s)
    }

    function te(t, e) {
        var n = [];
        return Qt(t, (function (t) {
            t.inRange(e.x, e.y) && n.push(t)
        })), n
    }

    function ee(t, e, n, i) {
        var a = Number.POSITIVE_INFINITY,
            r = [];
        return Qt(t, (function (t) {
            if (!n || t.inRange(e.x, e.y)) {
                var o = t.getCenterPoint(),
                    s = i(e, o);
                s < a ? (r = [t], a = s) : s === a && r.push(t)
            }
        })), r
    }

    function ne(t) {
        var e = -1 !== t.indexOf("x"),
            n = -1 !== t.indexOf("y");
        return function (t, i) {
            var a = e ? Math.abs(t.x - i.x) : 0,
                r = n ? Math.abs(t.y - i.y) : 0;
            return Math.sqrt(Math.pow(a, 2) + Math.pow(r, 2))
        }
    }

    function ie(t, e, n) {
        var i = Jt(e, t);
        n.axis = n.axis || "x";
        var a = ne(n.axis),
            r = n.intersect ? te(t, i) : ee(t, i, !1, a),
            o = [];
        return r.length ? (t._getSortedVisibleDatasetMetas().forEach((function (t) {
            var e = t.data[r[0]._index];
            e && !e._view.skip && o.push(e)
        })), o) : []
    }
    var ae = {
            modes: {
                single: function (t, e) {
                    var n = Jt(e, t),
                        i = [];
                    return Qt(t, (function (t) {
                        if (t.inRange(n.x, n.y)) return i.push(t), i
                    })), i.slice(0, 1)
                },
                label: ie,
                index: ie,
                dataset: function (t, e, n) {
                    var i = Jt(e, t);
                    n.axis = n.axis || "xy";
                    var a = ne(n.axis),
                        r = n.intersect ? te(t, i) : ee(t, i, !1, a);
                    return r.length > 0 && (r = t.getDatasetMeta(r[0]._datasetIndex).data), r
                },
                "x-axis": function (t, e) {
                    return ie(t, e, {
                        intersect: !1
                    })
                },
                point: function (t, e) {
                    return te(t, Jt(e, t))
                },
                nearest: function (t, e, n) {
                    var i = Jt(e, t);
                    n.axis = n.axis || "xy";
                    var a = ne(n.axis);
                    return ee(t, i, n.intersect, a)
                },
                x: function (t, e, n) {
                    var i = Jt(e, t),
                        a = [],
                        r = !1;
                    return Qt(t, (function (t) {
                        t.inXRange(i.x) && a.push(t), t.inRange(i.x, i.y) && (r = !0)
                    })), n.intersect && !r && (a = []), a
                },
                y: function (t, e, n) {
                    var i = Jt(e, t),
                        a = [],
                        r = !1;
                    return Qt(t, (function (t) {
                        t.inYRange(i.y) && a.push(t), t.inRange(i.x, i.y) && (r = !0)
                    })), n.intersect && !r && (a = []), a
                }
            }
        },
        re = V.extend;

    function oe(t, e) {
        return V.where(t, (function (t) {
            return t.pos === e
        }))
    }

    function se(t, e) {
        return t.sort((function (t, n) {
            var i = e ? n : t,
                a = e ? t : n;
            return i.weight === a.weight ? i.index - a.index : i.weight - a.weight
        }))
    }

    function le(t, e, n, i) {
        return Math.max(t[n], e[n]) + Math.max(t[i], e[i])
    }

    function ue(t, e, n) {
        var i, a, r = n.box,
            o = t.maxPadding;
        if (n.size && (t[n.pos] -= n.size), n.size = n.horizontal ? r.height : r.width, t[n.pos] += n.size, r.getPadding) {
            var s = r.getPadding();
            o.top = Math.max(o.top, s.top), o.left = Math.max(o.left, s.left), o.bottom = Math.max(o.bottom, s.bottom), o.right = Math.max(o.right, s.right)
        }
        if (i = e.outerWidth - le(o, t, "left", "right"), a = e.outerHeight - le(o, t, "top", "bottom"), i !== t.w || a !== t.h) return t.w = i, t.h = a, n.horizontal ? i !== t.w : a !== t.h
    }

    function de(t, e) {
        var n = e.maxPadding;

        function i(t) {
            var i = {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            };
            return t.forEach((function (t) {
                i[t] = Math.max(e[t], n[t])
            })), i
        }
        return i(t ? ["left", "right"] : ["top", "bottom"])
    }

    function he(t, e, n) {
        var i, a, r, o, s, l, u = [];
        for (i = 0, a = t.length; i < a; ++i)(o = (r = t[i]).box).update(r.width || e.w, r.height || e.h, de(r.horizontal, e)), ue(e, n, r) && (l = !0, u.length && (s = !0)), o.fullWidth || u.push(r);
        return s && he(u, e, n) || l
    }

    function ce(t, e, n) {
        var i, a, r, o, s = n.padding,
            l = e.x,
            u = e.y;
        for (i = 0, a = t.length; i < a; ++i) o = (r = t[i]).box, r.horizontal ? (o.left = o.fullWidth ? s.left : e.left, o.right = o.fullWidth ? n.outerWidth - s.right : e.left + e.w, o.top = u, o.bottom = u + o.height, o.width = o.right - o.left, u = o.bottom) : (o.left = l, o.right = l + o.width, o.top = e.top, o.bottom = e.top + e.h, o.height = o.bottom - o.top, l = o.right);
        e.x = l, e.y = u
    }
    z._set("global", {
        layout: {
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        }
    });
    var fe, ge = {
            defaults: {},
            addBox: function (t, e) {
                t.boxes || (t.boxes = []), e.fullWidth = e.fullWidth || !1, e.position = e.position || "top", e.weight = e.weight || 0, e._layers = e._layers || function () {
                    return [{
                        z: 0,
                        draw: function () {
                            e.draw.apply(e, arguments)
                        }
                    }]
                }, t.boxes.push(e)
            },
            removeBox: function (t, e) {
                var n = t.boxes ? t.boxes.indexOf(e) : -1; - 1 !== n && t.boxes.splice(n, 1)
            },
            configure: function (t, e, n) {
                for (var i, a = ["fullWidth", "position", "weight"], r = a.length, o = 0; o < r; ++o) i = a[o], n.hasOwnProperty(i) && (e[i] = n[i])
            },
            update: function (t, e, n) {
                if (t) {
                    var i = t.options.layout || {},
                        a = V.options.toPadding(i.padding),
                        r = e - a.width,
                        o = n - a.height,
                        s = function (t) {
                            var e = function (t) {
                                    var e, n, i, a = [];
                                    for (e = 0, n = (t || []).length; e < n; ++e) i = t[e], a.push({
                                        index: e,
                                        box: i,
                                        pos: i.position,
                                        horizontal: i.isHorizontal(),
                                        weight: i.weight
                                    });
                                    return a
                                }(t),
                                n = se(oe(e, "left"), !0),
                                i = se(oe(e, "right")),
                                a = se(oe(e, "top"), !0),
                                r = se(oe(e, "bottom"));
                            return {
                                leftAndTop: n.concat(a),
                                rightAndBottom: i.concat(r),
                                chartArea: oe(e, "chartArea"),
                                vertical: n.concat(i),
                                horizontal: a.concat(r)
                            }
                        }(t.boxes),
                        l = s.vertical,
                        u = s.horizontal,
                        d = Object.freeze({
                            outerWidth: e,
                            outerHeight: n,
                            padding: a,
                            availableWidth: r,
                            vBoxMaxWidth: r / 2 / l.length,
                            hBoxMaxHeight: o / 2
                        }),
                        h = re({
                            maxPadding: re({}, a),
                            w: r,
                            h: o,
                            x: a.left,
                            y: a.top
                        }, a);
                    ! function (t, e) {
                        var n, i, a;
                        for (n = 0, i = t.length; n < i; ++n)(a = t[n]).width = a.horizontal ? a.box.fullWidth && e.availableWidth : e.vBoxMaxWidth, a.height = a.horizontal && e.hBoxMaxHeight
                    }(l.concat(u), d), he(l, h, d), he(u, h, d) && he(l, h, d),
                        function (t) {
                            var e = t.maxPadding;

                            function n(n) {
                                var i = Math.max(e[n] - t[n], 0);
                                return t[n] += i, i
                            }
                            t.y += n("top"), t.x += n("left"), n("right"), n("bottom")
                        }(h), ce(s.leftAndTop, h, d), h.x += h.w, h.y += h.h, ce(s.rightAndBottom, h, d), t.chartArea = {
                            left: h.left,
                            top: h.top,
                            right: h.left + h.w,
                            bottom: h.top + h.h
                        }, V.each(s.chartArea, (function (e) {
                            var n = e.box;
                            re(n, t.chartArea), n.update(h.w, h.h)
                        }))
                }
            }
        },
        pe = (fe = Object.freeze({
            __proto__: null,
            default: "@keyframes chartjs-render-animation{from{opacity:.99}to{opacity:1}}.chartjs-render-monitor{animation:chartjs-render-animation 1ms}.chartjs-size-monitor,.chartjs-size-monitor-expand,.chartjs-size-monitor-shrink{position:absolute;direction:ltr;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1}.chartjs-size-monitor-expand>div{position:absolute;width:1000000px;height:1000000px;left:0;top:0}.chartjs-size-monitor-shrink>div{position:absolute;width:200%;height:200%;left:0;top:0}"
        })) && fe.default || fe,
        me = "$chartjs",
        ve = "chartjs-size-monitor",
        be = "chartjs-render-monitor",
        xe = "chartjs-render-animation",
        ye = ["animationstart", "webkitAnimationStart"],
        _e = {
            touchstart: "mousedown",
            touchmove: "mousemove",
            touchend: "mouseup",
            pointerenter: "mouseenter",
            pointerdown: "mousedown",
            pointermove: "mousemove",
            pointerup: "mouseup",
            pointerleave: "mouseout",
            pointerout: "mouseout"
        };

    function ke(t, e) {
        var n = V.getStyle(t, e),
            i = n && n.match(/^(\d+)(\.\d+)?px$/);
        return i ? Number(i[1]) : void 0
    }
    var we = !! function () {
        var t = !1;
        try {
            var e = Object.defineProperty({}, "passive", {
                get: function () {
                    t = !0
                }
            });
            window.addEventListener("e", null, e)
        } catch (t) {}
        return t
    }() && {
        passive: !0
    };

    function Me(t, e, n) {
        t.addEventListener(e, n, we)
    }

    function Se(t, e, n) {
        t.removeEventListener(e, n, we)
    }

    function Ce(t, e, n, i, a) {
        return {
            type: t,
            chart: e,
            native: a || null,
            x: void 0 !== n ? n : null,
            y: void 0 !== i ? i : null
        }
    }

    function Pe(t) {
        var e = document.createElement("div");
        return e.className = t || "", e
    }

    function Ae(t, e, n) {
        var i, a, r, o, s = t[me] || (t[me] = {}),
            l = s.resizer = function (t) {
                var e = Pe(ve),
                    n = Pe(ve + "-expand"),
                    i = Pe(ve + "-shrink");
                n.appendChild(Pe()), i.appendChild(Pe()), e.appendChild(n), e.appendChild(i), e._reset = function () {
                    n.scrollLeft = 1e6, n.scrollTop = 1e6, i.scrollLeft = 1e6, i.scrollTop = 1e6
                };
                var a = function () {
                    e._reset(), t()
                };
                return Me(n, "scroll", a.bind(n, "expand")), Me(i, "scroll", a.bind(i, "shrink")), e
            }((i = function () {
                if (s.resizer) {
                    var i = n.options.maintainAspectRatio && t.parentNode,
                        a = i ? i.clientWidth : 0;
                    e(Ce("resize", n)), i && i.clientWidth < a && n.canvas && e(Ce("resize", n))
                }
            }, r = !1, o = [], function () {
                o = Array.prototype.slice.call(arguments), a = a || this, r || (r = !0, V.requestAnimFrame.call(window, (function () {
                    r = !1, i.apply(a, o)
                })))
            }));
        ! function (t, e) {
            var n = t[me] || (t[me] = {}),
                i = n.renderProxy = function (t) {
                    t.animationName === xe && e()
                };
            V.each(ye, (function (e) {
                Me(t, e, i)
            })), n.reflow = !!t.offsetParent, t.classList.add(be)
        }(t, (function () {
            if (s.resizer) {
                var e = t.parentNode;
                e && e !== l.parentNode && e.insertBefore(l, e.firstChild), l._reset()
            }
        }))
    }

    function De(t) {
        var e = t[me] || {},
            n = e.resizer;
        delete e.resizer,
            function (t) {
                var e = t[me] || {},
                    n = e.renderProxy;
                n && (V.each(ye, (function (e) {
                    Se(t, e, n)
                })), delete e.renderProxy), t.classList.remove(be)
            }(t), n && n.parentNode && n.parentNode.removeChild(n)
    }
    var Te = {
        disableCSSInjection: !1,
        _enabled: "undefined" != typeof window && "undefined" != typeof document,
        _ensureLoaded: function (t) {
            if (!this.disableCSSInjection) {
                var e = t.getRootNode ? t.getRootNode() : document;
                ! function (t, e) {
                    var n = t[me] || (t[me] = {});
                    if (!n.containsStyles) {
                        n.containsStyles = !0, e = "/* Chart.js */\n" + e;
                        var i = document.createElement("style");
                        i.setAttribute("type", "text/css"), i.appendChild(document.createTextNode(e)), t.appendChild(i)
                    }
                }(e.host ? e : document.head, pe)
            }
        },
        acquireContext: function (t, e) {
            "string" == typeof t ? t = document.getElementById(t) : t.length && (t = t[0]), t && t.canvas && (t = t.canvas);
            var n = t && t.getContext && t.getContext("2d");
            return n && n.canvas === t ? (this._ensureLoaded(t), function (t, e) {
                var n = t.style,
                    i = t.getAttribute("height"),
                    a = t.getAttribute("width");
                if (t[me] = {
                        initial: {
                            height: i,
                            width: a,
                            style: {
                                display: n.display,
                                height: n.height,
                                width: n.width
                            }
                        }
                    }, n.display = n.display || "block", null === a || "" === a) {
                    var r = ke(t, "width");
                    void 0 !== r && (t.width = r)
                }
                if (null === i || "" === i)
                    if ("" === t.style.height) t.height = t.width / (e.options.aspectRatio || 2);
                    else {
                        var o = ke(t, "height");
                        void 0 !== r && (t.height = o)
                    }
            }(t, e), n) : null
        },
        releaseContext: function (t) {
            var e = t.canvas;
            if (e[me]) {
                var n = e[me].initial;
                ["height", "width"].forEach((function (t) {
                    var i = n[t];
                    V.isNullOrUndef(i) ? e.removeAttribute(t) : e.setAttribute(t, i)
                })), V.each(n.style || {}, (function (t, n) {
                    e.style[n] = t
                })), e.width = e.width, delete e[me]
            }
        },
        addEventListener: function (t, e, n) {
            var i = t.canvas;
            if ("resize" !== e) {
                var a = n[me] || (n[me] = {});
                Me(i, e, (a.proxies || (a.proxies = {}))[t.id + "_" + e] = function (e) {
                    n(function (t, e) {
                        var n = _e[t.type] || t.type,
                            i = V.getRelativePosition(t, e);
                        return Ce(n, e, i.x, i.y, t)
                    }(e, t))
                })
            } else Ae(i, n, t)
        },
        removeEventListener: function (t, e, n) {
            var i = t.canvas;
            if ("resize" !== e) {
                var a = ((n[me] || {}).proxies || {})[t.id + "_" + e];
                a && Se(i, e, a)
            } else De(i)
        }
    };
    V.addEvent = Me, V.removeEvent = Se;
    var Ie = Te._enabled ? Te : {
            acquireContext: function (t) {
                return t && t.canvas && (t = t.canvas), t && t.getContext("2d") || null
            }
        },
        Fe = V.extend({
            initialize: function () {},
            acquireContext: function () {},
            releaseContext: function () {},
            addEventListener: function () {},
            removeEventListener: function () {}
        }, Ie);
    z._set("global", {
        plugins: {}
    });
    var Le = {
            _plugins: [],
            _cacheId: 0,
            register: function (t) {
                var e = this._plugins;
                [].concat(t).forEach((function (t) {
                    -1 === e.indexOf(t) && e.push(t)
                })), this._cacheId++
            },
            unregister: function (t) {
                var e = this._plugins;
                [].concat(t).forEach((function (t) {
                    var n = e.indexOf(t); - 1 !== n && e.splice(n, 1)
                })), this._cacheId++
            },
            clear: function () {
                this._plugins = [], this._cacheId++
            },
            count: function () {
                return this._plugins.length
            },
            getAll: function () {
                return this._plugins
            },
            notify: function (t, e, n) {
                var i, a, r, o, s, l = this.descriptors(t),
                    u = l.length;
                for (i = 0; i < u; ++i)
                    if ("function" == typeof (s = (r = (a = l[i]).plugin)[e]) && ((o = [t].concat(n || [])).push(a.options), !1 === s.apply(r, o))) return !1;
                return !0
            },
            descriptors: function (t) {
                var e = t.$plugins || (t.$plugins = {});
                if (e.id === this._cacheId) return e.descriptors;
                var n = [],
                    i = [],
                    a = t && t.config || {},
                    r = a.options && a.options.plugins || {};
                return this._plugins.concat(a.plugins || []).forEach((function (t) {
                    if (-1 === n.indexOf(t)) {
                        var e = t.id,
                            a = r[e];
                        !1 !== a && (!0 === a && (a = V.clone(z.global.plugins[e])), n.push(t), i.push({
                            plugin: t,
                            options: a || {}
                        }))
                    }
                })), e.descriptors = i, e.id = this._cacheId, i
            },
            _invalidate: function (t) {
                delete t.$plugins
            }
        },
        Oe = {
            constructors: {},
            defaults: {},
            registerScaleType: function (t, e, n) {
                this.constructors[t] = e, this.defaults[t] = V.clone(n)
            },
            getScaleConstructor: function (t) {
                return this.constructors.hasOwnProperty(t) ? this.constructors[t] : void 0
            },
            getScaleDefaults: function (t) {
                return this.defaults.hasOwnProperty(t) ? V.merge({}, [z.scale, this.defaults[t]]) : {}
            },
            updateScaleDefaults: function (t, e) {
                this.defaults.hasOwnProperty(t) && (this.defaults[t] = V.extend(this.defaults[t], e))
            },
            addScalesToLayout: function (t) {
                V.each(t.scales, (function (e) {
                    e.fullWidth = e.options.fullWidth, e.position = e.options.position, e.weight = e.options.weight, ge.addBox(t, e)
                }))
            }
        },
        Re = V.valueOrDefault,
        ze = V.rtl.getRtlAdapter;
    z._set("global", {
        tooltips: {
            enabled: !0,
            custom: null,
            mode: "nearest",
            position: "average",
            intersect: !0,
            backgroundColor: "rgba(0,0,0,0.8)",
            titleFontStyle: "bold",
            titleSpacing: 2,
            titleMarginBottom: 6,
            titleFontColor: "#fff",
            titleAlign: "left",
            bodySpacing: 2,
            bodyFontColor: "#fff",
            bodyAlign: "left",
            footerFontStyle: "bold",
            footerSpacing: 2,
            footerMarginTop: 6,
            footerFontColor: "#fff",
            footerAlign: "left",
            yPadding: 6,
            xPadding: 6,
            caretPadding: 2,
            caretSize: 5,
            cornerRadius: 6,
            multiKeyBackground: "#fff",
            displayColors: !0,
            borderColor: "rgba(0,0,0,0)",
            borderWidth: 0,
            callbacks: {
                beforeTitle: V.noop,
                title: function (t, e) {
                    var n = "",
                        i = e.labels,
                        a = i ? i.length : 0;
                    if (t.length > 0) {
                        var r = t[0];
                        r.label ? n = r.label : r.xLabel ? n = r.xLabel : a > 0 && r.index < a && (n = i[r.index])
                    }
                    return n
                },
                afterTitle: V.noop,
                beforeBody: V.noop,
                beforeLabel: V.noop,
                label: function (t, e) {
                    var n = e.datasets[t.datasetIndex].label || "";
                    return n && (n += ": "), V.isNullOrUndef(t.value) ? n += t.yLabel : n += t.value, n
                },
                labelColor: function (t, e) {
                    var n = e.getDatasetMeta(t.datasetIndex).data[t.index]._view;
                    return {
                        borderColor: n.borderColor,
                        backgroundColor: n.backgroundColor
                    }
                },
                labelTextColor: function () {
                    return this._options.bodyFontColor
                },
                afterLabel: V.noop,
                afterBody: V.noop,
                beforeFooter: V.noop,
                footer: V.noop,
                afterFooter: V.noop
            }
        }
    });
    var Ne = {
        average: function (t) {
            if (!t.length) return !1;
            var e, n, i = 0,
                a = 0,
                r = 0;
            for (e = 0, n = t.length; e < n; ++e) {
                var o = t[e];
                if (o && o.hasValue()) {
                    var s = o.tooltipPosition();
                    i += s.x, a += s.y, ++r
                }
            }
            return {
                x: i / r,
                y: a / r
            }
        },
        nearest: function (t, e) {
            var n, i, a, r = e.x,
                o = e.y,
                s = Number.POSITIVE_INFINITY;
            for (n = 0, i = t.length; n < i; ++n) {
                var l = t[n];
                if (l && l.hasValue()) {
                    var u = l.getCenterPoint(),
                        d = V.distanceBetweenPoints(e, u);
                    d < s && (s = d, a = l)
                }
            }
            if (a) {
                var h = a.tooltipPosition();
                r = h.x, o = h.y
            }
            return {
                x: r,
                y: o
            }
        }
    };

    function Be(t, e) {
        return e && (V.isArray(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t
    }

    function Ee(t) {
        return ("string" == typeof t || t instanceof String) && t.indexOf("\n") > -1 ? t.split("\n") : t
    }

    function We(t) {
        var e = z.global;
        return {
            xPadding: t.xPadding,
            yPadding: t.yPadding,
            xAlign: t.xAlign,
            yAlign: t.yAlign,
            rtl: t.rtl,
            textDirection: t.textDirection,
            bodyFontColor: t.bodyFontColor,
            _bodyFontFamily: Re(t.bodyFontFamily, e.defaultFontFamily),
            _bodyFontStyle: Re(t.bodyFontStyle, e.defaultFontStyle),
            _bodyAlign: t.bodyAlign,
            bodyFontSize: Re(t.bodyFontSize, e.defaultFontSize),
            bodySpacing: t.bodySpacing,
            titleFontColor: t.titleFontColor,
            _titleFontFamily: Re(t.titleFontFamily, e.defaultFontFamily),
            _titleFontStyle: Re(t.titleFontStyle, e.defaultFontStyle),
            titleFontSize: Re(t.titleFontSize, e.defaultFontSize),
            _titleAlign: t.titleAlign,
            titleSpacing: t.titleSpacing,
            titleMarginBottom: t.titleMarginBottom,
            footerFontColor: t.footerFontColor,
            _footerFontFamily: Re(t.footerFontFamily, e.defaultFontFamily),
            _footerFontStyle: Re(t.footerFontStyle, e.defaultFontStyle),
            footerFontSize: Re(t.footerFontSize, e.defaultFontSize),
            _footerAlign: t.footerAlign,
            footerSpacing: t.footerSpacing,
            footerMarginTop: t.footerMarginTop,
            caretSize: t.caretSize,
            cornerRadius: t.cornerRadius,
            backgroundColor: t.backgroundColor,
            opacity: 0,
            legendColorBackground: t.multiKeyBackground,
            displayColors: t.displayColors,
            borderColor: t.borderColor,
            borderWidth: t.borderWidth
        }
    }

    function Ve(t, e) {
        return "center" === e ? t.x + t.width / 2 : "right" === e ? t.x + t.width - t.xPadding : t.x + t.xPadding
    }

    function He(t) {
        return Be([], Ee(t))
    }
    var je = X.extend({
            initialize: function () {
                this._model = We(this._options), this._lastActive = []
            },
            getTitle: function () {
                var t = this,
                    e = t._options,
                    n = e.callbacks,
                    i = n.beforeTitle.apply(t, arguments),
                    a = n.title.apply(t, arguments),
                    r = n.afterTitle.apply(t, arguments),
                    o = [];
                return o = Be(o, Ee(i)), o = Be(o, Ee(a)), o = Be(o, Ee(r))
            },
            getBeforeBody: function () {
                return He(this._options.callbacks.beforeBody.apply(this, arguments))
            },
            getBody: function (t, e) {
                var n = this,
                    i = n._options.callbacks,
                    a = [];
                return V.each(t, (function (t) {
                    var r = {
                        before: [],
                        lines: [],
                        after: []
                    };
                    Be(r.before, Ee(i.beforeLabel.call(n, t, e))), Be(r.lines, i.label.call(n, t, e)), Be(r.after, Ee(i.afterLabel.call(n, t, e))), a.push(r)
                })), a
            },
            getAfterBody: function () {
                return He(this._options.callbacks.afterBody.apply(this, arguments))
            },
            getFooter: function () {
                var t = this,
                    e = t._options.callbacks,
                    n = e.beforeFooter.apply(t, arguments),
                    i = e.footer.apply(t, arguments),
                    a = e.afterFooter.apply(t, arguments),
                    r = [];
                return r = Be(r, Ee(n)), r = Be(r, Ee(i)), r = Be(r, Ee(a))
            },
            update: function (t) {
                var e, n, i, a, r, o, s, l, u, d, h = this,
                    c = h._options,
                    f = h._model,
                    g = h._model = We(c),
                    p = h._active,
                    m = h._data,
                    v = {
                        xAlign: f.xAlign,
                        yAlign: f.yAlign
                    },
                    b = {
                        x: f.x,
                        y: f.y
                    },
                    x = {
                        width: f.width,
                        height: f.height
                    },
                    y = {
                        x: f.caretX,
                        y: f.caretY
                    };
                if (p.length) {
                    g.opacity = 1;
                    var _ = [],
                        k = [];
                    y = Ne[c.position].call(h, p, h._eventPosition);
                    var w = [];
                    for (e = 0, n = p.length; e < n; ++e) w.push((i = p[e], a = void 0, r = void 0, o = void 0, s = void 0, l = void 0, u = void 0, d = void 0, a = i._xScale, r = i._yScale || i._scale, o = i._index, s = i._datasetIndex, l = i._chart.getDatasetMeta(s).controller, u = l._getIndexScale(), d = l._getValueScale(), {
                        xLabel: a ? a.getLabelForIndex(o, s) : "",
                        yLabel: r ? r.getLabelForIndex(o, s) : "",
                        label: u ? "" + u.getLabelForIndex(o, s) : "",
                        value: d ? "" + d.getLabelForIndex(o, s) : "",
                        index: o,
                        datasetIndex: s,
                        x: i._model.x,
                        y: i._model.y
                    }));
                    c.filter && (w = w.filter((function (t) {
                        return c.filter(t, m)
                    }))), c.itemSort && (w = w.sort((function (t, e) {
                        return c.itemSort(t, e, m)
                    }))), V.each(w, (function (t) {
                        _.push(c.callbacks.labelColor.call(h, t, h._chart)), k.push(c.callbacks.labelTextColor.call(h, t, h._chart))
                    })), g.title = h.getTitle(w, m), g.beforeBody = h.getBeforeBody(w, m), g.body = h.getBody(w, m), g.afterBody = h.getAfterBody(w, m), g.footer = h.getFooter(w, m), g.x = y.x, g.y = y.y, g.caretPadding = c.caretPadding, g.labelColors = _, g.labelTextColors = k, g.dataPoints = w, x = function (t, e) {
                        var n = t._chart.ctx,
                            i = 2 * e.yPadding,
                            a = 0,
                            r = e.body,
                            o = r.reduce((function (t, e) {
                                return t + e.before.length + e.lines.length + e.after.length
                            }), 0);
                        o += e.beforeBody.length + e.afterBody.length;
                        var s = e.title.length,
                            l = e.footer.length,
                            u = e.titleFontSize,
                            d = e.bodyFontSize,
                            h = e.footerFontSize;
                        i += s * u, i += s ? (s - 1) * e.titleSpacing : 0, i += s ? e.titleMarginBottom : 0, i += o * d, i += o ? (o - 1) * e.bodySpacing : 0, i += l ? e.footerMarginTop : 0, i += l * h, i += l ? (l - 1) * e.footerSpacing : 0;
                        var c = 0,
                            f = function (t) {
                                a = Math.max(a, n.measureText(t).width + c)
                            };
                        return n.font = V.fontString(u, e._titleFontStyle, e._titleFontFamily), V.each(e.title, f), n.font = V.fontString(d, e._bodyFontStyle, e._bodyFontFamily), V.each(e.beforeBody.concat(e.afterBody), f), c = e.displayColors ? d + 2 : 0, V.each(r, (function (t) {
                            V.each(t.before, f), V.each(t.lines, f), V.each(t.after, f)
                        })), c = 0, n.font = V.fontString(h, e._footerFontStyle, e._footerFontFamily), V.each(e.footer, f), {
                            width: a += 2 * e.xPadding,
                            height: i
                        }
                    }(this, g), b = function (t, e, n, i) {
                        var a = t.x,
                            r = t.y,
                            o = t.caretSize,
                            s = t.caretPadding,
                            l = t.cornerRadius,
                            u = n.xAlign,
                            d = n.yAlign,
                            h = o + s,
                            c = l + s;
                        return "right" === u ? a -= e.width : "center" === u && ((a -= e.width / 2) + e.width > i.width && (a = i.width - e.width), a < 0 && (a = 0)), "top" === d ? r += h : r -= "bottom" === d ? e.height + h : e.height / 2, "center" === d ? "left" === u ? a += h : "right" === u && (a -= h) : "left" === u ? a -= c : "right" === u && (a += c), {
                            x: a,
                            y: r
                        }
                    }(g, x, v = function (t, e) {
                        var n, i, a, r, o, s = t._model,
                            l = t._chart,
                            u = t._chart.chartArea,
                            d = "center",
                            h = "center";
                        s.y < e.height ? h = "top" : s.y > l.height - e.height && (h = "bottom");
                        var c = (u.left + u.right) / 2,
                            f = (u.top + u.bottom) / 2;
                        "center" === h ? (n = function (t) {
                            return t <= c
                        }, i = function (t) {
                            return t > c
                        }) : (n = function (t) {
                            return t <= e.width / 2
                        }, i = function (t) {
                            return t >= l.width - e.width / 2
                        }), a = function (t) {
                            return t + e.width + s.caretSize + s.caretPadding > l.width
                        }, r = function (t) {
                            return t - e.width - s.caretSize - s.caretPadding < 0
                        }, o = function (t) {
                            return t <= f ? "top" : "bottom"
                        }, n(s.x) ? (d = "left", a(s.x) && (d = "center", h = o(s.y))) : i(s.x) && (d = "right", r(s.x) && (d = "center", h = o(s.y)));
                        var g = t._options;
                        return {
                            xAlign: g.xAlign ? g.xAlign : d,
                            yAlign: g.yAlign ? g.yAlign : h
                        }
                    }(this, x), h._chart)
                } else g.opacity = 0;
                return g.xAlign = v.xAlign, g.yAlign = v.yAlign, g.x = b.x, g.y = b.y, g.width = x.width, g.height = x.height, g.caretX = y.x, g.caretY = y.y, h._model = g, t && c.custom && c.custom.call(h, g), h
            },
            drawCaret: function (t, e) {
                var n = this._chart.ctx,
                    i = this._view,
                    a = this.getCaretPosition(t, e, i);
                n.lineTo(a.x1, a.y1), n.lineTo(a.x2, a.y2), n.lineTo(a.x3, a.y3)
            },
            getCaretPosition: function (t, e, n) {
                var i, a, r, o, s, l, u = n.caretSize,
                    d = n.cornerRadius,
                    h = n.xAlign,
                    c = n.yAlign,
                    f = t.x,
                    g = t.y,
                    p = e.width,
                    m = e.height;
                if ("center" === c) s = g + m / 2, "left" === h ? (a = (i = f) - u, r = i, o = s + u, l = s - u) : (a = (i = f + p) + u, r = i, o = s - u, l = s + u);
                else if ("left" === h ? (i = (a = f + d + u) - u, r = a + u) : "right" === h ? (i = (a = f + p - d - u) - u, r = a + u) : (i = (a = n.caretX) - u, r = a + u), "top" === c) s = (o = g) - u, l = o;
                else {
                    s = (o = g + m) + u, l = o;
                    var v = r;
                    r = i, i = v
                }
                return {
                    x1: i,
                    x2: a,
                    x3: r,
                    y1: o,
                    y2: s,
                    y3: l
                }
            },
            drawTitle: function (t, e, n) {
                var i, a, r, o = e.title,
                    s = o.length;
                if (s) {
                    var l = ze(e.rtl, e.x, e.width);
                    for (t.x = Ve(e, e._titleAlign), n.textAlign = l.textAlign(e._titleAlign), n.textBaseline = "middle", i = e.titleFontSize, a = e.titleSpacing, n.fillStyle = e.titleFontColor, n.font = V.fontString(i, e._titleFontStyle, e._titleFontFamily), r = 0; r < s; ++r) n.fillText(o[r], l.x(t.x), t.y + i / 2), t.y += i + a, r + 1 === s && (t.y += e.titleMarginBottom - a)
                }
            },
            drawBody: function (t, e, n) {
                var i, a, r, o, s, l, u, d, h = e.bodyFontSize,
                    c = e.bodySpacing,
                    f = e._bodyAlign,
                    g = e.body,
                    p = e.displayColors,
                    m = 0,
                    v = p ? Ve(e, "left") : 0,
                    b = ze(e.rtl, e.x, e.width),
                    x = function (e) {
                        n.fillText(e, b.x(t.x + m), t.y + h / 2), t.y += h + c
                    },
                    y = b.textAlign(f);
                for (n.textAlign = f, n.textBaseline = "middle", n.font = V.fontString(h, e._bodyFontStyle, e._bodyFontFamily), t.x = Ve(e, y), n.fillStyle = e.bodyFontColor, V.each(e.beforeBody, x), m = p && "right" !== y ? "center" === f ? h / 2 + 1 : h + 2 : 0, s = 0, u = g.length; s < u; ++s) {
                    for (i = g[s], a = e.labelTextColors[s], r = e.labelColors[s], n.fillStyle = a, V.each(i.before, x), l = 0, d = (o = i.lines).length; l < d; ++l) {
                        if (p) {
                            var _ = b.x(v);
                            n.fillStyle = e.legendColorBackground, n.fillRect(b.leftForLtr(_, h), t.y, h, h), n.lineWidth = 1, n.strokeStyle = r.borderColor, n.strokeRect(b.leftForLtr(_, h), t.y, h, h), n.fillStyle = r.backgroundColor, n.fillRect(b.leftForLtr(b.xPlus(_, 1), h - 2), t.y + 1, h - 2, h - 2), n.fillStyle = a
                        }
                        x(o[l])
                    }
                    V.each(i.after, x)
                }
                m = 0, V.each(e.afterBody, x), t.y -= c
            },
            drawFooter: function (t, e, n) {
                var i, a, r = e.footer,
                    o = r.length;
                if (o) {
                    var s = ze(e.rtl, e.x, e.width);
                    for (t.x = Ve(e, e._footerAlign), t.y += e.footerMarginTop, n.textAlign = s.textAlign(e._footerAlign), n.textBaseline = "middle", i = e.footerFontSize, n.fillStyle = e.footerFontColor, n.font = V.fontString(i, e._footerFontStyle, e._footerFontFamily), a = 0; a < o; ++a) n.fillText(r[a], s.x(t.x), t.y + i / 2), t.y += i + e.footerSpacing
                }
            },
            drawBackground: function (t, e, n, i) {
                n.fillStyle = e.backgroundColor, n.strokeStyle = e.borderColor, n.lineWidth = e.borderWidth;
                var a = e.xAlign,
                    r = e.yAlign,
                    o = t.x,
                    s = t.y,
                    l = i.width,
                    u = i.height,
                    d = e.cornerRadius;
                n.beginPath(), n.moveTo(o + d, s), "top" === r && this.drawCaret(t, i), n.lineTo(o + l - d, s), n.quadraticCurveTo(o + l, s, o + l, s + d), "center" === r && "right" === a && this.drawCaret(t, i), n.lineTo(o + l, s + u - d), n.quadraticCurveTo(o + l, s + u, o + l - d, s + u), "bottom" === r && this.drawCaret(t, i), n.lineTo(o + d, s + u), n.quadraticCurveTo(o, s + u, o, s + u - d), "center" === r && "left" === a && this.drawCaret(t, i), n.lineTo(o, s + d), n.quadraticCurveTo(o, s, o + d, s), n.closePath(), n.fill(), e.borderWidth > 0 && n.stroke()
            },
            draw: function () {
                var t = this._chart.ctx,
                    e = this._view;
                if (0 !== e.opacity) {
                    var n = {
                            width: e.width,
                            height: e.height
                        },
                        i = {
                            x: e.x,
                            y: e.y
                        },
                        a = Math.abs(e.opacity < .001) ? 0 : e.opacity,
                        r = e.title.length || e.beforeBody.length || e.body.length || e.afterBody.length || e.footer.length;
                    this._options.enabled && r && (t.save(), t.globalAlpha = a, this.drawBackground(i, e, t, n), i.y += e.yPadding, V.rtl.overrideTextDirection(t, e.textDirection), this.drawTitle(i, e, t), this.drawBody(i, e, t), this.drawFooter(i, e, t), V.rtl.restoreTextDirection(t, e.textDirection), t.restore())
                }
            },
            handleEvent: function (t) {
                var e, n = this,
                    i = n._options;
                return n._lastActive = n._lastActive || [], "mouseout" === t.type ? n._active = [] : (n._active = n._chart.getElementsAtEventForMode(t, i.mode, i), i.reverse && n._active.reverse()), (e = !V.arrayEquals(n._active, n._lastActive)) && (n._lastActive = n._active, (i.enabled || i.custom) && (n._eventPosition = {
                    x: t.x,
                    y: t.y
                }, n.update(!0), n.pivot())), e
            }
        }),
        qe = Ne,
        Ue = je;
    Ue.positioners = qe;
    var Ye = V.valueOrDefault;

    function Ge() {
        return V.merge({}, [].slice.call(arguments), {
            merger: function (t, e, n, i) {
                if ("xAxes" === t || "yAxes" === t) {
                    var a, r, o, s = n[t].length;
                    for (e[t] || (e[t] = []), a = 0; a < s; ++a) o = n[t][a], r = Ye(o.type, "xAxes" === t ? "category" : "linear"), a >= e[t].length && e[t].push({}), !e[t][a].type || o.type && o.type !== e[t][a].type ? V.merge(e[t][a], [Oe.getScaleDefaults(r), o]) : V.merge(e[t][a], o)
                } else V._merger(t, e, n, i)
            }
        })
    }

    function Xe() {
        return V.merge({}, [].slice.call(arguments), {
            merger: function (t, e, n, i) {
                var a = e[t] || {},
                    r = n[t];
                "scales" === t ? e[t] = Ge(a, r) : "scale" === t ? e[t] = V.merge(a, [Oe.getScaleDefaults(r.type), r]) : V._merger(t, e, n, i)
            }
        })
    }

    function Ke(t) {
        var e = t.options;
        V.each(t.scales, (function (e) {
            ge.removeBox(t, e)
        })), e = Xe(z.global, z[t.config.type], e), t.options = t.config.options = e, t.ensureScalesHaveIDs(), t.buildOrUpdateScales(), t.tooltip._options = e.tooltips, t.tooltip.initialize()
    }

    function Ze(t, e, n) {
        var i, a = function (t) {
            return t.id === i
        };
        do {
            i = e + n++
        } while (V.findIndex(t, a) >= 0);
        return i
    }

    function $e(t) {
        return "top" === t || "bottom" === t
    }

    function Je(t, e) {
        return function (n, i) {
            return n[t] === i[t] ? n[e] - i[e] : n[t] - i[t]
        }
    }
    z._set("global", {
        elements: {},
        events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
        hover: {
            onHover: null,
            mode: "nearest",
            intersect: !0,
            animationDuration: 400
        },
        onClick: null,
        maintainAspectRatio: !0,
        responsive: !0,
        responsiveAnimationDuration: 0
    });
    var Qe = function (t, e) {
        return this.construct(t, e), this
    };
    V.extend(Qe.prototype, {
        construct: function (t, e) {
            var n = this;
            e = function (t) {
                var e = (t = t || {}).data = t.data || {};
                return e.datasets = e.datasets || [], e.labels = e.labels || [], t.options = Xe(z.global, z[t.type], t.options || {}), t
            }(e);
            var i = Fe.acquireContext(t, e),
                a = i && i.canvas,
                r = a && a.height,
                o = a && a.width;
            n.id = V.uid(), n.ctx = i, n.canvas = a, n.config = e, n.width = o, n.height = r, n.aspectRatio = r ? o / r : null, n.options = e.options, n._bufferedRender = !1, n._layers = [], n.chart = n, n.controller = n, Qe.instances[n.id] = n, Object.defineProperty(n, "data", {
                get: function () {
                    return n.config.data
                },
                set: function (t) {
                    n.config.data = t
                }
            }), i && a ? (n.initialize(), n.update()) : console.error("Failed to create chart: can't acquire context from the given item")
        },
        initialize: function () {
            var t = this;
            return Le.notify(t, "beforeInit"), V.retinaScale(t, t.options.devicePixelRatio), t.bindEvents(), t.options.responsive && t.resize(!0), t.initToolTip(), Le.notify(t, "afterInit"), t
        },
        clear: function () {
            return V.canvas.clear(this), this
        },
        stop: function () {
            return $.cancelAnimation(this), this
        },
        resize: function (t) {
            var e = this,
                n = e.options,
                i = e.canvas,
                a = n.maintainAspectRatio && e.aspectRatio || null,
                r = Math.max(0, Math.floor(V.getMaximumWidth(i))),
                o = Math.max(0, Math.floor(a ? r / a : V.getMaximumHeight(i)));
            if ((e.width !== r || e.height !== o) && (i.width = e.width = r, i.height = e.height = o, i.style.width = r + "px", i.style.height = o + "px", V.retinaScale(e, n.devicePixelRatio), !t)) {
                var s = {
                    width: r,
                    height: o
                };
                Le.notify(e, "resize", [s]), n.onResize && n.onResize(e, s), e.stop(), e.update({
                    duration: n.responsiveAnimationDuration
                })
            }
        },
        ensureScalesHaveIDs: function () {
            var t = this.options,
                e = t.scales || {},
                n = t.scale;
            V.each(e.xAxes, (function (t, n) {
                t.id || (t.id = Ze(e.xAxes, "x-axis-", n))
            })), V.each(e.yAxes, (function (t, n) {
                t.id || (t.id = Ze(e.yAxes, "y-axis-", n))
            })), n && (n.id = n.id || "scale")
        },
        buildOrUpdateScales: function () {
            var t = this,
                e = t.options,
                n = t.scales || {},
                i = [],
                a = Object.keys(n).reduce((function (t, e) {
                    return t[e] = !1, t
                }), {});
            e.scales && (i = i.concat((e.scales.xAxes || []).map((function (t) {
                return {
                    options: t,
                    dtype: "category",
                    dposition: "bottom"
                }
            })), (e.scales.yAxes || []).map((function (t) {
                return {
                    options: t,
                    dtype: "linear",
                    dposition: "left"
                }
            })))), e.scale && i.push({
                options: e.scale,
                dtype: "radialLinear",
                isDefault: !0,
                dposition: "chartArea"
            }), V.each(i, (function (e) {
                var i = e.options,
                    r = i.id,
                    o = Ye(i.type, e.dtype);
                $e(i.position) !== $e(e.dposition) && (i.position = e.dposition), a[r] = !0;
                var s = null;
                if (r in n && n[r].type === o)(s = n[r]).options = i, s.ctx = t.ctx, s.chart = t;
                else {
                    var l = Oe.getScaleConstructor(o);
                    if (!l) return;
                    s = new l({
                        id: r,
                        type: o,
                        options: i,
                        ctx: t.ctx,
                        chart: t
                    }), n[s.id] = s
                }
                s.mergeTicksOptions(), e.isDefault && (t.scale = s)
            })), V.each(a, (function (t, e) {
                t || delete n[e]
            })), t.scales = n, Oe.addScalesToLayout(this)
        },
        buildOrUpdateControllers: function () {
            var t, e, n = this,
                i = [],
                a = n.data.datasets;
            for (t = 0, e = a.length; t < e; t++) {
                var r = a[t],
                    o = n.getDatasetMeta(t),
                    s = r.type || n.config.type;
                if (o.type && o.type !== s && (n.destroyDatasetMeta(t), o = n.getDatasetMeta(t)), o.type = s, o.order = r.order || 0, o.index = t, o.controller) o.controller.updateIndex(t), o.controller.linkScales();
                else {
                    var l = $t[o.type];
                    if (void 0 === l) throw new Error('"' + o.type + '" is not a chart type.');
                    o.controller = new l(n, t), i.push(o.controller)
                }
            }
            return i
        },
        resetElements: function () {
            var t = this;
            V.each(t.data.datasets, (function (e, n) {
                t.getDatasetMeta(n).controller.reset()
            }), t)
        },
        reset: function () {
            this.resetElements(), this.tooltip.initialize()
        },
        update: function (t) {
            var e, n, i = this;
            if (t && "object" == typeof t || (t = {
                    duration: t,
                    lazy: arguments[1]
                }), Ke(i), Le._invalidate(i), !1 !== Le.notify(i, "beforeUpdate")) {
                i.tooltip._data = i.data;
                var a = i.buildOrUpdateControllers();
                for (e = 0, n = i.data.datasets.length; e < n; e++) i.getDatasetMeta(e).controller.buildOrUpdateElements();
                i.updateLayout(), i.options.animation && i.options.animation.duration && V.each(a, (function (t) {
                    t.reset()
                })), i.updateDatasets(), i.tooltip.initialize(), i.lastActive = [], Le.notify(i, "afterUpdate"), i._layers.sort(Je("z", "_idx")), i._bufferedRender ? i._bufferedRequest = {
                    duration: t.duration,
                    easing: t.easing,
                    lazy: t.lazy
                } : i.render(t)
            }
        },
        updateLayout: function () {
            var t = this;
            !1 !== Le.notify(t, "beforeLayout") && (ge.update(this, this.width, this.height), t._layers = [], V.each(t.boxes, (function (e) {
                e._configure && e._configure(), t._layers.push.apply(t._layers, e._layers())
            }), t), t._layers.forEach((function (t, e) {
                t._idx = e
            })), Le.notify(t, "afterScaleUpdate"), Le.notify(t, "afterLayout"))
        },
        updateDatasets: function () {
            if (!1 !== Le.notify(this, "beforeDatasetsUpdate")) {
                for (var t = 0, e = this.data.datasets.length; t < e; ++t) this.updateDataset(t);
                Le.notify(this, "afterDatasetsUpdate")
            }
        },
        updateDataset: function (t) {
            var e = this.getDatasetMeta(t),
                n = {
                    meta: e,
                    index: t
                };
            !1 !== Le.notify(this, "beforeDatasetUpdate", [n]) && (e.controller._update(), Le.notify(this, "afterDatasetUpdate", [n]))
        },
        render: function (t) {
            var e = this;
            t && "object" == typeof t || (t = {
                duration: t,
                lazy: arguments[1]
            });
            var n = e.options.animation,
                i = Ye(t.duration, n && n.duration),
                a = t.lazy;
            if (!1 !== Le.notify(e, "beforeRender")) {
                var r = function (t) {
                    Le.notify(e, "afterRender"), V.callback(n && n.onComplete, [t], e)
                };
                if (n && i) {
                    var o = new Z({
                        numSteps: i / 16.66,
                        easing: t.easing || n.easing,
                        render: function (t, e) {
                            var n = V.easing.effects[e.easing],
                                i = e.currentStep,
                                a = i / e.numSteps;
                            t.draw(n(a), a, i)
                        },
                        onAnimationProgress: n.onProgress,
                        onAnimationComplete: r
                    });
                    $.addAnimation(e, o, i, a)
                } else e.draw(), r(new Z({
                    numSteps: 0,
                    chart: e
                }));
                return e
            }
        },
        draw: function (t) {
            var e, n, i = this;
            if (i.clear(), V.isNullOrUndef(t) && (t = 1), i.transition(t), !(i.width <= 0 || i.height <= 0) && !1 !== Le.notify(i, "beforeDraw", [t])) {
                for (n = i._layers, e = 0; e < n.length && n[e].z <= 0; ++e) n[e].draw(i.chartArea);
                for (i.drawDatasets(t); e < n.length; ++e) n[e].draw(i.chartArea);
                i._drawTooltip(t), Le.notify(i, "afterDraw", [t])
            }
        },
        transition: function (t) {
            for (var e = 0, n = (this.data.datasets || []).length; e < n; ++e) this.isDatasetVisible(e) && this.getDatasetMeta(e).controller.transition(t);
            this.tooltip.transition(t)
        },
        _getSortedDatasetMetas: function (t) {
            var e, n, i = [];
            for (e = 0, n = (this.data.datasets || []).length; e < n; ++e) t && !this.isDatasetVisible(e) || i.push(this.getDatasetMeta(e));
            return i.sort(Je("order", "index")), i
        },
        _getSortedVisibleDatasetMetas: function () {
            return this._getSortedDatasetMetas(!0)
        },
        drawDatasets: function (t) {
            var e, n;
            if (!1 !== Le.notify(this, "beforeDatasetsDraw", [t])) {
                for (n = (e = this._getSortedVisibleDatasetMetas()).length - 1; n >= 0; --n) this.drawDataset(e[n], t);
                Le.notify(this, "afterDatasetsDraw", [t])
            }
        },
        drawDataset: function (t, e) {
            var n = {
                meta: t,
                index: t.index,
                easingValue: e
            };
            !1 !== Le.notify(this, "beforeDatasetDraw", [n]) && (t.controller.draw(e), Le.notify(this, "afterDatasetDraw", [n]))
        },
        _drawTooltip: function (t) {
            var e = this.tooltip,
                n = {
                    tooltip: e,
                    easingValue: t
                };
            !1 !== Le.notify(this, "beforeTooltipDraw", [n]) && (e.draw(), Le.notify(this, "afterTooltipDraw", [n]))
        },
        getElementAtEvent: function (t) {
            return ae.modes.single(this, t)
        },
        getElementsAtEvent: function (t) {
            return ae.modes.label(this, t, {
                intersect: !0
            })
        },
        getElementsAtXAxis: function (t) {
            return ae.modes["x-axis"](this, t, {
                intersect: !0
            })
        },
        getElementsAtEventForMode: function (t, e, n) {
            var i = ae.modes[e];
            return "function" == typeof i ? i(this, t, n) : []
        },
        getDatasetAtEvent: function (t) {
            return ae.modes.dataset(this, t, {
                intersect: !0
            })
        },
        getDatasetMeta: function (t) {
            var e = this.data.datasets[t];
            e._meta || (e._meta = {});
            var n = e._meta[this.id];
            return n || (n = e._meta[this.id] = {
                type: null,
                data: [],
                dataset: null,
                controller: null,
                hidden: null,
                xAxisID: null,
                yAxisID: null,
                order: e.order || 0,
                index: t
            }), n
        },
        getVisibleDatasetCount: function () {
            for (var t = 0, e = 0, n = this.data.datasets.length; e < n; ++e) this.isDatasetVisible(e) && t++;
            return t
        },
        isDatasetVisible: function (t) {
            var e = this.getDatasetMeta(t);
            return "boolean" == typeof e.hidden ? !e.hidden : !this.data.datasets[t].hidden
        },
        generateLegend: function () {
            return this.options.legendCallback(this)
        },
        destroyDatasetMeta: function (t) {
            var e = this.id,
                n = this.data.datasets[t],
                i = n._meta && n._meta[e];
            i && (i.controller.destroy(), delete n._meta[e])
        },
        destroy: function () {
            var t, e, n = this,
                i = n.canvas;
            for (n.stop(), t = 0, e = n.data.datasets.length; t < e; ++t) n.destroyDatasetMeta(t);
            i && (n.unbindEvents(), V.canvas.clear(n), Fe.releaseContext(n.ctx), n.canvas = null, n.ctx = null), Le.notify(n, "destroy"), delete Qe.instances[n.id]
        },
        toBase64Image: function () {
            return this.canvas.toDataURL.apply(this.canvas, arguments)
        },
        initToolTip: function () {
            var t = this;
            t.tooltip = new Ue({
                _chart: t,
                _chartInstance: t,
                _data: t.data,
                _options: t.options.tooltips
            }, t)
        },
        bindEvents: function () {
            var t = this,
                e = t._listeners = {},
                n = function () {
                    t.eventHandler.apply(t, arguments)
                };
            V.each(t.options.events, (function (i) {
                Fe.addEventListener(t, i, n), e[i] = n
            })), t.options.responsive && (n = function () {
                t.resize()
            }, Fe.addEventListener(t, "resize", n), e.resize = n)
        },
        unbindEvents: function () {
            var t = this,
                e = t._listeners;
            e && (delete t._listeners, V.each(e, (function (e, n) {
                Fe.removeEventListener(t, n, e)
            })))
        },
        updateHoverStyle: function (t, e, n) {
            var i, a, r, o = n ? "set" : "remove";
            for (a = 0, r = t.length; a < r; ++a)(i = t[a]) && this.getDatasetMeta(i._datasetIndex).controller[o + "HoverStyle"](i);
            "dataset" === e && this.getDatasetMeta(t[0]._datasetIndex).controller["_" + o + "DatasetHoverStyle"]()
        },
        eventHandler: function (t) {
            var e = this,
                n = e.tooltip;
            if (!1 !== Le.notify(e, "beforeEvent", [t])) {
                e._bufferedRender = !0, e._bufferedRequest = null;
                var i = e.handleEvent(t);
                n && (i = n._start ? n.handleEvent(t) : i | n.handleEvent(t)), Le.notify(e, "afterEvent", [t]);
                var a = e._bufferedRequest;
                return a ? e.render(a) : i && !e.animating && (e.stop(), e.render({
                    duration: e.options.hover.animationDuration,
                    lazy: !0
                })), e._bufferedRender = !1, e._bufferedRequest = null, e
            }
        },
        handleEvent: function (t) {
            var e, n = this,
                i = n.options || {},
                a = i.hover;
            return n.lastActive = n.lastActive || [], "mouseout" === t.type ? n.active = [] : n.active = n.getElementsAtEventForMode(t, a.mode, a), V.callback(i.onHover || i.hover.onHover, [t.native, n.active], n), "mouseup" !== t.type && "click" !== t.type || i.onClick && i.onClick.call(n, t.native, n.active), n.lastActive.length && n.updateHoverStyle(n.lastActive, a.mode, !1), n.active.length && a.mode && n.updateHoverStyle(n.active, a.mode, !0), e = !V.arrayEquals(n.active, n.lastActive), n.lastActive = n.active, e
        }
    }), Qe.instances = {};
    var tn = Qe;
    Qe.Controller = Qe, Qe.types = {}, V.configMerge = Xe, V.scaleMerge = Ge;

    function en() {
        throw new Error("This method is not implemented: either no adapter can be found or an incomplete integration was provided.")
    }

    function nn(t) {
        this.options = t || {}
    }
    V.extend(nn.prototype, {
        formats: en,
        parse: en,
        format: en,
        add: en,
        diff: en,
        startOf: en,
        endOf: en,
        _create: function (t) {
            return t
        }
    }), nn.override = function (t) {
        V.extend(nn.prototype, t)
    };
    var an = {
            _date: nn
        },
        rn = {
            formatters: {
                values: function (t) {
                    return V.isArray(t) ? t : "" + t
                },
                linear: function (t, e, n) {
                    var i = n.length > 3 ? n[2] - n[1] : n[1] - n[0];
                    Math.abs(i) > 1 && t !== Math.floor(t) && (i = t - Math.floor(t));
                    var a = V.log10(Math.abs(i)),
                        r = "";
                    if (0 !== t)
                        if (Math.max(Math.abs(n[0]), Math.abs(n[n.length - 1])) < 1e-4) {
                            var o = V.log10(Math.abs(t)),
                                s = Math.floor(o) - Math.floor(a);
                            s = Math.max(Math.min(s, 20), 0), r = t.toExponential(s)
                        } else {
                            var l = -1 * Math.floor(a);
                            l = Math.max(Math.min(l, 20), 0), r = t.toFixed(l)
                        }
                    else r = "0";
                    return r
                },
                logarithmic: function (t, e, n) {
                    var i = t / Math.pow(10, Math.floor(V.log10(t)));
                    return 0 === t ? "0" : 1 === i || 2 === i || 5 === i || 0 === e || e === n.length - 1 ? t.toExponential() : ""
                }
            }
        },
        on = V.isArray,
        sn = V.isNullOrUndef,
        ln = V.valueOrDefault,
        un = V.valueAtIndexOrDefault;

    function dn(t, e, n) {
        var i, a = t.getTicks().length,
            r = Math.min(e, a - 1),
            o = t.getPixelForTick(r),
            s = t._startPixel,
            l = t._endPixel;
        if (!(n && (i = 1 === a ? Math.max(o - s, l - o) : 0 === e ? (t.getPixelForTick(1) - o) / 2 : (o - t.getPixelForTick(r - 1)) / 2, (o += r < e ? i : -i) < s - 1e-6 || o > l + 1e-6))) return o
    }

    function hn(t, e, n, i) {
        var a, r, o, s, l, u, d, h, c, f, g, p, m, v = n.length,
            b = [],
            x = [],
            y = [];
        for (a = 0; a < v; ++a) {
            if (s = n[a].label, l = n[a].major ? e.major : e.minor, t.font = u = l.string, d = i[u] = i[u] || {
                    data: {},
                    gc: []
                }, h = l.lineHeight, c = f = 0, sn(s) || on(s)) {
                if (on(s))
                    for (r = 0, o = s.length; r < o; ++r) g = s[r], sn(g) || on(g) || (c = V.measureText(t, d.data, d.gc, c, g), f += h)
            } else c = V.measureText(t, d.data, d.gc, c, s), f = h;
            b.push(c), x.push(f), y.push(h / 2)
        }

        function _(t) {
            return {
                width: b[t] || 0,
                height: x[t] || 0,
                offset: y[t] || 0
            }
        }
        return function (t, e) {
            V.each(t, (function (t) {
                var n, i = t.gc,
                    a = i.length / 2;
                if (a > e) {
                    for (n = 0; n < a; ++n) delete t.data[i[n]];
                    i.splice(0, a)
                }
            }))
        }(i, v), p = b.indexOf(Math.max.apply(null, b)), m = x.indexOf(Math.max.apply(null, x)), {
            first: _(0),
            last: _(v - 1),
            widest: _(p),
            highest: _(m)
        }
    }

    function cn(t) {
        return t.drawTicks ? t.tickMarkLength : 0
    }

    function fn(t) {
        var e, n;
        return t.display ? (e = V.options._parseFont(t), n = V.options.toPadding(t.padding), e.lineHeight + n.height) : 0
    }

    function gn(t, e) {
        return V.extend(V.options._parseFont({
            fontFamily: ln(e.fontFamily, t.fontFamily),
            fontSize: ln(e.fontSize, t.fontSize),
            fontStyle: ln(e.fontStyle, t.fontStyle),
            lineHeight: ln(e.lineHeight, t.lineHeight)
        }), {
            color: V.options.resolve([e.fontColor, t.fontColor, z.global.defaultFontColor])
        })
    }

    function pn(t) {
        var e = gn(t, t.minor);
        return {
            minor: e,
            major: t.major.enabled ? gn(t, t.major) : e
        }
    }

    function mn(t) {
        var e, n, i, a = [];
        for (n = 0, i = t.length; n < i; ++n) void 0 !== (e = t[n])._index && a.push(e);
        return a
    }

    function vn(t, e, n, i) {
        var a, r, o, s, l = ln(n, 0),
            u = Math.min(ln(i, t.length), t.length),
            d = 0;
        for (e = Math.ceil(e), i && (e = (a = i - n) / Math.floor(a / e)), s = l; s < 0;) d++, s = Math.round(l + d * e);
        for (r = Math.max(l, 0); r < u; r++) o = t[r], r === s ? (o._index = r, d++, s = Math.round(l + d * e)) : delete o.label
    }
    z._set("scale", {
        display: !0,
        position: "left",
        offset: !1,
        gridLines: {
            display: !0,
            color: "rgba(0,0,0,0.1)",
            lineWidth: 1,
            drawBorder: !0,
            drawOnChartArea: !0,
            drawTicks: !0,
            tickMarkLength: 10,
            zeroLineWidth: 1,
            zeroLineColor: "rgba(0,0,0,0.25)",
            zeroLineBorderDash: [],
            zeroLineBorderDashOffset: 0,
            offsetGridLines: !1,
            borderDash: [],
            borderDashOffset: 0
        },
        scaleLabel: {
            display: !1,
            labelString: "",
            padding: {
                top: 4,
                bottom: 4
            }
        },
        ticks: {
            beginAtZero: !1,
            minRotation: 0,
            maxRotation: 50,
            mirror: !1,
            padding: 0,
            reverse: !1,
            display: !0,
            autoSkip: !0,
            autoSkipPadding: 0,
            labelOffset: 0,
            callback: rn.formatters.values,
            minor: {},
            major: {}
        }
    });
    var bn = X.extend({
        zeroLineIndex: 0,
        getPadding: function () {
            return {
                left: this.paddingLeft || 0,
                top: this.paddingTop || 0,
                right: this.paddingRight || 0,
                bottom: this.paddingBottom || 0
            }
        },
        getTicks: function () {
            return this._ticks
        },
        _getLabels: function () {
            var t = this.chart.data;
            return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || []
        },
        mergeTicksOptions: function () {},
        beforeUpdate: function () {
            V.callback(this.options.beforeUpdate, [this])
        },
        update: function (t, e, n) {
            var i, a, r, o, s, l = this,
                u = l.options.ticks,
                d = u.sampleSize;
            if (l.beforeUpdate(), l.maxWidth = t, l.maxHeight = e, l.margins = V.extend({
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }, n), l._ticks = null, l.ticks = null, l._labelSizes = null, l._maxLabelLines = 0, l.longestLabelWidth = 0, l.longestTextCache = l.longestTextCache || {}, l._gridLineItems = null, l._labelItems = null, l.beforeSetDimensions(), l.setDimensions(), l.afterSetDimensions(), l.beforeDataLimits(), l.determineDataLimits(), l.afterDataLimits(), l.beforeBuildTicks(), o = l.buildTicks() || [], (!(o = l.afterBuildTicks(o) || o) || !o.length) && l.ticks)
                for (o = [], i = 0, a = l.ticks.length; i < a; ++i) o.push({
                    value: l.ticks[i],
                    major: !1
                });
            return l._ticks = o, s = d < o.length, r = l._convertTicksToLabels(s ? function (t, e) {
                for (var n = [], i = t.length / e, a = 0, r = t.length; a < r; a += i) n.push(t[Math.floor(a)]);
                return n
            }(o, d) : o), l._configure(), l.beforeCalculateTickRotation(), l.calculateTickRotation(), l.afterCalculateTickRotation(), l.beforeFit(), l.fit(), l.afterFit(), l._ticksToDraw = u.display && (u.autoSkip || "auto" === u.source) ? l._autoSkip(o) : o, s && (r = l._convertTicksToLabels(l._ticksToDraw)), l.ticks = r, l.afterUpdate(), l.minSize
        },
        _configure: function () {
            var t, e, n = this,
                i = n.options.ticks.reverse;
            n.isHorizontal() ? (t = n.left, e = n.right) : (t = n.top, e = n.bottom, i = !i), n._startPixel = t, n._endPixel = e, n._reversePixels = i, n._length = e - t
        },
        afterUpdate: function () {
            V.callback(this.options.afterUpdate, [this])
        },
        beforeSetDimensions: function () {
            V.callback(this.options.beforeSetDimensions, [this])
        },
        setDimensions: function () {
            var t = this;
            t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0
        },
        afterSetDimensions: function () {
            V.callback(this.options.afterSetDimensions, [this])
        },
        beforeDataLimits: function () {
            V.callback(this.options.beforeDataLimits, [this])
        },
        determineDataLimits: V.noop,
        afterDataLimits: function () {
            V.callback(this.options.afterDataLimits, [this])
        },
        beforeBuildTicks: function () {
            V.callback(this.options.beforeBuildTicks, [this])
        },
        buildTicks: V.noop,
        afterBuildTicks: function (t) {
            var e = this;
            return on(t) && t.length ? V.callback(e.options.afterBuildTicks, [e, t]) : (e.ticks = V.callback(e.options.afterBuildTicks, [e, e.ticks]) || e.ticks, t)
        },
        beforeTickToLabelConversion: function () {
            V.callback(this.options.beforeTickToLabelConversion, [this])
        },
        convertTicksToLabels: function () {
            var t = this.options.ticks;
            this.ticks = this.ticks.map(t.userCallback || t.callback, this)
        },
        afterTickToLabelConversion: function () {
            V.callback(this.options.afterTickToLabelConversion, [this])
        },
        beforeCalculateTickRotation: function () {
            V.callback(this.options.beforeCalculateTickRotation, [this])
        },
        calculateTickRotation: function () {
            var t, e, n, i, a, r, o, s = this,
                l = s.options,
                u = l.ticks,
                d = s.getTicks().length,
                h = u.minRotation || 0,
                c = u.maxRotation,
                f = h;
            !s._isVisible() || !u.display || h >= c || d <= 1 || !s.isHorizontal() ? s.labelRotation = h : (e = (t = s._getLabelSizes()).widest.width, n = t.highest.height - t.highest.offset, i = Math.min(s.maxWidth, s.chart.width - e), e + 6 > (a = l.offset ? s.maxWidth / d : i / (d - 1)) && (a = i / (d - (l.offset ? .5 : 1)), r = s.maxHeight - cn(l.gridLines) - u.padding - fn(l.scaleLabel), o = Math.sqrt(e * e + n * n), f = V.toDegrees(Math.min(Math.asin(Math.min((t.highest.height + 6) / a, 1)), Math.asin(Math.min(r / o, 1)) - Math.asin(n / o))), f = Math.max(h, Math.min(c, f))), s.labelRotation = f)
        },
        afterCalculateTickRotation: function () {
            V.callback(this.options.afterCalculateTickRotation, [this])
        },
        beforeFit: function () {
            V.callback(this.options.beforeFit, [this])
        },
        fit: function () {
            var t = this,
                e = t.minSize = {
                    width: 0,
                    height: 0
                },
                n = t.chart,
                i = t.options,
                a = i.ticks,
                r = i.scaleLabel,
                o = i.gridLines,
                s = t._isVisible(),
                l = "bottom" === i.position,
                u = t.isHorizontal();
            if (u ? e.width = t.maxWidth : s && (e.width = cn(o) + fn(r)), u ? s && (e.height = cn(o) + fn(r)) : e.height = t.maxHeight, a.display && s) {
                var d = pn(a),
                    h = t._getLabelSizes(),
                    c = h.first,
                    f = h.last,
                    g = h.widest,
                    p = h.highest,
                    m = .4 * d.minor.lineHeight,
                    v = a.padding;
                if (u) {
                    var b = 0 !== t.labelRotation,
                        x = V.toRadians(t.labelRotation),
                        y = Math.cos(x),
                        _ = Math.sin(x),
                        k = _ * g.width + y * (p.height - (b ? p.offset : 0)) + (b ? 0 : m);
                    e.height = Math.min(t.maxHeight, e.height + k + v);
                    var w, M, S = t.getPixelForTick(0) - t.left,
                        C = t.right - t.getPixelForTick(t.getTicks().length - 1);
                    b ? (w = l ? y * c.width + _ * c.offset : _ * (c.height - c.offset), M = l ? _ * (f.height - f.offset) : y * f.width + _ * f.offset) : (w = c.width / 2, M = f.width / 2), t.paddingLeft = Math.max((w - S) * t.width / (t.width - S), 0) + 3, t.paddingRight = Math.max((M - C) * t.width / (t.width - C), 0) + 3
                } else {
                    var P = a.mirror ? 0 : g.width + v + m;
                    e.width = Math.min(t.maxWidth, e.width + P), t.paddingTop = c.height / 2, t.paddingBottom = f.height / 2
                }
            }
            t.handleMargins(), u ? (t.width = t._length = n.width - t.margins.left - t.margins.right, t.height = e.height) : (t.width = e.width, t.height = t._length = n.height - t.margins.top - t.margins.bottom)
        },
        handleMargins: function () {
            var t = this;
            t.margins && (t.margins.left = Math.max(t.paddingLeft, t.margins.left), t.margins.top = Math.max(t.paddingTop, t.margins.top), t.margins.right = Math.max(t.paddingRight, t.margins.right), t.margins.bottom = Math.max(t.paddingBottom, t.margins.bottom))
        },
        afterFit: function () {
            V.callback(this.options.afterFit, [this])
        },
        isHorizontal: function () {
            var t = this.options.position;
            return "top" === t || "bottom" === t
        },
        isFullWidth: function () {
            return this.options.fullWidth
        },
        getRightValue: function (t) {
            if (sn(t)) return NaN;
            if (("number" == typeof t || t instanceof Number) && !isFinite(t)) return NaN;
            if (t)
                if (this.isHorizontal()) {
                    if (void 0 !== t.x) return this.getRightValue(t.x)
                } else if (void 0 !== t.y) return this.getRightValue(t.y);
            return t
        },
        _convertTicksToLabels: function (t) {
            var e, n, i, a = this;
            for (a.ticks = t.map((function (t) {
                    return t.value
                })), a.beforeTickToLabelConversion(), e = a.convertTicksToLabels(t) || a.ticks, a.afterTickToLabelConversion(), n = 0, i = t.length; n < i; ++n) t[n].label = e[n];
            return e
        },
        _getLabelSizes: function () {
            var t = this,
                e = t._labelSizes;
            return e || (t._labelSizes = e = hn(t.ctx, pn(t.options.ticks), t.getTicks(), t.longestTextCache), t.longestLabelWidth = e.widest.width), e
        },
        _parseValue: function (t) {
            var e, n, i, a;
            return on(t) ? (e = +this.getRightValue(t[0]), n = +this.getRightValue(t[1]), i = Math.min(e, n), a = Math.max(e, n)) : (e = void 0, n = t = +this.getRightValue(t), i = t, a = t), {
                min: i,
                max: a,
                start: e,
                end: n
            }
        },
        _getScaleLabel: function (t) {
            var e = this._parseValue(t);
            return void 0 !== e.start ? "[" + e.start + ", " + e.end + "]" : +this.getRightValue(t)
        },
        getLabelForIndex: V.noop,
        getPixelForValue: V.noop,
        getValueForPixel: V.noop,
        getPixelForTick: function (t) {
            var e = this.options.offset,
                n = this._ticks.length,
                i = 1 / Math.max(n - (e ? 0 : 1), 1);
            return t < 0 || t > n - 1 ? null : this.getPixelForDecimal(t * i + (e ? i / 2 : 0))
        },
        getPixelForDecimal: function (t) {
            return this._reversePixels && (t = 1 - t), this._startPixel + t * this._length
        },
        getDecimalForPixel: function (t) {
            var e = (t - this._startPixel) / this._length;
            return this._reversePixels ? 1 - e : e
        },
        getBasePixel: function () {
            return this.getPixelForValue(this.getBaseValue())
        },
        getBaseValue: function () {
            var t = this.min,
                e = this.max;
            return this.beginAtZero ? 0 : t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0
        },
        _autoSkip: function (t) {
            var e, n, i, a, r = this.options.ticks,
                o = this._length,
                s = r.maxTicksLimit || o / this._tickSize() + 1,
                l = r.major.enabled ? function (t) {
                    var e, n, i = [];
                    for (e = 0, n = t.length; e < n; e++) t[e].major && i.push(e);
                    return i
                }(t) : [],
                u = l.length,
                d = l[0],
                h = l[u - 1];
            if (u > s) return function (t, e, n) {
                var i, a, r = 0,
                    o = e[0];
                for (n = Math.ceil(n), i = 0; i < t.length; i++) a = t[i], i === o ? (a._index = i, o = e[++r * n]) : delete a.label
            }(t, l, u / s), mn(t);
            if (i = function (t, e, n, i) {
                    var a, r, o, s, l = function (t) {
                            var e, n, i = t.length;
                            if (i < 2) return !1;
                            for (n = t[0], e = 1; e < i; ++e)
                                if (t[e] - t[e - 1] !== n) return !1;
                            return n
                        }(t),
                        u = (e.length - 1) / i;
                    if (!l) return Math.max(u, 1);
                    for (o = 0, s = (a = V.math._factorize(l)).length - 1; o < s; o++)
                        if ((r = a[o]) > u) return r;
                    return Math.max(u, 1)
                }(l, t, 0, s), u > 0) {
                for (e = 0, n = u - 1; e < n; e++) vn(t, i, l[e], l[e + 1]);
                return a = u > 1 ? (h - d) / (u - 1) : null, vn(t, i, V.isNullOrUndef(a) ? 0 : d - a, d), vn(t, i, h, V.isNullOrUndef(a) ? t.length : h + a), mn(t)
            }
            return vn(t, i), mn(t)
        },
        _tickSize: function () {
            var t = this.options.ticks,
                e = V.toRadians(this.labelRotation),
                n = Math.abs(Math.cos(e)),
                i = Math.abs(Math.sin(e)),
                a = this._getLabelSizes(),
                r = t.autoSkipPadding || 0,
                o = a ? a.widest.width + r : 0,
                s = a ? a.highest.height + r : 0;
            return this.isHorizontal() ? s * n > o * i ? o / n : s / i : s * i < o * n ? s / n : o / i
        },
        _isVisible: function () {
            var t, e, n, i = this.chart,
                a = this.options.display;
            if ("auto" !== a) return !!a;
            for (t = 0, e = i.data.datasets.length; t < e; ++t)
                if (i.isDatasetVisible(t) && ((n = i.getDatasetMeta(t)).xAxisID === this.id || n.yAxisID === this.id)) return !0;
            return !1
        },
        _computeGridLineItems: function (t) {
            var e, n, i, a, r, o, s, l, u, d, h, c, f, g, p, m, v, b = this,
                x = b.chart,
                y = b.options,
                _ = y.gridLines,
                k = y.position,
                w = _.offsetGridLines,
                M = b.isHorizontal(),
                S = b._ticksToDraw,
                C = S.length + (w ? 1 : 0),
                P = cn(_),
                A = [],
                D = _.drawBorder ? un(_.lineWidth, 0, 0) : 0,
                T = D / 2,
                I = V._alignPixel,
                F = function (t) {
                    return I(x, t, D)
                };
            for ("top" === k ? (e = F(b.bottom), s = b.bottom - P, u = e - T, h = F(t.top) + T, f = t.bottom) : "bottom" === k ? (e = F(b.top), h = t.top, f = F(t.bottom) - T, s = e + T, u = b.top + P) : "left" === k ? (e = F(b.right), o = b.right - P, l = e - T, d = F(t.left) + T, c = t.right) : (e = F(b.left), d = t.left, c = F(t.right) - T, o = e + T, l = b.left + P), n = 0; n < C; ++n) i = S[n] || {}, sn(i.label) && n < S.length || (n === b.zeroLineIndex && y.offset === w ? (g = _.zeroLineWidth, p = _.zeroLineColor, m = _.zeroLineBorderDash || [], v = _.zeroLineBorderDashOffset || 0) : (g = un(_.lineWidth, n, 1), p = un(_.color, n, "rgba(0,0,0,0.1)"), m = _.borderDash || [], v = _.borderDashOffset || 0), void 0 !== (a = dn(b, i._index || n, w)) && (r = I(x, a, g), M ? o = l = d = c = r : s = u = h = f = r, A.push({
                tx1: o,
                ty1: s,
                tx2: l,
                ty2: u,
                x1: d,
                y1: h,
                x2: c,
                y2: f,
                width: g,
                color: p,
                borderDash: m,
                borderDashOffset: v
            })));
            return A.ticksLength = C, A.borderValue = e, A
        },
        _computeLabelItems: function () {
            var t, e, n, i, a, r, o, s, l, u, d, h, c = this,
                f = c.options,
                g = f.ticks,
                p = f.position,
                m = g.mirror,
                v = c.isHorizontal(),
                b = c._ticksToDraw,
                x = pn(g),
                y = g.padding,
                _ = cn(f.gridLines),
                k = -V.toRadians(c.labelRotation),
                w = [];
            for ("top" === p ? (r = c.bottom - _ - y, o = k ? "left" : "center") : "bottom" === p ? (r = c.top + _ + y, o = k ? "right" : "center") : "left" === p ? (a = c.right - (m ? 0 : _) - y, o = m ? "left" : "right") : (a = c.left + (m ? 0 : _) + y, o = m ? "right" : "left"), t = 0, e = b.length; t < e; ++t) i = (n = b[t]).label, sn(i) || (s = c.getPixelForTick(n._index || t) + g.labelOffset, u = (l = n.major ? x.major : x.minor).lineHeight, d = on(i) ? i.length : 1, v ? (a = s, h = "top" === p ? ((k ? 1 : .5) - d) * u : (k ? 0 : .5) * u) : (r = s, h = (1 - d) * u / 2), w.push({
                x: a,
                y: r,
                rotation: k,
                label: i,
                font: l,
                textOffset: h,
                textAlign: o
            }));
            return w
        },
        _drawGrid: function (t) {
            var e = this,
                n = e.options.gridLines;
            if (n.display) {
                var i, a, r, o, s, l = e.ctx,
                    u = e.chart,
                    d = V._alignPixel,
                    h = n.drawBorder ? un(n.lineWidth, 0, 0) : 0,
                    c = e._gridLineItems || (e._gridLineItems = e._computeGridLineItems(t));
                for (r = 0, o = c.length; r < o; ++r) i = (s = c[r]).width, a = s.color, i && a && (l.save(), l.lineWidth = i, l.strokeStyle = a, l.setLineDash && (l.setLineDash(s.borderDash), l.lineDashOffset = s.borderDashOffset), l.beginPath(), n.drawTicks && (l.moveTo(s.tx1, s.ty1), l.lineTo(s.tx2, s.ty2)), n.drawOnChartArea && (l.moveTo(s.x1, s.y1), l.lineTo(s.x2, s.y2)), l.stroke(), l.restore());
                if (h) {
                    var f, g, p, m, v = h,
                        b = un(n.lineWidth, c.ticksLength - 1, 1),
                        x = c.borderValue;
                    e.isHorizontal() ? (f = d(u, e.left, v) - v / 2, g = d(u, e.right, b) + b / 2, p = m = x) : (p = d(u, e.top, v) - v / 2, m = d(u, e.bottom, b) + b / 2, f = g = x), l.lineWidth = h, l.strokeStyle = un(n.color, 0), l.beginPath(), l.moveTo(f, p), l.lineTo(g, m), l.stroke()
                }
            }
        },
        _drawLabels: function () {
            var t = this;
            if (t.options.ticks.display) {
                var e, n, i, a, r, o, s, l, u = t.ctx,
                    d = t._labelItems || (t._labelItems = t._computeLabelItems());
                for (e = 0, i = d.length; e < i; ++e) {
                    if (o = (r = d[e]).font, u.save(), u.translate(r.x, r.y), u.rotate(r.rotation), u.font = o.string, u.fillStyle = o.color, u.textBaseline = "middle", u.textAlign = r.textAlign, s = r.label, l = r.textOffset, on(s))
                        for (n = 0, a = s.length; n < a; ++n) u.fillText("" + s[n], 0, l), l += o.lineHeight;
                    else u.fillText(s, 0, l);
                    u.restore()
                }
            }
        },
        _drawTitle: function () {
            var t = this,
                e = t.ctx,
                n = t.options,
                i = n.scaleLabel;
            if (i.display) {
                var a, r, o = ln(i.fontColor, z.global.defaultFontColor),
                    s = V.options._parseFont(i),
                    l = V.options.toPadding(i.padding),
                    u = s.lineHeight / 2,
                    d = n.position,
                    h = 0;
                if (t.isHorizontal()) a = t.left + t.width / 2, r = "bottom" === d ? t.bottom - u - l.bottom : t.top + u + l.top;
                else {
                    var c = "left" === d;
                    a = c ? t.left + u + l.top : t.right - u - l.top, r = t.top + t.height / 2, h = c ? -.5 * Math.PI : .5 * Math.PI
                }
                e.save(), e.translate(a, r), e.rotate(h), e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = o, e.font = s.string, e.fillText(i.labelString, 0, 0), e.restore()
            }
        },
        draw: function (t) {
            this._isVisible() && (this._drawGrid(t), this._drawTitle(), this._drawLabels())
        },
        _layers: function () {
            var t = this,
                e = t.options,
                n = e.ticks && e.ticks.z || 0,
                i = e.gridLines && e.gridLines.z || 0;
            return t._isVisible() && n !== i && t.draw === t._draw ? [{
                z: i,
                draw: function () {
                    t._drawGrid.apply(t, arguments), t._drawTitle.apply(t, arguments)
                }
            }, {
                z: n,
                draw: function () {
                    t._drawLabels.apply(t, arguments)
                }
            }] : [{
                z: n,
                draw: function () {
                    t.draw.apply(t, arguments)
                }
            }]
        },
        _getMatchingVisibleMetas: function (t) {
            var e = this,
                n = e.isHorizontal();
            return e.chart._getSortedVisibleDatasetMetas().filter((function (i) {
                return (!t || i.type === t) && (n ? i.xAxisID === e.id : i.yAxisID === e.id)
            }))
        }
    });
    bn.prototype._draw = bn.prototype.draw;
    var xn = bn,
        yn = V.isNullOrUndef,
        _n = xn.extend({
            determineDataLimits: function () {
                var t, e = this,
                    n = e._getLabels(),
                    i = e.options.ticks,
                    a = i.min,
                    r = i.max,
                    o = 0,
                    s = n.length - 1;
                void 0 !== a && (t = n.indexOf(a)) >= 0 && (o = t), void 0 !== r && (t = n.indexOf(r)) >= 0 && (s = t), e.minIndex = o, e.maxIndex = s, e.min = n[o], e.max = n[s]
            },
            buildTicks: function () {
                var t = this._getLabels(),
                    e = this.minIndex,
                    n = this.maxIndex;
                this.ticks = 0 === e && n === t.length - 1 ? t : t.slice(e, n + 1)
            },
            getLabelForIndex: function (t, e) {
                var n = this.chart;
                return n.getDatasetMeta(e).controller._getValueScaleId() === this.id ? this.getRightValue(n.data.datasets[e].data[t]) : this._getLabels()[t]
            },
            _configure: function () {
                var t = this,
                    e = t.options.offset,
                    n = t.ticks;
                xn.prototype._configure.call(t), t.isHorizontal() || (t._reversePixels = !t._reversePixels), n && (t._startValue = t.minIndex - (e ? .5 : 0), t._valueRange = Math.max(n.length - (e ? 0 : 1), 1))
            },
            getPixelForValue: function (t, e, n) {
                var i, a, r, o = this;
                return yn(e) || yn(n) || (t = o.chart.data.datasets[n].data[e]), yn(t) || (i = o.isHorizontal() ? t.x : t.y), (void 0 !== i || void 0 !== t && isNaN(e)) && (a = o._getLabels(), t = V.valueOrDefault(i, t), e = -1 !== (r = a.indexOf(t)) ? r : e, isNaN(e) && (e = t)), o.getPixelForDecimal((e - o._startValue) / o._valueRange)
            },
            getPixelForTick: function (t) {
                var e = this.ticks;
                return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t], t + this.minIndex)
            },
            getValueForPixel: function (t) {
                var e = Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
                return Math.min(Math.max(e, 0), this.ticks.length - 1)
            },
            getBasePixel: function () {
                return this.bottom
            }
        }),
        kn = {
            position: "bottom"
        };
    _n._defaults = kn;
    var wn = V.noop,
        Mn = V.isNullOrUndef;
    var Sn = xn.extend({
            getRightValue: function (t) {
                return "string" == typeof t ? +t : xn.prototype.getRightValue.call(this, t)
            },
            handleTickRangeOptions: function () {
                var t = this,
                    e = t.options.ticks;
                if (e.beginAtZero) {
                    var n = V.sign(t.min),
                        i = V.sign(t.max);
                    n < 0 && i < 0 ? t.max = 0 : n > 0 && i > 0 && (t.min = 0)
                }
                var a = void 0 !== e.min || void 0 !== e.suggestedMin,
                    r = void 0 !== e.max || void 0 !== e.suggestedMax;
                void 0 !== e.min ? t.min = e.min : void 0 !== e.suggestedMin && (null === t.min ? t.min = e.suggestedMin : t.min = Math.min(t.min, e.suggestedMin)), void 0 !== e.max ? t.max = e.max : void 0 !== e.suggestedMax && (null === t.max ? t.max = e.suggestedMax : t.max = Math.max(t.max, e.suggestedMax)), a !== r && t.min >= t.max && (a ? t.max = t.min + 1 : t.min = t.max - 1), t.min === t.max && (t.max++, e.beginAtZero || t.min--)
            },
            getTickLimit: function () {
                var t, e = this.options.ticks,
                    n = e.stepSize,
                    i = e.maxTicksLimit;
                return n ? t = Math.ceil(this.max / n) - Math.floor(this.min / n) + 1 : (t = this._computeTickLimit(), i = i || 11), i && (t = Math.min(i, t)), t
            },
            _computeTickLimit: function () {
                return Number.POSITIVE_INFINITY
            },
            handleDirectionalChanges: wn,
            buildTicks: function () {
                var t = this,
                    e = t.options.ticks,
                    n = t.getTickLimit(),
                    i = {
                        maxTicks: n = Math.max(2, n),
                        min: e.min,
                        max: e.max,
                        precision: e.precision,
                        stepSize: V.valueOrDefault(e.fixedStepSize, e.stepSize)
                    },
                    a = t.ticks = function (t, e) {
                        var n, i, a, r, o = [],
                            s = t.stepSize,
                            l = s || 1,
                            u = t.maxTicks - 1,
                            d = t.min,
                            h = t.max,
                            c = t.precision,
                            f = e.min,
                            g = e.max,
                            p = V.niceNum((g - f) / u / l) * l;
                        if (p < 1e-14 && Mn(d) && Mn(h)) return [f, g];
                        (r = Math.ceil(g / p) - Math.floor(f / p)) > u && (p = V.niceNum(r * p / u / l) * l), s || Mn(c) ? n = Math.pow(10, V._decimalPlaces(p)) : (n = Math.pow(10, c), p = Math.ceil(p * n) / n), i = Math.floor(f / p) * p, a = Math.ceil(g / p) * p, s && (!Mn(d) && V.almostWhole(d / p, p / 1e3) && (i = d), !Mn(h) && V.almostWhole(h / p, p / 1e3) && (a = h)), r = (a - i) / p, r = V.almostEquals(r, Math.round(r), p / 1e3) ? Math.round(r) : Math.ceil(r), i = Math.round(i * n) / n, a = Math.round(a * n) / n, o.push(Mn(d) ? i : d);
                        for (var m = 1; m < r; ++m) o.push(Math.round((i + m * p) * n) / n);
                        return o.push(Mn(h) ? a : h), o
                    }(i, t);
                t.handleDirectionalChanges(), t.max = V.max(a), t.min = V.min(a), e.reverse ? (a.reverse(), t.start = t.max, t.end = t.min) : (t.start = t.min, t.end = t.max)
            },
            convertTicksToLabels: function () {
                var t = this;
                t.ticksAsNumbers = t.ticks.slice(), t.zeroLineIndex = t.ticks.indexOf(0), xn.prototype.convertTicksToLabels.call(t)
            },
            _configure: function () {
                var t, e = this,
                    n = e.getTicks(),
                    i = e.min,
                    a = e.max;
                xn.prototype._configure.call(e), e.options.offset && n.length && (i -= t = (a - i) / Math.max(n.length - 1, 1) / 2, a += t), e._startValue = i, e._endValue = a, e._valueRange = a - i
            }
        }),
        Cn = {
            position: "left",
            ticks: {
                callback: rn.formatters.linear
            }
        };

    function Pn(t, e, n, i) {
        var a, r, o = t.options,
            s = function (t, e, n) {
                var i = [n.type, void 0 === e && void 0 === n.stack ? n.index : "", n.stack].join(".");
                return void 0 === t[i] && (t[i] = {
                    pos: [],
                    neg: []
                }), t[i]
            }(e, o.stacked, n),
            l = s.pos,
            u = s.neg,
            d = i.length;
        for (a = 0; a < d; ++a) r = t._parseValue(i[a]), isNaN(r.min) || isNaN(r.max) || n.data[a].hidden || (l[a] = l[a] || 0, u[a] = u[a] || 0, o.relativePoints ? l[a] = 100 : r.min < 0 || r.max < 0 ? u[a] += r.min : l[a] += r.max)
    }

    function An(t, e, n) {
        var i, a, r = n.length;
        for (i = 0; i < r; ++i) a = t._parseValue(n[i]), isNaN(a.min) || isNaN(a.max) || e.data[i].hidden || (t.min = Math.min(t.min, a.min), t.max = Math.max(t.max, a.max))
    }
    var Dn = Sn.extend({
            determineDataLimits: function () {
                var t, e, n, i, a = this,
                    r = a.options,
                    o = a.chart.data.datasets,
                    s = a._getMatchingVisibleMetas(),
                    l = r.stacked,
                    u = {},
                    d = s.length;
                if (a.min = Number.POSITIVE_INFINITY, a.max = Number.NEGATIVE_INFINITY, void 0 === l)
                    for (t = 0; !l && t < d; ++t) l = void 0 !== (e = s[t]).stack;
                for (t = 0; t < d; ++t) n = o[(e = s[t]).index].data, l ? Pn(a, u, e, n) : An(a, e, n);
                V.each(u, (function (t) {
                    i = t.pos.concat(t.neg), a.min = Math.min(a.min, V.min(i)), a.max = Math.max(a.max, V.max(i))
                })), a.min = V.isFinite(a.min) && !isNaN(a.min) ? a.min : 0, a.max = V.isFinite(a.max) && !isNaN(a.max) ? a.max : 1, a.handleTickRangeOptions()
            },
            _computeTickLimit: function () {
                var t;
                return this.isHorizontal() ? Math.ceil(this.width / 40) : (t = V.options._parseFont(this.options.ticks), Math.ceil(this.height / t.lineHeight))
            },
            handleDirectionalChanges: function () {
                this.isHorizontal() || this.ticks.reverse()
            },
            getLabelForIndex: function (t, e) {
                return this._getScaleLabel(this.chart.data.datasets[e].data[t])
            },
            getPixelForValue: function (t) {
                return this.getPixelForDecimal((+this.getRightValue(t) - this._startValue) / this._valueRange)
            },
            getValueForPixel: function (t) {
                return this._startValue + this.getDecimalForPixel(t) * this._valueRange
            },
            getPixelForTick: function (t) {
                var e = this.ticksAsNumbers;
                return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t])
            }
        }),
        Tn = Cn;
    Dn._defaults = Tn;
    var In = V.valueOrDefault,
        Fn = V.math.log10;
    var Ln = {
        position: "left",
        ticks: {
            callback: rn.formatters.logarithmic
        }
    };

    function On(t, e) {
        return V.isFinite(t) && t >= 0 ? t : e
    }
    var Rn = xn.extend({
            determineDataLimits: function () {
                var t, e, n, i, a, r, o = this,
                    s = o.options,
                    l = o.chart,
                    u = l.data.datasets,
                    d = o.isHorizontal();

                function h(t) {
                    return d ? t.xAxisID === o.id : t.yAxisID === o.id
                }
                o.min = Number.POSITIVE_INFINITY, o.max = Number.NEGATIVE_INFINITY, o.minNotZero = Number.POSITIVE_INFINITY;
                var c = s.stacked;
                if (void 0 === c)
                    for (t = 0; t < u.length; t++)
                        if (e = l.getDatasetMeta(t), l.isDatasetVisible(t) && h(e) && void 0 !== e.stack) {
                            c = !0;
                            break
                        } if (s.stacked || c) {
                    var f = {};
                    for (t = 0; t < u.length; t++) {
                        var g = [(e = l.getDatasetMeta(t)).type, void 0 === s.stacked && void 0 === e.stack ? t : "", e.stack].join(".");
                        if (l.isDatasetVisible(t) && h(e))
                            for (void 0 === f[g] && (f[g] = []), a = 0, r = (i = u[t].data).length; a < r; a++) {
                                var p = f[g];
                                n = o._parseValue(i[a]), isNaN(n.min) || isNaN(n.max) || e.data[a].hidden || n.min < 0 || n.max < 0 || (p[a] = p[a] || 0, p[a] += n.max)
                            }
                    }
                    V.each(f, (function (t) {
                        if (t.length > 0) {
                            var e = V.min(t),
                                n = V.max(t);
                            o.min = Math.min(o.min, e), o.max = Math.max(o.max, n)
                        }
                    }))
                } else
                    for (t = 0; t < u.length; t++)
                        if (e = l.getDatasetMeta(t), l.isDatasetVisible(t) && h(e))
                            for (a = 0, r = (i = u[t].data).length; a < r; a++) n = o._parseValue(i[a]), isNaN(n.min) || isNaN(n.max) || e.data[a].hidden || n.min < 0 || n.max < 0 || (o.min = Math.min(n.min, o.min), o.max = Math.max(n.max, o.max), 0 !== n.min && (o.minNotZero = Math.min(n.min, o.minNotZero)));
                o.min = V.isFinite(o.min) ? o.min : null, o.max = V.isFinite(o.max) ? o.max : null, o.minNotZero = V.isFinite(o.minNotZero) ? o.minNotZero : null, this.handleTickRangeOptions()
            },
            handleTickRangeOptions: function () {
                var t = this,
                    e = t.options.ticks;
                t.min = On(e.min, t.min), t.max = On(e.max, t.max), t.min === t.max && (0 !== t.min && null !== t.min ? (t.min = Math.pow(10, Math.floor(Fn(t.min)) - 1), t.max = Math.pow(10, Math.floor(Fn(t.max)) + 1)) : (t.min = 1, t.max = 10)), null === t.min && (t.min = Math.pow(10, Math.floor(Fn(t.max)) - 1)), null === t.max && (t.max = 0 !== t.min ? Math.pow(10, Math.floor(Fn(t.min)) + 1) : 10), null === t.minNotZero && (t.min > 0 ? t.minNotZero = t.min : t.max < 1 ? t.minNotZero = Math.pow(10, Math.floor(Fn(t.max))) : t.minNotZero = 1)
            },
            buildTicks: function () {
                var t = this,
                    e = t.options.ticks,
                    n = !t.isHorizontal(),
                    i = {
                        min: On(e.min),
                        max: On(e.max)
                    },
                    a = t.ticks = function (t, e) {
                        var n, i, a = [],
                            r = In(t.min, Math.pow(10, Math.floor(Fn(e.min)))),
                            o = Math.floor(Fn(e.max)),
                            s = Math.ceil(e.max / Math.pow(10, o));
                        0 === r ? (n = Math.floor(Fn(e.minNotZero)), i = Math.floor(e.minNotZero / Math.pow(10, n)), a.push(r), r = i * Math.pow(10, n)) : (n = Math.floor(Fn(r)), i = Math.floor(r / Math.pow(10, n)));
                        var l = n < 0 ? Math.pow(10, Math.abs(n)) : 1;
                        do {
                            a.push(r), 10 === ++i && (i = 1, l = ++n >= 0 ? 1 : l), r = Math.round(i * Math.pow(10, n) * l) / l
                        } while (n < o || n === o && i < s);
                        var u = In(t.max, r);
                        return a.push(u), a
                    }(i, t);
                t.max = V.max(a), t.min = V.min(a), e.reverse ? (n = !n, t.start = t.max, t.end = t.min) : (t.start = t.min, t.end = t.max), n && a.reverse()
            },
            convertTicksToLabels: function () {
                this.tickValues = this.ticks.slice(), xn.prototype.convertTicksToLabels.call(this)
            },
            getLabelForIndex: function (t, e) {
                return this._getScaleLabel(this.chart.data.datasets[e].data[t])
            },
            getPixelForTick: function (t) {
                var e = this.tickValues;
                return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t])
            },
            _getFirstTickValue: function (t) {
                var e = Math.floor(Fn(t));
                return Math.floor(t / Math.pow(10, e)) * Math.pow(10, e)
            },
            _configure: function () {
                var t = this,
                    e = t.min,
                    n = 0;
                xn.prototype._configure.call(t), 0 === e && (e = t._getFirstTickValue(t.minNotZero), n = In(t.options.ticks.fontSize, z.global.defaultFontSize) / t._length), t._startValue = Fn(e), t._valueOffset = n, t._valueRange = (Fn(t.max) - Fn(e)) / (1 - n)
            },
            getPixelForValue: function (t) {
                var e = this,
                    n = 0;
                return (t = +e.getRightValue(t)) > e.min && t > 0 && (n = (Fn(t) - e._startValue) / e._valueRange + e._valueOffset), e.getPixelForDecimal(n)
            },
            getValueForPixel: function (t) {
                var e = this,
                    n = e.getDecimalForPixel(t);
                return 0 === n && 0 === e.min ? 0 : Math.pow(10, e._startValue + (n - e._valueOffset) * e._valueRange)
            }
        }),
        zn = Ln;
    Rn._defaults = zn;
    var Nn = V.valueOrDefault,
        Bn = V.valueAtIndexOrDefault,
        En = V.options.resolve,
        Wn = {
            display: !0,
            animate: !0,
            position: "chartArea",
            angleLines: {
                display: !0,
                color: "rgba(0,0,0,0.1)",
                lineWidth: 1,
                borderDash: [],
                borderDashOffset: 0
            },
            gridLines: {
                circular: !1
            },
            ticks: {
                showLabelBackdrop: !0,
                backdropColor: "rgba(255,255,255,0.75)",
                backdropPaddingY: 2,
                backdropPaddingX: 2,
                callback: rn.formatters.linear
            },
            pointLabels: {
                display: !0,
                fontSize: 10,
                callback: function (t) {
                    return t
                }
            }
        };

    function Vn(t) {
        var e = t.ticks;
        return e.display && t.display ? Nn(e.fontSize, z.global.defaultFontSize) + 2 * e.backdropPaddingY : 0
    }

    function Hn(t, e, n, i, a) {
        return t === i || t === a ? {
            start: e - n / 2,
            end: e + n / 2
        } : t < i || t > a ? {
            start: e - n,
            end: e
        } : {
            start: e,
            end: e + n
        }
    }

    function jn(t) {
        return 0 === t || 180 === t ? "center" : t < 180 ? "left" : "right"
    }

    function qn(t, e, n, i) {
        var a, r, o = n.y + i / 2;
        if (V.isArray(e))
            for (a = 0, r = e.length; a < r; ++a) t.fillText(e[a], n.x, o), o += i;
        else t.fillText(e, n.x, o)
    }

    function Un(t, e, n) {
        90 === t || 270 === t ? n.y -= e.h / 2 : (t > 270 || t < 90) && (n.y -= e.h)
    }

    function Yn(t) {
        return V.isNumber(t) ? t : 0
    }
    var Gn = Sn.extend({
            setDimensions: function () {
                var t = this;
                t.width = t.maxWidth, t.height = t.maxHeight, t.paddingTop = Vn(t.options) / 2, t.xCenter = Math.floor(t.width / 2), t.yCenter = Math.floor((t.height - t.paddingTop) / 2), t.drawingArea = Math.min(t.height - t.paddingTop, t.width) / 2
            },
            determineDataLimits: function () {
                var t = this,
                    e = t.chart,
                    n = Number.POSITIVE_INFINITY,
                    i = Number.NEGATIVE_INFINITY;
                V.each(e.data.datasets, (function (a, r) {
                    if (e.isDatasetVisible(r)) {
                        var o = e.getDatasetMeta(r);
                        V.each(a.data, (function (e, a) {
                            var r = +t.getRightValue(e);
                            isNaN(r) || o.data[a].hidden || (n = Math.min(r, n), i = Math.max(r, i))
                        }))
                    }
                })), t.min = n === Number.POSITIVE_INFINITY ? 0 : n, t.max = i === Number.NEGATIVE_INFINITY ? 0 : i, t.handleTickRangeOptions()
            },
            _computeTickLimit: function () {
                return Math.ceil(this.drawingArea / Vn(this.options))
            },
            convertTicksToLabels: function () {
                var t = this;
                Sn.prototype.convertTicksToLabels.call(t), t.pointLabels = t.chart.data.labels.map((function () {
                    var e = V.callback(t.options.pointLabels.callback, arguments, t);
                    return e || 0 === e ? e : ""
                }))
            },
            getLabelForIndex: function (t, e) {
                return +this.getRightValue(this.chart.data.datasets[e].data[t])
            },
            fit: function () {
                var t = this.options;
                t.display && t.pointLabels.display ? function (t) {
                    var e, n, i, a = V.options._parseFont(t.options.pointLabels),
                        r = {
                            l: 0,
                            r: t.width,
                            t: 0,
                            b: t.height - t.paddingTop
                        },
                        o = {};
                    t.ctx.font = a.string, t._pointLabelSizes = [];
                    var s, l, u, d = t.chart.data.labels.length;
                    for (e = 0; e < d; e++) {
                        i = t.getPointPosition(e, t.drawingArea + 5), s = t.ctx, l = a.lineHeight, u = t.pointLabels[e], n = V.isArray(u) ? {
                            w: V.longestText(s, s.font, u),
                            h: u.length * l
                        } : {
                            w: s.measureText(u).width,
                            h: l
                        }, t._pointLabelSizes[e] = n;
                        var h = t.getIndexAngle(e),
                            c = V.toDegrees(h) % 360,
                            f = Hn(c, i.x, n.w, 0, 180),
                            g = Hn(c, i.y, n.h, 90, 270);
                        f.start < r.l && (r.l = f.start, o.l = h), f.end > r.r && (r.r = f.end, o.r = h), g.start < r.t && (r.t = g.start, o.t = h), g.end > r.b && (r.b = g.end, o.b = h)
                    }
                    t.setReductions(t.drawingArea, r, o)
                }(this) : this.setCenterPoint(0, 0, 0, 0)
            },
            setReductions: function (t, e, n) {
                var i = this,
                    a = e.l / Math.sin(n.l),
                    r = Math.max(e.r - i.width, 0) / Math.sin(n.r),
                    o = -e.t / Math.cos(n.t),
                    s = -Math.max(e.b - (i.height - i.paddingTop), 0) / Math.cos(n.b);
                a = Yn(a), r = Yn(r), o = Yn(o), s = Yn(s), i.drawingArea = Math.min(Math.floor(t - (a + r) / 2), Math.floor(t - (o + s) / 2)), i.setCenterPoint(a, r, o, s)
            },
            setCenterPoint: function (t, e, n, i) {
                var a = this,
                    r = a.width - e - a.drawingArea,
                    o = t + a.drawingArea,
                    s = n + a.drawingArea,
                    l = a.height - a.paddingTop - i - a.drawingArea;
                a.xCenter = Math.floor((o + r) / 2 + a.left), a.yCenter = Math.floor((s + l) / 2 + a.top + a.paddingTop)
            },
            getIndexAngle: function (t) {
                var e = this.chart,
                    n = (t * (360 / e.data.labels.length) + ((e.options || {}).startAngle || 0)) % 360;
                return (n < 0 ? n + 360 : n) * Math.PI * 2 / 360
            },
            getDistanceFromCenterForValue: function (t) {
                var e = this;
                if (V.isNullOrUndef(t)) return NaN;
                var n = e.drawingArea / (e.max - e.min);
                return e.options.ticks.reverse ? (e.max - t) * n : (t - e.min) * n
            },
            getPointPosition: function (t, e) {
                var n = this.getIndexAngle(t) - Math.PI / 2;
                return {
                    x: Math.cos(n) * e + this.xCenter,
                    y: Math.sin(n) * e + this.yCenter
                }
            },
            getPointPositionForValue: function (t, e) {
                return this.getPointPosition(t, this.getDistanceFromCenterForValue(e))
            },
            getBasePosition: function (t) {
                var e = this.min,
                    n = this.max;
                return this.getPointPositionForValue(t || 0, this.beginAtZero ? 0 : e < 0 && n < 0 ? n : e > 0 && n > 0 ? e : 0)
            },
            _drawGrid: function () {
                var t, e, n, i = this,
                    a = i.ctx,
                    r = i.options,
                    o = r.gridLines,
                    s = r.angleLines,
                    l = Nn(s.lineWidth, o.lineWidth),
                    u = Nn(s.color, o.color);
                if (r.pointLabels.display && function (t) {
                        var e = t.ctx,
                            n = t.options,
                            i = n.pointLabels,
                            a = Vn(n),
                            r = t.getDistanceFromCenterForValue(n.ticks.reverse ? t.min : t.max),
                            o = V.options._parseFont(i);
                        e.save(), e.font = o.string, e.textBaseline = "middle";
                        for (var s = t.chart.data.labels.length - 1; s >= 0; s--) {
                            var l = 0 === s ? a / 2 : 0,
                                u = t.getPointPosition(s, r + l + 5),
                                d = Bn(i.fontColor, s, z.global.defaultFontColor);
                            e.fillStyle = d;
                            var h = t.getIndexAngle(s),
                                c = V.toDegrees(h);
                            e.textAlign = jn(c), Un(c, t._pointLabelSizes[s], u), qn(e, t.pointLabels[s], u, o.lineHeight)
                        }
                        e.restore()
                    }(i), o.display && V.each(i.ticks, (function (t, n) {
                        0 !== n && (e = i.getDistanceFromCenterForValue(i.ticksAsNumbers[n]), function (t, e, n, i) {
                            var a, r = t.ctx,
                                o = e.circular,
                                s = t.chart.data.labels.length,
                                l = Bn(e.color, i - 1),
                                u = Bn(e.lineWidth, i - 1);
                            if ((o || s) && l && u) {
                                if (r.save(), r.strokeStyle = l, r.lineWidth = u, r.setLineDash && (r.setLineDash(e.borderDash || []), r.lineDashOffset = e.borderDashOffset || 0), r.beginPath(), o) r.arc(t.xCenter, t.yCenter, n, 0, 2 * Math.PI);
                                else {
                                    a = t.getPointPosition(0, n), r.moveTo(a.x, a.y);
                                    for (var d = 1; d < s; d++) a = t.getPointPosition(d, n), r.lineTo(a.x, a.y)
                                }
                                r.closePath(), r.stroke(), r.restore()
                            }
                        }(i, o, e, n))
                    })), s.display && l && u) {
                    for (a.save(), a.lineWidth = l, a.strokeStyle = u, a.setLineDash && (a.setLineDash(En([s.borderDash, o.borderDash, []])), a.lineDashOffset = En([s.borderDashOffset, o.borderDashOffset, 0])), t = i.chart.data.labels.length - 1; t >= 0; t--) e = i.getDistanceFromCenterForValue(r.ticks.reverse ? i.min : i.max), n = i.getPointPosition(t, e), a.beginPath(), a.moveTo(i.xCenter, i.yCenter), a.lineTo(n.x, n.y), a.stroke();
                    a.restore()
                }
            },
            _drawLabels: function () {
                var t = this,
                    e = t.ctx,
                    n = t.options.ticks;
                if (n.display) {
                    var i, a, r = t.getIndexAngle(0),
                        o = V.options._parseFont(n),
                        s = Nn(n.fontColor, z.global.defaultFontColor);
                    e.save(), e.font = o.string, e.translate(t.xCenter, t.yCenter), e.rotate(r), e.textAlign = "center", e.textBaseline = "middle", V.each(t.ticks, (function (r, l) {
                        (0 !== l || n.reverse) && (i = t.getDistanceFromCenterForValue(t.ticksAsNumbers[l]), n.showLabelBackdrop && (a = e.measureText(r).width, e.fillStyle = n.backdropColor, e.fillRect(-a / 2 - n.backdropPaddingX, -i - o.size / 2 - n.backdropPaddingY, a + 2 * n.backdropPaddingX, o.size + 2 * n.backdropPaddingY)), e.fillStyle = s, e.fillText(r, 0, -i))
                    })), e.restore()
                }
            },
            _drawTitle: V.noop
        }),
        Xn = Wn;
    Gn._defaults = Xn;
    var Kn = V._deprecated,
        Zn = V.options.resolve,
        $n = V.valueOrDefault,
        Jn = Number.MIN_SAFE_INTEGER || -9007199254740991,
        Qn = Number.MAX_SAFE_INTEGER || 9007199254740991,
        ti = {
            millisecond: {
                common: !0,
                size: 1,
                steps: 1e3
            },
            second: {
                common: !0,
                size: 1e3,
                steps: 60
            },
            minute: {
                common: !0,
                size: 6e4,
                steps: 60
            },
            hour: {
                common: !0,
                size: 36e5,
                steps: 24
            },
            day: {
                common: !0,
                size: 864e5,
                steps: 30
            },
            week: {
                common: !1,
                size: 6048e5,
                steps: 4
            },
            month: {
                common: !0,
                size: 2628e6,
                steps: 12
            },
            quarter: {
                common: !1,
                size: 7884e6,
                steps: 4
            },
            year: {
                common: !0,
                size: 3154e7
            }
        },
        ei = Object.keys(ti);

    function ni(t, e) {
        return t - e
    }

    function ii(t) {
        return V.valueOrDefault(t.time.min, t.ticks.min)
    }

    function ai(t) {
        return V.valueOrDefault(t.time.max, t.ticks.max)
    }

    function ri(t, e, n, i) {
        var a = function (t, e, n) {
                for (var i, a, r, o = 0, s = t.length - 1; o >= 0 && o <= s;) {
                    if (a = t[(i = o + s >> 1) - 1] || null, r = t[i], !a) return {
                        lo: null,
                        hi: r
                    };
                    if (r[e] < n) o = i + 1;
                    else {
                        if (!(a[e] > n)) return {
                            lo: a,
                            hi: r
                        };
                        s = i - 1
                    }
                }
                return {
                    lo: r,
                    hi: null
                }
            }(t, e, n),
            r = a.lo ? a.hi ? a.lo : t[t.length - 2] : t[0],
            o = a.lo ? a.hi ? a.hi : t[t.length - 1] : t[1],
            s = o[e] - r[e],
            l = s ? (n - r[e]) / s : 0,
            u = (o[i] - r[i]) * l;
        return r[i] + u
    }

    function oi(t, e) {
        var n = t._adapter,
            i = t.options.time,
            a = i.parser,
            r = a || i.format,
            o = e;
        return "function" == typeof a && (o = a(o)), V.isFinite(o) || (o = "string" == typeof r ? n.parse(o, r) : n.parse(o)), null !== o ? +o : (a || "function" != typeof r || (o = r(e), V.isFinite(o) || (o = n.parse(o))), o)
    }

    function si(t, e) {
        if (V.isNullOrUndef(e)) return null;
        var n = t.options.time,
            i = oi(t, t.getRightValue(e));
        return null === i ? i : (n.round && (i = +t._adapter.startOf(i, n.round)), i)
    }

    function li(t, e, n, i) {
        var a, r, o, s = ei.length;
        for (a = ei.indexOf(t); a < s - 1; ++a)
            if (o = (r = ti[ei[a]]).steps ? r.steps : Qn, r.common && Math.ceil((n - e) / (o * r.size)) <= i) return ei[a];
        return ei[s - 1]
    }

    function ui(t, e, n) {
        var i, a, r = [],
            o = {},
            s = e.length;
        for (i = 0; i < s; ++i) o[a = e[i]] = i, r.push({
            value: a,
            major: !1
        });
        return 0 !== s && n ? function (t, e, n, i) {
            var a, r, o = t._adapter,
                s = +o.startOf(e[0].value, i),
                l = e[e.length - 1].value;
            for (a = s; a <= l; a = +o.add(a, 1, i))(r = n[a]) >= 0 && (e[r].major = !0);
            return e
        }(t, r, o, n) : r
    }
    var di = xn.extend({
            initialize: function () {
                this.mergeTicksOptions(), xn.prototype.initialize.call(this)
            },
            update: function () {
                var t = this,
                    e = t.options,
                    n = e.time || (e.time = {}),
                    i = t._adapter = new an._date(e.adapters.date);
                return Kn("time scale", n.format, "time.format", "time.parser"), Kn("time scale", n.min, "time.min", "ticks.min"), Kn("time scale", n.max, "time.max", "ticks.max"), V.mergeIf(n.displayFormats, i.formats()), xn.prototype.update.apply(t, arguments)
            },
            getRightValue: function (t) {
                return t && void 0 !== t.t && (t = t.t), xn.prototype.getRightValue.call(this, t)
            },
            determineDataLimits: function () {
                var t, e, n, i, a, r, o, s = this,
                    l = s.chart,
                    u = s._adapter,
                    d = s.options,
                    h = d.time.unit || "day",
                    c = Qn,
                    f = Jn,
                    g = [],
                    p = [],
                    m = [],
                    v = s._getLabels();
                for (t = 0, n = v.length; t < n; ++t) m.push(si(s, v[t]));
                for (t = 0, n = (l.data.datasets || []).length; t < n; ++t)
                    if (l.isDatasetVisible(t))
                        if (a = l.data.datasets[t].data, V.isObject(a[0]))
                            for (p[t] = [], e = 0, i = a.length; e < i; ++e) r = si(s, a[e]), g.push(r), p[t][e] = r;
                        else p[t] = m.slice(0), o || (g = g.concat(m), o = !0);
                else p[t] = [];
                m.length && (c = Math.min(c, m[0]), f = Math.max(f, m[m.length - 1])), g.length && (g = n > 1 ? function (t) {
                    var e, n, i, a = {},
                        r = [];
                    for (e = 0, n = t.length; e < n; ++e) a[i = t[e]] || (a[i] = !0, r.push(i));
                    return r
                }(g).sort(ni) : g.sort(ni), c = Math.min(c, g[0]), f = Math.max(f, g[g.length - 1])), c = si(s, ii(d)) || c, f = si(s, ai(d)) || f, c = c === Qn ? +u.startOf(Date.now(), h) : c, f = f === Jn ? +u.endOf(Date.now(), h) + 1 : f, s.min = Math.min(c, f), s.max = Math.max(c + 1, f), s._table = [], s._timestamps = {
                    data: g,
                    datasets: p,
                    labels: m
                }
            },
            buildTicks: function () {
                var t, e, n, i = this,
                    a = i.min,
                    r = i.max,
                    o = i.options,
                    s = o.ticks,
                    l = o.time,
                    u = i._timestamps,
                    d = [],
                    h = i.getLabelCapacity(a),
                    c = s.source,
                    f = o.distribution;
                for (u = "data" === c || "auto" === c && "series" === f ? u.data : "labels" === c ? u.labels : function (t, e, n, i) {
                        var a, r = t._adapter,
                            o = t.options,
                            s = o.time,
                            l = s.unit || li(s.minUnit, e, n, i),
                            u = Zn([s.stepSize, s.unitStepSize, 1]),
                            d = "week" === l && s.isoWeekday,
                            h = e,
                            c = [];
                        if (d && (h = +r.startOf(h, "isoWeek", d)), h = +r.startOf(h, d ? "day" : l), r.diff(n, e, l) > 1e5 * u) throw e + " and " + n + " are too far apart with stepSize of " + u + " " + l;
                        for (a = h; a < n; a = +r.add(a, u, l)) c.push(a);
                        return a !== n && "ticks" !== o.bounds || c.push(a), c
                    }(i, a, r, h), "ticks" === o.bounds && u.length && (a = u[0], r = u[u.length - 1]), a = si(i, ii(o)) || a, r = si(i, ai(o)) || r, t = 0, e = u.length; t < e; ++t)(n = u[t]) >= a && n <= r && d.push(n);
                return i.min = a, i.max = r, i._unit = l.unit || (s.autoSkip ? li(l.minUnit, i.min, i.max, h) : function (t, e, n, i, a) {
                    var r, o;
                    for (r = ei.length - 1; r >= ei.indexOf(n); r--)
                        if (o = ei[r], ti[o].common && t._adapter.diff(a, i, o) >= e - 1) return o;
                    return ei[n ? ei.indexOf(n) : 0]
                }(i, d.length, l.minUnit, i.min, i.max)), i._majorUnit = s.major.enabled && "year" !== i._unit ? function (t) {
                    for (var e = ei.indexOf(t) + 1, n = ei.length; e < n; ++e)
                        if (ti[ei[e]].common) return ei[e]
                }(i._unit) : void 0, i._table = function (t, e, n, i) {
                    if ("linear" === i || !t.length) return [{
                        time: e,
                        pos: 0
                    }, {
                        time: n,
                        pos: 1
                    }];
                    var a, r, o, s, l, u = [],
                        d = [e];
                    for (a = 0, r = t.length; a < r; ++a)(s = t[a]) > e && s < n && d.push(s);
                    for (d.push(n), a = 0, r = d.length; a < r; ++a) l = d[a + 1], o = d[a - 1], s = d[a], void 0 !== o && void 0 !== l && Math.round((l + o) / 2) === s || u.push({
                        time: s,
                        pos: a / (r - 1)
                    });
                    return u
                }(i._timestamps.data, a, r, f), i._offsets = function (t, e, n, i, a) {
                    var r, o, s = 0,
                        l = 0;
                    return a.offset && e.length && (r = ri(t, "time", e[0], "pos"), s = 1 === e.length ? 1 - r : (ri(t, "time", e[1], "pos") - r) / 2, o = ri(t, "time", e[e.length - 1], "pos"), l = 1 === e.length ? o : (o - ri(t, "time", e[e.length - 2], "pos")) / 2), {
                        start: s,
                        end: l,
                        factor: 1 / (s + 1 + l)
                    }
                }(i._table, d, 0, 0, o), s.reverse && d.reverse(), ui(i, d, i._majorUnit)
            },
            getLabelForIndex: function (t, e) {
                var n = this,
                    i = n._adapter,
                    a = n.chart.data,
                    r = n.options.time,
                    o = a.labels && t < a.labels.length ? a.labels[t] : "",
                    s = a.datasets[e].data[t];
                return V.isObject(s) && (o = n.getRightValue(s)), r.tooltipFormat ? i.format(oi(n, o), r.tooltipFormat) : "string" == typeof o ? o : i.format(oi(n, o), r.displayFormats.datetime)
            },
            tickFormatFunction: function (t, e, n, i) {
                var a = this._adapter,
                    r = this.options,
                    o = r.time.displayFormats,
                    s = o[this._unit],
                    l = this._majorUnit,
                    u = o[l],
                    d = n[e],
                    h = r.ticks,
                    c = l && u && d && d.major,
                    f = a.format(t, i || (c ? u : s)),
                    g = c ? h.major : h.minor,
                    p = Zn([g.callback, g.userCallback, h.callback, h.userCallback]);
                return p ? p(f, e, n) : f
            },
            convertTicksToLabels: function (t) {
                var e, n, i = [];
                for (e = 0, n = t.length; e < n; ++e) i.push(this.tickFormatFunction(t[e].value, e, t));
                return i
            },
            getPixelForOffset: function (t) {
                var e = this._offsets,
                    n = ri(this._table, "time", t, "pos");
                return this.getPixelForDecimal((e.start + n) * e.factor)
            },
            getPixelForValue: function (t, e, n) {
                var i = null;
                if (void 0 !== e && void 0 !== n && (i = this._timestamps.datasets[n][e]), null === i && (i = si(this, t)), null !== i) return this.getPixelForOffset(i)
            },
            getPixelForTick: function (t) {
                var e = this.getTicks();
                return t >= 0 && t < e.length ? this.getPixelForOffset(e[t].value) : null
            },
            getValueForPixel: function (t) {
                var e = this._offsets,
                    n = this.getDecimalForPixel(t) / e.factor - e.end,
                    i = ri(this._table, "pos", n, "time");
                return this._adapter._create(i)
            },
            _getLabelSize: function (t) {
                var e = this.options.ticks,
                    n = this.ctx.measureText(t).width,
                    i = V.toRadians(this.isHorizontal() ? e.maxRotation : e.minRotation),
                    a = Math.cos(i),
                    r = Math.sin(i),
                    o = $n(e.fontSize, z.global.defaultFontSize);
                return {
                    w: n * a + o * r,
                    h: n * r + o * a
                }
            },
            getLabelWidth: function (t) {
                return this._getLabelSize(t).w
            },
            getLabelCapacity: function (t) {
                var e = this,
                    n = e.options.time,
                    i = n.displayFormats,
                    a = i[n.unit] || i.millisecond,
                    r = e.tickFormatFunction(t, 0, ui(e, [t], e._majorUnit), a),
                    o = e._getLabelSize(r),
                    s = Math.floor(e.isHorizontal() ? e.width / o.w : e.height / o.h);
                return e.options.offset && s--, s > 0 ? s : 1
            }
        }),
        hi = {
            position: "bottom",
            distribution: "linear",
            bounds: "data",
            adapters: {},
            time: {
                parser: !1,
                unit: !1,
                round: !1,
                displayFormat: !1,
                isoWeekday: !1,
                minUnit: "millisecond",
                displayFormats: {}
            },
            ticks: {
                autoSkip: !1,
                source: "auto",
                major: {
                    enabled: !1
                }
            }
        };
    di._defaults = hi;
    var ci = {
            category: _n,
            linear: Dn,
            logarithmic: Rn,
            radialLinear: Gn,
            time: di
        },
        fi = {
            datetime: "MMM D, YYYY, h:mm:ss a",
            millisecond: "h:mm:ss.SSS a",
            second: "h:mm:ss a",
            minute: "h:mm a",
            hour: "hA",
            day: "MMM D",
            week: "ll",
            month: "MMM YYYY",
            quarter: "[Q]Q - YYYY",
            year: "YYYY"
        };
    an._date.override("function" == typeof t ? {
        _id: "moment",
        formats: function () {
            return fi
        },
        parse: function (e, n) {
            return "string" == typeof e && "string" == typeof n ? e = t(e, n) : e instanceof t || (e = t(e)), e.isValid() ? e.valueOf() : null
        },
        format: function (e, n) {
            return t(e).format(n)
        },
        add: function (e, n, i) {
            return t(e).add(n, i).valueOf()
        },
        diff: function (e, n, i) {
            return t(e).diff(t(n), i)
        },
        startOf: function (e, n, i) {
            return e = t(e), "isoWeek" === n ? e.isoWeekday(i).valueOf() : e.startOf(n).valueOf()
        },
        endOf: function (e, n) {
            return t(e).endOf(n).valueOf()
        },
        _create: function (e) {
            return t(e)
        }
    } : {}), z._set("global", {
        plugins: {
            filler: {
                propagate: !0
            }
        }
    });
    var gi = {
        dataset: function (t) {
            var e = t.fill,
                n = t.chart,
                i = n.getDatasetMeta(e),
                a = i && n.isDatasetVisible(e) && i.dataset._children || [],
                r = a.length || 0;
            return r ? function (t, e) {
                return e < r && a[e]._view || null
            } : null
        },
        boundary: function (t) {
            var e = t.boundary,
                n = e ? e.x : null,
                i = e ? e.y : null;
            return V.isArray(e) ? function (t, n) {
                return e[n]
            } : function (t) {
                return {
                    x: null === n ? t.x : n,
                    y: null === i ? t.y : i
                }
            }
        }
    };

    function pi(t, e, n) {
        var i, a = t._model || {},
            r = a.fill;
        if (void 0 === r && (r = !!a.backgroundColor), !1 === r || null === r) return !1;
        if (!0 === r) return "origin";
        if (i = parseFloat(r, 10), isFinite(i) && Math.floor(i) === i) return "-" !== r[0] && "+" !== r[0] || (i = e + i), !(i === e || i < 0 || i >= n) && i;
        switch (r) {
            case "bottom":
                return "start";
            case "top":
                return "end";
            case "zero":
                return "origin";
            case "origin":
            case "start":
            case "end":
                return r;
            default:
                return !1
        }
    }

    function mi(t) {
        return (t.el._scale || {}).getPointPositionForValue ? function (t) {
            var e, n, i, a, r, o = t.el._scale,
                s = o.options,
                l = o.chart.data.labels.length,
                u = t.fill,
                d = [];
            if (!l) return null;
            for (e = s.ticks.reverse ? o.max : o.min, n = s.ticks.reverse ? o.min : o.max, i = o.getPointPositionForValue(0, e), a = 0; a < l; ++a) r = "start" === u || "end" === u ? o.getPointPositionForValue(a, "start" === u ? e : n) : o.getBasePosition(a), s.gridLines.circular && (r.cx = i.x, r.cy = i.y, r.angle = o.getIndexAngle(a) - Math.PI / 2), d.push(r);
            return d
        }(t) : function (t) {
            var e, n = t.el._model || {},
                i = t.el._scale || {},
                a = t.fill,
                r = null;
            if (isFinite(a)) return null;
            if ("start" === a ? r = void 0 === n.scaleBottom ? i.bottom : n.scaleBottom : "end" === a ? r = void 0 === n.scaleTop ? i.top : n.scaleTop : void 0 !== n.scaleZero ? r = n.scaleZero : i.getBasePixel && (r = i.getBasePixel()), null != r) {
                if (void 0 !== r.x && void 0 !== r.y) return r;
                if (V.isFinite(r)) return {
                    x: (e = i.isHorizontal()) ? r : null,
                    y: e ? null : r
                }
            }
            return null
        }(t)
    }

    function vi(t, e, n) {
        var i, a = t[e].fill,
            r = [e];
        if (!n) return a;
        for (; !1 !== a && -1 === r.indexOf(a);) {
            if (!isFinite(a)) return a;
            if (!(i = t[a])) return !1;
            if (i.visible) return a;
            r.push(a), a = i.fill
        }
        return !1
    }

    function bi(t) {
        var e = t.fill,
            n = "dataset";
        return !1 === e ? null : (isFinite(e) || (n = "boundary"), gi[n](t))
    }

    function xi(t) {
        return t && !t.skip
    }

    function yi(t, e, n, i, a) {
        var r, o, s, l;
        if (i && a) {
            for (t.moveTo(e[0].x, e[0].y), r = 1; r < i; ++r) V.canvas.lineTo(t, e[r - 1], e[r]);
            if (void 0 === n[0].angle)
                for (t.lineTo(n[a - 1].x, n[a - 1].y), r = a - 1; r > 0; --r) V.canvas.lineTo(t, n[r], n[r - 1], !0);
            else
                for (o = n[0].cx, s = n[0].cy, l = Math.sqrt(Math.pow(n[0].x - o, 2) + Math.pow(n[0].y - s, 2)), r = a - 1; r > 0; --r) t.arc(o, s, l, n[r].angle, n[r - 1].angle, !0)
        }
    }

    function _i(t, e, n, i, a, r) {
        var o, s, l, u, d, h, c, f, g = e.length,
            p = i.spanGaps,
            m = [],
            v = [],
            b = 0,
            x = 0;
        for (t.beginPath(), o = 0, s = g; o < s; ++o) d = n(u = e[l = o % g]._view, l, i), h = xi(u), c = xi(d), r && void 0 === f && h && (s = g + (f = o + 1)), h && c ? (b = m.push(u), x = v.push(d)) : b && x && (p ? (h && m.push(u), c && v.push(d)) : (yi(t, m, v, b, x), b = x = 0, m = [], v = []));
        yi(t, m, v, b, x), t.closePath(), t.fillStyle = a, t.fill()
    }
    var ki = {
            id: "filler",
            afterDatasetsUpdate: function (t, e) {
                var n, i, a, r, o = (t.data.datasets || []).length,
                    s = e.propagate,
                    l = [];
                for (i = 0; i < o; ++i) r = null, (a = (n = t.getDatasetMeta(i)).dataset) && a._model && a instanceof _t.Line && (r = {
                    visible: t.isDatasetVisible(i),
                    fill: pi(a, i, o),
                    chart: t,
                    el: a
                }), n.$filler = r, l.push(r);
                for (i = 0; i < o; ++i)(r = l[i]) && (r.fill = vi(l, i, s), r.boundary = mi(r), r.mapper = bi(r))
            },
            beforeDatasetsDraw: function (t) {
                var e, n, i, a, r, o, s, l = t._getSortedVisibleDatasetMetas(),
                    u = t.ctx;
                for (n = l.length - 1; n >= 0; --n)(e = l[n].$filler) && e.visible && (a = (i = e.el)._view, r = i._children || [], o = e.mapper, s = a.backgroundColor || z.global.defaultColor, o && s && r.length && (V.canvas.clipArea(u, t.chartArea), _i(u, r, o, a, s, i._loop), V.canvas.unclipArea(u)))
            }
        },
        wi = V.rtl.getRtlAdapter,
        Mi = V.noop,
        Si = V.valueOrDefault;

    function Ci(t, e) {
        return t.usePointStyle && t.boxWidth > e ? e : t.boxWidth
    }
    z._set("global", {
        legend: {
            display: !0,
            position: "top",
            align: "center",
            fullWidth: !0,
            reverse: !1,
            weight: 1e3,
            onClick: function (t, e) {
                var n = e.datasetIndex,
                    i = this.chart,
                    a = i.getDatasetMeta(n);
                a.hidden = null === a.hidden ? !i.data.datasets[n].hidden : null, i.update()
            },
            onHover: null,
            onLeave: null,
            labels: {
                boxWidth: 40,
                padding: 10,
                generateLabels: function (t) {
                    var e = t.data.datasets,
                        n = t.options.legend || {},
                        i = n.labels && n.labels.usePointStyle;
                    return t._getSortedDatasetMetas().map((function (n) {
                        var a = n.controller.getStyle(i ? 0 : void 0);
                        return {
                            text: e[n.index].label,
                            fillStyle: a.backgroundColor,
                            hidden: !t.isDatasetVisible(n.index),
                            lineCap: a.borderCapStyle,
                            lineDash: a.borderDash,
                            lineDashOffset: a.borderDashOffset,
                            lineJoin: a.borderJoinStyle,
                            lineWidth: a.borderWidth,
                            strokeStyle: a.borderColor,
                            pointStyle: a.pointStyle,
                            rotation: a.rotation,
                            datasetIndex: n.index
                        }
                    }), this)
                }
            }
        },
        legendCallback: function (t) {
            var e, n, i, a = document.createElement("ul"),
                r = t.data.datasets;
            for (a.setAttribute("class", t.id + "-legend"), e = 0, n = r.length; e < n; e++)(i = a.appendChild(document.createElement("li"))).appendChild(document.createElement("span")).style.backgroundColor = r[e].backgroundColor, r[e].label && i.appendChild(document.createTextNode(r[e].label));
            return a.outerHTML
        }
    });
    var Pi = X.extend({
        initialize: function (t) {
            V.extend(this, t), this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1
        },
        beforeUpdate: Mi,
        update: function (t, e, n) {
            var i = this;
            return i.beforeUpdate(), i.maxWidth = t, i.maxHeight = e, i.margins = n, i.beforeSetDimensions(), i.setDimensions(), i.afterSetDimensions(), i.beforeBuildLabels(), i.buildLabels(), i.afterBuildLabels(), i.beforeFit(), i.fit(), i.afterFit(), i.afterUpdate(), i.minSize
        },
        afterUpdate: Mi,
        beforeSetDimensions: Mi,
        setDimensions: function () {
            var t = this;
            t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = {
                width: 0,
                height: 0
            }
        },
        afterSetDimensions: Mi,
        beforeBuildLabels: Mi,
        buildLabels: function () {
            var t = this,
                e = t.options.labels || {},
                n = V.callback(e.generateLabels, [t.chart], t) || [];
            e.filter && (n = n.filter((function (n) {
                return e.filter(n, t.chart.data)
            }))), t.options.reverse && n.reverse(), t.legendItems = n
        },
        afterBuildLabels: Mi,
        beforeFit: Mi,
        fit: function () {
            var t = this,
                e = t.options,
                n = e.labels,
                i = e.display,
                a = t.ctx,
                r = V.options._parseFont(n),
                o = r.size,
                s = t.legendHitBoxes = [],
                l = t.minSize,
                u = t.isHorizontal();
            if (u ? (l.width = t.maxWidth, l.height = i ? 10 : 0) : (l.width = i ? 10 : 0, l.height = t.maxHeight), i) {
                if (a.font = r.string, u) {
                    var d = t.lineWidths = [0],
                        h = 0;
                    a.textAlign = "left", a.textBaseline = "middle", V.each(t.legendItems, (function (t, e) {
                        var i = Ci(n, o) + o / 2 + a.measureText(t.text).width;
                        (0 === e || d[d.length - 1] + i + 2 * n.padding > l.width) && (h += o + n.padding, d[d.length - (e > 0 ? 0 : 1)] = 0), s[e] = {
                            left: 0,
                            top: 0,
                            width: i,
                            height: o
                        }, d[d.length - 1] += i + n.padding
                    })), l.height += h
                } else {
                    var c = n.padding,
                        f = t.columnWidths = [],
                        g = t.columnHeights = [],
                        p = n.padding,
                        m = 0,
                        v = 0;
                    V.each(t.legendItems, (function (t, e) {
                        var i = Ci(n, o) + o / 2 + a.measureText(t.text).width;
                        e > 0 && v + o + 2 * c > l.height && (p += m + n.padding, f.push(m), g.push(v), m = 0, v = 0), m = Math.max(m, i), v += o + c, s[e] = {
                            left: 0,
                            top: 0,
                            width: i,
                            height: o
                        }
                    })), p += m, f.push(m), g.push(v), l.width += p
                }
                t.width = l.width, t.height = l.height
            } else t.width = l.width = t.height = l.height = 0
        },
        afterFit: Mi,
        isHorizontal: function () {
            return "top" === this.options.position || "bottom" === this.options.position
        },
        draw: function () {
            var t = this,
                e = t.options,
                n = e.labels,
                i = z.global,
                a = i.defaultColor,
                r = i.elements.line,
                o = t.height,
                s = t.columnHeights,
                l = t.width,
                u = t.lineWidths;
            if (e.display) {
                var d, h = wi(e.rtl, t.left, t.minSize.width),
                    c = t.ctx,
                    f = Si(n.fontColor, i.defaultFontColor),
                    g = V.options._parseFont(n),
                    p = g.size;
                c.textAlign = h.textAlign("left"), c.textBaseline = "middle", c.lineWidth = .5, c.strokeStyle = f, c.fillStyle = f, c.font = g.string;
                var m = Ci(n, p),
                    v = t.legendHitBoxes,
                    b = function (t, i) {
                        switch (e.align) {
                            case "start":
                                return n.padding;
                            case "end":
                                return t - i;
                            default:
                                return (t - i + n.padding) / 2
                        }
                    },
                    x = t.isHorizontal();
                d = x ? {
                    x: t.left + b(l, u[0]),
                    y: t.top + n.padding,
                    line: 0
                } : {
                    x: t.left + n.padding,
                    y: t.top + b(o, s[0]),
                    line: 0
                }, V.rtl.overrideTextDirection(t.ctx, e.textDirection);
                var y = p + n.padding;
                V.each(t.legendItems, (function (e, i) {
                    var f = c.measureText(e.text).width,
                        g = m + p / 2 + f,
                        _ = d.x,
                        k = d.y;
                    h.setWidth(t.minSize.width), x ? i > 0 && _ + g + n.padding > t.left + t.minSize.width && (k = d.y += y, d.line++, _ = d.x = t.left + b(l, u[d.line])) : i > 0 && k + y > t.top + t.minSize.height && (_ = d.x = _ + t.columnWidths[d.line] + n.padding, d.line++, k = d.y = t.top + b(o, s[d.line]));
                    var w = h.x(_);
                    ! function (t, e, i) {
                        if (!(isNaN(m) || m <= 0)) {
                            c.save();
                            var o = Si(i.lineWidth, r.borderWidth);
                            if (c.fillStyle = Si(i.fillStyle, a), c.lineCap = Si(i.lineCap, r.borderCapStyle), c.lineDashOffset = Si(i.lineDashOffset, r.borderDashOffset), c.lineJoin = Si(i.lineJoin, r.borderJoinStyle), c.lineWidth = o, c.strokeStyle = Si(i.strokeStyle, a), c.setLineDash && c.setLineDash(Si(i.lineDash, r.borderDash)), n && n.usePointStyle) {
                                var s = m * Math.SQRT2 / 2,
                                    l = h.xPlus(t, m / 2),
                                    u = e + p / 2;
                                V.canvas.drawPoint(c, i.pointStyle, s, l, u, i.rotation)
                            } else c.fillRect(h.leftForLtr(t, m), e, m, p), 0 !== o && c.strokeRect(h.leftForLtr(t, m), e, m, p);
                            c.restore()
                        }
                    }(w, k, e), v[i].left = h.leftForLtr(w, v[i].width), v[i].top = k,
                        function (t, e, n, i) {
                            var a = p / 2,
                                r = h.xPlus(t, m + a),
                                o = e + a;
                            c.fillText(n.text, r, o), n.hidden && (c.beginPath(), c.lineWidth = 2, c.moveTo(r, o), c.lineTo(h.xPlus(r, i), o), c.stroke())
                        }(w, k, e, f), x ? d.x += g + n.padding : d.y += y
                })), V.rtl.restoreTextDirection(t.ctx, e.textDirection)
            }
        },
        _getLegendItemAt: function (t, e) {
            var n, i, a, r = this;
            if (t >= r.left && t <= r.right && e >= r.top && e <= r.bottom)
                for (a = r.legendHitBoxes, n = 0; n < a.length; ++n)
                    if (t >= (i = a[n]).left && t <= i.left + i.width && e >= i.top && e <= i.top + i.height) return r.legendItems[n];
            return null
        },
        handleEvent: function (t) {
            var e, n = this,
                i = n.options,
                a = "mouseup" === t.type ? "click" : t.type;
            if ("mousemove" === a) {
                if (!i.onHover && !i.onLeave) return
            } else {
                if ("click" !== a) return;
                if (!i.onClick) return
            }
            e = n._getLegendItemAt(t.x, t.y), "click" === a ? e && i.onClick && i.onClick.call(n, t.native, e) : (i.onLeave && e !== n._hoveredItem && (n._hoveredItem && i.onLeave.call(n, t.native, n._hoveredItem), n._hoveredItem = e), i.onHover && e && i.onHover.call(n, t.native, e))
        }
    });

    function Ai(t, e) {
        var n = new Pi({
            ctx: t.ctx,
            options: e,
            chart: t
        });
        ge.configure(t, n, e), ge.addBox(t, n), t.legend = n
    }
    var Di = {
            id: "legend",
            _element: Pi,
            beforeInit: function (t) {
                var e = t.options.legend;
                e && Ai(t, e)
            },
            beforeUpdate: function (t) {
                var e = t.options.legend,
                    n = t.legend;
                e ? (V.mergeIf(e, z.global.legend), n ? (ge.configure(t, n, e), n.options = e) : Ai(t, e)) : n && (ge.removeBox(t, n), delete t.legend)
            },
            afterEvent: function (t, e) {
                var n = t.legend;
                n && n.handleEvent(e)
            }
        },
        Ti = V.noop;
    z._set("global", {
        title: {
            display: !1,
            fontStyle: "bold",
            fullWidth: !0,
            padding: 10,
            position: "top",
            text: "",
            weight: 2e3
        }
    });
    var Ii = X.extend({
        initialize: function (t) {
            V.extend(this, t), this.legendHitBoxes = []
        },
        beforeUpdate: Ti,
        update: function (t, e, n) {
            var i = this;
            return i.beforeUpdate(), i.maxWidth = t, i.maxHeight = e, i.margins = n, i.beforeSetDimensions(), i.setDimensions(), i.afterSetDimensions(), i.beforeBuildLabels(), i.buildLabels(), i.afterBuildLabels(), i.beforeFit(), i.fit(), i.afterFit(), i.afterUpdate(), i.minSize
        },
        afterUpdate: Ti,
        beforeSetDimensions: Ti,
        setDimensions: function () {
            var t = this;
            t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = {
                width: 0,
                height: 0
            }
        },
        afterSetDimensions: Ti,
        beforeBuildLabels: Ti,
        buildLabels: Ti,
        afterBuildLabels: Ti,
        beforeFit: Ti,
        fit: function () {
            var t, e = this,
                n = e.options,
                i = e.minSize = {},
                a = e.isHorizontal();
            n.display ? (t = (V.isArray(n.text) ? n.text.length : 1) * V.options._parseFont(n).lineHeight + 2 * n.padding, e.width = i.width = a ? e.maxWidth : t, e.height = i.height = a ? t : e.maxHeight) : e.width = i.width = e.height = i.height = 0
        },
        afterFit: Ti,
        isHorizontal: function () {
            var t = this.options.position;
            return "top" === t || "bottom" === t
        },
        draw: function () {
            var t = this,
                e = t.ctx,
                n = t.options;
            if (n.display) {
                var i, a, r, o = V.options._parseFont(n),
                    s = o.lineHeight,
                    l = s / 2 + n.padding,
                    u = 0,
                    d = t.top,
                    h = t.left,
                    c = t.bottom,
                    f = t.right;
                e.fillStyle = V.valueOrDefault(n.fontColor, z.global.defaultFontColor), e.font = o.string, t.isHorizontal() ? (a = h + (f - h) / 2, r = d + l, i = f - h) : (a = "left" === n.position ? h + l : f - l, r = d + (c - d) / 2, i = c - d, u = Math.PI * ("left" === n.position ? -.5 : .5)), e.save(), e.translate(a, r), e.rotate(u), e.textAlign = "center", e.textBaseline = "middle";
                var g = n.text;
                if (V.isArray(g))
                    for (var p = 0, m = 0; m < g.length; ++m) e.fillText(g[m], 0, p, i), p += s;
                else e.fillText(g, 0, 0, i);
                e.restore()
            }
        }
    });

    function Fi(t, e) {
        var n = new Ii({
            ctx: t.ctx,
            options: e,
            chart: t
        });
        ge.configure(t, n, e), ge.addBox(t, n), t.titleBlock = n
    }
    var Li = {},
        Oi = ki,
        Ri = Di,
        zi = {
            id: "title",
            _element: Ii,
            beforeInit: function (t) {
                var e = t.options.title;
                e && Fi(t, e)
            },
            beforeUpdate: function (t) {
                var e = t.options.title,
                    n = t.titleBlock;
                e ? (V.mergeIf(e, z.global.title), n ? (ge.configure(t, n, e), n.options = e) : Fi(t, e)) : n && (ge.removeBox(t, n), delete t.titleBlock)
            }
        };
    for (var Ni in Li.filler = Oi, Li.legend = Ri, Li.title = zi, tn.helpers = V,
            function () {
                function t(t, e, n) {
                    var i;
                    return "string" == typeof t ? (i = parseInt(t, 10), -1 !== t.indexOf("%") && (i = i / 100 * e.parentNode[n])) : i = t, i
                }

                function e(t) {
                    return null != t && "none" !== t
                }

                function n(n, i, a) {
                    var r = document.defaultView,
                        o = V._getParentNode(n),
                        s = r.getComputedStyle(n)[i],
                        l = r.getComputedStyle(o)[i],
                        u = e(s),
                        d = e(l),
                        h = Number.POSITIVE_INFINITY;
                    return u || d ? Math.min(u ? t(s, n, a) : h, d ? t(l, o, a) : h) : "none"
                }
                V.where = function (t, e) {
                    if (V.isArray(t) && Array.prototype.filter) return t.filter(e);
                    var n = [];
                    return V.each(t, (function (t) {
                        e(t) && n.push(t)
                    })), n
                }, V.findIndex = Array.prototype.findIndex ? function (t, e, n) {
                    return t.findIndex(e, n)
                } : function (t, e, n) {
                    n = void 0 === n ? t : n;
                    for (var i = 0, a = t.length; i < a; ++i)
                        if (e.call(n, t[i], i, t)) return i;
                    return -1
                }, V.findNextWhere = function (t, e, n) {
                    V.isNullOrUndef(n) && (n = -1);
                    for (var i = n + 1; i < t.length; i++) {
                        var a = t[i];
                        if (e(a)) return a
                    }
                }, V.findPreviousWhere = function (t, e, n) {
                    V.isNullOrUndef(n) && (n = t.length);
                    for (var i = n - 1; i >= 0; i--) {
                        var a = t[i];
                        if (e(a)) return a
                    }
                }, V.isNumber = function (t) {
                    return !isNaN(parseFloat(t)) && isFinite(t)
                }, V.almostEquals = function (t, e, n) {
                    return Math.abs(t - e) < n
                }, V.almostWhole = function (t, e) {
                    var n = Math.round(t);
                    return n - e <= t && n + e >= t
                }, V.max = function (t) {
                    return t.reduce((function (t, e) {
                        return isNaN(e) ? t : Math.max(t, e)
                    }), Number.NEGATIVE_INFINITY)
                }, V.min = function (t) {
                    return t.reduce((function (t, e) {
                        return isNaN(e) ? t : Math.min(t, e)
                    }), Number.POSITIVE_INFINITY)
                }, V.sign = Math.sign ? function (t) {
                    return Math.sign(t)
                } : function (t) {
                    return 0 === (t = +t) || isNaN(t) ? t : t > 0 ? 1 : -1
                }, V.toRadians = function (t) {
                    return t * (Math.PI / 180)
                }, V.toDegrees = function (t) {
                    return t * (180 / Math.PI)
                }, V._decimalPlaces = function (t) {
                    if (V.isFinite(t)) {
                        for (var e = 1, n = 0; Math.round(t * e) / e !== t;) e *= 10, n++;
                        return n
                    }
                }, V.getAngleFromPoint = function (t, e) {
                    var n = e.x - t.x,
                        i = e.y - t.y,
                        a = Math.sqrt(n * n + i * i),
                        r = Math.atan2(i, n);
                    return r < -.5 * Math.PI && (r += 2 * Math.PI), {
                        angle: r,
                        distance: a
                    }
                }, V.distanceBetweenPoints = function (t, e) {
                    return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
                }, V.aliasPixel = function (t) {
                    return t % 2 == 0 ? 0 : .5
                }, V._alignPixel = function (t, e, n) {
                    var i = t.currentDevicePixelRatio,
                        a = n / 2;
                    return Math.round((e - a) * i) / i + a
                }, V.splineCurve = function (t, e, n, i) {
                    var a = t.skip ? e : t,
                        r = e,
                        o = n.skip ? e : n,
                        s = Math.sqrt(Math.pow(r.x - a.x, 2) + Math.pow(r.y - a.y, 2)),
                        l = Math.sqrt(Math.pow(o.x - r.x, 2) + Math.pow(o.y - r.y, 2)),
                        u = s / (s + l),
                        d = l / (s + l),
                        h = i * (u = isNaN(u) ? 0 : u),
                        c = i * (d = isNaN(d) ? 0 : d);
                    return {
                        previous: {
                            x: r.x - h * (o.x - a.x),
                            y: r.y - h * (o.y - a.y)
                        },
                        next: {
                            x: r.x + c * (o.x - a.x),
                            y: r.y + c * (o.y - a.y)
                        }
                    }
                }, V.EPSILON = Number.EPSILON || 1e-14, V.splineCurveMonotone = function (t) {
                    var e, n, i, a, r, o, s, l, u, d = (t || []).map((function (t) {
                            return {
                                model: t._model,
                                deltaK: 0,
                                mK: 0
                            }
                        })),
                        h = d.length;
                    for (e = 0; e < h; ++e)
                        if (!(i = d[e]).model.skip) {
                            if (n = e > 0 ? d[e - 1] : null, (a = e < h - 1 ? d[e + 1] : null) && !a.model.skip) {
                                var c = a.model.x - i.model.x;
                                i.deltaK = 0 !== c ? (a.model.y - i.model.y) / c : 0
                            }!n || n.model.skip ? i.mK = i.deltaK : !a || a.model.skip ? i.mK = n.deltaK : this.sign(n.deltaK) !== this.sign(i.deltaK) ? i.mK = 0 : i.mK = (n.deltaK + i.deltaK) / 2
                        } for (e = 0; e < h - 1; ++e) i = d[e], a = d[e + 1], i.model.skip || a.model.skip || (V.almostEquals(i.deltaK, 0, this.EPSILON) ? i.mK = a.mK = 0 : (r = i.mK / i.deltaK, o = a.mK / i.deltaK, (l = Math.pow(r, 2) + Math.pow(o, 2)) <= 9 || (s = 3 / Math.sqrt(l), i.mK = r * s * i.deltaK, a.mK = o * s * i.deltaK)));
                    for (e = 0; e < h; ++e)(i = d[e]).model.skip || (n = e > 0 ? d[e - 1] : null, a = e < h - 1 ? d[e + 1] : null, n && !n.model.skip && (u = (i.model.x - n.model.x) / 3, i.model.controlPointPreviousX = i.model.x - u, i.model.controlPointPreviousY = i.model.y - u * i.mK), a && !a.model.skip && (u = (a.model.x - i.model.x) / 3, i.model.controlPointNextX = i.model.x + u, i.model.controlPointNextY = i.model.y + u * i.mK))
                }, V.nextItem = function (t, e, n) {
                    return n ? e >= t.length - 1 ? t[0] : t[e + 1] : e >= t.length - 1 ? t[t.length - 1] : t[e + 1]
                }, V.previousItem = function (t, e, n) {
                    return n ? e <= 0 ? t[t.length - 1] : t[e - 1] : e <= 0 ? t[0] : t[e - 1]
                }, V.niceNum = function (t, e) {
                    var n = Math.floor(V.log10(t)),
                        i = t / Math.pow(10, n);
                    return (e ? i < 1.5 ? 1 : i < 3 ? 2 : i < 7 ? 5 : 10 : i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * Math.pow(10, n)
                }, V.requestAnimFrame = "undefined" == typeof window ? function (t) {
                    t()
                } : window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
                    return window.setTimeout(t, 1e3 / 60)
                }, V.getRelativePosition = function (t, e) {
                    var n, i, a = t.originalEvent || t,
                        r = t.target || t.srcElement,
                        o = r.getBoundingClientRect(),
                        s = a.touches;
                    s && s.length > 0 ? (n = s[0].clientX, i = s[0].clientY) : (n = a.clientX, i = a.clientY);
                    var l = parseFloat(V.getStyle(r, "padding-left")),
                        u = parseFloat(V.getStyle(r, "padding-top")),
                        d = parseFloat(V.getStyle(r, "padding-right")),
                        h = parseFloat(V.getStyle(r, "padding-bottom")),
                        c = o.right - o.left - l - d,
                        f = o.bottom - o.top - u - h;
                    return {
                        x: n = Math.round((n - o.left - l) / c * r.width / e.currentDevicePixelRatio),
                        y: i = Math.round((i - o.top - u) / f * r.height / e.currentDevicePixelRatio)
                    }
                }, V.getConstraintWidth = function (t) {
                    return n(t, "max-width", "clientWidth")
                }, V.getConstraintHeight = function (t) {
                    return n(t, "max-height", "clientHeight")
                }, V._calculatePadding = function (t, e, n) {
                    return (e = V.getStyle(t, e)).indexOf("%") > -1 ? n * parseInt(e, 10) / 100 : parseInt(e, 10)
                }, V._getParentNode = function (t) {
                    var e = t.parentNode;
                    return e && "[object ShadowRoot]" === e.toString() && (e = e.host), e
                }, V.getMaximumWidth = function (t) {
                    var e = V._getParentNode(t);
                    if (!e) return t.clientWidth;
                    var n = e.clientWidth,
                        i = n - V._calculatePadding(e, "padding-left", n) - V._calculatePadding(e, "padding-right", n),
                        a = V.getConstraintWidth(t);
                    return isNaN(a) ? i : Math.min(i, a)
                }, V.getMaximumHeight = function (t) {
                    var e = V._getParentNode(t);
                    if (!e) return t.clientHeight;
                    var n = e.clientHeight,
                        i = n - V._calculatePadding(e, "padding-top", n) - V._calculatePadding(e, "padding-bottom", n),
                        a = V.getConstraintHeight(t);
                    return isNaN(a) ? i : Math.min(i, a)
                }, V.getStyle = function (t, e) {
                    return t.currentStyle ? t.currentStyle[e] : document.defaultView.getComputedStyle(t, null).getPropertyValue(e)
                }, V.retinaScale = function (t, e) {
                    var n = t.currentDevicePixelRatio = e || "undefined" != typeof window && window.devicePixelRatio || 1;
                    if (1 !== n) {
                        var i = t.canvas,
                            a = t.height,
                            r = t.width;
                        i.height = a * n, i.width = r * n, t.ctx.scale(n, n), i.style.height || i.style.width || (i.style.height = a + "px", i.style.width = r + "px")
                    }
                }, V.fontString = function (t, e, n) {
                    return e + " " + t + "px " + n
                }, V.longestText = function (t, e, n, i) {
                    var a = (i = i || {}).data = i.data || {},
                        r = i.garbageCollect = i.garbageCollect || [];
                    i.font !== e && (a = i.data = {}, r = i.garbageCollect = [], i.font = e), t.font = e;
                    var o, s, l, u, d, h = 0,
                        c = n.length;
                    for (o = 0; o < c; o++)
                        if (null != (u = n[o]) && !0 !== V.isArray(u)) h = V.measureText(t, a, r, h, u);
                        else if (V.isArray(u))
                        for (s = 0, l = u.length; s < l; s++) null == (d = u[s]) || V.isArray(d) || (h = V.measureText(t, a, r, h, d));
                    var f = r.length / 2;
                    if (f > n.length) {
                        for (o = 0; o < f; o++) delete a[r[o]];
                        r.splice(0, f)
                    }
                    return h
                }, V.measureText = function (t, e, n, i, a) {
                    var r = e[a];
                    return r || (r = e[a] = t.measureText(a).width, n.push(a)), r > i && (i = r), i
                }, V.numberOfLabelLines = function (t) {
                    var e = 1;
                    return V.each(t, (function (t) {
                        V.isArray(t) && t.length > e && (e = t.length)
                    })), e
                }, V.color = k ? function (t) {
                    return t instanceof CanvasGradient && (t = z.global.defaultColor), k(t)
                } : function (t) {
                    return console.error("Color.js not found!"), t
                }, V.getHoverColor = function (t) {
                    return t instanceof CanvasPattern || t instanceof CanvasGradient ? t : V.color(t).saturate(.5).darken(.1).rgbString()
                }
            }(), tn._adapters = an, tn.Animation = Z, tn.animationService = $, tn.controllers = $t, tn.DatasetController = nt, tn.defaults = z, tn.Element = X, tn.elements = _t, tn.Interaction = ae, tn.layouts = ge, tn.platform = Fe, tn.plugins = Le, tn.Scale = xn, tn.scaleService = Oe, tn.Ticks = rn, tn.Tooltip = Ue, tn.helpers.each(ci, (function (t, e) {
                tn.scaleService.registerScaleType(e, t, t._defaults)
            })), Li) Li.hasOwnProperty(Ni) && tn.plugins.register(Li[Ni]);
    tn.platform.initialize();
    var Bi = tn;
    return "undefined" != typeof window && (window.Chart = tn), tn.Chart = tn, tn.Legend = Li.legend._element, tn.Title = Li.title._element, tn.pluginService = tn.plugins, tn.PluginBase = tn.Element.extend({}), tn.canvasHelpers = tn.helpers.canvas, tn.layoutService = tn.layouts, tn.LinearScaleBase = Sn, tn.helpers.each(["Bar", "Bubble", "Doughnut", "Line", "PolarArea", "Radar", "Scatter"], (function (t) {
        tn[t] = function (e, n) {
            return new tn(e, tn.helpers.merge(n || {}, {
                type: t.charAt(0).toLowerCase() + t.slice(1)
            }))
        }
    })), Bi
}));