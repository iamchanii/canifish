/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FC, useEffect, useRef } from 'react';
import colors from '../styles/colors';

export interface ImageProps {
  src: string;
  alt: string;
}

const Image: FC<ImageProps> = ({ src, alt }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const loadImage = (imageElement: HTMLImageElement) => {
      imageElement.src = imageElement.dataset.src;
      imageElement.classList.add('loaded');
    };

    if ('IntersectionObserver' in window) {
      const intersectionCallback: IntersectionObserverCallback = (
        [entry],
        observer,
      ) => {
        if (entry.isIntersecting) {
          loadImage(entry.target as HTMLImageElement);
          observer.unobserve(entry.target);
        }
      };

      const observer = new IntersectionObserver(intersectionCallback);
      observer.observe(imageRef.current);

      return () => observer?.disconnect();
    }

    loadImage(imageRef.current);
  }, []);

  return (
    <figure css={style}>
      <img ref={imageRef} data-src={src} alt={alt} />
    </figure>
  );
};

const style = css`
  width: 3rem;
  min-width: 3rem;
  height: 3rem;
  background-color: ${colors.imageBgColor};
  border-radius: 9999px;
  margin: 0 0.5rem 0 0;

  > img {
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 200ms ease-out;

    &.loaded {
      opacity: 1;
    }
  }
`;

Image.displayName = 'Image';

export default Image;
