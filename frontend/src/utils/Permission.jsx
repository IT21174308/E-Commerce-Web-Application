export const Permission = Object.freeze({
    // User Management
    CREATE_USER: 'CreateUser',
    UPDATE_USER: 'UpdateUser',
    APPROVE_USER: 'ApproveUser',
    DEACTIVATE_USER: 'DeactivateUser',
    REACTIVATE_USER: 'ReactivateUser',

    // Product Management
    VIEW_PRODUCTS: 'ViewProducts',
    CREATE_PRODUCT: 'CreateProduct',
    UPDATE_PRODUCT: 'UpdateProduct',
    DELETE_PRODUCT: 'DeleteProduct',
    ACTIVATE_PRODUCT_LISTING: 'ActivateProductListing',
    DEACTIVATE_PRODUCT_LISTING: 'DeactivateProductListing',

    // Order Management
    CREATE_ORDER: 'CreateOrder',
    UPDATE_ORDER: 'UpdateOrder',
    CANCEL_ORDER: 'CancelOrder',
    VIEW_ALL_ORDERS: 'ViewAllOrders',
    VIEW_VENDOR_ORDERS: 'ViewVendorOrders',
    MARK_ORDER_AS_DELIVERED: 'MarkOrderAsDelivered',
    MARK_ORDER_AS_PARTIALLY_DELIVERED: 'MarkOrderAsPartiallyDelivered',
    TRACK_ORDER_STATUS: 'TrackOrderStatus',

    // Inventory Management
    VIEW_INVENTORY: 'ViewInventory',
    REMOVE_INVENTORY: 'RemoveInventory',
    RECEIVE_LOW_STOCK_ALERTS: 'ReceiveLowStockAlerts',

    // Vendor Management
    CREATE_VENDOR: 'CreateVendor',
    VIEW_VENDOR_COMMENTS: 'ViewVendorComments',
    MANAGE_VENDOR_RANKINGS: 'ManageVendorRankings',

    // Notifications
    SEND_NOTIFICATION_TO_VENDOR: 'SendNotificationToVendor',
    SEND_NOTIFICATION_TO_CUSTOMER: 'SendNotificationToCustomer',

    // Customer Order Management
    VIEW_CUSTOMER_ORDER_STATUS: 'ViewCustomerOrderStatus',
    CANCEL_CUSTOMER_ORDER: 'CancelCustomerOrder',
    NOTIFY_CUSTOMER_ORDER_STATUS: 'NotifyCustomerOrderStatus',

    // Misc
    MANAGE_RANKINGS: 'ManageRankings',
    VIEW_COMMENTS: 'ViewComments',
    MANAGE_COMMENTS: 'ManageComments',
    ADD_COMMENT: 'AddComment',
    MANAGE_PRODUCT_RATINGS: 'ManageProductRatings',
    VIEW_RATINGS: 'ViewRatings',
});

export default Permission;
