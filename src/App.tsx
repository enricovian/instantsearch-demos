import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  Configure,
  DynamicWidgets,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
} from 'react-instantsearch';

import { Panel } from './Panel';
import { FilterSelector } from './FilterSelector';

import type { Hit } from 'instantsearch.js';

import './App.css';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const future = { preserveSharedStateOnUnmount: true };

export function App() {
  const [configureFilter, setConfigureFilter] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState(0);
  return (
    <div>
      <header className="header">
        <h1 className="header-title">
          <a href="/">custom-widget-config</a>
        </h1>
        <p className="header-subtitle">
          using{' '}
          <a href="https://github.com/algolia/instantsearch/tree/master/packages/react-instantsearch">
            React InstantSearch
          </a>
        </p>
      </header>

      <div className="container">
        <InstantSearch
          searchClient={searchClient}
          indexName="instant_search"
          future={future}
          insights
        >
          

          <Configure hitsPerPage={8} filters={configureFilter} />
          <div className="search-panel">
            <div className="search-panel__filters">
                <Panel header="type">
                  <RefinementList attribute="type" />
                </Panel>
                <Panel header="brand">
                  <RefinementList attribute="brand" />
                </Panel>
                <Panel header="price">
                  <RefinementList attribute="price" />
                </Panel>
                <Panel header="rating">
                  <RefinementList attribute="rating" />
                </Panel>
                <Panel header="categories">
                  <RefinementList attribute="categories" />
                </Panel>
            </div>

            <div className="search-panel__results">
              <SearchBox placeholder="" className="searchbox" />
              <FilterSelector
                filterData={[
                  {"filter": "", "name": "See All"},
                  {"filter": "hierarchicalCategories.lvl0:Appliances", "name": "Appliances"},
                  {"filter": "hierarchicalCategories.lvl0:Audio", "name": "Audio"},
                  {"filter": "hierarchicalCategories.lvl1:'Cell Phones > Cell Phone Accessories'", "name": "Cell Phone Accessories"},
                  {"filter": "hierarchicalCategories.lvl1:'Health, Fitness & Beauty > Personal Care & Beauty'", "name": "Personal Care & Beauty"},
                ]}
                activeButton={activeFilter}
                setConfigureFilter={setConfigureFilter}
                setActiveFilter={setActiveFilter}
              />
              <Hits hitComponent={Hit} />

              <div className="pagination">
                <Pagination />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

type HitProps = {
  hit: Hit;
};

function Hit({ hit }: HitProps) {
  return (
    <article>
      <img src={hit.image} alt={hit.name} />
      <div>
        <h1>
          <Highlight attribute="name" hit={hit} />
        </h1>
        <p>
          <Highlight attribute="categories" hit={hit} />
        </p>
      </div>
    </article>
  );
}
