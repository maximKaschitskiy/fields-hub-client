import React from "react";
import { nanoid } from "nanoid";
import {
  filterObjKey,
  filterArray,
  editObjVal,
  addToArr,
  getByPath,
  objInclude,
  objEmpty,
} from "../utils/editObj";

const Config = ({ matchedPath }) => {
  const pathKeys = Object.keys(matchedPath); //Array from MOGRT names
  console.log(matchedPath);
  return (
    <div className="selected-items__wrapper" key={nanoid()}>
      <ul className="selected-items__list">
        <div className="selected-items__list-wrapper">
          <label htmlFor="config">Config:</label>
          <textarea id="config" rows="4" cols="50">
            {JSON.stringify(matchedPath)}
          </textarea>
        </div>
      </ul>
    </div>
  );
};

export { Config };
