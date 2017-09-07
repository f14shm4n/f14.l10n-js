namespace f14.L10n {

    export interface IL10nProvider {
        AddLocale(localeKey: string, localeData: IMap<string>): void;
        GetString(stringKey: string): string;
        GetStringForLocale(localeKey: string, stringKey: string): string;
        GetLocales(): IMap<IMap<string>>;
    }

    export class DefaultL10nProvider implements IL10nProvider {
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

    export class Configuration {
        DEBUG?: boolean = false;
        DefaultLocale?: string;
        AsWindowPart?: boolean = true;
        WindowPartProperty?: string = "l10nProvider";
        L10nProvider?: IL10nProvider = new DefaultL10nProvider();
    }

    export var Config: Configuration = new Configuration();

    export function Setup(settings?: Configuration): void {
        if (settings) {
            for (let p in settings) {
                Config[p] = settings[p];
            }
        }

        if (!Config.L10nProvider) {
            console.log("L10nProvider is undefined or null. Create default l10nProvider.");
            Config.L10nProvider = new DefaultL10nProvider();
        }

        if (Config.AsWindowPart) {
            if (!Config.WindowPartProperty || Config.WindowPartProperty.length === 0) {
                throw "L10nProvider setting up as window property, but window property name is empty or undefined.";
            }
            window[Config.WindowPartProperty] = Config.L10nProvider;
        }
    }
}