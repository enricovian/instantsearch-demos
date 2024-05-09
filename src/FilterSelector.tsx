import React from 'react';

export type FilterSelectorProps = {
  filterData: { [key: string]: string }[],
  activeButton: number,
  setConfigureFilter: React.Dispatch<React.SetStateAction<string>>,
  setActiveFilter: React.Dispatch<React.SetStateAction<number>>
}

export function FilterSelector(props: FilterSelectorProps) {
  return (
    <div className="filters__header">
      <ol>
        {props.filterData.map((item, index) => (
          <li
            className={`${index === props.activeButton ? "active": "inactive"} filters__button`}
            key={item.filter}
            onClick={function () {
              props.setActiveFilter(index)
              props.setConfigureFilter(item.filter)
            }}
          >
            {item.name}
          </li>
        ))}
      </ol>
    </div>
  );
}