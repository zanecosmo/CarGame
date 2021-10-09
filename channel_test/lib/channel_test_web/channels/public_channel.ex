defmodule ChannelTestWeb.PublicChannel do
    use ChannelTestWeb, :channel

  @impl true
    def join("public:lobby", _payload, socket) do
      {:ok, socket}
    end

  @impl true
    def handle_in("createGameInstance", %{"game" => gameCode}, socket) do      
      ChannelTest.Repo.insert(%ChannelTest.GameInstance{game_instance: gameCode})
      {:noreply, socket}
    end

end