import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import { SETHEADER, REMOVE_ERRRORS } from '../store/actions.type';

const Home = () => import('@/views/Home');
const Login = () => import('@/views/Login');
const Register = () => import('@/views/Register');
const GlobalFeed = () => import('@/views/GlobalFeed');
const MyArticles = () => import('@/views/MyArticles');
const TagArticle = () => import('@/views/TagArticle');
const ViewArticle = () => import('@/views/ViewArticle');
const AddArticle = () => import('@/views/AddArticle');
const EditArticle = () => import('@/views/EditArticle');
const NAGPFavArticle = () => import('@/views/FavoritedArticles');
const Profile = () => import('@/views/Profile');

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'global',
          component: GlobalFeed
        },
        {
          path: 'my-articles',
          name: 'my-articles',
          component: MyArticles,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'favorited-articles',
          name: 'favorited-articles',
          component: NAGPFavArticle,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "articles/tagged/:tag",
          name: 'article-tag',
          component: TagArticle
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/article/:slug',
      name: 'view-article',
      component: ViewArticle
    },
    {
      path: '/add',
      name: 'add-article',
      component: AddArticle,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:slug',
      name: 'edit-article',
      component: EditArticle,
      meta: {
        requiresAuth: true
      }
    }
  ],
  linkExactActiveClass: 'active'
});

const waitForStorageToBeReady = async (to, from, next) => {
  await store.restored;
  await store.dispatch(SETHEADER);
  await store.dispatch(REMOVE_ERRRORS, {});
  
  let redirectToLogin = false;
  if(to.meta.requiresAuth) {
    if(!store.getters.isLoggedIn) {
      redirectToLogin = true;
    }
  }

  if(redirectToLogin) {
    next('/login');
  }else {
    next();
  }
}
router.beforeEach(waitForStorageToBeReady)

export default router;
