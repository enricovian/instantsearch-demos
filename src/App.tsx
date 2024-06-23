import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  Configure,
  DynamicWidgets,
  Highlight,
  Hits,
  InstantSearch,
  Menu,
  Pagination,
  RefinementList,
  SearchBox,
  ToggleRefinement,
} from 'react-instantsearch';

import { Panel } from './Panel';

import type { Hit } from 'instantsearch.js';

import './App.css';

const searchClient = algoliasearch(
  '3DGDDJTUZF',
  '3b35fc5385bce7360b4c163ab9a4624f'
);

const future = { preserveSharedStateOnUnmount: true };

export function App() {
  const [configureFilter, setConfigureFilter] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState(0);
  return (
    <div>
      <header className="header">
        <h1 className="header-title">
          <a href="/">conditional-facet</a>
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
          indexName="avocadostore_products_de"
          future={future}
          insights
        >
          

          <Configure hitsPerPage={8} filters={configureFilter} />
          <div className="search-panel">
            <div className="search-panel__filters">
                <Panel header="color">
                  <RefinementList attribute="filter.color" />
                </Panel>
                <Panel header="brand">
                  <RefinementList attribute="brand.name" />
                </Panel>
                <Panel header="countries">
                  <Menu attribute="countries" />
                </Panel>
              <DynamicWidgets>
                  <ToggleRefinement attribute="countries_free_shipping.DE" label="Free shipping" />
                  <ToggleRefinement attribute="countries_free_shipping.AT" label="Free shipping" />
                  <ToggleRefinement attribute="countries_free_shipping.EU" label="Free shipping" />
                  <ToggleRefinement attribute="countries_free_shipping.INT" label="Free shipping" />
              </DynamicWidgets>
            </div>

            <div className="search-panel__results">
              <SearchBox placeholder="" className="searchbox" />
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
  const countries_flags = {
    "DE": "🇩🇪",
    "AT": "🇦🇹",
    "EU": "🇪🇺",
    "INT": "🌍"
  }
  let shipping_to = []
  for (const country of hit.countries) {
    shipping_to.push(countries_flags[country])
  }
  let free_shipping_to = []
  for (const country in hit.countries_free_shipping) {
    if (hit.countries_free_shipping[country]) {
      free_shipping_to.push(countries_flags[country])
    }
  }
  return (
    <article>
      <img src={hit.images[0]} alt={hit.name} />
      <div>
        <h1>
          <Highlight attribute="name" hit={hit} />
        </h1>
        <h3>
          <Highlight attribute="brand.name" hit={hit} />
        </h3>
        <p>
          <Highlight attribute="description" hit={hit} />
        </p>
        <p>
          Shipping to: {shipping_to}
        </p>
        <p>
          Free shipping available for: {free_shipping_to}
        </p>
      </div>
    </article>
  );
}
