
export const modulesUrl = {
    product: 'product',
    billing: 'billing'
}

export const productRouting = {
    home: '',
    create: 'create',
    createBatch: 'batch/create'
}

export const productUrl = {
    home: `${modulesUrl.product}`,
    create: `${modulesUrl.product}/${productRouting.create}`,
    createBatch:  `${modulesUrl.product}/${productRouting.createBatch}`
}

export const billingUrl = {
    home: `${modulesUrl.billing}`
}



