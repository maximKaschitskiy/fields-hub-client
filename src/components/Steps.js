import React from "react";
import {nanoid} from 'nanoid';
import {filterObjKey, filterArray, editObjVal, addToArr, getByPath, objInclude, objEmpty} from '../utils/editObj';
import { APISourceSection } from "./APISourceSection";
import { SelectedAPIItems } from "./SelectedAPIItems";
import { MogrtSourceSection } from "./MogrtSourceSection";
import { SelectedMogrtItems } from "./SelectedMogrtItems";
import { MogrtForMatch } from "./MogrtForMatch";
import { APIForMatch } from "./APIForMatch";
import { MatchedItems } from "./MatchedItems";
import { MatchedValues } from "./MatchedValues";
import { FillButtons } from "./FillButtons";
import { Config } from './Config';

const StepSelection = ({
    currentStep,
    APISources,
    setAPISources,
    removeAPISource,
    onUrlChange,
    handleGetUrl,
    expandObj,
    handleSetLocalItem,
    handleSetSelectedAPIItems,
    selectedAPIItems,
    handleSetItems,
    mogrtSources,
    setSelectedMogrtItems,
    getMogrt,
    activeSeq,
    handleExpand,
    selectedMogrtItems,
    setMatchSelected,
    setSelectedAPIItems,
    matchSelected,
    getValues,
    setMatchedValues,
    matchedPath,
    matchedValues,
    handleSetMatchedPath,
    setSourceInput,
    sourceInput
}) => {
  switch (currentStep) {
    case 0:
      return (
        <Step1 
          APISources={APISources}
          setAPISources={setAPISources}
          removeAPISource={removeAPISource}
          onUrlChange={onUrlChange}
          handleGetUrl={handleGetUrl}
          expandObj={expandObj}
          handleExpand={handleExpand}
          handleSetLocalItem={handleSetLocalItem}
          handleSetSelectedAPIItems={handleSetSelectedAPIItems}
          selectedAPIItems={selectedAPIItems}
          handleSetItems={handleSetItems}
          activeSeq={activeSeq}
          setSourceInput={setSourceInput}
          sourceInput={sourceInput}
        />
      )
      break;
    case 1:
      return (
        <Step2 
          mogrtSources={mogrtSources}
          setSelectedMogrtItems={setSelectedMogrtItems}
          getMogrt={getMogrt}
          activeSeq={activeSeq}
          selectedMogrtItems={selectedMogrtItems}
        />
      )
      break;
    case 2:
      return (
        <Step3
          selectedMogrtItems={selectedMogrtItems}
          setSelectedMogrtItems={setSelectedMogrtItems}
          setMatchSelected={setMatchSelected}
          selectedAPIItems={selectedAPIItems}
          setSelectedAPIItems={setSelectedAPIItems}
          matchSelected={matchSelected}
          matchedPath={matchedPath}
          handleSetMatchedPath={handleSetMatchedPath}
        />
      )
      break;
    case 3:
      return (
        <Step4 
          getValues={getValues}
          setMatchedValues={setMatchedValues}
          matchedPath={matchedPath}
          matchedValues={matchedValues}
        />
      )
      break;
    case 4:
      return (
        <Step5 
          matchedPath={matchedPath}
        />
      )
      break;
  }
};

const StepperSection = ({
  steps,
  currentStep,
  handleStepBack,
  handleStepNext
}) => {
  return (
    <section className="stepper">
      <p>{steps[currentStep + 1]}</p>
      <button
        onClick={() => {
          handleStepBack();
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          handleStepNext();
        }}
      >
        +
      </button>
    </section>
  );
};

const Step1 = ({
    APISources,
    setAPISources,
    removeAPISource,
    onUrlChange,
    handleGetUrl,
    expandObj,
    handleExpand,
    handleSetLocalItem,
    handleSetSelectedAPIItems,
    selectedAPIItems,
    handleSetItems,
    setSourceInput,
    sourceInput
}) => {
  return (
    <div className="tables">
      <section className="source">
        <APISourceSection
          APISources={APISources}
          setAPISources={setAPISources}
          removeAPISource={removeAPISource}
          onUrlChange={onUrlChange}
          handleGetUrl={handleGetUrl}
          expandObj={expandObj}
          handleExpand={handleExpand}
          handleSetSelectedAPIItems={handleSetSelectedAPIItems}
          handleSetLocalItem={handleSetLocalItem}
          setSourceInput={setSourceInput}
          sourceInput={sourceInput}
        />
      </section>
      <section className="selected">
        <SelectedAPIItems
          selectedAPIItems={selectedAPIItems}
          handleSetItems={handleSetItems}
        />
      </section>
    </div>
  );
};

const Step2 = ({
    mogrtSources,
    setSelectedMogrtItems,
    getMogrt,
    activeSeq,
    selectedMogrtItems,
    setMogrtSources
}) => {
  return (
    <div className="tables">
      <section className="source">
        <MogrtSourceSection
          mogrtSources={mogrtSources}
          setMogrtSources={setMogrtSources}
          setSelectedMogrtItems={setSelectedMogrtItems}
          getMogrt={getMogrt}
          activeSeq={activeSeq}
        />
      </section>
      <section className="selected">
        <SelectedMogrtItems
          selectedMogrtItems={selectedMogrtItems}
          setSelectedMogrtItems={setSelectedMogrtItems}
        />
      </section>
    </div>
  );
};

const Step3 = ({
  selectedMogrtItems,
  setSelectedMogrtItems,
  setMatchSelected,
  selectedAPIItems,
  setSelectedAPIItems,
  matchSelected,
  matchedPath,
  handleSetMatchedPath
}) => {
  return (
    <div className="tables">
      <section className="source_match">
        <MogrtForMatch
          selectedMogrtItems={selectedMogrtItems}
          setSelectedMogrtItems={setSelectedMogrtItems}
          setMatchSelected={setMatchSelected}
          matchSelected={matchSelected}
        />
      </section>
      <section className="source_match">
        <APIForMatch
          selectedAPIItems={selectedAPIItems}
          setSelectedAPIItems={setSelectedAPIItems}
          setMatchSelected={setMatchSelected}
          matchSelected={matchSelected}
        />
      </section>
      <button
        onClick={() => {
          handleSetMatchedPath();
        }}
      >
        +
      </button>
      <section className="selected">
        <MatchedItems matchedPath={matchedPath} />
      </section>
    </div>
  );
};

const Step4 = ({
    getValues,
    setMatchedValues,
    matchedPath,
    matchedValues,
    activeSeq
}) => {
  return (
    <div className="tables">
      <section className="source">
        <MatchedValues
          getValues={getValues}
          setMatchedValues={setMatchedValues}
          matchedPath={matchedPath}
        />
      </section>
      <section className="selected">
        <FillButtons matchedValues={matchedValues} activeSeq={activeSeq}/>
      </section>
    </div>
  );
};

const Step5 = ({
  getValues,
  setMatchedValues,
  matchedPath,
  matchedValues,
  activeSeq
}) => {
return (
  <div className="tables">
    <section className="source">
      <Config
        getValues={getValues}
        setMatchedValues={setMatchedValues}
        matchedPath={matchedPath}
      />
    </section>
  </div>
);
};

export { StepSelection, StepperSection };
