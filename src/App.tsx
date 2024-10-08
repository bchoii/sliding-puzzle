import { useState } from 'react';
import './App.css';
import { flushSync } from 'react-dom';

const range = (r: number) => [...Array(r).keys()];

function safeTransition(transition: () => void) {
  // Check if the browser supports the view transitions API
  // if not, just call the transition
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      flushSync(() => {
        transition();
      });
    });
  } else {
    transition();
  }
}

function App() {
  const [board, setBoard] = useState(range(16));

  function toggle(clickedNumber: number) {
    document.startViewTransition(() => {
      flushSync(() => {
        const newBoard = board.map(b => b == 0 ? clickedNumber : b == clickedNumber ? 0 : b)
        setBoard(newBoard);
        // const index0 = board.indexOf(0);
        // const clickedIndex = board.indexOf(clickedNumber);
        // const newBoard = [...board.slice(0, clickedIndex), 0, ...board.slice(clickedIndex + 1)];
        // const newBoard2 = [...newBoard.slice(0, index0), clickedNumber, ...newBoard.slice(index0 + 1)];
        // setBoard(newBoard2);
        // setBoard((board) => [...board.filter((i) => i != clickedIndex), index]);
      });
    });
  }

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 5rem)',
          gridTemplateRows: 'repeat(4, 5rem)',
        }}
      >
        {board.map((i) => (
          <div
            id={`item-${i}`}
            className="item"
            style={{
              viewTransitionName: 'elem-' + i,
            }}
            onClick={() => toggle(i)}
          >
            {i}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
