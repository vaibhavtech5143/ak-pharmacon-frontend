import { environment } from "src/environments/environment"

export const apiPrefixs = {
    product: `${environment.domain}/product`,
    billing: `${environment.domain}/billings`
}

export const productApiUrl = {
    getAllProducts: `${apiPrefixs.product}/all`,
    createProduct: `${apiPrefixs.product}/create`,
    createBatch: `${apiPrefixs.product}/batch`,
    updateBatch: `${apiPrefixs.product}/batch`,
    batchIncrementableQuantity: `${apiPrefixs.product}/batch/incrementabl-quantity`
}