import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  lang: 'zh-CN',
  title: '',
  url: 'https://amireon.github.io',
  author: {
    name: 'Amireon',
    avatar: 'https://avatars.githubusercontent.com/u/80996151?v=4',
    email: 'yyycwe@qq.com',
    link: 'https://github.com/amireon',
  },
  subtitle: '',
  description: '总归是在往前',
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
      name: 'Twitter',
      link: 'https://twitter.com/Amireon',
      icon: 'i-ri-twitter-line',
      color: '#1da1f2',
    },

    {
      name: 'E-Mail',
      link: 'yyycwe@qq.com',
      icon: 'i-ri-mail-line',
      color: '#8E71C1',
    },

  ],

  search: {
    enable: false,
    type: 'algolia',
  },

  sponsor: {
    enable: false,
    title: '我很可爱，请给我钱！',
    methods: [
      {
        name: '支付宝',
        url: 'https://cdn.yunyoujun.cn/img/donate/alipay-qrcode.jpg',
        color: '#00A3EE',
        icon: 'i-ri-alipay-line',
      },
      {
        name: 'QQ 支付',
        url: 'https://cdn.yunyoujun.cn/img/donate/qqpay-qrcode.png',
        color: '#12B7F5',
        icon: 'i-ri-qq-line',
      },
      {
        name: '微信支付',
        url: 'https://cdn.yunyoujun.cn/img/donate/wechatpay-qrcode.jpg',
        color: '#2DC100',
        icon: 'i-ri-wechat-pay-line',
      },
    ],
  },
})
