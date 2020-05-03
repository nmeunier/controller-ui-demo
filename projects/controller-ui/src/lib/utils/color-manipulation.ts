export class ColorManipulation {

    // Parse string color code and return values as object
    static parseColor(color: string) {
        const colorNum = (color.charAt(0) === '#') ? color.substring(1, 7) : color;
        return {
            r: parseInt(colorNum.substring(0, 2), 16), // hexToR
            g: parseInt(colorNum.substring(2, 4), 16), // hexToG
            b: parseInt(colorNum.substring(4, 6), 16) // hexToB
        };
    }

    // Find color for text from background color
    static getColorText(color: string) {

        const parsedColor = this.parseColor(color);
        return (((parsedColor.r * 0.299) + (parsedColor.g * 0.587) + (parsedColor.b * 0.114)) > 186) ? '#000000' : '#ffffff';

    }

    // Apply value to lighter and lower a color
    static colorLightDark(colorCode: string, amount: number, rgba?: number) {

        if (colorCode[0] === '#') {
            colorCode = colorCode.slice(1);
        }

        const num = parseInt(colorCode, 16);

        // tslint:disable-next-line:no-bitwise
        let r = (num >> 16) + amount;

        if (r > 255) {
            r = 255;
        } else if (r < 0) {
            r = 0;
        }

        // tslint:disable-next-line:no-bitwise
        let b = ((num >> 8) & 0x00FF) + amount;

        if (b > 255) {
            b = 255;
        } else if (b < 0) {
            b = 0;
        }

        // tslint:disable-next-line:no-bitwise
        let g = (num & 0x0000FF) + amount;

        if (g > 255) {
            g = 255;
        } else if (g < 0) {
            g = 0;
        }

        if (rgba) {
            return `rgba(${r}, ${g}, ${b}, ${rgba})`;
        } else {
            // tslint:disable-next-line:no-bitwise
            return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
        }

    }

}
