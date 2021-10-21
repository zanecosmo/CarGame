defmodule ChannelTestWeb.PublicChannel do
    use ChannelTestWeb, :channel

  @impl true
    def join("public:lobby", _payload, socket) do
      {:ok, socket}
    end

@impl true
    def handle_in("name_change_incoming", %{"player_list" => player_list}, socket) do
      broadcast socket, "name_change_outgoing", %{player_list: player_list}
      {:noreply, socket}
    end
  
  @impl true # FIND MATCH: JOIN ==> LOBBY
    def handle_in("find_match", %{"game_code" => game_code}, socket) do
      broadcast socket, "match_request", %{proposed_code: game_code}
      {:noreply, socket}
    end
  
  @impl true # MATCH ACCEPTED: LOBBY ==> JOIN
    def handle_in("match_accepted", %{
      "game_code" => game_code,
      "player_index" => player_index,
      # "player_list" => player_list
      }, socket) do
      broadcast socket, "accepted", %{
        game_code: game_code,
        player_index: player_index,
        # player_list: player_list
        }
        
      {:noreply, socket}
    end
  
  @impl true # FULLY JOINED: JOINED ==> LOBBY
    def handle_in("fully_joined", _payload, socket) do
      broadcast socket, "player_joined", _payload
      {:noreply, socket}
    end
  
  @impl true # PLAYER UPDATE: LOBBY ==> LOBBY
    def handle_in("player_update_incoming", %{"player_list" => player_list}, socket) do
      broadcast socket, "player_update_outgoing", %{player_list: player_list}
      {:noreply, socket}
    end

  # @impl true
  #   def handle_in("createGameInstance", %{"game" => gameCode}, socket) do      
  #     ChannelTest.Repo.insert(%ChannelTest.GameInstance{game_instance: gameCode})
  #     {:noreply, socket}
  #   end
end