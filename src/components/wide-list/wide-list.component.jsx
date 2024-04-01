import { useEffect, useState, useRef, createRef } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { TextField } from "@mui/material";

import "./wide-list.component.scss";

export default function WideList({ value, onChange }) {
  const [showingIndex, setShowingIndex] = useState(0);
  const [aspectRatios, setAspectRatios] = useState({});
  const sectionRefs = useRef(value.content.map(() => createRef()));

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
    scrollToSection(0);
  }, [value]);

  useEffect(() => {
    scrollToSection(showingIndex);
  }, [showingIndex]);

  function incrementShowingIndex() {
    setShowingIndex((showingIndex + 1) % value.content.length);
  }

  function decrementShowingIndex() {
    if (showingIndex - 1 < 0) {
      return setShowingIndex(4);
    }
    setShowingIndex((showingIndex - 1) % value.content.length);
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
    <>
      <TextField
        fullWidth
        multiline
        rows={6}
        dense
        value={value.content.join("\n")}
        onChange={(e) => {
          const newContent = e.target.value.trim().split("\n");
          onChange({ ...value, content: newContent });
        }}
        size="small"
      />
      <div className="wide-list">
        <div
          className="wide-list-items"
          ref={scrollerRef}
          style={{
            aspectRatio: aspectRatios[showingIndex],
          }}
        >
          {value.content.map((item, index) => (
            <img
              onLoad={(e) => {
                setAspectRatios((oldAspectRatios) => {
                  oldAspectRatios[index] =
                    e.target.naturalWidth / e.target.naturalHeight;
                  return oldAspectRatios;
                });
              }}
              ref={sectionRefs.current[index]}
              className="wide-list-item"
              src={item}
              style={{
                aspectRatio: aspectRatios[index],
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
                "wide-list-marker" + (index === showingIndex ? " selected" : "")
              }
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}
