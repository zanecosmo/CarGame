defmodule ChannelTestWeb.PrivateSocket do
  use Phoenix.Socket

  channel "private:lobby", ChannelTestWeb.PrivateChannel

  @impl true
    def connect(_params, socket, _connect_info) do
      {:ok, socket}
    end

  @impl true
    def id(_socket), do: nil
    
end
