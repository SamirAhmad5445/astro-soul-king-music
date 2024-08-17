import { useStore } from "@nanostores/react";
import { $currentTab } from "@stores/current-tab-store";
import HomeTab from "@components/tabs/HomeTab";
import AlbumsTab from "@components/tabs/AlbumsTab";
import ArtistsTab from "@components/tabs/ArtistsTab";
import SongsTab from "@components/tabs/SongsTab";
import Navbar from "@components/Navbar";

const TabViewer = () => {
  const currentTab = useStore($currentTab);

  return (
    <div className="flex-1">
      <header className="sticky right-0 top-0 z-50">
        <Navbar />
      </header>

      <main>
        <div style={{ display: currentTab === "home" ? "block" : "none" }}>
          <HomeTab />
        </div>
        <div style={{ display: currentTab === "artists" ? "block" : "none" }}>
          <ArtistsTab />
        </div>
        <div style={{ display: currentTab === "albums" ? "block" : "none" }}>
          <AlbumsTab />
        </div>
        <div style={{ display: currentTab === "songs" ? "block" : "none" }}>
          <SongsTab />
        </div>
      </main>
    </div>
  );
};

export default TabViewer;
