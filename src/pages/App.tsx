import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestaurants } from '../hooks/useRestaurants';
import CardComponent from '../components/common/CardComponent';
import SearchBar from '../components/common/SearchBar';
import { APP_CONFIG, UI, ROUTES } from '../constants';

const App: React.FC = () => {
  const navigate = useNavigate();
  const { restaurants, loading, error, searchRestaurants } = useRestaurants();
  
  const signUp = () => {
    navigate(ROUTES.SIGNUP);
  };

  const login = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleSearch = async (searchTerm: string) => {
    await searchRestaurants(searchTerm);
  };

  const RestaurantList: React.FC = () => {
    if (loading) {
      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div>Loading restaurants...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div style={{ textAlign: 'center', padding: '40px', color: '#dc3545' }}>
          <div>Error: {error}</div>
        </div>
      );
    }

    if (restaurants.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div>No restaurants found.</div>
        </div>
      );
    }

    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${UI.GRID_COLUMNS}, 1fr)`, 
        gap: UI.CARD_GAP 
      }}>
        {restaurants.map((restaurant) => (
          <CardComponent restaurant={restaurant} key={restaurant.id} />
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: '1px solid #eee'
      }}>
        <h1 style={{ margin: 0, color: '#333' }}>{APP_CONFIG.NAME}</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={signUp}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Sign Up
          </button>
          <button 
            onClick={login}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
        </div>
      </header>
      
      <SearchBar onSearch={handleSearch} />
      
      <main>
        <RestaurantList />
      </main>
    </div>
  );
};

export default App;
