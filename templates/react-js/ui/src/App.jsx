import logoSrc from "./assets/logo.png";

function App() {
  return (
    <main class="main">
      <img
        width="160"
        height="160"
        src={logoSrc}
        alt="javascript logo"
        class="logo"
      />
      <div class="content">
        <h1 class="title">
          React&nbsp;<span class="logo-text">JS</span> template
        </h1>
        <p class="sub-title">Figma Plugin CLI</p>
      </div>
    </main>
  );
}

export default App;
