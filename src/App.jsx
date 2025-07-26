import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit} from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
 

function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  const [showfinished, setshowfinished] = useState(true)
  

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  // used to save the todos to the local storage 
  const saveTolS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  

  const toggleFinished = (e) => {
    setshowfinished(!showfinished)
  }
   

  const handleEdit = (e, id) =>{
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)

    //used to delete existing one and edit 
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos)
    saveTolS() 
  }

  const handleDelete = (e, id) =>{
    let newTodos = todos.filter(item => {
      return item.id!==id
    });
    setTodos(newTodos);
    saveTolS()
  }

  const handleSave = () =>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveTolS( )
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id == id;
    })

    // to copy todos to newTodos we have to write like this [...todos]
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos); 
    saveTolS()
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo}  type="text" placeholder="Write your task..." className='bg-white w-full rounded-full px-5 py-2'/>
          <button onClick={handleSave} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 mx-2 text-white rounded-full text-sm font-bold disabled:bg-violet-600'>Save</button>
          </div>
        </div>
        <input type="checkbox" onChange={toggleFinished} checked={showfinished} className='my-4 cursor-pointer'/>
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <hr />
          <h2 className='text-2xl font-bold'>Your Todos</h2>
          <div className="todos"> 
            {todos.length==0 && <div className='mx-5'> No Todos to display</div>}
            {todos.map(item => {

            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 my-3
            justify-between">
              <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" className='cursor-pointer'/>
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 text-sm font-bold'><FaEdit /></button>
                <button onClick={(e) => {handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 text-sm font-bold'><AiFillDelete /></button>
              </div>
            </div>
            })}
          </div>
      </div>
    </> 
  )
}

export default App
