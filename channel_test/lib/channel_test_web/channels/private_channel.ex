defmodule ChannelTestWeb.PrivateChannel do
  use ChannelTestWeb, :channel

  @impl true
    def join("private:" <> gameCode, payload, socket) do
      {:ok, socket}
    end

  @impl true
    def handle_in("keydownTrue", %{"message" => letter_value}, socket) do
      broadcast socket, "globalKeyDown", %{letter: letter_value}
      {:noreply, socket}
    end

  @impl true
    def handle_in("keyupTrue", %{"message" => letter_value}, socket) do
      broadcast socket, "globalKeyUp", %{letter: letter_value}
      {:noreply, socket}
    end
  
  @impl true
    def handle_in("updateIncoming", %{"update" => [posX, posY, rot]}, socket) do
      broadcast socket, "updateOutgoing", %{position: [posX, posY, rot]}
      {:noreply, socket}
    end
end
