defmodule ChannelTestWeb.PublicSocket do
    use Phoenix.Socket

  channel "public:lobby", ChannelTestWeb.PublicChannel

  @impl true
    def connect(_params, socket, _connect_info) do
      {:ok, socket}
    end

  @impl true
    def id(_socket), do: nil

end