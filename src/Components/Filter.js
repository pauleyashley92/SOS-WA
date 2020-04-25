import React, { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Stats, RefinementList } from "react-instantsearch-dom";
import Heatmap from "./Heatmap";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY
);

const index = searchClient.initIndex(process.env.REACT_APP_ALGOLIA_INDEX_NAME);

const SideBar = (props) => {
  return (
    <div className="left-column">
      <ToggleHeatmapButton />
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
      <Heatmap hits={props.hits} heatmapState={props.heatmapState} />
    </div>
  );
};

const ToggleHeatmapButton = (props) => {
  return <button onClick={props.showHeatmap}>Toggle Heatmap</button>;
};

const reducer = (heatmapState, action) => {
  switch (action.type) {
    case "show":
      return { visible: true };

    case "hide":
      return { visible: false };

    default:
      return heatmapState;
  }
};

function Filter() {
  const [reportHits, setReportHits] = useState([]);
  const [heatmapState, dispatch] = React.useReducer(reducer, {
    visible: false,
  });
  function showHeatmap() {
    dispatch({ type: "show" });
  }

  const getResults = (searchState) => {
    let filters = [];

    if (searchState) {
      console.log(searchState);
      console.log(searchState.refinementList);

      filters = Object.keys(searchState.refinementList).map((key) =>
        searchState.refinementList[key].length !== 0
          ? searchState.refinementList[key]
              .map((entry) => key + ":" + entry)
              .join('", "')
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
        console.log(hits);
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
          <SideBar />
          <Content hits={reportHits} heatmapState={heatmapState} />
        </main>
      </InstantSearch>
    </div>
  );
}

export default Filter;
