/**
 * useSmoothScroll - smooth-scrolls to a section by id.
 * Offset for the fixed nav is handled via `scroll-padding-top` in index.css.
 */
export const useSmoothScroll = () => {
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return scrollToElement;
};
