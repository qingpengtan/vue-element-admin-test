import Layout from '@/layout'

const albumManager = 
  {
    path: '/charts',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Charts',
    meta: {
      title: 'Charts',
      icon: 'chart'
    },
    children: [
      {
        path: 'keyboard',
        component: () => import('@/views/album/albumuser/index.vue'),
        name: 'KeyboardChart',
        meta: { title: 'Keyboard Chart', noCache: true }
      },
      {
        path: 'line',
        component: () => import('@/views/album/albumuser/index.vue'),
        name: 'LineChart',
        meta: { title: 'Line Chart', noCache: true }
      },
      {
        path: 'mix-chart',
        component: () => import('@/views/album/albumuser/index.vue'),
        name: 'MixChart',
        meta: { title: 'Mix Chart', noCache: true }
      }
    ]
  }
  export default albumManager