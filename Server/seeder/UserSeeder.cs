using Microsoft.AspNetCore.Identity;
using Ecommerce.Models;
using Ecommerce.Enums;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ecommerce.Data
{
    public static class RoleSeeder
    {
        public static async Task SeedRolesAndPermissions(RoleManager<Role> roleManager)
        {
            // Administrator Role
            if (!await roleManager.RoleExistsAsync(UserRole.Admin.ToString()))
            {
                var adminRole = new Role
                {
                    Name = UserRole.Admin.ToString(),
                    Permissions = new List<string>
                    {
                        Permission.CreateUser.ToString(),
                        Permission.UpdateUser.ToString(),
                        Permission.ApproveUser.ToString(),
                        Permission.DeactivateUser.ToString(),
                        Permission.CreateProduct.ToString(),
                        Permission.UpdateProduct.ToString(),
                        Permission.DeleteProduct.ToString(),
                        Permission.ActivateProductListing.ToString(),
                        Permission.DeactivateProductListing.ToString(),
                        Permission.CreateOrder.ToString(),
                        Permission.UpdateOrder.ToString(),
                        Permission.CancelOrder.ToString(),
                        Permission.ViewAllOrders.ToString(),
                        Permission.MarkOrderAsDelivered.ToString(),
                        Permission.ViewInventory.ToString(),
                        Permission.RemoveInventory.ToString(),
                        Permission.CreateVendor.ToString(),
                        Permission.ViewVendorComments.ToString(),
                        Permission.ManageVendorRankings.ToString(),
                        Permission.SendNotificationToVendor.ToString(),
                        Permission.SendNotificationToCustomer.ToString(),
                        Permission.ViewCustomerOrderStatus.ToString(),
                        Permission.CancelCustomerOrder.ToString(),
                        Permission.NotifyCustomerOrderStatus.ToString(),
                        Permission.ViewRatings.ToString(),
                        Permission.ManageRankings.ToString(),
                    }
                };
                await roleManager.CreateAsync(adminRole);
            }

            // Vendor Role
            if (!await roleManager.RoleExistsAsync(UserRole.Vendor.ToString()))
            {
                var vendorRole = new Role
                {
                    Name = UserRole.Vendor.ToString(),
                    Permissions = new List<string>
                    {
                        Permission.CreateProduct.ToString(),
                        Permission.UpdateProduct.ToString(),
                        Permission.DeleteProduct.ToString(),
                        Permission.ActivateProductListing.ToString(),
                        Permission.DeactivateProductListing.ToString(),
                        Permission.ViewVendorOrders.ToString(),
                        Permission.MarkOrderAsPartiallyDelivered.ToString(),
                        Permission.ViewInventory.ToString(),
                        Permission.ReceiveLowStockAlerts.ToString(),
                        Permission.SendNotificationToCustomer.ToString(),
                        Permission.ViewVendorComments.ToString(),
                        Permission.ManageProductRatings.ToString(),
                    }
                };
                await roleManager.CreateAsync(vendorRole);
            }

            // CSR Role
            if (!await roleManager.RoleExistsAsync(UserRole.CSR.ToString()))
            {
                var csrRole = new Role
                {
                    Name = UserRole.CSR.ToString(),
                    Permissions = new List<string>
                    {
                        Permission.ApproveUser.ToString(),
                        Permission.UpdateUser.ToString(),
                        Permission.DeactivateUser.ToString(),
                        Permission.CreateOrder.ToString(),
                        Permission.UpdateOrder.ToString(),
                        Permission.CancelOrder.ToString(),
                        Permission.ViewAllOrders.ToString(),
                        Permission.TrackOrderStatus.ToString(),
                        Permission.MarkOrderAsDelivered.ToString(),
                        Permission.NotifyCustomerOrderStatus.ToString(),
                        Permission.ViewCustomerOrderStatus.ToString(),
                        Permission.CancelCustomerOrder.ToString(),
                        Permission.ViewRatings.ToString(),
                        Permission.AddComment.ToString(),
                        Permission.ManageComments.ToString(),
                    }
                };
                await roleManager.CreateAsync(csrRole);
            }

            // Customer Role
            if (!await roleManager.RoleExistsAsync(UserRole.Customer.ToString()))
            {
                var customerRole = new Role
                {
                    Name = UserRole.Customer.ToString(),
                    Permissions = new List<string>
                    {
                        Permission.ViewProducts.ToString(),
                        Permission.TrackOrderStatus.ToString(),
                        Permission.ViewRatings.ToString(),
                        Permission.AddComment.ToString(),
                        Permission.ManageComments.ToString(),
                    }
                };
                await roleManager.CreateAsync(customerRole);
            }
        }
    }
}
