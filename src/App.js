import React from 'react';
import './App.css';

function App() {

 /* https://accounts.spotify.com/authorize?
  client_id=5fe01282e94241328a84e7c5cc169164&redirect_uri=http:%2F%2Fexampl
  e.com%2Fcallback&scope=user-read-private%20user-read
  email&response_type=token&state=123 */ 
  const CLIENT_ID = "adb075ad46114452bf4c07555f416991";
  const SPOTIFY_AUTHORIZATION_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URL_AFTER_LOGIN = "https://cautious-zebra-q7qr9rpxjw52xw4j-3000.app.github.dev/";
  const SPACE_DELIMITER = "%20";
  const SCOPES = ["user-read-currently-playing", "user-read-playback-state"];
  const SCOPES_URL_PARAM = SCOPES. join (SPACE_DELIMITER);
  const handleLogin = () => {
    // Redirect user to Spotify login page
    window.location = `${SPOTIFY_AUTHORIZATION_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="hero">
          <h1 className="hero-title">Spotify Statistic</h1>
          <p className="hero-subtitle">Millions of songs. No credit card needed.</p>
          <button className="login-button" onClick={handleLogin}>
            Log in with Spotify
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
