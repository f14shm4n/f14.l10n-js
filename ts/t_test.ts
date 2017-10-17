namespace f14.L10n.Tests {

    export class DefaultL10nProviderTest {
        private _providerPropName: string = "l10nProvider";

        constructor() {
            let settings = new Configuration();
            //settings.DefaultLocale = 'fr';
            //f14.L10n.Setup(settings);

            this.AddData();
            this.PrintStringKeys();
            this.AddEventListeners();
        }

        public GetProvider(): IL10NProvider {            
            return f14.L10n.Localizer();
        }

        protected AddData() {
            let provider = this.GetProvider();

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
        }

        protected PrintStringKeys() {
            let provider = this.GetProvider();
            let locales = provider.GetLocales();
            let keys: IMap<string> = {};

            for (let i in locales) {
                let loc = locales[i];
                for (let j in loc) {
                    if (keys[j]) {
                        keys[j] = keys[j] + "," + i;
                    } else {
                        keys[j] = i;
                    }
                }
            }

            let keyTable = document.querySelector("#key_table") as HTMLTableElement;
            if (keyTable) {
                for (let i in keys) {
                    let row = keyTable.insertRow();
                    let cell_key = row.insertCell(0);
                    let cell_supported_locs = row.insertCell(1);

                    cell_key.appendChild(document.createTextNode(i));
                    cell_supported_locs.appendChild(document.createTextNode(keys[i]));
                }
            }
        }

        protected AddEventListeners() {
            let getLocBtn = document.querySelector("#get_loc_string") as HTMLButtonElement;
            if (getLocBtn) {
                getLocBtn.addEventListener('click', e => {
                    let provider = this.GetProvider();
                    let inputValue = (document.querySelector("#input_string_key") as HTMLInputElement).value;
                    let localizedString = provider.GetString(inputValue);

                    if (localizedString) {
                        document.querySelector("#output_localized_string").appendChild(this.CreateItem(`[navigator.language: ${navigator.language}] ${localizedString}`));
                    } else {
                        document.querySelector("#output_localized_string").appendChild(this.CreateItem("No localized string for key: " + inputValue));
                    }
                }, false);
            }
        }

        private CreateItem(text: string): HTMLElement {
            let item = document.createElement("div") as HTMLDivElement;
            item.innerHTML = text;
            return item;
        }
    }
}