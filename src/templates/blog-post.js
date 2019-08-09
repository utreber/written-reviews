import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import heroStyles from '../components/hero.module.css'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <div className={heroStyles.hero}>
            <Img
              className={heroStyles.heroImage}
              alt={post.title}
              fluid={post.heroImage.fluid}
            />
          </div>
          <div className="wrapper">
            <h1 className="section-headline">{post.title}</h1>
            <p
              style={{
                display: 'block',
                fontStyle: 'italic',
                marginBottom: '3em',
              }}
            >
              By {post.author.name} on {post.publishDate}
              <span> | </span>
              <span>Share: </span>
              <a
                class="resp-sharing-button__link"
                href={`https://twitter.com/intent/tweet/?text=share`}
                target="_blank"
                rel="noopener"
                aria-label="Twitter"
              >
                Twitter
              </a>
              <span> | </span>
              <a
                class="resp-sharing-button__link"
                href={`https://reddit.com/submit/?url=https%3A%2F%2Fwww%2Enerdy%2Dgamers%2Ecom%2Fblog%2Fpost${post.slug}&amp;resubmit=true&amp;title=test`}
                target="_blank"
                rel="noopener"
                aria-label="Reddit"
              >
                Reddit
              </a>
              <span> | </span>
              <a
                class="resp-sharing-button__link"
                href="whatsapp://send?text=Visit%20Nerdy%20Gamers%20MTG%20https%3A%2F%2Fwww.nerdy-gamers.com"
                target="_blank"
                rel="noopener"
                aria-label="WhatsApp"
              >
                WhatsApp
              </a>
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      author {
        name
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
