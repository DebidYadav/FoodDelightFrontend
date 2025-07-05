import React from 'react';
import { CardComponentProps } from '../../types';
import { UI } from '../../constants';

const CardComponent: React.FC<CardComponentProps> = ({ restaurant }) => {
  const { id, name, cusine, image } = restaurant;
  
  return (
    <div 
      id={id.toString()}
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '5px',
        transition: 'transform 0.2s ease-in-out',
        cursor: 'pointer',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
      }}
    >
      <img 
        src={image} 
        alt={`${name} restaurant`}
        style={{
          height: UI.IMAGE_HEIGHT,
          width: UI.IMAGE_WIDTH,
          objectFit: 'cover',
          borderRadius: '4px',
          marginBottom: '8px'
        }}
      />
      <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
        {name}
      </div>
      <div style={{ fontSize: '16px', color: '#666' }}>
        {cusine}
      </div>
    </div>
  );
};

export default CardComponent; 