import './index.css'

const TagsItem = props => {
  const {each, clickOnTagItem, isActive, isClickedOnTag} = props
  const {displayText, optionId} = each
  const clickOnTag = () => {
    clickOnTagItem(optionId)
  }
  const isActiveBtn = isActive ? `is-active-btn` : `is-not-active-btn`
  console.log(isClickedOnTag)

  return (
    <li className="tags-list">
      <button className={isActiveBtn} onClick={clickOnTag} type="button">
        {displayText}
      </button>
    </li>
  )
}

export default TagsItem
