import './index.css'

const TasksItem = props => {
  const {each} = props
  const {task, tag} = each

  return (
    <li>
      <div className="tagAndTaskListContainer">
        <p className="task-para">{task}</p>
        <button className="tag-btn" type="button">
          {tag}
        </button>
      </div>
    </li>
  )
}

export default TasksItem
