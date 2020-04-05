const PRODUCT_API = {
  productFindAll: {
    method: 'get',
    url: '/product/findAll'
  },
  addProduct: {
    method: 'post',
    url: '/product/add'
  },
  removeProduct: {
    method: 'post',
    url: '/product/remove'
  },
  showProduct: {
    method: 'get',
    url: '/product/findById'
  },
  editProduct: {
    method: 'post',
    url: '/product/edit'
  }
}

export default PRODUCT_API

