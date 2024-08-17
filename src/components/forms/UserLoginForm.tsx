import type React from "react";
import { useState, type FormEvent } from "react";
import ErrorMessage from "@components/ErrorMessage";
import { LoadingSvg } from "@assets/icons/LoadingSvg";

const UserLoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!username) {
      setError("Please enter you username.");
      return;
    }

    if (!password || password.length < 8) {
      setError("Please enter you password (at least 8 characters).");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`https://localhost:7066/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username: username.toLowerCase(), password }),
      });

      if (!response.ok) {
        const message = await response.text();
        setError(message);
        setIsLoading(false);
        return;
      }

      const data: any = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("login", "true");
      localStorage.setItem("username", username);
      location.href = "/app";
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input
        className="flex-1 rounded-lg border border-primary-200 bg-transparent px-4 py-2 caret-primary-400 outline-0 focus:border-primary-400"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="flex-1 rounded-lg border border-primary-200 bg-transparent px-4 py-2 caret-primary-400 outline-0 focus:border-primary-400"
        type="password"
        placeholder="Password"
        min={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <ErrorMessage message={error} onClear={() => setError("")} />}

      <button
        className={`btn grid place-content-center ${isLoading ? "opacity-95 hover:bg-neutral-100" : ""}`}
        type="submit"
      >
        {isLoading ? (
          <LoadingSvg className="size-7 text-neutral-950" />
        ) : (
          "Log in"
        )}
      </button>
    </form>
  );
};

export default UserLoginForm;
