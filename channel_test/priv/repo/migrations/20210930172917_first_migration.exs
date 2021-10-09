defmodule ChannelTest.Repo.Migrations.FirstMigration do
  use Ecto.Migration

  def up do
    create table("GameInstances") do
      add :game_instance, :string
    end
  end

  def down do
    drop table("GameInstances")
  end
end
