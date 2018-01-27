const Header1Size = 25;
const Header2Size = 20;
const Header3Size = 18;
const Header4Size = 16;
const FontSize = 20;
const HUDFontSize = 12;
const FontColor = '#ff00ff';
const FontStyle = 'Arial';
const ProgressBarForeground = '2B4666';
const ProgressBarBackground = 'B8DBF2';

export default class Settings {
  static Header1Size() {
    return Header1Size;
  }
  static Header2Size() {
    return Header2Size;
  }
  static Header3Size() {
    return Header3Size;
  }
  static Header4Size() {
    return Header4Size;
  }
  static HUDFontSize() {
    return HUDFontSize;
  }
  static FontSize() {
    return FontSize;
  }
  static FontColor() {
    return FontColor;
  }
  static FontStyle() {
    return FontStyle;
  }
  static ProgressBarBackground() {
    return ProgressBarBackground;
  }
  static ProgressBarForeground() {
    return ProgressBarForeground;
  }
}
