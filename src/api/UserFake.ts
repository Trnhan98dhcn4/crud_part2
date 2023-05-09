import { IUserFake } from "../model";
import { LOCAL_STORAGE } from "../constants/user.contants";

const UserFakeStorage = localStorage.getItem(LOCAL_STORAGE.user);

const UserFake: IUserFake[] = UserFakeStorage
  ? JSON.parse(UserFakeStorage)
  : [];

export default UserFake;
