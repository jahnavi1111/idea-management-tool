import React, { useEffect, useState } from "react";

import Bucket from "./Components/Bucket/Bucket";

import "./App.css";
import Editable from "./Components/Editabled/Editable";

function App() {
  const [buckets, setBuckets] = useState(
    JSON.parse(localStorage.getItem("jahnavi-tool")) || []
  );

  const [targetHighlight, setTargetHighlight] = useState({
    bid: "",
    cid: "",
  });

  const addbucketHandler = (name) => {
    const tempBuckets = [...buckets];
    tempBuckets.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      highlights: [],
    });
    setBuckets(tempBuckets);
  };

  const removeBucket = (id) => {
    const index = buckets.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBuckets = [...buckets];
    tempBuckets.splice(index, 1);
    setBuckets(tempBuckets);
  };

  const addHighlightHandler = (id, title) => {
    const index = buckets.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBuckets = [...buckets];
    tempBuckets[index].highlights.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      tasks: [],
    });
    setBuckets(tempBuckets);
  };

  const removeHighlight = (bid, cid) => {
    const index = buckets.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBuckets = [...buckets];
    const highlights = tempBuckets[index].highlights;

    const highlightIndex = highlights.findIndex((item) => item.id === cid);
    if (highlightIndex < 0) return;

    highlights.splice(highlightIndex, 1);
    setBuckets(tempBuckets);
  };

  const dragEnded = (bid, cid) => {
    let s_bucketIndex, s_highlightIndex, t_bucketIndex, t_highlightIndex;
    s_bucketIndex = buckets.findIndex((item) => item.id === bid);
    if (s_bucketIndex < 0) return;

    s_highlightIndex = buckets[s_bucketIndex]?.highlights?.findIndex(
      (item) => item.id === cid
    );
    if (s_highlightIndex < 0) return;

    t_bucketIndex = buckets.findIndex((item) => item.id === targetHighlight.bid);
    if (t_bucketIndex < 0) return;

    t_highlightIndex = buckets[t_bucketIndex]?.highlights?.findIndex(
      (item) => item.id === targetHighlight.cid
    );
    if (t_highlightIndex < 0) return;

    const tempBuckets = [...buckets];
    const sourceHighlight = tempBuckets[s_bucketIndex].highlights[s_highlightIndex];
    tempBuckets[s_bucketIndex].highlights.splice(s_highlightIndex, 1);
    tempBuckets[t_bucketIndex].highlights.splice(t_highlightIndex, 0, sourceHighlight);
    setBuckets(tempBuckets);

    setTargetHighlight({
      bid: "",
      cid: "",
    });
  };

  const dragEntered = (bid, cid) => {
    if (targetHighlight.cid === cid) return;
    setTargetHighlight({
      bid,
      cid,
    });
  };

  const updateHighlight = (bid, cid, highlight) => {
    const index = buckets.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBuckets = [...buckets];
    const highlights = tempBuckets[index].highlights;

    const highlightIndex = highlights.findIndex((item) => item.id === cid);
    if (highlightIndex < 0) return;

    tempBuckets[index].highlights[highlightIndex] = highlight;

    setBuckets(tempBuckets);
  };

  useEffect(() => {
    localStorage.setItem("jahnavi-tool", JSON.stringify(buckets));
  }, [buckets]);

  return (
    <div className="app">
      {/* <div className="app_nav">
        <h1>.</h1>
      </div> */}
      <div className="app_buckets_container">
        <div className="app_buckets">
          {buckets.map((item) => (
            <Bucket
              key={item.id}
              bucket={item}
              addHighlight={addHighlightHandler}
              removeBucket={() => removeBucket(item.id)}
              removeHighlight={removeHighlight}
              dragEnded={dragEnded}
              dragEntered={dragEntered}
              updateHighlight={updateHighlight}
            />
          ))}
          <div className="app_buckets_last">
            <Editable
              displayClass="app_buckets_add-bucket"
              editClass="app_buckets_add-bucket_edit"
              placeholder="Enter Bucket Name"
              text="Add Bucket"
              buttonText="Add Bucket"
              onSubmit={addbucketHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
