import { useEffect, useState, useRef, createRef } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { TextField } from "@mui/material";

import "./wide-list.component.scss";

export default function WideList({ value, onChange }) {
  const [showingIndex, setShowingIndex] = useState(0);

  const sectionRefs = useRef(value.content.map(() => createRef()));

  const scrollerRef = useRef();

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
      scrollerRef.current.scrollLeft =
        sectionRefs.current[index].current.clientWidth * showingIndex;
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
        <div className="wide-list-items" ref={scrollerRef}>
          {value.content.map((item, index) => (
            <img
              ref={sectionRefs.current[index]}
              className="wide-list-item"
              src={item}
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
    </>
  );
}
