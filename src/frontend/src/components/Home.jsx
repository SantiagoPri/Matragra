const Home = () => {
  return (
    <header className="App-header">
      <img
        src={`${process.env.PUBLIC_URL}/img/logo_512x512.png`}
        // src={`${process.env.PUBLIC_URL}/logo512.png`}
        className="App-logo"
        alt="logo"
      />
    </header>
  );
};

export default Home;
