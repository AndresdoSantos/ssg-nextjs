import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

type MemberProps = {
  user: {
    avatar_url: string;
    name: string;
    bio: string;
  };
};

const Member: NextPage<MemberProps> = ({ user }) => {
  const { isFallback } = useRouter();

  if (isFallback) return <p>Carregando...</p>;

  return (
    <div>
      <img
        src={user.avatar_url}
        alt={user.name}
        width="80"
        style={{ borderRadius: 40 }}
      />
      <h1>{user.name}</h1>
      <h1>{user.bio}</h1>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    `https://api.github.com/orgs/rocketseat/members`
  );
  const data = await response.json();

  const paths = data.map((member: any) => {
    return {
      params: {
        login: member.login,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { login } = params as { login: string };

  const response = await fetch(`https://api.github.com/users/${login}`);
  const data = await response.json();

  return {
    props: {
      user: data,
    },
    revalidate: 10,
  };
};

export default Member;
