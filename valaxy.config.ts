import { defineValaxyConfig } from 'valaxy'
import type { UserThemeConfig } from 'valaxy-theme-yun'

// add icons what you will need
// https://icones.js.org/collection/ri
const safelist = [
  'i-ri-home-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts

  theme: 'yun',
  themeConfig: {
    banner: {
      enable: true,
      title: '天行健, 君子以自强不息',
    },

    pages: [
      {
        name: '博客目录',
        url: '/categories/',
        icon: 'i-ri-folder-2-line',
      },
    ],

    footer: {
      since: 2024,
      icon: {
        enable: true,
        url: 'https://github.com/amireon',
        title: 'GitHub Home',
      },
    },
  },

  unocss: { 
    safelist,
  },

})
