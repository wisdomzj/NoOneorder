const CART_API = {
  cartList: {
    method: 'get',
    url: '/cart/list'
  },
  addCart: {
    method: 'post',
    url: '/cart/add'
  },
  addCount: {
    method: 'get',
    url: '/cart/addcount'
  },
  reduceCount: {
    method: 'get',
    url: '/cart/reducecount'
  }
}

export default CART_API