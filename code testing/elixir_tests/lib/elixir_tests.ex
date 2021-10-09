defmodule ElixirTests do

  def prependList(num, list) do
    [num | list]
  end

  def displayList(list) do
    IO.inspect(list)
  end

end

listThing = [1,2,3]

ElixirTests.prependList(77, listThing)

ElixirTests.displayList(listThing)
