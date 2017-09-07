"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

"use strict";

"use strict";
var f14;
(function (f14) {
    var L10n;
    (function (L10n) {
        var DefaultL10nProvider = (function () {
            function DefaultL10nProvider() {
                this._locales = {};
                this._currentLang = navigator.language;
            }
            DefaultL10nProvider.prototype.AddLocale = function (localeKey, localeData) {
                // Createss new locale if not exist.
                if (!this._locales[localeKey]) {
                    this._locales[localeKey] = {};
                }
                // Get locale for given locale key.
                var currentLocalData = this._locales[localeKey];
                // Apply given locale data to existing.
                for (var key in localeData) {
                    currentLocalData[key] = localeData[key];
                }
            };
            DefaultL10nProvider.prototype.GetString = function (stringKey) {
                return this.GetStringForLocale(this._currentLang, stringKey);
            };
            DefaultL10nProvider.prototype.GetStringForLocale = function (localeKey, stringKey) {
                // Tries to find target string for the given local key.
                var stringData = this.getLocalizedString(localeKey, stringKey);
                if (stringData) {
                    return stringData;
                }
                // Tries to find target string for the local key by default.
                if (L10n.Config.DefaultLocale) {
                    stringData = this.getLocalizedString(L10n.Config.DefaultLocale, stringKey);
                    if (stringData) {
                        return stringData;
                    }
                }
                // Tries to find target string in all available locales.
                for (var lk in this._locales) {
                    stringData = this.getLocalizedString(lk, stringKey);
                    if (stringData) {
                        return stringData;
                    }
                }
            };
            DefaultL10nProvider.prototype.GetLocales = function () {
                return this._locales;
            };
            DefaultL10nProvider.prototype.getLocalizedString = function (localeKey, stringKey) {
                if (this._locales[localeKey]) {
                    return this._locales[localeKey][stringKey];
                }
            };
            return DefaultL10nProvider;
        }());
        L10n.DefaultL10nProvider = DefaultL10nProvider;
        var Configuration = (function () {
            function Configuration() {
                this.DEBUG = false;
                this.AsWindowPart = true;
                this.WindowPartProperty = "l10nProvider";
                this.L10nProvider = new DefaultL10nProvider();
            }
            return Configuration;
        }());
        L10n.Configuration = Configuration;
        L10n.Config = new Configuration();
        function Setup(settings) {
            if (settings) {
                for (var p in settings) {
                    L10n.Config[p] = settings[p];
                }
            }
            if (!L10n.Config.L10nProvider) {
                console.log("L10nProvider is undefined or null. Create default l10nProvider.");
                L10n.Config.L10nProvider = new DefaultL10nProvider();
            }
            if (L10n.Config.AsWindowPart) {
                if (!L10n.Config.WindowPartProperty || L10n.Config.WindowPartProperty.length === 0) {
                    throw "L10nProvider setting up as window property, but window property name is empty or undefined.";
                }
                window[L10n.Config.WindowPartProperty] = L10n.Config.L10nProvider;
            }
        }
        L10n.Setup = Setup;
    })(L10n = f14.L10n || (f14.L10n = {}));
})(f14 || (f14 = {}));

"use strict";
var f14;
(function (f14) {
    var L10n;
    (function (L10n) {
        var Tests;
        (function (Tests) {
            var DefaultL10nProviderTest = (function () {
                function DefaultL10nProviderTest() {
                    this._providerPropName = "l10nProvider";
                    f14.L10n.Setup({
                        DefaultLocale: 'fr'
                    });
                    this.AddData();
                    this.PrintStringKeys();
                    this.AddEventListeners();
                }
                DefaultL10nProviderTest.prototype.GetProvider = function () {
                    return window[this._providerPropName];
                };
                DefaultL10nProviderTest.prototype.AddData = function () {
                    var provider = this.GetProvider();
                    provider.AddLocale("ru", {
                        "test.hello.world": "Привет мир!",
                        "test.title.download.counter": "Счетчик загрузок",
                    });
                    provider.AddLocale("en", {
                        "test.hello.world": "Hello world!",
                        "test.title.download.counter": "Download counter",
                        "test.en.locale.value": "String value for en locale only.",
                        "test.non.ru.value": "RU locale does not contain this string.",
                    });
                    provider.AddLocale("fr", {
                        "test.hello.world": "Bonjour le monde!",
                        "test.title.download.counter": "Compteur de téléchargement",
                        "test.non.ru.value": "RU locale ne contient pas cette chaîne.",
                    });
                };
                DefaultL10nProviderTest.prototype.PrintStringKeys = function () {
                    var provider = this.GetProvider();
                    var locales = provider.GetLocales();
                    var keys = {};
                    for (var i in locales) {
                        var loc = locales[i];
                        for (var j in loc) {
                            if (keys[j]) {
                                keys[j] = keys[j] + "," + i;
                            }
                            else {
                                keys[j] = i;
                            }
                        }
                    }
                    var keyTable = document.querySelector("#key_table");
                    if (keyTable) {
                        for (var i in keys) {
                            var row = keyTable.insertRow();
                            var cell_key = row.insertCell(0);
                            var cell_supported_locs = row.insertCell(1);
                            cell_key.appendChild(document.createTextNode(i));
                            cell_supported_locs.appendChild(document.createTextNode(keys[i]));
                        }
                    }
                };
                DefaultL10nProviderTest.prototype.AddEventListeners = function () {
                    var _this = this;
                    var getLocBtn = document.querySelector("#get_loc_string");
                    if (getLocBtn) {
                        getLocBtn.addEventListener('click', function (e) {
                            var provider = _this.GetProvider();
                            var inputValue = document.querySelector("#input_string_key").value;
                            var localizedString = provider.GetString(inputValue);
                            if (localizedString) {
                                document.querySelector("#output_localized_string").appendChild(_this.CreateItem("[navigator.language: " + navigator.language + "] " + localizedString));
                            }
                            else {
                                document.querySelector("#output_localized_string").appendChild(_this.CreateItem("No localized string for key: " + inputValue));
                            }
                        }, false);
                    }
                };
                DefaultL10nProviderTest.prototype.CreateItem = function (text) {
                    var item = document.createElement("div");
                    item.innerHTML = text;
                    return item;
                };
                return DefaultL10nProviderTest;
            }());
            Tests.DefaultL10nProviderTest = DefaultL10nProviderTest;
        })(Tests = L10n.Tests || (L10n.Tests = {}));
    })(L10n = f14.L10n || (f14.L10n = {}));
})(f14 || (f14 = {}));
