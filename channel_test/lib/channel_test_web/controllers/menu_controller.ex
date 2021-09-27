defmodule ChannelTestWeb.MenuController do
  use ChannelTestWeb, :controller

def start(conn, _params) do
    render(conn, "menu_box.html")
  end

end
