module.exports = {
  title: 'Tempera',
  tagline: 'A CLI toolkit for aiding design tokens adoption.',
  url: 'https://tempera.netlify.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'michaelmang',
  projectName: 'tempera',
  themeConfig: {
    navbar: {
      title: 'Tempera',
      logo: {
        alt: 'Tempera',
        src: 'img/simonetta-vespucci.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/michaelmang/tempera',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Usage',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/michaelmang/tempera',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Michael Mangialardi`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/michaelmang/tempera/edit/master/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
