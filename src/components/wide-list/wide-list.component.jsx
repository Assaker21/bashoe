import { useEffect, useState, useRef, createRef } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./wide-list.component.scss";

export default function WideList() {
  const [showingIndex, setShowingIndex] = useState(0);

  const sectionRefs = useRef(
    Array(5)
      .fill(null)
      .map(() => createRef())
  );

  const scrollerRef = useRef();

  useEffect(() => {
    scrollToSection(showingIndex);
  }, [showingIndex]);

  function incrementShowingIndex() {
    setShowingIndex((showingIndex + 1) % 5);
  }

  function decrementShowingIndex() {
    if (showingIndex - 1 < 0) {
      return setShowingIndex(4);
    }
    setShowingIndex((showingIndex - 1) % 5);
  }

  function scrollToSection(index) {
    if (scrollerRef.current) {
      scrollerRef.current.scrollLeft =
        sectionRefs.current[index].current.clientWidth * showingIndex;
    }
  }

  return (
    <div className="wide-list">
      <div className="wide-list-items" ref={scrollerRef}>
        {[1, 2, 3, 4, 5].map((value, index) => (
          <img
            ref={sectionRefs.current[index]}
            className="wide-list-item"
            src="https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=1&quality=80 1x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=2&quality=75 2x, https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt41bb7ee8a07ef84f/65d9985e4bb818ced9675d88/AJ1_High_Black_WhitePrimary_Desktop.jpg?auto=webp&format=pjpg&width=1246&dpr=3&quality=50 3x"
          />
        ))}
      </div>
      <div className="wide-list-buttons">
        <IconButton
          className="wide-list-button wide-list-button-left"
          onClick={decrementShowingIndex}
        >
          <ArrowBackIcon sx={{ color: "var(--text-color)" }} />
        </IconButton>
        <IconButton
          className="wide-list-button wide-list-button-right"
          onClick={incrementShowingIndex}
        >
          <ArrowForwardIcon sx={{ color: "var(--text-color)" }} />
        </IconButton>
      </div>
    </div>
  );
}
