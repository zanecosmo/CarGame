defmodule ChannelTest.Repo do
  use Ecto.Repo,
    otp_app: :channel_test,
    adapter: Ecto.Adapters.Postgres
end
