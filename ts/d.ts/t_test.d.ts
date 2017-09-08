declare namespace f14.L10n.Tests {
    class DefaultL10nProviderTest {
        private _providerPropName;
        constructor();
        GetProvider(): IL10NProvider;
        protected AddData(): void;
        protected PrintStringKeys(): void;
        protected AddEventListeners(): void;
        private CreateItem(text);
    }
}
