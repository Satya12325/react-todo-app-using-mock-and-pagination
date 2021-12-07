import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid'
import { useState,useEffect } from "react"
export default function Todo(){
    const [toggle,setToggle] = useState(false)
    const [page, setPage]= useState(1)
    const [todos, setTodos] = useState([]);
    const [loading, setLoading]= useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/posts?_limit=2&_page=${page}`)
        .then(res => res.json())
        .then((res)=>{
            setTodos([...res]);
            setLoading(false);
        })
         .catch((err) => {
             console.log(err)
         })
    },)

    const handleTask = async (title) => {
        const payload = {
            id: uuidv4(),
            title: title,
            status: "false"
        };
        await fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
    }

    const handleDelete = async (id) => {
        try{
            await fetch(`http://localhost:3000/posts/${id}`,{
                method: "DELETE",
            })
        }
        catch(err){
            console.log(err);
        }
    }

    const handleToggle = async (id,status) => {
        try{
            var value= status==="false"? "true" : "false"
            var payload ={
                status: value,
            }
            await fetch(`http://localhost:3000/posts/${id}`,{
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            setToggle(toggle===true? false: true)
        }
        catch(err){
            console.log(err)
        }
    }

  function handlePage(e){
      switch(e.target.name) {
          case "PREV": if(page === 1){
              setPage(1)
          }
          else{
              setPage((prevState) => prevState-1)
          }
          break;

          case "NEXT": 
          todos.length<2?setPage((prevState) => prevState):setPage((prevState) => prevState+1)
          break;
          default:
              break;
      }
  }


    return (
        <div>
            <div className="">
                <TodoInput onTask={handleTask}/>

                {
                    loading === true?<h1>Loading...</h1>:todos.map((todo) =>{

                        return <TodoList
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            status={todo.status}
                            handleDelete={handleDelete}
                            handleToggle={handleToggle}
                        />

                    })
                }

                {todos.length > 0 && <h5>Page Count : {page}</h5>}
                {
                    todos.length >0 && <div>
                        <button name="PREV" color="green" onClick={(e)=> handlePage(e)}>PREV</button>
                        <button name="NEXT" color="green" onClick={(e)=> handlePage(e)}>NEXT</button>
                    </div>
                }
            </div>
        </div>
    )
}