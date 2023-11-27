import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import TagsItem from '../TagsItem'
import TasksItem from '../TasksItem'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class Task extends Component {
  state = {
    initialTagInput: tagsList[0].displayText,
    taskInput: '',
    taskAndTagList: [],
    getTagItem: '',
    isClicked: false,
  }

  renderTask = (taskInput, initialTagInput) => (
    <form onSubmit={this.addTask}>
      <div>
        <label className="task-label" htmlFor="task-input">
          Task
        </label>
        <br />
        <input
          type="text"
          id="task-input"
          placeholder="Enter the task here"
          className="task-input-ele"
          onChange={this.enterTask}
          value={taskInput}
        />
      </div>
      <div>
        <label className="task-label" htmlFor="tag-input">
          Tags
        </label>
        <br />
        <select
          value={initialTagInput}
          className="option-txt"
          onChange={this.chooseTag}
        >
          {tagsList.map(each => (
            <option
              value={each.displayText}
              className="option-txt"
              key={each.optionId}
            >
              {each.displayText}
            </option>
          ))}
        </select>
      </div>
      <div className="add-btn-container">
        <button className="addTask-btn" type="submit">
          Add Task
        </button>
      </div>
    </form>
  )

  renderTasksItem = (list, length) => {
    const renderEle =
      length === 0 ? (
        <p className="no-tasks-para">No Tasks Added Yet</p>
      ) : (
        <ul>
          {list.map(each => (
            <TasksItem each={each} key={each.id} />
          ))}
        </ul>
      )
    return renderEle
  }

  renderTagsItem = (getTagItem, isClicked) => (
    <ul className="tags-list-container">
      {tagsList.map(each => (
        <TagsItem
          isActive={each.optionId === getTagItem}
          clickOnTagItem={this.clickOnTagItem}
          each={each}
          key={each.optionId}
          isClickedOnTag={isClicked === true}
        />
      ))}
    </ul>
  )

  clickOnTagItem = id => {
    const {isClicked} = this.state
    this.setState({
      getTagItem: id,
      isClicked: !isClicked,
    })
  }

  chooseTag = event => {
    this.setState({initialTagInput: event.target.value})
  }

  enterTask = event => {
    this.setState({
      taskInput: event.target.value,
    })
  }

  addTask = event => {
    event.preventDefault()
    const {initialTagInput, taskInput} = this.state
    const newObj = {
      id: uuid(),
      task: taskInput,
      tag: initialTagInput,
      tagId: initialTagInput.toUpperCase(),
    }
    this.setState(prevState => ({
      taskAndTagList: [...prevState.taskAndTagList, newObj],
      taskInput: '',
      initialTagInput: tagsList[0].displayText,
    }))
  }

  render() {
    const {taskInput, taskAndTagList, getTagItem, initialTagInput} = this.state
    const filterTaskAndTagList = taskAndTagList.filter(each =>
      each.tagId.includes(getTagItem),
    )
    const lengthOfTaskAndTagList = taskAndTagList.length

    return (
      <div className="total-container">
        <div className="taskBgContainer">
          <h1 className="task-heading">Create a task!</h1>
          {this.renderTask(taskInput, initialTagInput)}
        </div>
        {/* TagsItem Component */}
        <div className="taskAndTagItemsContainer">
          <h1 className="tag-name">Tags</h1>
          {this.renderTagsItem(getTagItem)}
          {/* TasksItem Component */}
          <h1 className="task-name">Tasks</h1>
          {this.renderTasksItem(filterTaskAndTagList, lengthOfTaskAndTagList)}
        </div>
      </div>
    )
  }
}

export default Task
