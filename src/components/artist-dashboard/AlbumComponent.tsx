import { AddSvg } from "@assets/icons/AddSvg";
import { DeleteSvg } from "@assets/icons/DeleteSvg";
import type { Song, Album } from "@utils/types";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEventHandler,
} from "react";
import DefaultSongCover from "@assets/default-song-cover.png";
import ErrorMessage from "@components/ErrorMessage";

interface AlbumComponentProps {
  artistName: string;
  album: string;
}

type Actions = "add-song" | "delete-album" | null;

const AlbumComponent: React.FC<AlbumComponentProps> = ({
  artistName,
  album,
}) => {
  const [albumInfo, setAlbumInfo] = useState<Album | null>(null);
  const [thumbnail, setThumbnail] = useState<string>("");
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedAction, setSelectedAction] = useState<Actions>(null);

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    fetchAlbumInfo();
    fetchAlbumThumbnail();
    fetchSongs();
  }, []);

  async function fetchAlbumInfo() {
    try {
      const response = await fetch(
        `https://localhost:7066/api/artist/album/${album.toWellFormed()}`,
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

      const data: Album = await response.json();
      setAlbumInfo(data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchAlbumThumbnail() {
    try {
      const response = await fetch(
        `https://localhost:7066/api/artist/album/${album.toWellFormed()}/thumbnail`,
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
      const src = URL.createObjectURL(blob);
      setThumbnail(src);
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchSongs() {
    try {
      const response = await fetch(
        `https://localhost:7066/api/artist/album/${album.toWellFormed()}/songs`,
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

      const data: Song[] = await response.json();
      setSongs(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDeleteSong(songName: string) {
    try {
      const response = await fetch(
        `https://localhost:7066/api/artist/album/${album.toWellFormed()}/${songName.toWellFormed()}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      fetchSongs();
    } catch (e) {
      console.error(e);
    }
  }

  function closeDialog() {
    dialogRef.current!.close();
  }

  function openDialog(action: Actions) {
    setSelectedAction(action);
    dialogRef.current!.showModal();
  }

  if (loading) {
    return <>Just a second...</>;
  }

  return (
    <>
      <section className="mb-8 flex items-end gap-4">
        <div className="size-40 overflow-hidden rounded-lg md:size-56">
          <img
            src={thumbnail}
            alt={`album ${albumInfo?.name}'s thumbnail`}
            className="size-full object-cover"
            style={{ viewTransitionName: "album-thumbnail-" + albumInfo?.name }}
          />
        </div>

        <div>
          <h1 className="text-2xl font-medium md:text-7xl">
            {albumInfo?.name}
          </h1>
          <h2 className="text-xl">{albumInfo?.description}</h2>
          <p>{songs.length} Songs</p>

          <div className="flex gap-4 py-4 font-medium">
            <button
              onClick={() => openDialog("add-song")}
              className="flex items-center gap-2 rounded-md bg-accent-600 px-4 py-2 text-neutral-100"
            >
              <AddSvg />
              <span>Add Song</span>
            </button>

            <button
              onClick={() => openDialog("delete-album")}
              className="flex items-center gap-2 rounded-md bg-danger-600 px-4 py-2 text-danger-50"
            >
              <DeleteSvg />
              <span>Delete Album</span>
            </button>
          </div>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="rounded-2xl bg-neutral-800 p-4 text-neutral-100 shadow-2xl"
      >
        <header className="mb-2 flex items-center justify-end text-2xl">
          <button onClick={closeDialog}>×</button>
        </header>

        {selectedAction === "add-song" && (
          <AddSongForm
            albumName={albumInfo?.name!}
            onClose={closeDialog}
            onUpdateSongs={fetchSongs}
          />
        )}
        {selectedAction === "delete-album" && (
          <DeleteAlbumForm
            albumName={albumInfo?.name!}
            artistName={artistName}
          />
        )}
      </dialog>

      <section>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {songs.map((song, index) => (
            <SongComponent
              key={index}
              song={song}
              albumName={albumInfo?.name!}
              onDelete={handleDeleteSong}
            />
          ))}
        </ul>
      </section>
    </>
  );
};

interface SongComponentProps {
  albumName: string;
  song: Song;
  onDelete: Function;
}

const SongComponent: React.FC<SongComponentProps> = ({
  albumName,
  song,
  onDelete,
}) => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    fetchImage();
  }, []);

  async function fetchImage() {
    try {
      const response = await fetch(
        `https://localhost:7066/api/artist/album/${albumName}/${song.name}/image`,
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
      console.error(e);
    }
  }

  return (
    <li className="group relative flex w-60 flex-col justify-start gap-2 rounded-lg bg-neutral-900 p-4 shadow-md">
      <div className="size-52 overflow-hidden rounded-md">
        <img src={image} alt="" />
      </div>

      <h4 className="text-2xl font-medium">{song.name}</h4>
      <p className="mt-auto text-sm opacity-90">
        {new Date(song.releaseDate).toLocaleString()}
      </p>
      <div className="flex items-center justify-between">
        <span>{song.likesCount} Like</span>
        <span>{song.playsCount} Listeners</span>
      </div>

      <div className="absolute right-3 top-3 z-50 hidden group-hover:flex">
        <button
          className="rounded-md bg-danger-600 p-1 text-xl text-danger-50 opacity-50 hover:opacity-100"
          onClick={() => onDelete(song.name)}
        >
          <DeleteSvg />
          <span className="sr-only">Delete</span>
        </button>
      </div>
    </li>
  );
};

interface AddSongFormProps {
  albumName: string;
  onClose: MouseEventHandler<HTMLButtonElement>;
  onUpdateSongs: Function;
}

const AddSongForm: React.FC<AddSongFormProps> = ({
  albumName,
  onClose,
  onUpdateSongs,
}) => {
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!name || !image || !audio) {
      setError("Please enter all the data to releasing the song.");
      return;
    }

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("AlbumName", albumName);
    formData.append("Image", image);
    formData.append("Audio", audio);

    try {
      const response = await fetch(
        "https://localhost:7066/api/artist/album/add-song",
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
      setAudio(null);
      onUpdateSongs();
      (onClose as Function)();
    } catch (e) {
      setError("Oops, something went wrong please try again.");
      console.error(e);
    }
  }

  function handleFileChange(
    e: ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
  ) {
    if (e.target.files) {
      setFile(e.target.files[0]);
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
            id="name"
            className="rounded-lg border border-primary-200 bg-transparent px-4 py-2 caret-primary-400 outline-0 focus:border-accent-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Song Name"
          />

          <input
            type="file"
            accept="image/*"
            className="rounded-md border border-primary-200 px-3 py-1.5 text-neutral-100"
            onChange={(e) => handleFileChange(e, setImage)}
            placeholder="Song Cover"
          />

          <input
            type="file"
            accept="audio/mpeg"
            className="rounded-md border border-primary-200 px-3 py-1.5 text-neutral-100"
            onChange={(e) => handleFileChange(e, setAudio)}
            placeholder="Song File"
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
              Add Song
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface DeleteAlbumFormProps {
  albumName: string;
  artistName: string;
}

const DeleteAlbumForm: React.FC<DeleteAlbumFormProps> = ({
  albumName,
  artistName,
}) => {
  const [confirmMessage, setConfirmMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (confirmMessage !== `Delete ${albumName}`) {
      return;
    }

    try {
      const response = await fetch(
        `https://localhost:7066/api/artist/album/${albumName}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "text/plain",
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        setError(await response.text());
        return;
      }

      location.href = `/artist/${artistName}`;
    } catch (e) {
      setError("Oops, something went wrong please try again.");
      console.error(e);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 text-center">
      <h3 className="text-xl font-bold text-danger-600 md:text-3xl">
        Danger Zone
      </h3>
      <p className="max-w-[48ch]">
        Heads up! Deleting the album wipes out all the album data, and no
        take-backs, write
        <span className="font-bold"> "Delete {albumName}" </span>
        to confirm your decision.
      </p>

      <input
        type="text"
        placeholder={`Delete ${albumName}`}
        value={confirmMessage}
        onChange={(e) => setConfirmMessage(e.currentTarget.value)}
        className="rounded-lg border border-primary-200 bg-transparent px-4 py-2 caret-primary-400 outline-0 focus:border-danger-400"
      />

      {error && <ErrorMessage message={error} onClear={() => setError("")} />}

      <button
        className={`rounded-md px-4 py-2 ${
          confirmMessage === `Delete ${albumName}`
            ? "bg-danger-500 text-neutral-200"
            : "cursor-not-allowed bg-danger-50 text-danger-600 opacity-80"
        }`}
        type="submit"
      >
        Delete
      </button>
    </form>
  );
};

export default AlbumComponent;
