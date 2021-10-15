defmodule ChannelTestWeb.LayoutController do
  use ChannelTestWeb, :controller

  def start(conn, _params) do
      render(conn, "app.html")
  end

end
