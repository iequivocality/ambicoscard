import type { ImgHTMLAttributes } from "react";

export type CardEntity = {
  name: string;
  key: string;
  front: {
    main: Pick<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes">;
    foil?: string;
  };
  back: {
    main: Pick<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes">;
    foil?: string;
  };
  preview: string;
  cellColor: string;
  sectionColor: string;
  backgroundColor: string;
};

export type CardSet = Record<string, CardEntity>;

export const CARDS: CardSet = {
  amelia: {
    name: "Casual Amelia Watson",
    key: "amelia",
    front: {
      main: {
        src: "/amelia/front/coscard_front_800.jpg",
        srcSet:
          "/amelia/front/coscard_front_288.jpg 288w, /amelia/front/coscard_front_400.jpg 400w",
        sizes: "(max-width: 48rem) 288px, 400px",
      },
      foil: 'url("./geometric.png")',
    },
    back: {
      main: {
        src: "/amelia/back/coscard_back_800.jpg",
        srcSet:
          "/amelia/back/coscard_back_288.jpg 288w, /amelia/back/coscard_back_400.jpg 400w",
        sizes: "(max-width: 48rem) 288px, 400px",
      },
      foil: 'url("./geometric.png")',
    },
    preview: "/amelia/preview.jpg",
    cellColor: "#f67e7d",
    sectionColor: "#ffb997",
    backgroundColor: "hsl(319, 16%, 39%)",
  },
  ganyu: {
    name: "City Pop Ganyu",
    key: "ganyu",
    front: {
      main: {
        src: "/ganyu/front/coscard_front_800.jpg",
        srcSet:
          "/ganyu/front/coscard_front_288.jpg 288w, /ganyu/front/coscard_front_400.jpg 400w",
        sizes: "(max-width: 48rem) 288px, 400px",
      },
      foil: 'url("./galaxy.jpg")',
    },
    back: {
      main: {
        src: "/ganyu/back/coscard_back_800.jpg",
        srcSet:
          "/ganyu/back/coscard_back_288.jpg 288w, /ganyu/back/coscard_back_400.jpg 400w",
        sizes: "(max-width: 48rem) 288px, 400px",
      },
      foil: 'url("./galaxy.jpg")',
    },
    preview: "/ganyu/preview.jpg",
    cellColor: "#E8EEF2",
    sectionColor: "#37393A",
    backgroundColor: "hsl(207, 24%, 82%)",
  },
};
