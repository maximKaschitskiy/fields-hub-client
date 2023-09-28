import React from 'react';
import {nanoid} from 'nanoid';
import {filterObjKey, filterArray, editObjVal, addToArr, getByPath, objInclude, objEmpty} from '../utils/editObj';

const MogrtSourceSection = ({mogrtSources, setMogrtSources, setSelectedMogrtItems, getMogrt, activeSeq}) => {
    const keys = Object.keys(mogrtSources);

    return (
      <>
        <div>
          <p>Active Selected: <span>{activeSeq}</span></p>
          <button className="source__get-url" onClick={getMogrt}>
            Get MOGRT
          </button>
        </div>
        {
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
                        setMogrtSources((prev) => {
                          prev = filterObjKey(prev, item);
                          return {...prev}
                        });
                      }}>-</button>
                    </div>
                    {
                      mogrtSources[item].length === 0 ||
                      mogrtSources[item].map((_item, _index) => {
                        return (
                          <li className="selected-items__item" key={nanoid()}>
                            <p className="selected-items__item-value">{String(_item)}</p>
                            <button className="source__add-button" onClick={()=>{
                              setSelectedMogrtItems((prev) => {
                                const newObj = {
                                  title: _item,
                                  index: _index
                                };
                                if (prev[item] && !objInclude(prev[item], newObj)) {
                                  prev = addToArr(prev, item, newObj);
                                }
                                if (!prev[item]) {
                                  prev[item] = [];
                                  prev = addToArr(prev, item, newObj);
                                }
                                return {...prev};
                              });
                            }}>+</button>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
            )
          })
        }
      </>
    );
  }

export {MogrtSourceSection}