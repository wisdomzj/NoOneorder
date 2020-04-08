import axios from 'axios'
import category from '@/api/category'
import cart from '@/api/cart'
import product from '@/api/product'
import info from '@/api/info'
import order from '@/api/order'
import pay from '@/api/pay'
// import { Toast } from 'vant'

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000
})

const http = {}

const service = {
    ...category,
    ...product,
    ...info,
    ...cart,
    ...order,
    ...pay
}

for (const key in service) {
    const api = service[key]
    http[key] = async function ({
            url,
            ...params
        },
        isFormData = false,
        config = {}
    ) {
        let newParams = {}
        if (params && isFormData) {
            newParams = new FormData()
            for (const i in params) {
                newParams.append(i, params[i])
            }
        } else {
            newParams = params
        }
        let response = {}
        if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
            try {
                if (api.isDycRouter) {
                    response = await instance[api.method](url, newParams, config)
                } else {
                    response = await instance[api.method](api.url, newParams, config)
                }
            } catch (err) {
                response = err
            }
        } else if (api.method === 'delete' || api.method === 'get') {
            config.params = newParams
            try {
                if (api.isDycRouter) {
                    response = await instance[api.method](url, config)
                } else {
                    response = await instance[api.method](api.url, config)
                }
            } catch (err) {
                response = err
            }
        }
        return response
    }
}

instance.interceptors.request.use(config => {
    // Toast.loading({
    //     mask: false,
    //     duration: 3*1000, 
    //     forbidClick: true,
    //     message: '加载中...'
    // })
    return config
}, (err) => {
    // Toast.clear()
    // Toast('请求错误，请求稍后重试')
    return Promise.reject(err)
})


instance.interceptors.response.use(res => {
    // Toast.clear()
    return res.data
}, (err) => {
    // Toast.clear()
    // Toast('请求错误，请求稍后重试')
    return Promise.reject(err)
})

export default http