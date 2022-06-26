import React from 'react'
import TodoList from '../to-do/TodoList';
import { useParams } from 'react-router'

const Todo =()=>{
    const params = useParams();
    const inputTask = React.useRef();
    const [istask,setTask] = React.useState(false);
    const [tasks,setTasks] = React.useState([]);
    

    React.useEffect(()=>{

    const getList = async()=>{
        const response =  await fetch(`http://localhost:2000/api/users/${params.uid}/tasks`, {
            
            headers: {
              "Content-Type": "application/json",
            },
          })
          const responsedata = await response.json();
          console.log(responsedata.tasks);
          setTasks(responsedata.tasks);
       
            setTask(true);
          
         
    }
  getList();
    },[params.uid])

    const sendData = async(data)=>{
        const response =  await fetch(`http://localhost:2000/api/users/${params.uid}/tasks`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          })
        const responseData = await response.json();
        console.log(responseData);
        setTasks(prev =>{
          return [...prev,responseData.newtask]
        })
    }
    const deleteTask = (i)=>{
      let newtask = [];
      tasks.forEach((e,index)=>{
        if(index!==i){
          newtask.push(e)
        }
      })
      setTasks(newtask);
    }

    const submitHandler =(event)=>{
        event.preventDefault();
        const data ={
            task:inputTask.current.value
        }
        console.log(data);
        sendData(data);
       
        
    }

    return <>
    <div className='card w-50 mx-auto mt-5 pt-3' >
<h2 className=' mx-auto'> Your tasks</h2>
<form className='mx-auto' onSubmit={submitHandler}>
    <input placeholder='Add Your Task '  name="inputtext" type="text" ref={inputTask}></input>
    <button>+</button>
    {!istask?<p>Nolist</p>:<TodoList params ={ params} delete={deleteTask} list = {tasks} />}
</form>
</div>
    </>
}

export default Todo;