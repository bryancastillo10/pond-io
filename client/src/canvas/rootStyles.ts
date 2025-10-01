const rootStyles = window.getComputedStyle(document.documentElement);

const bodyFont = rootStyles.getPropertyValue("--font-body");

function getTextColor(isDarkMode: boolean) {
  const styles = window.getComputedStyle(document.documentElement);
  return isDarkMode
    ? styles.getPropertyValue("--color-dark-text").trim()
    : styles.getPropertyValue("--color-text").trim();
}

const labelFont = `20px ${bodyFont}`;
const pipeLabelFont = `20px ${bodyFont}`;

export { getTextColor, labelFont, pipeLabelFont };
