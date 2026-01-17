import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import {
  addPlayer,
  getGameState,
  resetGame,
  startGame
} from "../lib/gameState.js";

describe("gameState", () => {
  afterEach(() => {
    resetGame();
  });

  it("adds a player before the game starts", () => {
    addPlayer("alice");

    const state = getGameState();
    assert.ok(state.players.alice);
    assert.equal(state.players.alice.hp, 100);
    assert.equal(state.players.alice.alive, true);
  });

  it("does not add the same player twice", () => {
    addPlayer("bob");
    addPlayer("bob");

    const state = getGameState();
    assert.equal(Object.keys(state.players).length, 1);
  });

  it("prevents new players from joining after the game starts", () => {
    addPlayer("carol");
    startGame();
    addPlayer("dave");

    const state = getGameState();
    assert.ok(state.players.carol);
    assert.ok(!state.players.dave);
  });
});
