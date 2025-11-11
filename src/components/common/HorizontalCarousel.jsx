import { useRef, memo, useEffect, useState } from "react";
import debounceCreater from "../../utils/debounceCreater";
import Button from "./Button";

const HorizontalCarousel = memo(({
  heading = null,
  margin_bottom = 0,
  dataToMap,
  Card,
}) => {
  const [disableLeft, setDisableLeft] = useState(false);
  const [disableRight, setDisableRight] = useState(false);

  const clicked = useRef(false);
  const rightBtnRef = useRef(null);
  const leftBtnRef = useRef(null);
  const containerRef = useRef(null);

  const debouncedHandleRightClick = useRef(debounceCreater(handleRightClick, 100));
  const debouncedHandleLeftClick = useRef(debounceCreater(handleLeftClick, 100));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const clientWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;

    if (clientWidth === scrollWidth) {
      rightBtnRef.current.hidden = true;
      leftBtnRef.current.hidden = true;
    }
  }, [])

  function handleScroll() {
    const container = containerRef.current;
    if (!container) return

    const clientWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const viewed = clientWidth + scrollLeft;

    if (viewed >= scrollWidth) {
      setDisableRight(true);
    } else {
      setDisableRight(false);
    }

    if (!(scrollLeft > 0)) {
      setDisableLeft(true);
    } else {
      setDisableLeft(false);
    }
  }

  function handleRightClick() {
    const container = containerRef.current;
    if (!container) return;

    container.scrollBy({
      left: 600,
      behavior: "smooth",
    });
  }

  function handleLeftClick(e) {
    const container = containerRef.current;
    if (!container) return;

    container.scrollBy({
      left: -600,
      behavior: "smooth",
    });
  }

  return (
    <div className="overflow-auto scrollbar-hide w-full">
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
            isDisabled={disableLeft}
          />
          <Button
            ref={rightBtnRef}
            clickHandler={debouncedHandleRightClick.current}
            iconClass="right"
            isDisabled={disableRight}
          />
        </div>
      </div>
      <div className="relative">
        <div
          onScroll={handleScroll}
          ref={containerRef}
          className="w-full flex justify-start gap-3 md:gap-7 overflow-x-auto scrollbar-hide py-2"
        >
          {dataToMap.map((video) => <Card key={video.id} object={video} />)}
        </div>
      </div>
    </div>
  );
});

export default HorizontalCarousel;
