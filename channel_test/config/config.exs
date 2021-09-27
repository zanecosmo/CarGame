# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :channel_test,
  ecto_repos: [ChannelTest.Repo]

# Configures the endpoint
config :channel_test, ChannelTestWeb.Endpoint,
  url: [host: "localhost", port: 4000],
  secret_key_base: "oj2Co+6A3cjZgtEFIUcyEg6T96E+z1oWIvIyvc0hFd9YKbGbVXmM5XTRoxRXVboW",
  render_errors: [view: ChannelTestWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: ChannelTest.PubSub,
  live_view: [signing_salt: "du0aSII8"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
