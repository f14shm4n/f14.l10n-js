# f14.l10n-js

## What is it?

This library for creating localized string maps. 

Simply put, a localizer.

Lib writed on [Typescript](https://www.typescriptlang.org/). The library has its own namespace.

## Installing

npm: `npm install f14-l10n`

bower: `bower install f14-l10n`

**The output package also has the d.ts files for typescript using.**

## Using

By default l10n provider is already configured to use:

[TS] Create localized map and use it: 

```
            // Get l10nProvider
            let provider = f14.L10n.Localizer();
            
            // Create localized string map for 'ru'
            provider.AddLocale("ru", {
                "test.hello.world": "Привет мир!",
                "test.title.download.counter": "Счетчик загрузок",
            });
            
            // Create localized string map for 'en'
            provider.AddLocale("en", {
                "test.hello.world": "Hello world!",
                "test.title.download.counter": "Download counter",
                "test.en.locale.value": "String value for en locale only.",
                "test.non.ru.value": "RU locale does not contain this string.",
            });
            
            // Create localized string map for 'fr'
            provider.AddLocale("fr", {
                "test.hello.world": "Bonjour le monde!",
                "test.title.download.counter": "Compteur de téléchargement",
                "test.non.ru.value": "RU locale ne contient pas cette chaîne.",
            });
            
            // Create localized string map for '...'
            ......
            
            ......
            
            // Somewhere in the your codes
            // Get l10nProvider
            let provider = f14.L10n.Localizer();
            
            // Get localized string key from some input-control on the page
            let locKey = (document.querySelector("#input_string_key") as HTMLInputElement).value;
            
            // Retrieve localized string value from l10nProvider by given key
            let localizedString = provider.GetString(locKey);
```

[JS] Create localized map and use it: 

```
<script type="text/javascript">
        // Creates your localized maps
        // Get l10nProvider
        let l10n = f14.L10n.Localizer();
        
        // Create localized string map for 'ru'
        l10n.AddLocale("ru", {
            "test.hello.world": "Привет мир!",
            "test.title.download.counter": "Счетчик загрузок",
        });
        
        // Create localized string map for 'en'
        l10n.AddLocale("en", {
            "test.hello.world": "Hello world!",
            "test.title.download.counter": "Download counter",
            "test.en.locale.value": "String value for en locale only.",
            "test.non.ru.value": "RU locale does not contain this string.",
        });
        
        // Create localized string map for 'fru'
        l10n.AddLocale("fr", {
            "test.hello.world": "Bonjour le monde!",
            "test.title.download.counter": "Compteur de téléchargement",
            "test.non.ru.value": "RU locale ne contient pas cette chaîne.",
        });   
        
        .............
        
        // Somewhere in the your codes        
        var l10n = f14.L10n.Localizer();
        
        // Get key for localized string from any input-control on the page
        var locKey = document.querySelector("#input_string_key").value; 
        
         // Get localized string value         
        var localizedString = l10n.GetString(locKey);
        
        // Use your localized value
        ...
</script>
```

## Configuration

Also for the localizer some settings are defined:

[TS code]

```
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
         * Sets the IL10NProvider as window property with property name WindowPartProperty.
         */
        AsWindowPart?: boolean = false;
        /**
         * This name using if AsWindowPart is true. Default: l10nProvider.
         */
        WindowPartProperty?: string = "l10nProvider";
        /**
         * Specifed IL10NProvider. Default: DefaultL10NProvider.
         */
        L10nProvider?: IL10NProvider = new DefaultL10NProvider();
```

The explanations for `L10nSProvider` is a specific implementation of the IL10nProvider. You can create your own row provider using the provided basic interface, if needed.

In order to use the config you need to call the following method: 

[TS]

```
            let settings = new Configuration();
            settings.DefaultLocale = 'en';
            settings.AsWindowPart = true;
            ...
            f14.L10n.Setup(settings);
```

[JS]

```
            f14.L10n.Setup({
               DefaultLocale = 'en',
               AsWindowPart = true,
               ...
            });
```

## Dev

Source lang: [Typescript](https://www.typescriptlang.org/).

Editor/IDE: [VS Code](https://code.visualstudio.com/).

## Authors

* [f14shm4n](https://github.com/f14shm4n)

## License

[MIT](https://opensource.org/licenses/MIT)
