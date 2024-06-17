import React, { useRef } from 'react';

const ScrollableContainer = ({ items, renderItem, maxVisibleItems }) => {
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMouseDown = (event) => {
    isDragging.current = true;
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.body.classList.remove('no-select');
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleDrag = (event) => {
    if (!isDragging.current) return;
    event.preventDefault();
    containerRef.current.scrollLeft -= event.movementX;
  };

  const handleTouchStart = (event) => {
    containerRef.current.dataset.scrollX = containerRef.current.scrollLeft;
    containerRef.current.dataset.clientX = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
    const scrollX = parseInt(containerRef.current.dataset.scrollX, 10);
    const clientX = containerRef.current.dataset.clientX;
    const newScrollLeft = scrollX - (event.touches[0].clientX - clientX);
    containerRef.current.scrollLeft = newScrollLeft;
  };

  return (
    <div
      className="flex overflow-x-auto space-x-2 !overflow-hidden p-2 w-full"
      style={{
        // maxWidth: `calc(120px * ${maxVisibleItems})`,
        overflowY: 'hidden',
      }}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {items.map((item, index) => renderItem(item, index))}
    </div>
  );
};

export default ScrollableContainer;
