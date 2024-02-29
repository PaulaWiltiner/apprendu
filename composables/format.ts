// // import katex from "katex";

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
// }

// useMathJax.ts
// import { useHead } from "@nuxtjs/composition-api";

// export default function useMathJax() {
// useHead(() => ({
//     script: [
//       {
//         src: "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS_HTML",
//         async: true,
//         defer: true,
//       },
//     ],
//   }));

//   return window.MathJax;
// }
