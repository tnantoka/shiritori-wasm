mod utils;
use shiritori::game::{Game, Judgement};
use shiritori::word::{Word, WordList, WordListType};
use serde::{Serialize};

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[derive(Serialize)]
struct GameState {
    histories: Vec<Word>,
    judgement: Judgement,
}

#[wasm_bindgen]
pub fn start_game() -> wasm_bindgen::JsValue {
    let word_list: WordList = WordList::load(WordListType::Pokemon);
    let game: Game = Game::new(word_list);

    let histories = game.histories;
    let judgement = Judgement::new(false, None, None);
    let state = GameState {
        histories,
        judgement
    };
    JsValue::from_serde(&state).unwrap()
}

#[wasm_bindgen]
pub fn next_turn(histories: String, text: String) -> wasm_bindgen::JsValue {
    let histories: Vec<Word> = serde_json::from_str(&histories).unwrap();
    let word_list: WordList = WordList::load(WordListType::Pokemon);
    let mut game: Game = Game::new(word_list);
    game.histories = histories;

    let judgement = game.next_turn(&text);

    let histories = game.histories;
    let state = GameState {
        histories,
        judgement
    };
    JsValue::from_serde(&state).unwrap()
}

#[wasm_bindgen]
pub fn setup() {
    utils::set_panic_hook();
}
