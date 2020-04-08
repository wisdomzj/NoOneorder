const ORDER_API = {
  orderFindAll: {
    method: 'get',
    url: '/order/findAllPaging'
  },
  delorder: {
    method: 'get',
    url: '/order/remove'
  },
  showorder: {
    method: 'get',
    url: '/order/show'
  },
  editorder: {
    method: 'post',
    url: '/order/edit'
  },
  showDetail: {
    method: 'post',
    url: '/detail/findAllPaging'
  }
}

export default ORDER_API
