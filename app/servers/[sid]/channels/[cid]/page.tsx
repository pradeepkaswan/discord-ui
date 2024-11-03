"use client";

import * as Icons from "@/components/icons";
import { data } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Server() {
  const [closedCategories, setClosedCategories] = useState([]);
  const searchParams = useSearchParams();

  const serverId = searchParams.get("sid");
  const channelId = searchParams.get("cid");

  const server = data.find((server) => Number(server.id) === Number(serverId));

  const channel = () => {
    if (!server) return null;

    return server.categories
      .flatMap((c) => c.channels)
      .find((channel) => Number(channel.id) === Number(channelId));
  };

  function toggleCategory(categoryId) {
    setClosedCategories((closedCategories) =>
      closedCategories.includes(categoryId)
        ? closedCategories.filter((id) => id !== categoryId)
        : [...closedCategories, categoryId],
    );
  }

  return (
    <>
      <div className="flex w-60 flex-col bg-gray-800">
        {server && (
          <button className="flex h-12 flex-shrink-0 items-center px-4 font-semibold text-white shadow-sm transition hover:bg-gray-550/[0.16]">
            <div className="relative mr-2 h-4 w-4">
              <Icons.Verified className="absolute h-4 w-4 text-green-600" />
              <Icons.Check className="absolute h-4 w-4" />
            </div>
            {server.label}
            <Icons.Chevron className="ml-auto h-[18px] w-[18px] opacity-80" />
          </button>
        )}

        <div className="scrollbar space-y-[21px] overflow-y-scroll pb-4 pt-3 font-medium text-gray-300">
          {server?.categories?.map((category) => (
            <div key={category.id}>
              {category.label && (
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="flex w-full items-center px-0.5 text-xs font-semibold uppercase tracking-wide hover:text-gray-100"
                >
                  <Icons.Arrow
                    className={`${closedCategories.includes(category.id) ? "-rotate-90" : ""} mr-0.5 h-3 w-3 transition duration-200`}
                  />
                  {category.label}
                </button>
              )}

              <div className="mt-[5px] space-y-0.5">
                {category.channels
                  .filter((channel) => {
                    const categoryIsOpen = !closedCategories.includes(
                      category.id,
                    );

                    return categoryIsOpen || channel.unread;
                  })
                  .map((channel) => (
                    <ChannelLink key={channel.id} channel={channel} />
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* <div className="flex h-[53px] flex-shrink-0 items-center bg-[#232428] px-2"></div> */}
      </div>

      <div className="flex min-w-0 flex-1 flex-shrink flex-col bg-gray-700">
        <>
          <div className="flex h-12 items-center px-2 font-semibold shadow-sm">
            <div className="flex items-center">
              <Icons.Hashtag className="mx-2 h-6 w-6 text-gray-400" />
              <span className="mr-2 whitespace-nowrap text-gray-100">
                {channel.label}
              </span>
            </div>

            {channel.description && (
              <>
                <div className="mx-2 h-6 w-px bg-white/[0.06]"></div>
                <div className="ml-2 truncate text-sm font-medium text-gray-200">
                  {channel.description}
                </div>
              </>
            )}

            <div className="ml-auto flex items-center">
              <button className="text-gray-200 hover:text-gray-100">
                <Icons.Threads className="mx-2 h-6 w-6" />
              </button>
              <button className="text-gray-200 hover:text-gray-100">
                <Icons.Bell className="mx-2 h-6 w-6" />
              </button>
              <button className="text-gray-200 hover:text-gray-100">
                <Icons.Pin className="mx-2 h-6 w-6" />
              </button>
              <button className="text-gray-200 hover:text-gray-100">
                <Icons.People className="mx-2 h-6 w-6" />
              </button>
              <div className="relative mx-2">
                <input
                  type="text"
                  placeholder="Search"
                  className="h-6 w-36 rounded border-none bg-gray-900 px-1.5 text-sm font-medium placeholder-gray-400"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Icons.Hourglass className="mr-1.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <button className="text-gray-200 hover:text-gray-100">
                <Icons.Inbox className="mx-2 h-6 w-6" />
              </button>
              <button className="text-gray-200 hover:text-gray-100">
                <Icons.QuestionCircle className="mx-2 h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="scrollbar flex-1 overflow-y-scroll">
            {channel.messages ? (
              channel.messages.map((message, i) => (
                <div key={message.id}>
                  {i === 0 || message.user !== channel.messages[i - 1].user ? (
                    <MessageWithUser message={message} />
                  ) : (
                    <Message message={message} />
                  )}
                </div>
              ))
            ) : (
              <div>No messages available</div>
            )}
          </div>
        </>
      </div>
    </>
  );
}

function ChannelLink({ channel }) {
  const Icon = channel.icon ? Icons[channel.icon] : Icons.Hashtag;
  const searchParams = useSearchParams();
  const active = channel.id === searchParams.get("cid");

  const state = active
    ? "active"
    : channel.unread
      ? "inactiveUnread"
      : "inactiveRead";

  const classes = {
    active: "bg-gray-550/[0.32] text-white",
    inactiveUnread:
      "text-white hover:bg-gray-550/[0.16] active:bg-gray-550/[0.24]",
    inactiveRead:
      "text-gray-300 hover:bg-gray-550/[0.16] hover:text-gray-100 active:bg-gray-550/[0.24]",
  };

  return (
    <Link
      key={channel.id}
      href={`/servers/${server.id}/channels/${channel.id}`}
      className={`${classes[state]} group relative mx-2 flex items-center rounded px-2 py-1`}
    >
      {state === "inactiveUnread" && (
        <div className="absolute left-0 -ml-2 h-2 w-1 rounded-r-full bg-white"></div>
      )}
      <Icon className="mr-1.5 h-5 w-5 text-gray-400" />

      {channel.label}
      {channel.createInvite && (
        <Icons.AddPerson className="ml-auto h-4 w-4 text-gray-200 opacity-0 hover:text-gray-100 group-hover:opacity-100" />
      )}
    </Link>
    // <hr className="border-t-3 mx-2 rounded border-t-white/[.08]" />
  );
}

type MessageProps = {
  message: {
    id: string;
    user: string;
    avatarUrl: string;
    date: string;
    text: string;
  };
};

function MessageWithUser({ message }: MessageProps) {
  return (
    <div className="mt-[17px] flex py-0.5 pl-4 pr-16 leading-[22px] hover:bg-gray-950/[0.07]">
      <Image
        className="mr-4 mt-0.5 rounded-full"
        width={40}
        height={40}
        alt=""
        src={message.avatarUrl}
      />
      <div>
        <p className="flex items-baseline">
          <span className="mr-2 font-medium text-teal-500">{message.user}</span>
          <span className="text-xs font-medium text-gray-400">
            {message.date}
          </span>
        </p>
        <p className="leading-[22px] text-gray-100">{message.text}</p>
      </div>
    </div>
  );
}

function Message({ message }: MessageProps) {
  return (
    <div className="py-0.5 pl-4 pr-16 leading-[22px] hover:bg-gray-950/[0.07]">
      <p className="pl-14 text-gray-100">{message.text}</p>
    </div>
  );
}
