import { createContext, useEffect, useReducer, useContext } from 'react';

const BookmarkContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];

    case 'REMOVE':
      return state.filter((i) => i.id !== action.payload.id);

    default:
      throw new Error('Action is not defined');
  }
}

// initial lazy stste
function initBookmarks() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('bookmarks');
    return stored ? JSON.parse(stored) : [];
  }
  return [];
}

// main context
export default function BookmarkProvider({ children }) {
  const [bookList, dispatchBookList] = useReducer(reducer, [], initBookmarks);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookmarks', JSON.stringify(bookList));
    }
  }, [bookList]);

  return <BookmarkContext.Provider value={{ bookList, dispatchBookList }}>{children}</BookmarkContext.Provider>;
}

// custom hook for usage context easily
export function useBookmarkContext() {
  const { bookList, dispatchBookList } = useContext(BookmarkContext);
  return [bookList, dispatchBookList];
}
