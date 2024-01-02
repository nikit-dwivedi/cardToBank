const inventoryBaseUrl = ''
const userBase = ''
const notificationBase = ''
const paymentBase = ''


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
