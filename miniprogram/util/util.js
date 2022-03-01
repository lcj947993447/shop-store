export const trim = (str) => { 
  return str.replace(/(^\s*)|(\s*$)/g, ""); 
}

export const showToast = (str) => {
  wx.showToast({
    title: str,
    icon: 'none'
  })
}

export const showLoading = () => {
  wx.showLoading({
    title: ''
  })
}