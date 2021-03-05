import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: "Ensure Adoption",
    imageUrl: "img/michelangelo.jpg",
    description: (
      <>
        Tempera comes with a <code>scorecard</code> command that generates a
        scorecard based on your site's adoption to an official set of design
        tokens. Analyze the adoption of a design system across all your
        applications with ease.
      </>
    ),
  },
  {
    title: "Ease Migration",
    imageUrl: "img/venus.jpg",
    description: (
      <>
        Tempera's <code>scorecard</code> command collects all unofficial styles
        from a site and calculates the nearest official style in most cases.
        Make migrating all your applications to a new design system a breeze.
      </>
    ),
  },
  {
    title: "Build Custom Tools",
    imageUrl: "img/simonetta-vespucci-wide.jpg",
    description: (
      <>
        Tempera's <code>scorecard</code> command comes with the option to print
        a scorecard as a JSON blob, exposing the potential for custom reporters
        and other tools that meet your needs for design tokens adoption.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <div>
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted
              )}
              to={useBaseUrl("docs/")}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
