import logoSrc from "./assets/logo.png";

function App() {
  return (
    <main className="main">
      <img
        width="160"
        height="160"
        src={logoSrc}
        alt="javascript logo"
        className="logo"
      />
      <div className="content">
        <h1 className="title">
          React&nbsp;<span className="logo-text">TS</span> template
        </h1>
        <p className="sub-title">Figma Plugin CLI</p>
      </div>
    </main>
  );
}

export default App;
