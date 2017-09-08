namespace f14.L10n {

    /**
     * The key-value object.
     */
    export interface IMap<V> {
        [key: string]: V;
    }

    /**
     * Provides commons methods to add and get the localized strings.
     */
    export interface IL10NProvider {
        /**
         * Adds the localized data for the specified locale name.
         * @param localeKey A String, representing the language version of the browser. ("en", "en-US", "de", "fr", etc.)
         * @param localeData The localized map. Key is string key; Value is localized string value.
         */
        AddLocale(localeKey: string, localeData: IMap<string>): void;
        /**
         * Returns a localized string for the given key.
         * @param stringKey A String key.
         */
        GetString(stringKey: string): string;
        /**
         * Returns a localized string for the given key and the specified locale.
         * @param localeKey A String, representing the language version of the browser. ("en", "en-US", "de", "fr", etc.)
         * @param stringKey A String key.
         */
        GetStringForLocale(localeKey: string, stringKey: string): string;
        /**
         * Returns the locales map.
         */
        GetLocales(): IMap<IMap<string>>;
    }

    class DefaultL10NProvider implements IL10NProvider {
        private _locales: IMap<IMap<string>> = {};
        private _currentLang: string = navigator.language;

        AddLocale(localeKey: string, localeData: IMap<string>): void {
            // Createss new locale if not exist.
            if (!this._locales[localeKey]) {
                this._locales[localeKey] = {};
            }

            // Get locale for given locale key.
            let currentLocalData = this._locales[localeKey];
            // Apply given locale data to existing.
            for (let key in localeData) {
                currentLocalData[key] = localeData[key];
            }
        }

        GetString(stringKey: string): string {
            return this.GetStringForLocale(this._currentLang, stringKey);
        }

        GetStringForLocale(localeKey: string, stringKey: string): string {
            // Tries to find target string for the given local key.
            let stringData = this.getLocalizedString(localeKey, stringKey);
            if (stringData) {
                return stringData;
            }

            // Tries to find target string for the local key by default.
            if (Config.DefaultLocale) {
                stringData = this.getLocalizedString(Config.DefaultLocale, stringKey);
                if (stringData) {
                    return stringData;
                }
            }

            // Tries to find target string in all available locales.
            for (let lk in this._locales) {
                stringData = this.getLocalizedString(lk, stringKey);
                if (stringData) {
                    return stringData;
                }
            }
        }

        GetLocales(): IMap<IMap<string>> {
            return this._locales;
        }

        private getLocalizedString(localeKey: string, stringKey: string): string {
            if (this._locales[localeKey]) {
                return this._locales[localeKey][stringKey];
            }
        }
    }
    /**
     * Configuration for f14-l10n.
     */
    export class Configuration {
        /**
         * Trun on\off debug mode. Default: false.
         */
        DEBUG?: boolean = false;
        /**
         * Setup default locale name. 
         * If a localized string is not found for the current locale, it will search in the default locale.
         */
        DefaultLocale?: string;
        /**
         * Sets the IL10NProvider as window property with property name WindowPartProperty. Default: true.
         */
        AsWindowPart?: boolean = true;
        /**
         * This name using if AsWindowPart is true. Default: l10nProvider.
         */
        WindowPartProperty?: string = "l10nProvider";
        /**
         * Specifed IL10NProvider. Default: DefaultL10NProvider.
         */
        L10nProvider?: IL10NProvider = new DefaultL10NProvider();
    }

    /**
     * Configuration instance.
     */
    export var Config: Configuration = new Configuration();
    /**
     * Setup the L10NProvider.
     * @param settings User configuration.
     */
    export function Setup(settings?: Configuration): void {
        if (settings) {
            for (let p in settings) {
                Config[p] = settings[p];
            }
        }

        if (!Config.L10nProvider) {
            console.log("L10nProvider is undefined or null. Create default l10nProvider.");
            Config.L10nProvider = new DefaultL10NProvider();
        }

        if (Config.AsWindowPart) {
            if (!Config.WindowPartProperty || Config.WindowPartProperty.length === 0) {
                throw "L10nProvider setting up as window property, but window property name is empty or undefined.";
            }
            window[Config.WindowPartProperty] = Config.L10nProvider;
        }
    }
}