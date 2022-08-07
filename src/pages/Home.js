import {useNavigate} from 'react-router-dom';
import {useSelector}from "react-redux";

const TodoList = () => {
    const navigate = useNavigate();
    const todo_list = useSelector((state)=>state.todos.data);
  
    return (
        <div>
            <h1>게시판</h1>
                    <button>게시글 등록</button>
        {todo_list.map((todo) => (
                    <div
                    key={todo.id}
                    >
                    
                    <p onClick={() =>
                        navigate("/detail/" + todo.id)}
                    >{todo.title}</p>
                </div>
                ))}

        </div>
    );
};

  export default TodoList;