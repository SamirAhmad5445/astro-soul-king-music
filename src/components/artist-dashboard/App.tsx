import AlbumsSection from "./sections/AlbumsSection";
import ArtistDataSection from "./sections/ArtistDataSection";
import SongsSection from "./sections/SongsSection";

interface AppProps {
  artistName: string;
}

const App: React.FC<AppProps> = ({ artistName }) => {
  return (
    <>
      <header>
        <h1 className="mb-4 mt-8 px-4 text-2xl font-bold">
          Welcome, {artistName}!
        </h1>
        <ArtistDataSection artistName={artistName} />
      </header>

      <main>
        <AlbumsSection />
        <SongsSection />
      </main>
    </>
  );
};

export default App;
