import React, { useRef, useEffect } from 'react'
import './SwipeableItem.css';

interface SwipeableItemProps {
    threshold?: number;
    background?: any;
    onSwipe?: any;
    children?: React.ReactNode;
}

const SwipeableItem: React.FC<SwipeableItemProps> = ({ threshold = 0.8, background, onSwipe, children }) => {
    const listElementRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const dragStartXRef = useRef(0);
    const leftRef = useRef(0);
    const draggedRef = useRef(false);
    const startTimeRef = useRef(0);
    const fpsIntervalRef = useRef(0);

    const onSwiped = () => {
        if (onSwipe) {
          onSwipe();
        }
    };

    const updatePosition = () => {
        if (draggedRef.current) requestAnimationFrame(updatePosition);

        const now = Date.now();
        const elapsed = now - startTimeRef.current;

        if (draggedRef.current && elapsed > fpsIntervalRef.current) {
          const listElement = listElementRef.current;
          const bg = backgroundRef.current;
          if (listElement) {
            listElement.style.transform = `translateX(${leftRef.current}px)`;
          }

          const opacity: number = Math.abs(leftRef.current) / 100;
          const opacityFixed: string = opacity.toFixed(2);
          if (bg) {
            if (opacity < 1 && opacityFixed !== bg.style.opacity) {
              bg.style.opacity = opacityFixed;
            }
            if (opacity >= 1) {
              bg.style.opacity = "1";
            }
          }

          startTimeRef.current = Date.now();
        }
    };

    const onDragStart = (clientX: number) => {
        draggedRef.current = true;
        dragStartXRef.current = clientX;
        if (listElementRef.current) {
          listElementRef.current.className = "ListItem";
        }
        requestAnimationFrame(updatePosition);
    };

    const onDragEnd = () => {
        if (draggedRef.current) {
          draggedRef.current = false;
          const elem = listElementRef.current;
          if (!elem) return;

          const leLeft = elem.offsetWidth * threshold * -1;
          if (leftRef.current < leLeft) {
            leftRef.current = - elem.offsetWidth * 2;
            onSwiped();
          } else {
            leftRef.current = 0;
          }
          elem.className = "BouncingListItem";
          elem.style.transform = `translateX(${leftRef.current}px)`;
        }
    };

    const onMouseMove = (evt: MouseEvent) => {
        const left: number = evt.clientX - dragStartXRef.current;
        if (left < 0) {
          leftRef.current = left;
        }
    };

    const onTouchMove = (evt: TouchEvent) => {
        const touch = evt.targetTouches[0];
        const left = touch.clientX - dragStartXRef.current;
        if (left < 0) {
          leftRef.current = left;
        }
    };

    const onDragEndMouse = () => {
        window.removeEventListener("mousemove", onMouseMove);
        onDragEnd();
    };

    const onDragEndTouch = () => {
        window.removeEventListener("touchmove", onTouchMove);
        onDragEnd();
    };

    const onDragStartMouse = (evt: React.MouseEvent) => {
        onDragStart(evt.clientX);
        window.addEventListener("mousemove", onMouseMove);
    };

    const onDragStartTouch = (evt: React.TouchEvent) => {
        const touch = evt.targetTouches[0];
        onDragStart(touch.clientX);
        window.addEventListener("touchmove", onTouchMove);
    };

    useEffect(() => {
        window.addEventListener("mouseup", onDragEndMouse);
        window.addEventListener("touchend", onDragEndTouch);
        return () => {
          window.removeEventListener("mouseup", onDragEndMouse);
          window.removeEventListener("touchend", onDragEndTouch);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <div className="Wrapper" ref={wrapperRef}>
              <div ref={backgroundRef} className="Background">
                {background
                  ? background
                  : <span>Delete</span>}
               </div>
                <div
                    ref={listElementRef}
                    onMouseDown={onDragStartMouse}
                    onTouchStart={onDragStartTouch}
                    className="ListItem">
                   {children}
               </div>
             </div>
        </>
    )
};

export default SwipeableItem;
