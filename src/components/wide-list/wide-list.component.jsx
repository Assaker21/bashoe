import { useEffect, useState, useRef, createRef } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "./wide-list.component.scss";

export default function WideList({ value }) {
  const [showingIndex, setShowingIndex] = useState(0);

  const sectionRefs = useRef(
    (value?.content || [1, 2, 3, 4, 5]).map(() => createRef())
  );

  const scrollerRef = useRef();

  useEffect(() => {
    scrollToSection(showingIndex);
  }, [showingIndex]);

  function incrementShowingIndex() {
    setShowingIndex((showingIndex + 1) % value?.content?.length);
  }

  function decrementShowingIndex() {
    if (showingIndex - 1 < 0) {
      return setShowingIndex(4);
    }
    setShowingIndex((showingIndex - 1) % value?.content?.length);
  }

  function scrollToSection(index) {
    if (scrollerRef.current) {
      scrollerRef.current.scrollLeft =
        sectionRefs.current[index].current.clientWidth * showingIndex;
    }
  }

  return (
    <div className="wide-list">
      {value?.content ? (
        <>
          <div className="wide-list-items" ref={scrollerRef}>
            {value?.content?.map((v, index) => (
              <img
                ref={sectionRefs.current[index]}
                className="wide-list-item"
                src={v}
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
        </>
      ) : (
        <Skeleton height="300px" />
      )}
    </div>
  );
}
