import { TabsIcons } from "@assets/icons/TabsIcons";
import useNanoStor from "@hooks/use-nano-store";
import { $currentTab, tabValues } from "@stores/current-tab-store";

const Sidebar = () => {
  const [currentTab, setCurrentTab] = useNanoStor($currentTab);

  return (
    <aside className="sticky top-0 grid h-svh min-w-56 content-start gap-4 p-3 md:min-w-72">
      <ul className="grid gap-3 rounded-lg bg-neutral-800 p-3 text-lg font-medium shadow-md">
        {tabValues.map((tab, index) => (
          <li key={index} className="grid">
            <button
              onClick={() => setCurrentTab(tab)}
              className={`flex items-center gap-2 rounded-md p-2 capitalize ${tab === currentTab ? "bg-primary-600" : ""}`}
            >
              <span>{TabsIcons[tab]}</span>
              <span>{tab}</span>
            </button>
          </li>
        ))}
      </ul>

      <div></div>
    </aside>
  );
};

export default Sidebar;
