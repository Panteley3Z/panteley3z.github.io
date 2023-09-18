class ColorSchemeModel {
    csMode;
    getTMode() {return this.csMode}
    setTMode(m) {this.csMode = m}
}
export const colorScheme = new ColorSchemeModel();

const getCSData = () => JSON.parse(sessionStorage.getItem("colorScheme"));
const pushCSData = () => sessionStorage.setItem("colorScheme", JSON.stringify(colorScheme));

let parsedCScheme = getCSData();
!parsedCScheme ? setTheme("light") : setTheme(parsedCScheme.csMode);

export function setTheme(mode) {
    document.body.className = `body-${mode}`;
    if (colorScheme.getTMode() !== mode) {
        colorScheme.setTMode(mode);
        pushCSData()
    }
}