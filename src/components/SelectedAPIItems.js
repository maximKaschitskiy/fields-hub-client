import React from 'react';
import {nanoid} from 'nanoid';
import {filterObjKey, filterArray, editObjVal, addToArr, getByPath, objInclude, objEmpty} from '../utils/editObj';

const SelectedAPIItems = ({selectedAPIItems, handleSetItems}) => {
    const keys = Object.keys(selectedAPIItems);
    return (
      keys.length === 0 ||
      keys.map((item, index) => {
        return (
            <div className='selected-items__wrapper' key={nanoid()}>
              <ul className="selected-items__list">
                <div className='selected-items__list-wrapper'>
                  <p className='selected-items__list-title'>
                    {item}
                  </p>
                  <button className="selected__remove-button" onClick={()=>{
                    handleSetItems((prev) => {
                      prev = filterObjKey(prev, item);
                      return {...prev}
                    });
                  }}>-</button>
                </div>
                {
                  selectedAPIItems[item].length === 0 ||
                  selectedAPIItems[item].map((_item, _index) => {
                    return (
                      <li className="selected-items__item" key={nanoid()}>
                        <p className="selected-items__item-value">{String(_item)}</p>
                        <button className="source__remove-button" onClick={()=>{
                          handleSetItems((prev) => {
                            prev = editObjVal(prev, item, filterArray(prev[item], _index));
                            return {...prev};
                          });
                        }}>-</button>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
        )
      })
    )
  }

export {SelectedAPIItems}