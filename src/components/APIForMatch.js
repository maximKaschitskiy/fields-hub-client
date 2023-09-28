import React from 'react';
import {nanoid} from 'nanoid';
import {filterObjKey, filterArray, editObjVal, addToArr, getByPath, objInclude, objEmpty} from '../utils/editObj';

const APIForMatch = ({selectedAPIItems, setSelectedAPIItems, setMatchSelected, matchSelected}) => {
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
                    setSelectedAPIItems((prev) => {
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
                        <input type='radio' 
                          className="match-radio"
                          checked={matchSelected?.['api']?.[item] === _index}
                          onChange={() => {
                            setMatchSelected((prev) => {
                              prev['api'] = {[item]: _index};
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

export {APIForMatch}