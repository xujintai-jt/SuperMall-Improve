import { request } from './request'

export function GetCateGory() {
  return request({
    url: '/category'
  })
}

export function GetSubCateGory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

export function GetSubCateDetail(maiWalltKey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      maiWalltKey,
      type
    }
  })
}