import React from 'react';
import {nanoid} from 'nanoid';
import {filterObjKey, filterArray, editObjVal, addToArr, getByPath, objInclude, objEmpty} from '../utils/editObj';

const MatchedItems = ({matchedPath}) => {
    const keys = Object.keys(matchedPath); //Array from MOGRT names
    return (
      keys.length === 0 ||
      keys.map((item, index) => {
        const _keys = Object.keys(matchedPath[keys]); //Array from URLs
        return (
            <div className='selected-items__wrapper' key={nanoid()}>
              <ul className="selected-items__list">
                <div className='selected-items__list-wrapper'>
                  <p className='selected-items__list-title'>
                    {item}
                  </p>
                  <button className="selected__remove-button" onClick={()=>{
                    return;
                  }}>-</button>
                </div>
                {
                  _keys.length === 0 ||
                  _keys.map((_item, _index) => {
                    return(
                      <ul key={nanoid()}>
                        {_item}
                        <ul>
                          { 
                            matchedPath?.[item]?.[_item]?.['JSONPaths']?.map((apipath, apipathindex) => {
                              return (
                                <li key={nanoid()}>
                                  {matchedPath[item][_item]['mogrtPaths'][apipathindex]} : {String(apipath)}
                                </li>
                              )
                            })
                          }
                          {
                            matchedPath?.[item]?.[_item]?.['values']?.map((val, valINdex) => {
                              return (
                                <li key={nanoid()}>
                                  {matchedPath[item][_item]['mogrtPaths'][valINdex]} : {String(val)}
                                </li>
                              )
                            })
                          }
                        </ul>
                      </ul>
                    )
                  })
                }
              </ul>
            </div>
        )
      })
    )
  }

export {MatchedItems}