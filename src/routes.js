//import Home from './components/Home.vue'
//import Shop from './components/Shop.vue'
import Modify from './components/Modify.vue'
import PageContent from './components/PageContent.vue'
import Orders from './components/Orders.vue'
import dashboard from './components/Dashboard.vue'

export default [
    {path: '/', component: PageContent},
    {path: '/orders', component: Orders },
    {path:'/modify', name:'modify', component: Modify, props:true },
    {path: '/dashboard', component: dashboard}
]