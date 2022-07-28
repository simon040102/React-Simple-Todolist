const { useState } = React;
const root = ReactDOM.createRoot(document.querySelector('#root'));
const Header = () => {
  return (
    <header className="mb-8">
      <img className="h-20 mx-auto " src="images/title.svg" alt="" />
    </header>
  );
};

const Content = () => {
  const [newItem, setNewItem] = useState({
    content: '',
    done: false,
  });
  const [notes, setNotes] = useState([
    { content: '哈哈哈', done: false },
    { content: '哭哭哭', done: true },
  ]);
  const textAreaAdd = (e) => {
    const { value, name } = e.target;
    setNewItem((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const AddItem = () => {
    setNotes((prevState) => {
      return [...prevState, newItem];
    });
    setNewItem({
      content: '',
      done: false,
    });
  };
  const handleDelete = (e) => {
    const { id } = e.target;
    setNotes((prevState) => {
      console.log(prevState);
      return prevState.filter((item, index) => {
        return index != id;
      });
    });
  };
  const handleDone = (e) => {
    const { id } = e.target;
    const newNotes = [...notes];
    newNotes[id].done = !newNotes[id].done;
    setNotes(newNotes);
  };
  let done = notes.filter((noteItem) => noteItem.done == 1);
  let unDone = notes.filter((noteItem) => noteItem.done == 0);

  const showData = () => {
    if (tab == 'all') {
      return notes.map((item, index) => {
        return (
          <li
            style={
              item.done ? { textDecoration: 'line-through', opacity:'0.5' } : null
            }
            id={index}
            className="w-full shadow-lg  my-3 bg-gray-100 rounded-xl bg-opacity-70 px-4 py-2"
          >
            <input
              id={index}
              className="mr-3 cursor-pointer text-inherit bg-red-500 px-1 rounded-md bg-opacity-50"
              type="button"
              value="Done"
              onClick={handleDone}
            />
            <input
              id={index}
              className="float-right cursor-pointer"
              type="button"
              value="Delete"
              onClick={handleDelete}
            />
            {item.content}
          </li>
        );
      });
    } else if (tab == 'done') {
      return done.map((item, index) => {
        return (
          <li
            style={
              item.done
                ? { textDecoration: 'line-through', opacity: '0.5' }
                : null
            }
            id={index}
            className="w-full shadow-lg  my-3 bg-gray-100 rounded-xl bg-opacity-70 px-4 py-2"
          >
            <input
              id={index}
              className="mr-3 cursor-pointer text-inherit bg-red-500 px-1 rounded-md bg-opacity-50"
              type="button"
              value="Done"
              onClick={handleDone}
            />
            <input
              id={index}
              className="float-right cursor-pointer"
              type="button"
              value="Delete"
              onClick={handleDelete}
            />
            {item.content}
          </li>
        );
      });
    } else if (tab == 'unDone') {
      return unDone.map((item, index) => {
        return (
          <li
            style={
              item.done
                ? { textDecoration: 'line-through', opacity: '0.5' }
                : null
            }
            id={index}
            className="w-full shadow-lg  my-3 bg-gray-100 rounded-xl bg-opacity-70 px-4 py-2"
          >
            <input
              id={index}
              className="mr-3 cursor-pointer text-inherit bg-red-500 px-1 rounded-md bg-opacity-50"
              type="button"
              value="Done"
              onClick={handleDone}
            />
            <input
              id={index}
              className="float-right cursor-pointer"
              type="button"
              value="Delete"
              onClick={handleDelete}
            />
            {item.content}
          </li>
        );
      });
    }
    
  };
  const [tab, setTab] = useState('all');
  const selectChange = (e) => {
    if (e.target.nodeName !== 'BUTTON') return;
    let id = e.target.dataset.tab;
    setTab(id);
  };

  return (
    <div className="w-full md:w-3/4 mx-auto container px-5">
      <div className="inputArea mb-2 relative">
        <input
          onChange={textAreaAdd}
          placeholder="Enter task"
          value={newItem.content}
          className="w-full indent-8 h-12 mb-2 text-2xl rounded-2xl"
          type="text"
          name="content"
        />
        <button
          onClick={AddItem}
          className="absolute bottom-3 text-3xl right-5 cursor-pointer"
        >
          Add
        </button>
      </div>
      <ul className="flex justify-between" onClick={selectChange}>
        <li
          style={
            tab == 'all'
              ? {
                  backgroundColor: '#274527',
                  color: 'white',
                  border: '2px solid #0d130d',
                }
              : null
          }
          className="w-6/12 mx-2 h-10 flex items-center justify-center text-center bg-green-200 bg-opacity-70 rounded-xl"
        >
          <button data-tab="all" className="cursor-pointer w-full h-full">
            All
          </button>
        </li>
        <li
          style={
            tab == 'done'
              ? {
                  backgroundColor: '#274527',
                  color: 'white',
                  border: '2px solid #0d130d',
                }
              : null
          }
          className="w-6/12 mx-2 h-10 flex items-center justify-center text-center bg-green-200 bg-opacity-70 rounded-xl"
        >
          <button data-tab="done" className="cursor-pointer w-full h-full">
            Done
          </button>
        </li>
        <li
          style={
            tab == 'unDone'
              ? {
                  backgroundColor: '#274527',
                  color: 'white',
                  border: '2px solid #0d130d',
                }
              : null
          }
          className="w-6/12 mx-2 h-10 flex items-center justify-center text-center bg-green-200 bg-opacity-70 rounded-xl"
        >
          <button data-tab="unDone" className="cursor-pointer w-full h-full">
            UnDone
          </button>
        </li>
      </ul>
      <div>
        <ul>{showData()}</ul>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-blue-500  to-green-300 pt-8">
      <Header />
      <Content />
    </div>
  );
};

root.render(<App />);
