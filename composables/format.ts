

export function useFormat() {
  function formatParagraph(text: string) {
    return text.replace(/\$\$(.*?)\$\$/g, (_, formula) => {
      return `<vue-mathjax :formula="'$$ \frac{8}{100}\ =\ \ 0,08 $$'"></vue-mathjax>`;
    });
  }

  return {
    formatParagraph,
  };
}
