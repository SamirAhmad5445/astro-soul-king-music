import { useStore } from "@nanostores/react";
import { $count } from "@stores/count";

const Counter = () => {
  const count = useStore($count);

  function increment() {
    $count.set(count + 1);
  }

  return (
    <button
      onClick={increment}
      className="shadow-indigo-600n rounded-xl bg-indigo-600 px-6 py-4 text-3xl font-medium text-indigo-200 shadow-lg"
    >
      count = {count}
    </button>
  );
};

export default Counter;
