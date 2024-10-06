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

  function toggle(index: number) {
    document.startViewTransition(() => {
      flushSync(() => {
        setBoard((board) => [...board.filter((i) => i != index), index]);
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
