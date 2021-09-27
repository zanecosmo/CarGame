defmodule ChannelTestWeb.PlayController do
  use ChannelTestWeb, :controller

def start(conn, _params) do
    render(conn, "level_one.html")
  end

end
