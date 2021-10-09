defmodule ChannelTestWeb.MenuController do
  use ChannelTestWeb, :controller

  def start(conn, _params) do
      render(conn, "start.html")
  end

  def go_to_private_lobby(conn, _params) do
    render(conn, "lobby.html")
  end

  def go_to_join_page(conn, _params) do
    render(conn, "join.html")
  end

end
