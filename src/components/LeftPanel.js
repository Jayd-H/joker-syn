// src/components/LeftPanel.js

import React from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import DraggableJoker from './DraggableJoker';
import JokerCard from './JokerCard';
import PropTypes from 'prop-types';

const LeftPanel = ({
  jokerInput,
  setJokerInput,
  allJokers,
  addJokerToOwned,
  ownedJokers,
  jokerGridRef,
  handleOnDragEnd,
  CARD_HEIGHT,
  CARD_WIDTH,
  removeJokerFromCollection,
  overlapPerCard,
  jokerColors,
}) => (
  <div className="w-1/2 border-r-4 border-gray-300 flex flex-col min-h-0">
    <h2 className="text-2xl font-bold mb-2">Your Jokers</h2>

    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="ownedJokers" direction="horizontal">
        {(provided) => (
            <div
  className="joker-grid"
  {...provided.droppableProps}
  ref={(el) => {
    provided.innerRef(el);
    jokerGridRef.current = el;
  }}
  style={{
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'visible', // Changed from 'hidden' to 'visible'
    position: 'relative',
    alignItems: 'flex-start',
    minHeight: `${CARD_HEIGHT + 60}px`,
  }}
>
            {ownedJokers.length > 0 ? (
              ownedJokers.map((jokerObj, index) => (
                <DraggableJoker
                  key={jokerObj.id}
                  jokerObj={jokerObj}
                  index={index}
                  removeJokerFromCollection={removeJokerFromCollection}
                  overlapPerCard={overlapPerCard}
                  isFirst={index === 0}
                  synergyColors={jokerColors[jokerObj.name] || []}
                  cardWidth={CARD_WIDTH}
                  cardBorderWidth={0}
                />
              ))
            ) : (
              <div className="no-jokers-message">No Jokers</div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>

    <div className="mt-6 flex flex-col flex-1 min-h-0">
      <h2 className="text-lg font-semibold mb-2 -mt-4">Search for Joker</h2>
      <input
        type="text"
        className="border p-2 mb-3 w-full"
        placeholder="Input search"
        value={jokerInput}
        onChange={(e) => setJokerInput(e.target.value)}
      />
      <div className="find-joker-grid flex-1 overflow-auto">
        {allJokers
          .filter((joker) => joker.name.toLowerCase().startsWith(jokerInput.toLowerCase()))
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((joker) => (
            <div
              key={joker.id}
              className="joker-card bg-white p-4 rounded shadow m-3 -mb-4 cursor-pointer"
              onClick={() => addJokerToOwned(joker.name)}
            >
              <JokerCard name={joker.name} />
            </div>
          ))}
      </div>
    </div>
  </div>
);

LeftPanel.propTypes = {
  jokerInput: PropTypes.string.isRequired,
  setJokerInput: PropTypes.func.isRequired,
  allJokers: PropTypes.array.isRequired,
  addJokerToOwned: PropTypes.func.isRequired,
  ownedJokers: PropTypes.array.isRequired,
  jokerGridRef: PropTypes.object.isRequired,
  handleOnDragEnd: PropTypes.func.isRequired,
  CARD_HEIGHT: PropTypes.number.isRequired,
  CARD_WIDTH: PropTypes.number.isRequired,
  removeJokerFromCollection: PropTypes.func.isRequired,
  overlapPerCard: PropTypes.number.isRequired,
  jokerColors: PropTypes.object.isRequired,
};

export default LeftPanel;