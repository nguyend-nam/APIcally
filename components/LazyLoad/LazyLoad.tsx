import React, { LegacyRef, ReactElement, RefObject, useRef } from "react";
import { useInViewport } from "react-in-viewport";
import { WithChildren } from "../../types/common";

interface Props extends WithChildren<any> {
  suspense: ReactElement;
  className?: string;
}

export const LazyLoad = ({ children, suspense, className }: Props) => {
  const lazyLoadRef = useRef() as LegacyRef<HTMLDivElement>;
  const { inViewport, enterCount } = useInViewport(
    lazyLoadRef as RefObject<HTMLElement>,
    {
      threshold: 0.5,
    }
  );

  return (
    <div className={className} ref={lazyLoadRef}>
      {!inViewport && enterCount === 0 ? suspense : children}
    </div>
  );
};
