import React from 'react';
import {nanoid} from 'nanoid';
import {JSONTree} from './JSONTree';
import {filterObjKey, filterArray, editObjVal, addToArr, getByPath, objInclude, objEmpty} from '../utils/editObj';


const APISourceSection = ({APISources, setAPISources, onUrlChange, handleGetUrl, handleSetLocalItem, removeAPISource, expandObj, handleExpand, handleSetSelectedAPIItems}) => {
    return (
        <> 
          {
            APISources.map((item, index) => {
                return (
                    <div className="source__single-wrapper" key={index}>
                        <div className="source__single-head">
                            <input
                                className="source__add-url"
                                id={`add-url${index}`}
                                type="text"
                                value={item.url || ""}
                                onChange={(event) => {
                                  onUrlChange(event, index);
                                }}
                            />
                            <label className="source__url-label" htmlFor={`add-url${index}`}>Input source</label>
                            <button className="source__get-url" onClick={()=>{
                              handleGetUrl(item, index);
                            }}>
                                Set API source
                            </button>
                            <button className="source__get-url" onClick={()=>{
                              handleSetLocalItem(item.url);
                            }}>
                                Set local value
                            </button>
                            <button className="source__remove-button" onClick={()=>{
                              removeAPISource(index);
                            }}>
                                -
                            </button>
                        </div>
                        {item.content ? (
                            <JSONTree mainUrl={item.url} obj={item.content} mainIndex={index} expandObj={expandObj} handleExpand={handleExpand} handleSetSelectedAPIItems={handleSetSelectedAPIItems}/>
                        ) : null}
                    </div>
                );
            })
          }
            <div className='source__add-button-wrapper'>
                <button className="source__add-button" onClick={()=>{
                    setAPISources((prev) => {
                        return [
                          ...prev,
                          {
                            url: "",
                            content: null
                          },
                        ];
                    });
                }}>
                    +
                </button>
            </div>
        </>
    );
}

export {APISourceSection};