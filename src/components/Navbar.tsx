import { useEffect, useState } from "react";
import DefaultProfilePic from "@assets/default-profile-image.webp";

const Navbar = () => {
  const [profileImage, setProfileImage] = useState<string>(
    DefaultProfilePic.src,
  );
  const login = Boolean(localStorage.getItem("login")) || false;
  const username = localStorage.getItem("username") || "";
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    if (!login) {
      return;
    }

    fetchProfileImage();
  }, []);

  async function fetchProfileImage() {
    const response = await fetch(
      `https://localhost:7066/api/user/profile-image`,
      {
        method: "GET",
        headers: {
          "Content-Type": "image/webp",
          Authorization: "bearer " + token,
        },
        credentials: "include",
      },
    );

    if (response.ok) {
      const blob = await response.blob();
      setProfileImage(URL.createObjectURL(blob));
    }
  }

  function loginOptions() {
    return (
      <div className="flex items-center gap-4">
        <a href="/register" className="hover:text-primary-500">
          Sign up
        </a>
        <a
          href="/login"
          className="rounded-lg bg-neutral-100 px-4 py-2 text-neutral-900 shadow"
        >
          Log in
        </a>
      </div>
    );
  }

  function profile() {
    return (
      <a
        href={`/app/${username}`}
        className="flex items-center gap-3 px-4 text-lg hover:text-primary-600"
      >
        <span>@{username}</span>
        <img src={profileImage} alt="" className="size-8 rounded-full" />
      </a>
    );
  }

  return (
    <nav className="flex items-center justify-end bg-neutral-950/95 p-4">
      {login ? profile() : loginOptions()}
    </nav>
  );
};

export default Navbar;
