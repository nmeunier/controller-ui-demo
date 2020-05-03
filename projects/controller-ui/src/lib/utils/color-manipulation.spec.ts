import { ColorManipulation } from './color-manipulation';

describe('ColorManipulation', () => {
  it('should create an instance', () => {
    expect(new ColorManipulation()).toBeTruthy();
  });

  it('should parse color', () => {
    const parsedColor = ColorManipulation.parseColor('#ffffff');
    expect(parsedColor.r).toEqual(255);
    expect(parsedColor.g).toEqual(255);
    expect(parsedColor.b).toEqual(255);
  });

  it('should get text color black on white', () => {
    const txtColor = ColorManipulation.getColorText('#ffffff');
    expect(txtColor).toEqual('#000000');
  });

  it('should get text color white on black', () => {
    const txtColor = ColorManipulation.getColorText('#000000');
    expect(txtColor).toEqual('#ffffff');
  });

  it('should darker color', () => {
    const outputColor = ColorManipulation.colorLightDark('#ff0000', 50);
    expect(outputColor).toEqual('#ff3232');
  });

  it('should lighter color', () => {
    const outputColor = ColorManipulation.colorLightDark('#ff0000', -50);
    expect(outputColor).toEqual('#cd0000');
  });

  it('should darker color in rgba', () => {
    const outputColor = ColorManipulation.colorLightDark('#00ff00', 50, 0.5);
    expect(outputColor).toEqual('rgba(50, 50, 255, 0.5)');
  });

  it('should lighter color in rgba', () => {
    const outputColor = ColorManipulation.colorLightDark('#00ff00', -50, 0.5);
    expect(outputColor).toEqual('rgba(0, 0, 205, 0.5)');
  });

});

