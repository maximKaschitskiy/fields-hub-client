import React from 'react';
import {nanoid} from 'nanoid';
import {JSONTree} from './JSONTree';
import {filterObjKey, filterArray, editObjVal, addToArr, getByPath, objInclude, objEmpty} from '../utils/editObj';

const APISourceSection = ({APISources, sourceInput, setSourceInput, setAPISources, onUrlChange, handleGetUrl, handleSetLocalItem, removeAPISource, expandObj, handleExpand, handleSetSelectedAPIItems}) => {
  const keys = Object.keys(APISources);
    return (
        <div className="source__input-wrapper">
          <input
            className="source__add-url"
            id={`add-url`}
            type="text"
            value={sourceInput || ""}
            onChange={(event) => {
              setSourceInput((prev)=>{
                prev = event.target.value;
                return prev;
              });
            }}
          />
          <label className="source__url-label" htmlFor={`add-url`}>Input source</label>
          <button className="source__get-url" onClick={()=>{
            handleGetUrl();
          }}>
            Set API source
          </button>
          <button className="source__get-url" onClick={()=>{
            handleSetLocalItem();
          }}>
            Set local value
          </button>
          {
            keys === 0 || 
            keys.map((item, index) => {
                return (
                    <div className="source__single-wrapper" key={index}>
                        <div className="source__single-head">
                            <p className="source__single-title">{item}</p>
                            <button className="source__remove-button" onClick={()=>{
                              removeAPISource(item);
                            }}>
                                -
                            </button>
                        </div>
                        {
                          <JSONTree 
                            mainUrl={item} obj={APISources[item]} 
                            mainIndex={index} expandObj={expandObj}
                            handleExpand={handleExpand} handleSetSelectedAPIItems={handleSetSelectedAPIItems}/>
                        }
                    </div>
                );
            })
          }
        </div> 
    );
}

export {APISourceSection};