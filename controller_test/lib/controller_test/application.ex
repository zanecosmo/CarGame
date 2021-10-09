defmodule ControllerTest.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      ControllerTest.Repo,
      # Start the Telemetry supervisor
      ControllerTestWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: ControllerTest.PubSub},
      # Start the Endpoint (http/https)
      ControllerTestWeb.Endpoint
      # Start a worker by calling: ControllerTest.Worker.start_link(arg)
      # {ControllerTest.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: ControllerTest.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    ControllerTestWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
