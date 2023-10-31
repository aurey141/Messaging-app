import { Channel, ChannelHeader, ChannelList, ChannelListMessengerProps, Chat, LoadingIndicator, MessageInput, MessageList, Window, useChatContext } from "stream-chat-react"
import { useLoggedInAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"



export function Home() {
  const { user, streamChat } = useLoggedInAuth()

  if (streamChat == null) return <LoadingIndicator/>


  return <Chat client={streamChat} theme="str-chat__theme-dark">
    <ChannelList
      List={Channels}
      sendChannelsToList
      filters={{ members: { $in: [user.id] } }}
    />
    <Channel>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
    </Channel>
  </Chat>
}

function Channels({ loadedChannels }: ChannelListMessengerProps) {
    const navigate = useNavigate()
    const { logout } = useLoggedInAuth()
    const { setActiveChannel, channel: activeChannel } = useChatContext()
  
    return (
      <div className="w-60 flex flex-col gap-4 m-3 h-full">
        <Button onClick={() => navigate("/channel/new")}>Add Conversation</Button>
        <hr className="border-gray-500" />
        {loadedChannels != null && loadedChannels.length > 0
          ? loadedChannels.map(channel => {
              const isActive = channel === activeChannel
              const extraClasses = isActive
                ? "bg-blue-900 text-white"
                : "hover:bg-gray-400 bg-gray-500"
              return (
                <button
                  onClick={() => setActiveChannel(channel)}
                  disabled={isActive}
                  className={`p-4 rounded-lg flex gap-3 items-center ${extraClasses}`}
                  key={channel.id}
                >
                  {channel.data?.image && (
                    <img
                      src={channel.data.image}
                      className="w-10 h-10 rounded-full object-center object-cover"
                    />
                  )}
                  <div className="text-ellipsis overflow-hidden whitespace-nowrap">
                    {channel.data?.name || channel.id}
                  </div>
                </button>
              )
            })
          : "No Conversations"}
        <hr className="border-gray-500 mt-auto" />
        <Button onClick={async () => logout.mutate()}>
          Logout
        </Button>
      </div>
    )
  }
