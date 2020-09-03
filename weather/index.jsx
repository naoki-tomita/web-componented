const React = require("react");
const { useState, useEffect } = React;
const { render } = require("react-dom");
const { default: styled } = require("styled-components");

const Input = styled.input`
  width: 240px;
  font-size: 18px;
  border: solid 1px #aaa;
  border-radius: 4px;
  padding: 4px;
  margin-right: 4px;
`;

function fetchLocations(query) {
  return fetch(`/api/location/search/?query=${query}`).then(it => it.json());
}

const LocationSearch = () => {
  const [state, setState] = useState({ query: "", results: [] });
  async function search() {
    const results = await fetchLocations(state.query);
    setState({ ...state, results });
  }

  return (
    <>
    <Input
      value={state.query}
      onChange={e => setState({ ...state, query: e.target.value })}
    />
    <button onClick={search}>search</button>
    <ul>
      {state.results.map(it => <li>{it.title}</li>)}
    </ul>
    </>
  );
}

function fetchWether(id) {
  return fetch(`/api/location/${id}/`).then(it => it.json());
}

const Weather = ({ placeId }) => {
  const [state, setState] = useState({ loading: false, weather: null });
  async function loadWether() {
    setState({ ...state, loading: true });
    const weather = await fetchWether(placeId);
    setState({ ...state, weather, loading: false });
  }
  useEffect(() => {
    loadWether();
  }, [placeId]);

  if (state.loading) {
    return <div>loading...</div>
  }

  return (
    <>
    <div>{state?.weather?.title || ""}</div>
    <div>{state?.weather?.consolidated_weather[0].weather_state_name}</div>
    </>
  );
}

const App = () => {
  return (
    <>
    <LocationSearch />
    <Weather placeId="44418" />
    </>
  );
}

class WeatherComponent extends HTMLElement {
  constructor() { super() }
  connectedCallback() {
    render(
      <App />,
      this
    );
  }
}

customElements.define("sp-weather", WeatherComponent);
