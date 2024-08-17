import type { Album } from "@utils/types";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEventHandler,
} from "react";
import { LoadingSvg } from "@assets/icons/LoadingSvg";
import { slugify } from "@utils/parse-path";
import { AddSvg } from "@assets/icons/AddSvg";
import DefaultSongCover from "@assets/default-song-cover.png";
import ErrorMessage from "@components/ErrorMessage";

interface AlbumsSectionProps {
  artistName: string;
}

const AlbumsSection: React.FC<AlbumsSectionProps> = ({ artistName }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    fetchAllAlbums();
  }, []);

  async function fetchAllAlbums() {
    try {
      const response = await fetch(
        "https://localhost:7066/api/artist/album/all",
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

      const data: Album[] = await response.json();
      setLoading(false);
      setAlbums(data);
    } catch (e) {
      console.log(e);
    }
  }

  function closeDialog() {
    dialogRef.current!.close();
  }

  function openDialog() {
    dialogRef.current!.showModal();
  }

  if (loading) {
    return <div className="px-4 text-accent-100">Loading...</div>;
  }

  if (!albums.length) {
    return <div className="px-4 text-accent-100">Time to release an album</div>;
  }

  return (
    <>
      <section className="py-4">
        <h2 className="px-4 pb-4 text-2xl font-bold">Your Albums</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {albums.slice(0, 8).map((al) => (
            <AlbumCard
              key={al.name}
              artistName={artistName}
              name={al.name}
              description={al.description}
            />
          ))}

          <button
            onClick={openDialog}
            className="grid grid-cols-[5rem_1fr] grid-rows-[5rem] items-center overflow-hidden rounded-lg bg-neutral-800 text-start shadow-md"
          >
            <div className="grid size-full place-content-center bg-success-500 text-4xl text-neutral-700">
              <AddSvg />
            </div>

            <div className="flex items-center px-4">
              <p>Release an Album</p>
            </div>
          </button>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="rounded-2xl bg-neutral-800 p-4 text-neutral-100 shadow-2xl"
      >
        <header className="mb-2 flex items-center justify-end text-2xl">
          <button onClick={closeDialog}>×</button>
        </header>

        <AddAlbumForm onClose={closeDialog} onUpdateAlbums={fetchAllAlbums} />
      </dialog>
    </>
  );
};

interface AlbumCardProps {
  artistName: string;
  name: string;
  description: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  artistName,
  name,
  description,
}) => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    fetchAlbumImage();
  }, []);

  async function fetchAlbumImage() {
    try {
      const response = await fetch(
        `https://localhost:7066/api/artist/album/${name}/thumbnail`,
        {
          method: "GET",
          headers: {
            "Content-Type": "image/webp",
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <a
      href={`/artist/${artistName}/${slugify(name)}`}
      className="grid grid-cols-[5rem_1fr] grid-rows-[5rem] overflow-hidden rounded-lg bg-neutral-800 text-start shadow-md"
    >
      <div className="grid size-full place-content-center">
        {image ? (
          <img
            src={image}
            className="size-full object-contain object-center"
            width={64}
            height={64}
            style={{ viewTransitionName: "album-thumbnail-" + name }}
            alt=""
          />
        ) : (
          <LoadingSvg />
        )}
      </div>

      <div className="flex items-center px-4">
        <p>{name}</p>
      </div>
    </a>
  );
};

interface AddSongFormProps {
  onClose: MouseEventHandler<HTMLButtonElement>;
  onUpdateAlbums: Function;
}

const AddAlbumForm: React.FC<AddSongFormProps> = ({
  onClose,
  onUpdateAlbums,
}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!name || !image || !description) {
      setError("Please enter all the data to releasing the song.");
      return;
    }

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("Image", image);

    try {
      const response = await fetch(
        "https://localhost:7066/api/artist/album/release",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      if (!response.ok) {
        setError(await response.text());
        return;
      }

      setName("");
      setImage(null);
      setDescription("");
      onUpdateAlbums();
      (onClose as Function)();
    } catch (e) {
      setError("Oops, something went wrong please try again.");
      console.error(e);
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  }

  function setImageSrc(): string {
    if (!image) {
      return DefaultSongCover.src;
    }

    return URL.createObjectURL(image);
  }

  return (
    <div className="grid gap-4">
      <h3 className="text-xl font-medium md:text-2xl">
        A new release is coming up
      </h3>

      <div className="flex gap-4 max-md:flex-col">
        <div className="grid size-64 flex-1 overflow-hidden rounded-lg">
          <img src={setImageSrc()} className="size-full object-cover" alt="" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4">
          <input
            type="text"
            className="rounded-lg border border-primary-200 bg-transparent px-4 py-2 caret-primary-400 outline-0 focus:border-accent-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Album Name"
          />

          <input
            type="text"
            className="rounded-lg border border-primary-200 bg-transparent px-4 py-2 caret-primary-400 outline-0 focus:border-accent-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <input
            type="file"
            accept="image/*"
            className="rounded-md border border-primary-200 px-3 py-1.5 text-neutral-100"
            onChange={(e) => handleFileChange(e)}
            placeholder="Song Cover"
          />

          {error && (
            <ErrorMessage message={error} onClear={() => setError("")} />
          )}

          <div className="mt-auto grid grid-cols-2 gap-4">
            <button
              className="rounded-md bg-neutral-100 px-4 py-2 text-neutral-900"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="rounded-md bg-accent-500 px-4 py-2 text-neutral-900"
              type="submit"
            >
              Add Album
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlbumsSection;
