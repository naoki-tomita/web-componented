const React = require("react");
const { useState } = React;
const { render } = require("react-dom");

const SpDocumentsComponent = () => {
  const [count, setCount] = useState(0);
  return (
    <>
    <div>count: {count}</div>
    <button onClick={() => setCount(count + 1)}>CountUp</button>
    </>
  );
}

class SpDocuments extends HTMLElement {
  constructor() { super() }
  connectedCallback() {
    render(
      <SpDocumentsComponent />,
      this
    );
  }
}

customElements.define("sp-documents", SpDocuments);
