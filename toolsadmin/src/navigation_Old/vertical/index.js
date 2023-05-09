const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'tabler:smart-home'
    },
    {
      title: 'Second Page',
      path: '/second-page',
      icon: 'tabler:mail'
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'tabler:shield'
    },
    {
      badgeContent: '3',
      title: 'Components',
      icon: 'tabler:archive',
      badgeColor: 'success',
      children: [
        {
          title: 'Accordion',
          path: '/components/accordion'
        },
        {
          title: 'Cards',
          children: [
            {
              title: 'Basic',
              path: '/components/cards/basic'
            },
            {
              title: 'Advanced',
              path: '/components/cards/advanced'
            }
          ]
        }
      ]
    }
  ]
}

export default navigation
