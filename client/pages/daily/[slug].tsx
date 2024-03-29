import { GetServerSideProps } from "next";
import axios from "axios";
import DOMPurify from "dompurify";
import moment from "moment";
import styled from "styled-components";

import CategoryItem from "@/components/molecules/categoryItem";
import { API } from "@/config";
import Meta from "@/helpers/meta";
import * as T from "@/types";

import "moment/locale/ko";

const Paper = styled.article`
  padding: 16px 24px;
  border: 1px solid ${({ theme }) => theme.typePrimary};
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.typePrimary};
  padding: 16px 0;
`;

const MainText = styled.div`
  padding: 16px 0 16px;
  line-height: 1.5;

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 20px;
  }

  s {
    color: ${({ theme }) => theme.disabled};
  }

  u {
    text-underline-offset: 2px;
  }

  a {
    color: ${({ theme }) => theme.hyperlink.default};
  }

  li {
    margin-left: 20px;
  }

  li.ql-indent-1 {
    margin-left: 40px;
  }

  pre.ql-syntax {
    border-radius: 8px;
    padding: 12px 20px;
    font-family: consolas;
    overflow-x: scroll;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 1rem 0;
`;

const TypeWrapper = styled.div`
  display: flex;
  font-size: 14px;
`;

const TagBox = styled.div`
  box-sizing: border-box;
  padding-top: 16px;
`;

interface Props {
  post: T.Post;
}

function SinglePostPage({ post }: Props) {
  return (
    <>
      <Meta
        title={post.title}
        description={post.description}
        keywords={post.categories.join(" ")}
        ogTitle={post.title}
      />
      <Paper>
        <Header>
          <Title>{post.title}</Title>
          <TypeWrapper>
            {moment(post.createdAt).format("YYYY년 MM월 DD일 HH시 mm분 ss초")}
          </TypeWrapper>
        </Header>
        <TagBox>
          {post.categories?.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </TagBox>
        <MainText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }} />
      </Paper>
    </>
  );
}

export default SinglePostPage;

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const { slug } = query;

  try {
    const res = await axios.get(encodeURI(`${API}/post/${slug}`));
    return {
      props: {
        post: res.data,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
