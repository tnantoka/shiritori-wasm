import init, { setup, start_game, next_turn } from '../pkg/shiritori_wasm.js';

let state;

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.js-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const text = document.querySelector('.js-text').value;
    document.querySelector('.js-text').value = '';
    state = next_turn(JSON.stringify(state.histories), text)
    render();
  
    if (state.judgement.game_over) {
      document.querySelector('.js-text').disabled = true;
      document.querySelector('.js-word').textContent = `${state.judgement.winner} win (${state.judgement.reason})`;
    }
  });

  init().then(() => {
    setup();
    state = start_game();
    render();
  });
});

const render = () => {
  renderCurrent();
  renderHistories();
};

const renderCurrent = () => {
  const { histories } = state;
  let word = histories[histories.length - 1];
  document.querySelector('.js-word').textContent = word.text;
};

const renderHistories = () => {
  const { histories } = state;
  let text = '';
  for (let i = 0; i < histories.length; i++) {
    text += i % 2 == 0 ? 'Bot> ' : 'You> ';
    text += `${histories[i].text}(${histories[i].reading})\n`
  }
  document.querySelector('.js-histories').textContent = text;
};