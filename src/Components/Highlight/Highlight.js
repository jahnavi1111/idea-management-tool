import React, { useState } from "react";
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";

import Dropdown from "../Dropdown/Dropdown";

import "./Highlight.css";
import HighlightInfo from "./HighlightInfo/HighlightInfo";

function Highlight(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { id, title, date, tasks, labels } = props.highlight;

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (!date) return "";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Aprl",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    return day + " " + month;
  };

  return (
    <>
      {showModal && (
        <HighlightInfo
          onClose={() => setShowModal(false)}
          highlight={props.highlight}
          bucketId={props.bucketId}
          updateHighlight={props.updateHighlight}
        />
      )}
      <div
        className="highlight"
        draggable
        onDragEnd={() => props.dragEnded(props.bucketId, id)}
        onDragEnter={() => props.dragEntered(props.bucketId, id)}
        onClick={() => setShowModal(true)}
      >
        <div className="highlight_top">
          <div className="highlight_top_labels">
            {labels?.map((item, index) => (
              <label key={index} style={{ backgroundColor: item.color }}>
                {item.text}
              </label>
            ))}
          </div>
          <div
            className="highlight_top_more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                class="bucket_dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => props.removeHighlight(props.bucketId, id)}>
                  Delete
                </p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="highlight_title">{title}</div>
        <div className="highlight_footer">
          {date && (
            <p className="highlight_footer_item">
              <Clock className="highlight_footer_icon" />
              {formatDate(date)}
            </p>
          )}
          {tasks && tasks?.length > 0 && (
            <p className="highlight_footer_item">
              <CheckSquare className="highlight_footer_icon" />
              {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Highlight;
