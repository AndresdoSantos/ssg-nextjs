import { NextPage } from 'next';

type HomeProps = {
  org: {
    login: string;
    description: string;
    blog: string;
  };
};

const Home: NextPage<HomeProps> = ({ org }) => {
  return (
    <div>
      <h1>{org.login}</h1>
      <h3>{org.description}</h3>

      <p>
        Site: <a href={org.blog}>{org.blog}</a>
      </p>
    </div>
  );
};

export const getStaticProps = async () => {
  const response = await fetch('https://api.github.com/orgs/rocketseat');
  const data = await response.json();

  return {
    props: {
      org: data,
    },
    revalidate: 10,
  };
};

export default Home;
