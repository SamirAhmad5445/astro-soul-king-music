import { ArrowLeftSvg } from "@assets/icons/ArrowLeftSvg";
import ErrorMessage from "@components/ErrorMessage";
import { useState, type FormEvent } from "react";
import { formatDate, parseDate, tryParseDate } from "@utils/parse-date";
import { LoadingSvg } from "@assets/icons/LoadingSvg";

const UserRegisterForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [days, setDays] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [years, setYears] = useState<number>(0);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!isStepOneValid()) {
      return;
    }

    if (currentStep !== 2) {
      setCurrentStep(2);
      return;
    }

    if (!isStepTwoValid()) {
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("https://localhost:7066/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          firstName,
          lastName,
          email,
          birthdate: formatDate(parseDate(days, months, years)!),
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const message = await response.text();
        setError(message);
        setIsLoading(false);
      }

      location.href = "/login";
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  function handleNext() {
    if (!isStepOneValid()) {
      return;
    }

    setError("");
    setCurrentStep((c) => 3 - c); // if 2 results is 1, and if 1 results 2
  }

  async function checkAvailable() {
    setError("");

    if (!username) {
      setError("Please enter a username.");
      return false;
    }

    try {
      const response = await fetch("https://localhost:7066/api/user/check", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(username),
        credentials: "include",
      });

      setIsAvailable(response.ok);
    } catch (e) {
      console.log(e);
    }
  }

  function isStepOneValid(): boolean {
    if (!username) {
      setError("Please enter a username.");
      return false;
    }

    if (!password || password.length < 8) {
      setError("Please enter a password (at least 8 characters).");
      return false;
    }

    if (!confirmPassword || confirmPassword !== password) {
      setError("Please confirm your password.");
      return false;
    }
    return true;
  }

  function isStepTwoValid(): boolean {
    if (!email) {
      setError("Please enter a working email.");
      return false;
    }

    if (!firstName || !lastName) {
      setError("Please enter your name.");
      return false;
    }

    if (!tryParseDate(days, months, years)) {
      setError("Please enter a birth date correctly.");
      return false;
    }

    return true;
  }

  return (
    <form onSubmit={handleSubmit} className="grid w-96 gap-4">
      <div className="relative mb-4 grid overflow-x-hidden">
        <div
          className="col-[1/2] row-[1/2] grid content-start transition-all duration-300"
          style={{ translate: currentStep === 1 ? "0%" : "-120%" }}
        >
          <label htmlFor="username" className="mb-2">
            Username:
          </label>
          <input
            className={`mb-2 rounded-lg border border-primary-200 bg-transparent px-4 py-2 caret-primary-400 outline-0 ${
              isAvailable !== null
                ? isAvailable
                  ? "border-success-400"
                  : "border-danger-400"
                : "focus:border-primary-400"
            }`}
            type="text"
            id="username"
            name="username"
            placeholder="e.g. whitebeard"
            tabIndex={1}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setIsAvailable(null);
            }}
          />
          <div className="flex items-center justify-end px-4 text-sm">
            <button
              type="button"
              tabIndex={1}
              className="text-neutral-50/80 hover:text-primary-400"
              onClick={checkAvailable}
            >
              {isAvailable !== null ? (
                isAvailable ? (
                  <span className="text-success-500">available</span>
                ) : (
                  <span className="text-danger-500">not available</span>
                )
              ) : (
                "check available?"
              )}
            </button>
          </div>

          <label htmlFor="password" className="mb-2">
            Password:
          </label>
          <input
            className="mb-4 rounded-lg border border-primary-200 bg-transparent px-4 py-2 caret-primary-400 outline-0 focus:border-primary-400"
            type="password"
            id="password"
            name="password"
            placeholder="At least 8 characters"
            tabIndex={1}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="confirm-password" className="mb-2">
            Confirm Password:
          </label>
          <input
            className="rounded-lg border border-primary-200 bg-transparent px-4 py-2 caret-primary-400 outline-0 focus:border-primary-400"
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Confirm your password"
            tabIndex={1}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div
          className="z-10 col-[1/2] row-[1/2] grid content-start transition-all duration-300"
          style={{ translate: currentStep === 2 ? "0%" : "120%" }}
        >
          <label htmlFor="email" className="mb-2">
            Email:
          </label>
          <input
            className="mb-4 rounded-lg border border-primary-200 bg-transparent px-4 py-2 caret-primary-400 outline-0 focus:border-primary-400"
            type="email"
            id="email"
            name="email"
            placeholder="e.g. example@domain.com"
            tabIndex={currentStep === 1 ? -1 : 3}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="first-name" className="mb-2">
            Your Name:
          </label>
          <div className="mb-4 grid grid-cols-2 gap-2">
            <input
              className="rounded-lg border border-primary-200 bg-transparent px-4 py-2 caret-primary-400 outline-0 focus:border-primary-400"
              type="text"
              id="first-name"
              name="first-name"
              placeholder="e.g. Edward"
              tabIndex={currentStep === 1 ? -1 : 3}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              className="rounded-lg border border-primary-200 bg-transparent px-4 py-2 caret-primary-400 outline-0 focus:border-primary-400"
              type="text"
              id="last-name"
              name="last-name"
              placeholder="e.g. Newgate"
              tabIndex={currentStep === 1 ? -1 : 3}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <label className="mb-2">Birth Date:</label>
          <div className="grid grid-cols-3 gap-2">
            <input
              className="rounded-lg border border-primary-200 bg-transparent px-4 py-2 caret-primary-400 outline-0 focus:border-primary-400"
              type="number"
              id="date-day"
              name="date-day"
              placeholder="DD"
              tabIndex={currentStep === 1 ? -1 : 3}
              value={days === 0 ? "" : days}
              onChange={(e) => setDays(+e.target.value)}
            />

            <input
              className="rounded-lg border border-primary-200 bg-transparent px-4 py-2 caret-primary-400 outline-0 focus:border-primary-400"
              type="number"
              id="date-month"
              name="date-month"
              placeholder="MM"
              tabIndex={currentStep === 1 ? -1 : 3}
              value={months === 0 ? "" : months}
              onChange={(e) => setMonths(+e.target.value)}
            />

            <input
              className="rounded-lg border border-primary-200 bg-transparent px-4 py-2 caret-primary-400 outline-0 focus:border-primary-400"
              type="number"
              id="date-year"
              name="date-year"
              placeholder="YYYY"
              tabIndex={currentStep === 1 ? -1 : 3}
              value={years === 0 ? "" : years}
              onChange={(e) => setYears(+e.target.value)}
            />
          </div>
        </div>
      </div>

      {error && <ErrorMessage message={error} onClear={() => setError("")} />}

      <div className="relative grid grid-cols-[3rem_1fr] grid-rows-1 gap-2">
        <button
          tabIndex={2}
          type="button"
          className={`btn absolute z-10 h-full transition-all duration-300 ${currentStep === 2 ? "w-12" : "w-full"}`}
          onClick={handleNext}
        >
          {currentStep === 2 ? <ArrowLeftSvg className="" /> : "Next"}
        </button>

        <button
          tabIndex={currentStep === 1 ? -1 : 4}
          className={`btn col-[2/-1] grid origin-right place-content-center transition-all duration-300 ${currentStep === 2 ? "scale-x-1" : "scale-x-0"} ${isLoading ? "opacity-95 hover:bg-neutral-100" : ""}`}
          type="submit"
        >
          {isLoading ? (
            <LoadingSvg className="size-7 text-neutral-950" />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default UserRegisterForm;
