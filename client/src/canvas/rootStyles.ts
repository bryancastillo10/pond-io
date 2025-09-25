const rootStyles = window.getComputedStyle(document.documentElement);

const bodyFont = rootStyles.getPropertyValue("--font-body");

const textColor = rootStyles.getPropertyValue("--color-text");

const labelFont = `16px ${bodyFont}`;
const pipeLabelFont = `14px ${bodyFont}`;

export { textColor, labelFont, pipeLabelFont };
