import ErrorMessage from "@components/ErrorMessage";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import DefaultProfilePic from "@assets/default-profile-image.webp";
import type { Artist } from "@utils/types";

interface EditProfileFormProps {
  artistName: string;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ artistName }) => {
  const [artist, setArtist] = useState<Artist | null>();
  const [displayName, setDisplayName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchArtistInfo();
  }, []);

  async function fetchArtistInfo() {
    try {
      const response = await fetch(
        `https://localhost:7066/api/artist/${artistName}/info`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: Artist = await response.json();
      setArtist(data);
      bindData(data);
    } catch (e) {
      console.log(e);
      setError("Oops, Something went wrong.");
    }
  }

  function bindData(data: Artist) {
    setDisplayName(data.displayName);
    setDescription(data.description);
    setLastName(data.lastName);
    setFirstName(data.firstName);
    setDisplayName(data.displayName);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const imageFormDate = new FormData();
    imageFormDate.append("Image", image!);

    try {
      const res1 = await fetch("https://localhost:7066/api/artist/edit", {
        method: "PUT",
        body: JSON.stringify({
          displayName,
          firstName,
          lastName,
          description,
        }),
        credentials: "include",
      });

      const res2 = await fetch(
        "https://localhost:7066/api/artist/profile-image",
        {
          method: "POST",
          body: imageFormDate,
          credentials: "include",
        },
      );

      location.href = `/artist/${artistName}`;
    } catch (e) {
      console.error(e);
    }
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  }

  function setImageSrc(): string {
    if (!image) {
      return DefaultProfilePic.src;
    }

    return URL.createObjectURL(image);
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-col items-center gap-4 max-md:flex-col">
        <div className="grid size-64 flex-1 overflow-hidden rounded-lg">
          <img src={setImageSrc()} className="size-full object-cover" alt="" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4">
          <input
            type="text"
            id="name"
            className="rounded-lg border border-primary-200 bg-transparent px-4 py-2 caret-primary-400 outline-0 focus:border-accent-400"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display Name"
          />

          <input
            type="text"
            id="name"
            className="rounded-lg border border-primary-200 bg-transparent px-4 py-2 caret-primary-400 outline-0 focus:border-accent-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <div className="flex gap-4">
            <input
              type="text"
              id="name"
              className="rounded-lg border border-primary-200 bg-transparent px-4 py-2 caret-primary-400 outline-0 focus:border-accent-400"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
            <input
              type="text"
              id="name"
              className="rounded-lg border border-primary-200 bg-transparent px-4 py-2 caret-primary-400 outline-0 focus:border-accent-400"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </div>

          <input
            type="file"
            accept="image/*"
            className="rounded-md border border-primary-200 px-3 py-1.5 text-neutral-100"
            onChange={(e) => handleImageChange(e)}
            placeholder="Song Cover"
          />

          {error && (
            <ErrorMessage message={error} onClear={() => setError("")} />
          )}

          <div className="mt-auto grid grid-cols-2 gap-4">
            <a
              className="rounded-md bg-neutral-100 px-4 py-2 text-center text-neutral-900"
              href={`/artist/${artistName}`}
            >
              Cancel
            </a>

            <button
              className="rounded-md bg-accent-500 px-4 py-2 text-neutral-900"
              type="submit"
            >
              Save Updates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
