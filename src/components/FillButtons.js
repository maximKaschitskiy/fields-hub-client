import React from 'react';
import {nanoid} from 'nanoid';
import {filterObjKey, filterArray, editObjVal, addToArr, getByPath, objInclude, objEmpty} from '../utils/editObj';

const FillButtons = ({matchedValues, activeSeq}) => {
    console.log(matchedValues);
    const keys = Object.keys(matchedValues);
    return (
      <div className='selected-items__wrapper'>
        <ul className="selected-items__list">
          <div className='selected-items__list-wrapper'>
            {
              keys.length === 0 ||
              keys.map((item, index) => {
                return(
                  <button
                    className="mogrt__scan"
                    onClick={() => {
                      const csInterface = new CSInterface();
                      csInterface.evalScript("$._PPP_.fillMogrt(" + JSON.stringify(matchedValues[item]) + ");");
                      // matchedValues[item]['values'] // matchedValues[item]['mogrtPaths']
                    }}
                    disabled={activeSeq === item ? true : false} //актив сек = айтем
                    key={nanoid()}
                  >{item}</button>
                )
              })
            }
          </div>
        </ul>
      </div>
    )
  }

export {FillButtons}