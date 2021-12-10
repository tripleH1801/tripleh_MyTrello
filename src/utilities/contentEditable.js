/**
 * Created by tripleh author 10/12/2021
 */

// select all when click
export const selectAllInlineText = (e) => {
  e.target.focus()
  e.target.select()
}
// onkeydown
export const saveContentAfterEnter = (e) => {
  if (e.key === 'Enter') {
    e.target.blur()
  }
}
