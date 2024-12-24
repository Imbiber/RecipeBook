import { gql } from "@apollo/client";

export const ADD_RECIPE_MUTATION = gql`
  mutation AddRecipe(
    $userId: ID!
    $title: String!
    $description: String!
    $thumbnail: String!
    $recipe: String!
  ) {
    addRecipe(
      user_id: $userId
      title: $title
      description: $description
      thumbnail: $thumbnail
      recipe: $recipe
    ) {
      id
      recipe
      thumbnail
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $password: String!
    $profile_pic: String
  ) {
    createUser(
      name: $name
      email: $email
      password: $password
      profile_pic: $profile_pic
    ) {
      id
      name
      email
      profile_pic
      password
    }
  }
`;

export const GET_USER_BY_LOGIN_MUTATION = gql`
  mutation GetUserByLogin($name: String!, $email: String!, $password: String!) {
    getUserByLogin(name: $name, email: $email, password: $password) {
      id
      name
      email
      password
      registration_date
      profile_pic
    }
  }
`;

export const GET_ALL_RECIPES_QUERY = gql`
  query GetAllRecipes {
    getAllRecipes {
      id
      user_id
      title
      description
      recipe
      thumbnail
      creation_date
    }
  }
`;

export const GET_USER_BY_ID_QUERY = gql`
  query GetUserByID($user_id: ID!) {
    getUserById(user_id: $user_id) {
      id
      name
      email
      registration_date
      profile_pic
    }
  }
`;

export const GET_RECIPE_BY_ID_QUERY = gql`
  query GetRecipeByID($recipe_id: ID!) {
    getRecipeById(recipe_id: $recipe_id) {
      id
      title
      description
      recipe
      thumbnail
      user_id
      creation_date
    }
  }
`;
export const GET_RECIPE_BY_USER_ID_QUERY = gql`
  query GetRecipeByUserID($user_id: ID!) {
    getRecipeByUserId(user_id: $user_id) {
      id
      title
      description
      recipe
      thumbnail
      user_id
      creation_date
    }
  }
`;
