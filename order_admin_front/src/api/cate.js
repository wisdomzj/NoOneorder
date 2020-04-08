const CATE_API = {
  cateFindAll: {
    method: 'get',
    url: '/category/findAllnotPaging'
  },
  addcate: {
    method: 'post',
    url: '/category/add'
  },
  delcate: {
    method: 'get',
    url: '/category/remove'
  },
  showcate: {
    method: 'get',
    url: '/category/show'
  },
  editcate: {
    method: 'post',
    url: '/category/edit'
  }
}

export default CATE_API
