const CATE_API = {
  cateFindAll: {
    method: 'get',
    url: '/cate/findAllnotPaging'
  },
  addcate: {
    method: 'post',
    url: '/cate/add'
  },
  delcate: {
    method: 'get',
    url: '/cate/remove'
  },
  showcate: {
    method: 'get',
    url: '/cate/show'
  },
  editcate: {
    method: 'post',
    url: '/cate/edit'
  }
}

export default CATE_API
