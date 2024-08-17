import ErrorMessage from "@components/ErrorMessage";
import { useState, type ChangeEvent } from "react";
import DefaultProfilePic from "@assets/default-profile-image.webp";
interface EditProfileFormProps {
  artistName: string;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ artistName }) => {
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  function handleSubmit() {}

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
              Add Song
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
