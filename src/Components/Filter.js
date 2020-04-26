import React, { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Stats, RefinementList } from "react-instantsearch-dom";
import Map from "./Map";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY
);

const index = searchClient.initIndex(process.env.REACT_APP_ALGOLIA_INDEX_NAME);

const SideBar = (props) => {
  return (
    <div className="left-column">
      <ToggleHeatmapButton
        heatmapState={props.heatmapState}
        showHeatmap={props.showHeatmap}
        toggleButtonText={props.toggleButtonText} 
        setTButtonText={props.toggleButtonText}
      />
      <h5> Common Name </h5>
      <RefinementList attribute="properties.Common Name" />
      <h5> Year of Examination </h5>
      <RefinementList attribute="properties.Year of Examination" />
      <h5> Sex </h5>
      <RefinementList attribute="properties.Sex" />
    </div>
  );
};

const Content = (props) => {
  return (
    <div className="right-column">
      <div className="info">
        <Stats />
      </div>
      <Map hits={props.hits} heatmapState={props.heatmapState} />
    </div>
  );
};

const ToggleHeatmapButton = (props) => {
  return <button onClick={props.showHeatmap}>{props.toggleButtonText}</button>;
};

const reducer = (heatmapState, action) => {
  switch (action.type) {
    case "show":
      console.log("heatmap visible");
      return { visible: true };

    case "hide":
      console.log("heatmap hidden");
      return { visible: false };

    default:
      return heatmapState;
  }
};

const initialHeatmapState = {
  visible: false,
};
function Filter() {
  const [toggleButtonText, setTButtonText] = useState("Turn Heatmap on");
  const [reportHits, setReportHits] = useState([]);
  const [heatmapState, dispatch] = React.useReducer(
    reducer,
    initialHeatmapState
  );

  function showHeatmap() {
    if (heatmapState.visible === false) {
      setTButtonText("Turn Heatmap off")
      dispatch({ type: "show" });
    } else {
      setTButtonText("Turn Heatmap on")
      dispatch({ type: "hide" });
    }
  }

  const getResults = (searchState) => {
    let filters = [];

    if (searchState) {
      console.log(searchState);

      filters = Object.keys(searchState.refinementList).map((key) =>
        searchState.refinementList[key].length !== 0
          ? searchState.refinementList[key].map((entry) => key + ":" + entry)
          : key + ":-foobar"
      );
    }

    index
      .search("", {
        facetFilters: filters,
        hitsPerPage: 1000,
        attributesToRetrieve: ["*", "-_highlightResult"],
      })
      .then(({ hits }) => {
        setReportHits(hits);
      });
  };

  return (
    <div>
      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.REACT_APP_ALGOLIA_INDEX_NAME}
        onSearchStateChange={(searchState) => getResults(searchState)}
      >
        <main>
          <SideBar heatmapState={heatmapState} showHeatmap={showHeatmap} toggleButtonText={toggleButtonText} setTButtonText={toggleButtonText}/>
          <Content hits={reportHits} heatmapState={heatmapState} />
        </main>
      </InstantSearch>
    </div>
  );
}

export default Filter;
