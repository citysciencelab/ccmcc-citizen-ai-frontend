export const getCssVar = varName => window.getComputedStyle(document.body).getPropertyValue('--' + varName)
