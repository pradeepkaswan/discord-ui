export default function Home() {
  return (
    <>
      <div className="flex w-60 flex-col bg-gray-800">
        <div className="flex h-12 items-center px-3 font-semibold text-white shadow-sm">
          <input
            type="text"
            className="w-full rounded border-none bg-gray-900 px-1.5 py-1 text-sm font-medium placeholder-gray-400"
            placeholder="Find or start a conversation"
          />
        </div>
        <div className="flex-1 space-y-2 overflow-y-scroll p-3 font-medium text-gray-300">
          <p className="text-white">Friends</p>
          <p className="text-white">Message Requests</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-gray-700"></div>
    </>
  );
}
