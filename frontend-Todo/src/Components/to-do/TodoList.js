import React from 'react'
const TodoList =(props)=>{
    console.log(props);

    const deleteItem = async (index)=>{
      console.log(index);
        const response =  await fetch(`http://localhost:2000/api/users/${props.params.uid}/tasks/${index}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
          const responsedata = await response.json();
          console.log(responsedata);
         
          
    }
    const clickHandler =(e,index)=>{
        console.log(e);
        console.log(index);
        deleteItem(index);
        props.delete(index);
    }
    console.log(props.list);

    return <ul className='list-group list-group-flush'>{props.list.map((i,index) => <li className='list-group-item' onClick={()=>{clickHandler(i,index)}} key={index}>{i}</li>)}</ul>
    
}

export default TodoList;