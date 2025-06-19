import type { ImgHTMLAttributes } from "react";

export type CardEntity = {
  front: {
    main: Pick<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes">;
  },
  back: {
    main: Pick<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes">;
  }
}

export type CardSet = Record<string, CardEntity>;

export const CARDS: CardSet = {
  AMELIA: {
    front: {
      main: {
        src: "/front/coscard_front_800.jpg",
        srcSet: "/front/coscard_front_288.jpg 288w, /front/coscard_front_400.jpg 400w",
        sizes: "(max-width: 48rem) 288px, 400px"
      },
    },
    back: {
      main: {
        src: "/back/coscard_back_800.jpg",
        srcSet: "/back/coscard_back_288.jpg 288w, /back/coscard_back_400.jpg 400w",
        sizes: "(max-width: 48rem) 288px, 400px"
      }
    }
  }
}