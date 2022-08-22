import React, { useState , useEffect } from "react";
import "./style.css";

//  get the local storage data back 
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if (lists) {
    return JSON.parse(lists);
  }
  else{
    return [];
  }
}

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem , setIsEditItem] = useState("");
  const [toggleButton , setToggleButtom] = useState(false);

  // add the items function
  const addItem = () => {
    if (!inputdata) {
      alert("please enter the data");
    } 
    else if(inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if(curElem.id === isEditItem){
            return { ...curElem, name: inputdata};
          }
          return curElem;
        })
      );
      setInputData([]);
      setIsEditItem(null);
      setToggleButtom(false);

    }
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  // edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButtom(true);
  };

    // how to delete items section
    const deleteItem =(index) => {
      const updatedItems = items.filter((curElem ) => {
        return curElem.id !== index;
      });
      setItems(updatedItems)
    };

    // remove all the elements
    const removeAll = () => {
      setItems([]);
    }

// adding local storage
useEffect(() =>{
  localStorage.setItem("mytodolist", JSON.stringify(items)); 
}, [items]);

    return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            {/* <img src="./images/todo.svg" alt="to do logo" /> */}
            <img src="./images/todolist.png" alt="to do logo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
          

        {toggleButton ? ( 
        <i className="far fa-edit add-btn" onClick={addItem}></i>
        ):(
          <i className="fa solid fa-plus add-btn" onClick={addItem}></i>
        )}
        </div>
          {/* show our items */}

          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn"
                    onClick={() => editItem(curElem.id)}></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* remove all buttons */}

          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All"
            onClick={removeAll}>
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
