export interface MenuItems {
    label?: string;
    icon?: string;
    url?: string;
    routerLink?: string;
    items?: Array<MenuItems>;
    expanded?: string;
    routerLinkActive?: string;
    styleClass?: string;
    id: string;
    title: string;
    name: string;
}