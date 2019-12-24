/**
 * Signal if fixed bar should be displayed or not based on current scroll location
 *
 * @return  {boolean} Variable indicating if navbar should be displayed
 */
function shouldDisplayFixedNavbar() {
  try {
    const scrolledPastFirstSection =
      window.scrollY >= document.getElementsByTagName("section")[0].offsetTop;

    return scrolledPastFirstSection;
  } catch (e) {
    console.error("shouldDisplayNavbar", e);
    return false;
  }
}

export default { shouldDisplayFixedNavbar };
