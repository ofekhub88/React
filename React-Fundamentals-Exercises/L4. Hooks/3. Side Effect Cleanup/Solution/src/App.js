import React, { useState ,useContext} from "react";

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  const [valuethemes,setValuethemes] = useState(themes.light)
  const SetLight=() => setValuethemes(themes.light)
  const SetDrak=() => setValuethemes(themes.dark)

  return (
    <div> 
      <button onClick={SetDrak}> Drak</button>
      <button onClick={SetLight}> Light</button>
    <ThemeContext.Provider value={valuethemes}>
      <Toolbar />
    </ThemeContext.Provider>
    </div>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}

export default App