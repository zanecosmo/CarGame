# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :controller_test,
  ecto_repos: [ControllerTest.Repo]

# Configures the endpoint
config :controller_test, ControllerTestWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "3fstIxjW4N6CABoqW8tuQjXyoMoefvtJ8yDvqiUmerw6clZnx2SLLDJp54hSiXPP",
  render_errors: [view: ControllerTestWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: ControllerTest.PubSub,
  live_view: [signing_salt: "S2genG57"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
