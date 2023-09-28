require('dotenv').config();
import React from 'react';
import {nanoid} from 'nanoid';

import {filterObjKey, filterArray, editObjVal, addToArr, getByPath, objInclude, objEmpty} from './utils/editObj';
import {validURL} from './utils/checkUrl';
import {selectedAPIItemsMock, mogrtSourcesMock, selectedMogrtItemsMock, matchedPathMock} from './mocks/mocks';

import {seqSel} from './libs/ext';
import {getUrl} from './utils/api';

import {StepSelection, StepperSection, Step1, Step2, Step3, Step4} from './components/Steps';
import { SelectedAPIItems } from './components/SelectedAPIItems';
import {APISourceSection} from './components/APISourceSection';
import {JSONTree} from './components/JSONTree';
import {SelectedMogrtItems} from './components/SelectedMogrtItems';
import {APIForMatch} from './components/APIForMatch';
import {MatchedItems} from './components/MatchedItems';
import {MogrtSourceSection} from './components/MogrtSourceSection';
import {MogrtForMatch} from './components/MogrtForMatch';
import {MatchedValues} from './components/MatchedValues';
import {FillButtons} from './components/FillButtons';

import './normalize.css';
import './style.css';

const App = () => {
  const { NODE_ENV } = process.env;
  const contentRef = React.useRef([]);
  const [selectedAPIItems, setSelectedAPIItems] = React.useState({});
  const [selectedMogrtItems, setSelectedMogrtItems] = React.useState([]);
  const [expandObj, setExpanded] = React.useState({});
  const [APISources, setAPISources] = React.useState({});
  const [mogrtSources, setMogrtSources] = React.useState({});
  const [currentStep, setCurrentStep] = React.useState(0);
  const [mogrtFields, setMogrtFields] = React.useState([]); //Разобрать компонент MOGRT
  const [activeSeq, setActiveSeq] = React.useState('');
  const [lib, setLib] = React.useState(false);
  const [styles, setStyles] = React.useState(false);
  const [matchSelected, setMatchSelected] = React.useState({});
  const [matchedPath, setMatchedPath] = React.useState({});
  const [matchedValues, setMatchedValues] = React.useState({});
  const [sourceInput, setSourceInput] = React.useState('');
  const steps = {
    '1': 'Select sources',
    '2': 'Select MOGRT values',
    '3': 'Match values',
    '4': 'Fill MOGRT',
    '5': 'Copy config'
  };

  React.useEffect(()=>{
    console.log(matchedPath);
  },[matchedPath])

  React.useEffect(()=> {
    if (NODE_ENV !== 'production') {
      // setSelectedAPIItems(selectedAPIItemsMock);
      setMogrtSources(mogrtSourcesMock);
      // setSelectedMogrtItems(selectedMogrtItemsMock);
      // setMatchedPath(matchedPathMock);
    };
  },[]);

  React.useEffect(()=>{
    const libScript = document.createElement('script');
    libScript.src = './libs/CSInterface.js';
    libScript.addEventListener('load', ()=>{
      console.log('CSI loaded');
      setLib(true);
    });
    document.head.appendChild(libScript);

    const styles = document.createElement('script');
    styles.src = './libs/ext.js';
    styles.addEventListener('load', ()=>{
      console.log('Styles loaded');
      setStyles(true);
    });
    document.head.appendChild(styles);
  },[]);

  React.useEffect(()=>{
    if (lib === true && styles === true && NODE_ENV === 'production') {
      addSelectedListener();
      //onLoaded();
    }
  },[lib, styles]);

  const onUrlChange = (event) => {
    setAPISources((prev) => {
        const newAPISources = [...prev];
        newAPISources[index]["url"] = event.target.value;
        return [...newAPISources];
    });
  };

  const getMogrt = () => {
    const csInterface = new CSInterface();
    csInterface.evalScript("$._PPP_.getTimelineItemParams()", (name) => {
      if (name !== '') {
        csInterface.evalScript("$._PPP_.getMogrtVals()", (values) => {
          if (values !== '') {
            const dataArray = values.split(',');
            setMogrtSources((prev) => {
              prev[name] = dataArray;
              return {...prev};
            });
          }
        });
      }
    });
  }

  const handleExpand = (mainUrl, mainIndex, itemPath, isExpanded) => {
    setExpanded((prevState) => ({
      ...prevState,
      [mainUrl]: {
        ...prevState[mainUrl],
        [mainIndex]: {
          ...prevState[mainUrl]?.[mainIndex],
          [itemPath.join('/')]: isExpanded,
        },
      },
    }));
  };

  const handleGetUrl = () => {
    if (validURL(sourceInput)) {
      getUrl(sourceInput)
        .then((data) => {
          setAPISources((prev) => {
            const dataObj = {'data': data}
            const newObj = { [sourceInput]: dataObj };
            return {...prev, ...newObj};
          });
      });
    }
  };

  const removeAPISource = (item) => {
    const newAPISources = filterObjKey(APISources, item);
    setAPISources({...newAPISources});
  };

  const handleStepBack = () => {
    const stepsArr = Object.keys(steps);
      setCurrentStep((prev)=>{
        const newVal = prev - 1;
        if (stepsArr.includes((newVal + 1).toString())) {
          prev = newVal;
        }
        return prev;
      });
  }

  const handleSetSelectedAPIItems = (mainIndex, itemPath) => {
    setSelectedAPIItems((prev) => {
      const keys = Object.keys(APISources);
      if (prev[keys[mainIndex]]) {
        prev = addToArr(prev, keys[mainIndex], itemPath);
      } else {
        prev = { ...prev, [keys[mainIndex]]: [itemPath] };
      }
      return prev;
    });
  }

  const handleSetLocalItem = () => {
    if (!validURL(sourceInput)) {
      setSelectedAPIItems((prev) => {
        if (prev["local"]) {
          prev = addToArr(prev, "local", sourceInput);
        } else {
          prev = { ...prev, ["local"]: [sourceInput] };
        }
        return prev;
      });
    }
  }

  const handleStepNext = () => {
    const stepsArr = Object.keys(steps);
      setCurrentStep((prev)=>{
        const newVal = prev + 1;
        if (stepsArr.includes((newVal + 1).toString())) {
          prev = newVal;
        }
        return prev;
      });
  }

  const handleSetMatchedPath = () => {
    if (!objEmpty(matchSelected.api) && !objEmpty(matchSelected.mogrt)) {
      setMatchedPath((prev) => {
        const apiUrl = Object.keys(matchSelected.api)[0]; //www.api....
        const mogrtTitle = Object.keys(matchSelected.mogrt)[0]; //Weather
        const apiUrlIndex = matchSelected["api"][apiUrl];
        const mogrtPathIndex = matchSelected["mogrt"][mogrtTitle];
        const apiItem = selectedAPIItems[apiUrl][apiUrlIndex];
        const mogrtItem = selectedMogrtItems[mogrtTitle][mogrtPathIndex]["index"];
        if (!prev[mogrtTitle]) {
          prev[mogrtTitle] = {};
        }
        if (!prev[mogrtTitle][apiUrl]) {
          prev[mogrtTitle][apiUrl] = {};
        }
        if (!prev[mogrtTitle][apiUrl]["mogrtPaths"]) {
          prev[mogrtTitle][apiUrl]["mogrtPaths"] = [];
        }
        if (apiUrl !== 'local' && !prev[mogrtTitle][apiUrl]["JSONPaths"]) {
          prev[mogrtTitle][apiUrl]["JSONPaths"] = [];
        }
        if (apiUrl === 'local' && !prev[mogrtTitle][apiUrl]["values"]) {
          prev[mogrtTitle][apiUrl]["values"] = [];
        }
        prev[mogrtTitle][apiUrl] = addToArr(
          prev[mogrtTitle][apiUrl],
          "mogrtPaths",
          mogrtItem
        );
        if (apiUrl !== 'local') {
          prev[mogrtTitle][apiUrl] = addToArr(
            prev[mogrtTitle][apiUrl],
            "JSONPaths",
            apiItem
          );
        } else {
          prev[mogrtTitle][apiUrl] = addToArr(
            prev[mogrtTitle][apiUrl],
            "values",
            apiItem
          );
        }
        return { ...prev };
      });
    }
  }

  const addSelectedListener = () => {
    console.log("Listeners runned");
    const csInterface = new CSInterface();
    csInterface.evalScript("$._PPP_.registerSequenceSelectionChangedFxn()");
    csInterface.addEventListener("CurrentSeqSel", (event) => {
      // if (event.type === 'CurrentSeqSel') {
      //   setActiveSeq(event.data);
      // }
      csInterface.evalScript("$._PPP_.myActiveSequenceSelectionName()", (data)=> {
        setActiveSeq(data);
      });
    });
  }

  const getValues = async (sources) => {
    const result = {};
    const keys = Object.keys(sources);
    for (const item of keys) {
      result[item] = {};
      result[item]['mogrtPaths'] = [];
      result[item]['values'] = [];
      const _keys = Object.keys(sources[item]);
      for (const _item of _keys) {
        if (_item !== 'local') {
          const data = await getUrl(_item);
          const valuesFromJsonPaths = sources[item][_item]['JSONPaths'].map((apipath) => {
            console.log(data, apipath);
            return String(getByPath({data: data}, apipath));
          });
          result[item]['values'] = [...result[item]['values'], ...valuesFromJsonPaths];
        } else {
          result[item]['values'] = [...result[item]['values'], ...sources[item][_item]['values']];
        }
        const currnetPaths = sources[item][_item]['mogrtPaths'];
        result[item]['mogrtPaths'] = [...result[item]['mogrtPaths'], ...currnetPaths];
      }
    }
    return result;
  };
  
  return (
    <main className="main"
      style={
        NODE_ENV !== 'production' ? {
          color: "black"
        } : {
          color: "white"
        }
      }
    >
      <StepperSection
        steps={steps}
        currentStep={currentStep}
        handleStepBack={handleStepBack}
        handleStepNext={handleStepNext}
      />
      <StepSelection
         currentStep={currentStep}
         APISources={APISources}
         setAPISources={setAPISources}
         removeAPISource={removeAPISource}
         onUrlChange={onUrlChange}
         handleGetUrl={handleGetUrl}
         expandObj={expandObj}
         sourceInput={sourceInput}
         setSourceInput={setSourceInput}
         handleSetSelectedAPIItems={handleSetSelectedAPIItems}
         handleSetLocalItem={handleSetLocalItem}
         handleSetItems={setSelectedAPIItems}
         mogrtSources={mogrtSources}
         selectedAPIItems={selectedAPIItems}
         setMogrtSources={setMogrtSources}
         setSelectedMogrtItems={setSelectedMogrtItems}
         getMogrt={getMogrt}
         activeSeq={activeSeq}
         selectedMogrtItems={selectedMogrtItems}
         setMatchSelected={setMatchSelected}
         matchSelected={matchSelected}
         handleExpand={handleExpand}
         setSelectedAPIItems={setSelectedAPIItems}
         getValues={getValues}
         setMatchedValues={setMatchedValues}
         matchedPath={matchedPath}
         matchedValues={matchedValues}
         handleSetMatchedPath={handleSetMatchedPath}
       />
    </main>
  );
};


export default App;
