import { useEffect, useRef, memo } from "react";
import debounceCreater from "../../utils/debounceCreater";
import Button from "./BUtton";

const HorizontalCarousel = memo(({
  heading = null,
  margin_bottom = 0,
  dataToMap,
  Card,
  autoScrollWidth = 300,
}) => {
  const clicked = useRef(false);
  const direction = useRef(1);
  const rightBtnRef = useRef(null);
  const leftBtnRef = useRef(null);
  const containerRef = useRef(null);

  const debouncedHandleRightClick = useRef(debounceCreater(handleRightClick, 100));
  const debouncedHandleLeftClick = useRef(debounceCreater(handleLeftClick, 100));

  function handleScroll() {
    const container = containerRef.current;
    if (!container) return

    const clientWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const viewed = clientWidth + scrollLeft;

    if (viewed >= scrollWidth) {
      rightBtnRef.current.disabled = true;
    }

    if (!(scrollLeft > 0)) {
      leftBtnRef.current.disabled = true;
    }

    if (scrollLeft == 0 && clientWidth === scrollWidth) {
      rightBtnRef.current.hidden = true;
      leftBtnRef.current.hidden = true;
      setHideScrollBar(true)
    }
  }

  function handleRightClick() {
    clicked.current = true;

    const container = containerRef.current;
    if (!container) return;

    container.scrollBy({
      left: 600,
      behavior: "smooth",
    });
  }

  function handleLeftClick(e) {
    rightBtnRef.current.disabled = false;
    clicked.current = true;

    const container = containerRef.current;
    if (!container) return;

    container.scrollBy({
      left: -600,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="flex justify-between flex-wrap items-center" style={{ marginBottom: margin_bottom }}>
        {heading && (
          <h2 className="text-xl md:text-2xl tracking-wide font-medium mb-4">
            {heading}
          </h2>
        )}
        <div className={`flex justify-between gap-1 ${!heading && "ml-auto"}`}>
          <Button
            ref={leftBtnRef}
            clickHandler={debouncedHandleLeftClick.current}
            iconClass="left"
          />
          <Button
            ref={rightBtnRef}
            clickHandler={debouncedHandleRightClick.current}
            iconClass="right"
          />
        </div>
      </div>
      <div className="relative">
        <div
          onScroll={handleScroll}
          ref={containerRef}
          className="flex justify-start gap-3 md:gap-7 overflow-y-visible overflow-x-auto scrollbar-hide py-2"
          onTouchEnd={() => clicked.current = true}
        >
          {dataToMap.map((video) => <Card key={video.id} object={video} />)}
        </div>
      </div>
    </>
  );
});

export default HorizontalCarousel;
