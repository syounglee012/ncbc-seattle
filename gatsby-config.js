module.exports = {
  siteMetadata: {
    title: 'New Covenant Baptist Church',
    address: {
      name: 'University Lutheran Church',
      streetAddress: '1604 NE 50th St',
      unit: 'Room 202',
      city: 'Seattle',
      state: 'WA',
      zipCode: 98105
    },
    phone: '(206) 240-9648',
    email: 'ncbcseattle@gmail.com',
    serviceTime: '12:30',
    instagram: 'ncbcseattle'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-netlify-cms',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    'gatsby-transformer-remark'
  ],
}
