// src/components/DraggableJoker.js
import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import JokerCard from './JokerCard';

const DraggableJoker = ({ jokerObj, index, removeJokerFromCollection }) => {
  // Define variants for motion
  const variants = {
    dragging: {
      opacity: 0.7,
      rotate: 8,
      transition: { duration: 0.01, ease: 'linear' }, // Slightly increased duration for smoother transition
    },
    notDragging: {
      opacity: 1,
      rotate: 0,
      transition: { duration: 0.01, ease: 'linear' }, // Slightly increased duration for smoother transition
    },
  };

  return (
    <Draggable key={jokerObj.id} draggableId={jokerObj.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            cursor: 'pointer',
            zIndex: snapshot.isDragging ? 999 : 'auto',
            display: 'flex',
          }}
          onClick={() => {
            if (!snapshot.isDragging) {
              removeJokerFromCollection(jokerObj.id);
            }
          }}
        >
          <motion.div
            className="joker-card bg-white p-4 rounded shadow"
            variants={variants}
            animate={snapshot.isDragging ? 'dragging' : 'notDragging'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              willChange: 'transform, opacity',
            }}
          >
            <JokerCard name={jokerObj.name} /> {/* Use JokerCard component */}
          </motion.div>
        </div>
      )}
    </Draggable>
  );
};

DraggableJoker.propTypes = {
  jokerObj: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  removeJokerFromCollection: PropTypes.func.isRequired,
};

export default DraggableJoker;