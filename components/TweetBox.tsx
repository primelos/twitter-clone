import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";

const TweetBox = () => {
  const [input, setInput] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const imageInputRef = useRef<HTMLInputElement>(null);

  const { data: session } = useSession();
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!imageInputRef.current?.value) return;
    setImage(imageInputRef.current.value);
    imageInputRef.current.value = "";
    setImageUrlBoxIsOpen(false);
  };

  return (
    <div className="flex space-x-2 p-5">
      <div className="mt-4 h-14 w-14 rounded-full object-contain overflow-hidden">
        <Image
          src={
            session?.user?.image ||
            "https://lh3.googleusercontent.com/ogw/AOh-ky08M4tjhNmxh9nBv3u9VHMD0rmvOeVaEn-OLYqCftQ=s32-c-mo"
          }
          alt="profile"
          width={80}
          height={80}
        />
      </div>
      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            className="h-24 w-full text-xl outline-none placeholder:text-xl "
            type="text"
            placeholder="What's Happening"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex items-center ">
            <div className="flex space-x-2 text-twitter flex-1">
              <PhotographIcon
                onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <SearchCircleIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <EmojiHappyIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <LocationMarkerIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
            </div>
            <button
              disabled={!input || !session}
              className="bg-twitter px-5 py-2 font-bold rounded-full text-white disabled:opacity-40"
            >
              Tweet
            </button>
          </div>
          {imageUrlBoxIsOpen && (
            <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
              <input
                ref={imageInputRef}
                type="text"
                placeholder="Enter Image URL..."
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:white"
              />
              <button
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                AddImage
              </button>
            </form>
          )}
        </form>
      </div>
    </div>
  );
};

export default TweetBox;
