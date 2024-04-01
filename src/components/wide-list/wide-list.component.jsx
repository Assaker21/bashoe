import { useEffect, useState, useRef, createRef } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "./wide-list.component.scss";

export default function WideList({ value }) {
  const [showingIndex, setShowingIndex] = useState(0);
  const [id, setId] = useState(Math.random());
  const [aspectRatios, setAspectRatios] = useState({});

  const sectionRefs = useRef(
    (value?.content || [1, 2, 3, 4, 5]).map(() => createRef())
  );
  const scrollerRef = useRef();
  const timerRef = useRef();

  function resetTimeout() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timerRef.current = setTimeout(() => incrementShowingIndex(), 5000);

    return () => {
      resetTimeout();
    };
  }, [value, showingIndex]);

  useEffect(() => {
    scrollToSection(showingIndex);
  }, [showingIndex]);

  useEffect(() => {
    scrollToSection(showingIndex);
  }, [aspectRatios]);

  useEffect(() => {
    scrollToSection(0);
  }, [aspectRatios, value]);

  function incrementShowingIndex() {
    setShowingIndex((showingIndex + 1) % value?.content?.length);
  }

  function decrementShowingIndex() {
    if (showingIndex - 1 < 0) {
      return setShowingIndex(value?.content?.length - 1);
    }
    setShowingIndex((showingIndex - 1) % value?.content?.length);
  }

  function scrollToSection(index) {
    if (scrollerRef.current) {
      var fullWidth = 0;
      sectionRefs.current.map((c, i) => {
        if (i < index) {
          fullWidth += c.current.clientWidth;
        }
      });
      scrollerRef.current.scrollLeft = fullWidth;
    }
  }

  return (
    <div className="wide-list">
      {value?.content ? (
        <>
          <div
            className="wide-list-items"
            ref={scrollerRef}
            style={{
              aspectRatio: 3.16455 || aspectRatios[showingIndex] || 3.16455,
            }}
          >
            {value?.content?.map((v, index) => (
              <img
                onLoad={(e) => {
                  setAspectRatios((oldAspectRatios) => {
                    oldAspectRatios[index] =
                      e.target.naturalWidth / e.target.naturalHeight;
                    return oldAspectRatios;
                  });
                }}
                key={"images " + index + id}
                ref={sectionRefs.current[index]}
                className="wide-list-item"
                src={v}
                style={{
                  aspectRatio: 3.16455 || aspectRatios[index] || 3.16455,
                  minWidth: scrollerRef.current?.clientWidth,
                }}
              />
            ))}
          </div>
          <div className="wide-list-buttons">
            {showingIndex > 0 && (
              <IconButton
                className="wide-list-button wide-list-button-left"
                onClick={decrementShowingIndex}
              >
                <ArrowBackIcon sx={{ color: "var(--text-color)" }} />
              </IconButton>
            )}
            {showingIndex < value?.content?.length - 1 && (
              <IconButton
                className="wide-list-button wide-list-button-right"
                onClick={incrementShowingIndex}
              >
                <ArrowForwardIcon sx={{ color: "var(--text-color)" }} />
              </IconButton>
            )}
          </div>
          <div className="wide-list-markers">
            {value?.content?.map((v, index) => (
              <div
                onClick={() => {
                  setShowingIndex(index);
                }}
                className={
                  "wide-list-marker" +
                  (index === showingIndex ? " selected" : "")
                }
              ></div>
            ))}
          </div>
        </>
      ) : (
        <Skeleton height="300px" />
      )}
    </div>
  );
}
