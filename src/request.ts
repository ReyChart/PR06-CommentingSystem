import axios from 'axios';

interface IData {
  name: {
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

export interface IUser {
  name: string;
  uuid: string;
  avatar: string;
}

export const USER_REQUEST =
  'https://randomuser.me/api/?inc=name,login,picture&noinfo&nat=us';

export const getUser = (): Promise<IUser> => {
  return axios
    .get(USER_REQUEST)
    .then(({ data }: { data: { results: IData[] } }) => {
      const { name, login, picture } = data.results[0];
      const { first, last } = name;

      return {
        name: `${first} ${last}`,
        uuid: login.uuid,
        avatar: picture.medium,
      };
    });
};
