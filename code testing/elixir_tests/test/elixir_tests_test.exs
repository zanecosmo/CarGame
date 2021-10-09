defmodule ElixirTestsTest do
  use ExUnit.Case
  doctest ElixirTests

  test "greets the world" do
    assert ElixirTests.hello() == :world
  end
end
