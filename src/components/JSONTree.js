import React from 'react';
import {nanoid} from 'nanoid';
import {filterObjKey, filterArray, editObjVal, addToArr, getByPath, objInclude, objEmpty} from '../utils/editObj';
import Arrow from '../static/next-arrow-7-svgrepo-com.svg';


const JSONTree = ({mainUrl, obj, mainIndex, handleExpand, expandObj, handleSetSelectedAPIItems}) => {
    const origObj = obj;    
    const createTree = (obj, currentPath) => {
      return (
        Object.keys(obj).map((item, index) => {
          const itemPath = [...currentPath, item];
            if (typeof obj[item] === "object" && obj[item] !== null) {
              const isExpanded = expandObj?.[mainUrl]?.[mainIndex]?.[itemPath.join('/')] || false;
              return (
                <ul className="json-tree__list" key={nanoid()} data-key={item}>
                  <li className={`json-tree__item`}>
                    <div className='json-tree__item-head'>
                      <button
                        className={`json-tree__button ${isExpanded ? "json-tree__button_open" : "json-tree__button_close"}`}
                        onClick={() => {
                          handleExpand(mainUrl, mainIndex, itemPath, !isExpanded);
                        }}
                      >
                        <img className={`json-tree__button-icon ${isExpanded ? "json-tree__button-icon_open" : ""}`} src={Arrow} alt='arrow'/>
                      </button>
                      {item} : {!Array.isArray(obj[item]) ? "Object" : "Array"}
                    </div>
                    <ul className={`json-tree__sublist ${isExpanded ? "json-tree__sublist--open" : ""}`}>
                      {createTree(obj[item], itemPath)}
                    </ul>
                  </li>
                </ul>
              );
            }
          return (
            <li className="json-tree__item json-tree__item_child"
              data-key={String(item)}
              key={nanoid()}
            >
              <p className='json-tree__item-value'
                onClick={()=>{
                  console.log(getByPath(origObj, itemPath));
                }}
              >
                <span className='json-tree__item-value-type'>{String(item)}</span> : {String(obj[item])}
              </p>
              <button
                className="json-tree__add-button"
                onClick={() => {
                  handleSetSelectedAPIItems(mainIndex, itemPath)
                }}
              >+</button>
            </li>
          );
        })
      );
    }
    const initialPath = [];
    const tree = createTree(obj, initialPath);
    return (tree);
  }

  export {JSONTree}