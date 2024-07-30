import { LoadingSvg } from "@assets/icons/LoadingSvg";
import ErrorMessage from "@components/ErrorMessage";
import { useState, type FormEvent } from "react";

const ArtistActivationForm: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!password || password.length < 8) {
      setError("Please enter you password (at least 8 characters).");
      return;
    }

    if (confirmPassword !== password) {
      setError("Passwords mismatch, please confirm your password.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        `https://localhost:7066/api/artist/activate`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(password),
        },
      );

      if (!response.ok) {
        const message = await response.text();
        setError(message);
        setIsLoading(false);
        return;
      }

      location.replace("/artist/dashboard");
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input
        className="flex-1 rounded-lg border border-primary-200 bg-transparent px-4 py-2 caret-primary-400 outline-0 focus:border-accent-400"
        type="password"
        placeholder="Enter a new password(at least 8 characters)."
        min={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        className="flex-1 rounded-lg border border-primary-200 bg-transparent px-4 py-2 caret-primary-400 outline-0 focus:border-accent-400"
        type="password"
        placeholder="Write it again..."
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {error && <ErrorMessage message={error} onClear={() => setError("")} />}

      <button
        className={`btn grid place-content-center bg-accent-600 ${isLoading ? "opacity-95 hover:bg-neutral-100" : "hover:bg-accent-100"}`}
        type="submit"
      >
        {isLoading ? (
          <LoadingSvg className="size-7 text-neutral-950" />
        ) : (
          "Activate Account"
        )}
      </button>
    </form>
  );
};

export default ArtistActivationForm;
