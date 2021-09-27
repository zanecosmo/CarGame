defmodule ChannelTestWeb.PublicChannel do
    use ChannelTestWeb, :channel

  @impl true
    def join("public:lobby", payload, socket) do
      {:ok, socket}
    end

end