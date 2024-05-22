import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

  {
    path: '/dashboard',
    title: 'Accueil',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    roles: ['Admin', 'User'],
    submenu: []
  },
  {
    path: '/component/districts',
    title: 'Districts',
    icon: 'bi bi-buildings-fill',
    class: '',
    extralink: false,
    roles: ['Admin'],
    submenu: []
  },
  {
    path: '/component/annexes',
    title: 'Annexes',
    icon: 'bi bi-building',
    class: '',
    extralink: false,
    roles: ['Admin'],
    submenu: []
  },
  {
    path: '/component/categories',
    title: 'Categories',
    icon: 'bi bi-c-circle-fill',
    class: '',
    extralink: false,
    roles: ['Admin'],
    submenu: []
  },
  {
    path: '/component/endroits',
    title: 'Endroits',
    icon: 'bi bi-geo-alt-fill',
    class: '',
    extralink: false,
    roles: ['Admin'],
    submenu: []
  },
  {
    path: '/component/utilisateur',
    title: 'Utilisateur',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    roles: ['Admin'],
    submenu: []
  },  {
    path: '/component/endroit',
    title: 'Endroit',
    icon: 'bi bi-geo-alt-fill',
    class: '',
    extralink: false,
    roles: [ 'User'],
    submenu: []
  }

];
