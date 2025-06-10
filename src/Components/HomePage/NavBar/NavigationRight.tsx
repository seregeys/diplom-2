import React, { useContext, FC } from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../../HomePage/img/home.svg';
import settingsIcon from '../../HomePage/img/settings.svg';
import favoritesIcon from '../../HomePage/img/favorites.svg';
import { ThemeContext } from '../../themes/themeContext';
import { useDispatch } from 'react-redux';
import { updateSearchTerm } from '../../Redux/Actions/Actions';

const NavigationRight: FC = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const handleHomeClick = () => {
    dispatch(updateSearchTerm("new")); // или любое другое действие
  };

  return (
    <div
      className='home-page__nav'
      style={{
        background: theme.background,
        color: theme.foreground,
        padding: '20px'
      }}
    >
      <Link to="/" className='home-page__nav-button' onClick={handleHomeClick}>
        <img src={homeIcon} alt='home' /> Home
      </Link>
      <Link to="/Favorites" className='home-page__nav-button'>
        <img src={favoritesIcon} alt='favorites' /> Favorites
      </Link>
      <Link to="/Settings" className='home-page__nav-button'>
        <img src={settingsIcon} alt='settings' /> Settings
      </Link>
    </div>
  );
};

export default NavigationRight;