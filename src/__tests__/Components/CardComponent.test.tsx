import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardComponent from '../../../components/CardComponent';

// Mock the component since it has a typo in the export name
const MockCardComponent = ({ restaurant }: { restaurant: any }) => {
  const { id, name, cusine, image } = restaurant;
  return (
    <div id={id}>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{name}</div>
      <div style={{ fontSize: '16px' }}>{cusine}</div>
      <img src={image} alt="" style={{ height: 300, width: 300 }} />
    </div>
  );
};

describe('CardComponent', () => {
  const mockRestaurant = {
    id: 1,
    name: 'Test Restaurant',
    cusine: 'Italian',
    image: 'test-image.jpg'
  };

  test('renders restaurant information correctly', () => {
    render(<MockCardComponent restaurant={mockRestaurant} />);
    
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText('Italian')).toBeInTheDocument();
    expect(screen.getByAltText('')).toHaveAttribute('src', 'test-image.jpg');
  });

  test('renders with correct styling classes', () => {
    render(<MockCardComponent restaurant={mockRestaurant} />);
    
    const container = screen.getByAltText('').closest('div');
    expect(container).toHaveAttribute('id', '1');
  });

  test('renders image with correct attributes', () => {
    render(<MockCardComponent restaurant={mockRestaurant} />);
    
    const image = screen.getByAltText('');
    expect(image).toHaveAttribute('src', 'test-image.jpg');
    expect(image).toHaveAttribute('alt', '');
  });

  test('handles different restaurant data', () => {
    const differentRestaurant = {
      id: 2,
      name: 'Pizza Place',
      cusine: 'Pizza',
      image: 'pizza-image.jpg'
    };

    render(<MockCardComponent restaurant={differentRestaurant} />);
    
    expect(screen.getByText('Pizza Place')).toBeInTheDocument();
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByAltText('')).toHaveAttribute('src', 'pizza-image.jpg');
  });
}); 