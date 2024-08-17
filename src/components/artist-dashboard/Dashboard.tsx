import AlbumsSection from "./sections/AlbumsSection";
import ArtistDataSection from "./sections/ArtistDataSection";
import SongsSection from "./sections/SongsSection";

interface DashboardProps {
  artistName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ artistName }) => {
  return (
    <>
      <header>
        <h1 className="mb-4 mt-8 px-4 text-2xl font-bold">
          Welcome, {artistName}!
        </h1>
        <ArtistDataSection artistName={artistName} />
      </header>

      <main>
        <AlbumsSection artistName={artistName} />
        <SongsSection />
      </main>
    </>
  );
};

export default Dashboard;
