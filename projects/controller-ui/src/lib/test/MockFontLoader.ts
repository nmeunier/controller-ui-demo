export class MockFontLoader {

    public load(fontName: string, fontProvider: string): Promise<string> {
        return Promise.resolve('loaded');

    }
}
