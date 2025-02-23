import React, { useState, useRef, useEffect } from "react";

// Enhanced Draggable component with boundary checks
const Draggable = ({ children, style, ...props }) => {
    const [pos, setPos] = useState({ x: window.innerWidth - 340, y: 20 });
    const [dragging, setDragging] = useState(false);
    const [rel, setRel] = useState({ x: 0, y: 0 });
    const dragRef = useRef(null);
    const resizeObserver = useRef(null);
  
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  
    const calculateBoundaries = () => {
      if (!dragRef.current) return { maxX: 0, maxY: 0 };
      const rect = dragRef.current.getBoundingClientRect();
      return {
        maxX: window.innerWidth - rect.width,
        maxY: window.innerHeight - rect.height
      };
    };
  
    const onMouseDown = (e) => {
      if (e.button !== 0) return;
      const rect = dragRef.current.getBoundingClientRect();
      setDragging(true);
      setRel({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      e.stopPropagation();
      e.preventDefault();
    };
  
    const onMouseMove = (e) => {
      if (!dragging) return;
      const { maxX, maxY } = calculateBoundaries();
      
      const newX = clamp(e.clientX - rel.x, 0, maxX);
      const newY = clamp(e.clientY - rel.y, 0, maxY);
      
      setPos({ x: newX, y: newY });
      e.stopPropagation();
      e.preventDefault();
    };
  
    useEffect(() => {
      const handleResize = () => {
        const { maxX, maxY } = calculateBoundaries();
        setPos(prev => ({
          x: clamp(prev.x, 0, maxX),
          y: clamp(prev.y, 0, maxY)
        }));
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    useEffect(() => {
      if (dragging) {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", () => setDragging(false));
      }
      return () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", () => setDragging(false));
      };
    }, [dragging, rel]);
  
    return (
      <div
        ref={dragRef}
        onMouseDown={onMouseDown}
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          cursor: dragging ? "grabbing" : "grab",
          zIndex: 1000,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  };
export default Draggable;
