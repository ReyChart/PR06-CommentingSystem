import axios from 'axios';

interface Data {
  name: {
    title: string;
    first: string;
    last: string;
  };
  login: {
    uuid: string;
  };
  picture: {
    medium: string;
  };
}

export interface User {
  name: string;
  uuid: string;
  avatar: string;
}

export const USER_REQUEST = 'https://randomuser.me/api/?inc=name,login,picture&noinfo&nat=us';

export const getUser = (): Promise<User> => {
  return axios.get(USER_REQUEST).then(({ data }: { data: { results: Data[] } }) => {
    const { name, login, picture } = data.results[0];
    const { first, last, title } = name;

    return {
      name: `${title} ${first} ${last}`,
      uuid: login.uuid,
      avatar: picture.medium,
    };
  });
};
