import Pendidikan from "../consts/pendidikan";
import { CreateAxiosInstance, CreatePublicAxiosInstance } from "../helpers/createAxiosInstance";

export const getPendidikans = async () => {
  const instance = CreatePublicAxiosInstance()
  const res = await instance.get("m-pendidikan-terakhir");
  const pendidikans = res.data.data as Pendidikan[];
  return pendidikans;
};
