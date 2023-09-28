import React from 'react';
import {nanoid} from 'nanoid';
import {filterObjKey, filterArray, editObjVal, addToArr, getByPath, objInclude, objEmpty} from '../utils/editObj';

const SelectedMogrtItems = ({selectedMogrtItems, setSelectedMogrtItems}) => {
    const keys = Object.keys(selectedMogrtItems);
    return (
      keys.length === 0 || keys.map((item, index) => {
        return (
            <div className='selected-items__wrapper' key={nanoid()}>
              <ul className="selected-items__list">
                <div className='selected-items__list-wrapper'>
                  <p className='selected-items__list-title'>
                    {item}
                  </p>
                  <button className="selected__remove-button" onClick={()=>{
                    setSelectedMogrtItems((prev) => {
                      prev = filterObjKey(prev, item);
                      return {...prev}
                    });
                  }}>-</button>
                </div>
                {
                  selectedMogrtItems[item].length === 0 ||
                  selectedMogrtItems[item].map((_item, _index) => {
                    return (
                      <li className="selected-items__item" key={nanoid()}>
                        <p className="selected-items__item-value">{_item.index} {_item.title}</p>
                        <button className="source__remove-button" onClick={()=>{
                          setSelectedMogrtItems((prev) => {
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

export {SelectedMogrtItems}