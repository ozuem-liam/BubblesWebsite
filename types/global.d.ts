declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gmpx-place-autocomplete': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        autocomplete?: string;
        country?: string;
        style?: React.CSSProperties;
      };
    }
  }
}
export {}; 