import { Injectable, EventEmitter } from '@angular/core';
import * as WebFont from 'webfontloader';

@Injectable({
    providedIn: 'root'
})
export class FontLoaderService {

    private availableFont = {};
    private waitLoad = {};
    private onFontReady: EventEmitter<string>;

    constructor() {
        this.onFontReady = new EventEmitter();
    }

    public load(_fontName: string, _fontProvider: string): Promise<string> {

        if (typeof this.availableFont[_fontName] === 'undefined') {
            this.availableFont[_fontName] = false; // False flag = loading
            return this.loadFont(_fontName, _fontProvider);
        } else if (this.availableFont[_fontName] === true) {
            return Promise.resolve(_fontName);
        } else {
            const p: Promise<string> = new Promise((_resolve) => {
                this.onFontReady.subscribe((_fName) => {
                    if (_fName === _fontName) {
                        return _resolve(_fontName);
                    }
                });
            });
            this.waitLoad[_fontName] = p;
            return p;
        }

    }


    private loadFont(_fontName: string, _fontProvider: string): Promise<string> {
        return new Promise((_resolve, _reject) => {
            const fontLoaderConfig = {
                timeout: 2000,
                active: () => {
                    this.onFontLoaded(_fontName);
                    _resolve(_fontName);
                }
            };
            fontLoaderConfig[_fontProvider] = {
                families: [_fontName]
            };

            WebFont.load(fontLoaderConfig);
        });
    }

    private onFontLoaded(_fontName: string) {
        this.onFontReady.emit(_fontName);
        return this.availableFont[_fontName] = true;
    }
}
