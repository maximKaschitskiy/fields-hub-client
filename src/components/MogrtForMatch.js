import React from 'react';
import {nanoid} from 'nanoid';
import {filterObjKey, filterArray, editObjVal, addToArr, getByPath, objInclude, objEmpty} from '../utils/editObj';

const MogrtForMatch = ({selectedMogrtItems, setSelectedMogrtItems, setMatchSelected, matchSelected}) => {
    const keysMogrt = Object.keys(selectedMogrtItems);
    return (
      keysMogrt.length === 0 || keysMogrt.map((item, index) => {
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
                  selectedMogrtItems[item].length === 0 || selectedMogrtItems[item].map((_item, _index) => {
                    return (
                      <li className="selected-items__item" key={nanoid()}>
                        <p className="selected-items__item-value">{_item.index} {_item.title}</p>
                        <input type='radio'
                          className="source__match-radio"
                          checked={matchSelected?.['mogrt']?.[item] === _index}
                          onChange={()=>{
                            setMatchSelected((prev) => {
                              prev['mogrt'] = {[item]: _index};
                              return {...prev};
                            })
                          }}
                        ></input>
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

export {MogrtForMatch}