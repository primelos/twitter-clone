import Image from "next/image";
import React, { MouseEvent, useRef, useState } from "react";
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { Tweet, TweetBody } from "../typings";
import { fetchTweets } from "../utils/fetchTweets";
import toast from "react-hot-toast";

interface Props {
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>;
}

const TweetBox = ({ setTweets }: Props) => {
  const [input, setInput] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const imageInputRef = useRef<HTMLInputElement>(null);

  const { data: session } = useSession();
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (!imageInputRef.current?.value) return;
    setImage(imageInputRef.current.value);
    imageInputRef.current.value = "";
    setImageUrlBoxIsOpen(false);
  };

  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || "Unknown user",
      profileImg:
        session?.user?.image ||
        "https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png",
      image: image,
    };
    const results = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: "POST",
    });
    const json = await results.json();

    const newTweets = await fetchTweets();
    setTweets(newTweets);

    toast("Tweet posted!", {
      icon: "🚀",
    });

    return json;
  };

  const handleSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    postTweet();

    setInput("");
    setImage("");
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
              onClick={handleSubmit}
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
          {image && (
            <img
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
              src={image}
              alt=""
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default TweetBox;
