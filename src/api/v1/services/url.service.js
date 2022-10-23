const inventoryBaseUrl = 'http://139.59.60.119:9000'
const userBase = 'http://139.59.60.119:4006'
const notificationBase = 'http://139.59.60.119:4011'
const paymentBase = 'https://139.59.60.119:7008'


module.exports = {
    productEndPoint: (productId) => {
        return `${inventoryBaseUrl}/v1/menu/custom-item/${productId}`
    },
    outletEndPoint: (outletId) => {
        return `${inventoryBaseUrl}/v1/outlet/single/${outletId}`
    },
    customerEndPoint: () => {
        return `${userBase}/v1/customer/`
    },
    sellerOrderNotificationUrl: () => {
        return `${notificationBase}/v1/seller/order`
    },
    sellerStatusNotificationUrl: () => {
        return `${notificationBase}/v1/seller/status`
    },
    paymentInitUrl:()=>{
        return `${paymentBase}/payment/createPayment`
    }
}
