// custom.d.ts
declare namespace JSX {
    interface IntrinsicElements {
      'box-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        animation?: string;
        color?: string;
        size?: string;
        name?: string;
      };
    }
  }

declare module '*.png' {
    const value: string;
    export default value;
}