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

    public load(fontName: string, fontProvider: string): Promise<string> {

        if (typeof this.availableFont[fontName] === 'undefined') {
            this.availableFont[fontName] = false; // False flag = loading
            return this.loadFont(fontName, fontProvider);
        } else if (this.availableFont[fontName] === true) {
            return Promise.resolve(fontName);
        } else {
            const p: Promise<string> = new Promise((resolve) => {
                this.onFontReady.subscribe((fName) => {
                    if (fName === fontName) {
                        return resolve(fontName);
                    }
                });
            });
            this.waitLoad[fontName] = p;
            return p;
        }

    }


    private loadFont(fontName: string, fontProvider: string): Promise<string> {
        return new Promise((resolve) => {
            const fontLoaderConfig = {
                timeout: 2000,
                active: () => {
                    this.onFontLoaded(fontName);
                    resolve(fontName);
                }
            };
            fontLoaderConfig[fontProvider] = {
                families: [fontName]
            };

            WebFont.load(fontLoaderConfig);
        });
    }

    private onFontLoaded(fontName: string) {
        this.onFontReady.emit(fontName);
        return this.availableFont[fontName] = true;
    }
}
