import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";

import Highlight from "../Highlight/Highlight";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editabled/Editable";

import "./Bucket.css";

function Bucket(props) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="bucket">
      <div className="bucket_header">
        <p className="bucket_header_title">
          {props.bucket?.title}
          <span>{props.bucket?.highlights?.length || 0}</span>
        </p>
        <div
          className="bucket_header_title_more"
          onClick={() => setShowDropdown(true)}
        >
          <MoreHorizontal />
          {showDropdown && (
            <Dropdown
              class="bucket_dropdown"
              onClose={() => setShowDropdown(false)}
            >
              <p onClick={() => props.removeBucket()}>Delete Bucket</p>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="bucket_highlights custom-scroll">
        {props.bucket?.highlights?.map((item) => (
          <Highlight
            key={item.id}
            highlight={item}
            bucketId={props.bucket.id}
            removeHighlight={props.removeHighlight}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateHighlight={props.updateHighlight}
          />
        ))}
        <Editable
          text="+ Add Highlight"
          placeholder="Enter Highlight Title"
          displayClass="bucket_add-highlight"
          editClass="bucket_add-highlight_edit"
          onSubmit={(value) => props.addHighlight(props.bucket?.id, value)}
        />
      </div>
    </div>
  );
}

export default Bucket;
