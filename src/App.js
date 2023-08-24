import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import './App.css';

const spotifyApi = new SpotifyWebApi();

function App() {
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [tracksTimeRange, setTracksTimeRange] = useState('short_term'); // Default: 1 month
  const [artistsTimeRange, setArtistsTimeRange] = useState('short_term'); // Default: 1 month
  const [selectedSection, setSelectedSection] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Redirect user to Spotify login page
    const client_id = 'adb075ad46114452bf4c07555f416991';
    const redirect_uri = 'https://cautious-zebra-q7qr9rpxjw52xw4j-3000.app.github.dev/';
    const scope = ['user-read-private', 'user-read-email', 'user-top-read'];
    window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join('%20')}&response_type=token&show_dialog=true`;
  };

  const fetchTopTracks = (range) => {
    setTracksTimeRange(range);
    spotifyApi.getMyTopTracks({ limit: 10, time_range: range })
      .then(response => {
        setTopTracks(response.items);
      })
      .catch(error => {
        console.error('Error fetching top tracks:', error);
      });
  };

  const fetchTopArtists = (range) => {
    setArtistsTimeRange(range);
    spotifyApi.getMyTopArtists({ limit: 10, time_range: range })
      .then(response => {
        setTopArtists(response.items);
      })
      .catch(error => {
        console.error('Error fetching top artists:', error);
      });
  };

  useEffect(() => {
    // Check for access token in URL hash after login
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      setIsLoggedIn(true);
      // Fetch default top tracks and top artists
      fetchTopTracks('short_term');
      fetchTopArtists('short_term');
    }
  }, []);

  const renderSection = () => {
    switch (selectedSection) {
      case 'tracks':
        return (
          <div>
            {selectedSection === 'tracks' && (
              <div className="nav-group">
                <button className={`nav-button ${tracksTimeRange === 'short_term' ? 'active' : ''}`} onClick={() => fetchTopTracks('short_term')}>1 month</button>
                <button className={`nav-button ${tracksTimeRange === 'medium_term' ? 'active' : ''}`} onClick={() => fetchTopTracks('medium_term')}>6 months</button>
                <button className={`nav-button ${tracksTimeRange === 'long_term' ? 'active' : ''}`} onClick={() => fetchTopTracks('long_term')}>12 months</button>
              </div>
            )}
            <h2>Your Top Tracks</h2>
            <p>Time Range: {tracksTimeRange === 'short_term' ? '1 month' : tracksTimeRange === 'medium_term' ? '6 months' : '12 months'}</p>
            <ul>
              {topTracks.map((track, index) => (
                <li key={index}>
                  {track.name} - Popularity: {track.popularity}
                </li>
              ))}
            </ul>
          </div>
        );
      case 'artists':
        return (
          <div>
            {selectedSection === 'artists' && (
              <div className="nav-group">
                <button className={`nav-button ${artistsTimeRange === 'short_term' ? 'active' : ''}`} onClick={() => fetchTopArtists('short_term')}>1 month</button>
                <button className={`nav-button ${artistsTimeRange === 'medium_term' ? 'active' : ''}`} onClick={() => fetchTopArtists('medium_term')}>6 months</button>
                <button className={`nav-button ${artistsTimeRange === 'long_term' ? 'active' : ''}`} onClick={() => fetchTopArtists('long_term')}>12 months</button>
              </div>
            )}
            <h2>Your Top Artists</h2>
            <p>Time Range: {artistsTimeRange === 'short_term' ? '1 month' : artistsTimeRange === 'medium_term' ? '6 months' : '12 months'}</p>
            <ul>
              {topArtists.map((artist, index) => (
                <li key={index}>
                  {artist.name} - Popularity: {artist.popularity}
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="hero">
          <h1 className="hero-title">Spotify Statistic</h1>
          <p className="hero-subtitle">Check your most listened tracks and artists.</p>
          {isLoggedIn ? (
            <div>
              <div className="nav-section">
                <button className={`nav-button ${selectedSection === 'tracks' ? 'active' : ''}`} onClick={() => setSelectedSection('tracks')}>Top Tracks</button>
                <button className={`nav-button ${selectedSection === 'artists' ? 'active' : ''}`} onClick={() => setSelectedSection('artists')}>Top Artists</button>
              </div>
              {renderSection()}
            </div>
          ) : (
            <button className="login-button" onClick={handleLogin}>
              Log in with Spotify
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
