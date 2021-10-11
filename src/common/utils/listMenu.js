const listMenu = (menusData) => {
  const menus = menusData.map(item => {
    if (item.children) {
      listMenu(item.children)
      return item.isShow && item
    } else {
      return item
    }
  })
  return menus
}
export default listMenu
