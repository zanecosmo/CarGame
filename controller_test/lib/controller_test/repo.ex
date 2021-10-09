defmodule ControllerTest.Repo do
  use Ecto.Repo,
    otp_app: :controller_test,
    adapter: Ecto.Adapters.Postgres
end
