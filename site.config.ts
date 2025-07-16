import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  lang: 'zh-CN',
  timezone: 'Asia/Shanghai',

  favicon: 'https://api.iconify.design/unjs:uqr.svg',
  url: 'https://amireon.github.io',
  
  title: '第 10086 次重启',
  subtitle: 'All is well.',
  description: '随便写写记记',

  author: {
    name: 'Amireon',
    // avatar: 'https://avatars.githubusercontent.com/u/80996151',
    avatar: '/avatar.jpeg',
    email: 'yyycwe@qq.com',
    link: 'https://github.com/amireon',
    intro: '菜鸡一枚',
  },
  
  social: [
    {
      name: 'RSS',
      link: '/atom.xml',
      icon: 'i-ri-rss-line',
      color: 'orange',
    },
    {
      name: 'GitHub',
      link: 'https://github.com/Amireon',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    {
      name: 'E-Mail',
      link: 'yyycwe@qq.com',
      icon: 'i-ri-mail-line',
      color: '#8E71C1',
    },
  ],

  sponsor: {
    enable: true,
  },

  search: {
    enable: true,
    type: 'fuse',
  },

  fuse: {
    options: {
      keys: ['title', 'tags', 'categories', 'excerpt', 'content'],
    },
  },

})
