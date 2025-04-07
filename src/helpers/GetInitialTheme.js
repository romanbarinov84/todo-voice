
 export function getInitialTheme() {
    const savedTheme = localStorage.getItem("theme");
    const preferDark = window.matchMedia(
      "(prefer-color-scheme : dark)"
    ).matches;

    if (savedTheme) {
      return savedTheme;
    } else if (preferDark) {
      return "dark";
    } else {
      const hours = new Date().getHours();
      return hours < 6 || hours > 20 ? "dark" : "light";
    }
  }
