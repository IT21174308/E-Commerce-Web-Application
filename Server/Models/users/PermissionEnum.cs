namespace Ecommerce.Enums
{
    public enum Permission
    {
        // User Management
        CreateUser,
        UpdateUser,
        ApproveUser,
        DeactivateUser,
        ReactivateUser,

        // Product Management
        ViewProducts,
        CreateProduct,
        UpdateProduct,
        DeleteProduct,
        ActivateProductListing,
        DeactivateProductListing,

        // Order Management
        CreateOrder,
        UpdateOrder,
        CancelOrder,
        ViewAllOrders,
        ViewVendorOrders,
        MarkOrderAsDelivered,
        MarkOrderAsPartiallyDelivered,
        TrackOrderStatus,

        // Inventory Management
        ViewInventory,
        RemoveInventory,
        ReceiveLowStockAlerts,

        // Vendor Management
        CreateVendor,
        ViewVendorComments,
        ManageVendorRankings,
        
        // Notifications
        SendNotificationToVendor,
        SendNotificationToCustomer,

        // Customer Order Management
        ViewCustomerOrderStatus,
        CancelCustomerOrder,
        NotifyCustomerOrderStatus,

        // Misc
        ManageRankings,
        ViewComments,
        ManageComments,
        AddComment,
        ManageProductRatings,
        ViewRatings
    }
}
