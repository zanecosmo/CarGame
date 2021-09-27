defmodule ChannelTestWeb.PrivateChannel do
  use ChannelTestWeb, :channel

  @impl true
    def join("private:lobby", payload, socket) do
      {:ok, socket}
    end

  @impl true
    def handle_in("keyDownTrue", %{"message" => letter_value}, socket) do
      broadcast socket, "globalKeyDown", %{letter: letter_value}
      {:noreply, socket}
    end

  @impl true
    def handle_in("keyUpTrue", %{"message" => letter_value}, socket) do
      broadcast socket, "globalKeyUp", %{letter: letter_value}
      {:noreply, socket}
    end
  
  @impl true
    def handle_in("updateOutgoing", %{"update" => [posX, posY, rot]}, socket) do
      broadcast socket, "updateIncoming", %{position: [posX, posY, rot]}
      {:noreply, socket}
    end

end
