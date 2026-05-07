import { Link, usePage } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid, Package, ShoppingCart, Users, Tags, MessageSquare, Heart, Star, Settings } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard as adminDashboard } from '@/routes/admin';
import { dashboard as customerDashboard } from '@/routes/customer';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const { auth } = usePage().props;
    const dashboardUrl = auth?.user?.role === 'admin' ? adminDashboard() : customerDashboard();

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboardUrl,
            icon: LayoutGrid,
        },
    ];

    if (auth?.user?.role === 'admin') {
        mainNavItems.push({
            title: 'Products',
            href: '/admin/products',
            icon: Package,
        });
        mainNavItems.push({
            title: 'Orders',
            href: '/admin/orders',
            icon: ShoppingCart,
        });
        mainNavItems.push({
            title: 'Customers',
            href: '/admin/customers',
            icon: Users,
        });
        mainNavItems.push({
            title: 'Categories',
            href: '/admin/categories',
            icon: Tags,
        });
        mainNavItems.push({
            title: 'Reviews',
            href: '/admin/reviews',
            icon: MessageSquare,
        });
        mainNavItems.push({
            title: 'Payment Settings',
            href: '/admin/settings/payment',
            icon: Settings,
        });
    } else {
        mainNavItems.push({
            title: 'My Orders',
            href: '/customer/orders',
            icon: ShoppingCart,
        });
        mainNavItems.push({
            title: 'My Wishlists',
            href: '/customer/wishlists',
            icon: Heart,
        });
        mainNavItems.push({
            title: 'My Reviews',
            href: '/customer/reviews',
            icon: Star,
        });
        mainNavItems.push({
            title: 'Continue Shopping',
            href: '/products',
            icon: ShoppingCart,
        });
    }

    const footerNavItems: NavItem[] = [
        {
            title: 'Repository',
            href: 'https://github.com/laravel/react-starter-kit',
            icon: FolderGit2,
        },
        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits#react',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardUrl} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}