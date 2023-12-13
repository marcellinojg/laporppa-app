import Pendidikan from "../consts/pendidikan";
import { CreateAxiosInstance } from "../helpers/createAxiosInstance";

export const getPendidikans = async () => {
  const instance = CreateAxiosInstance();
  const res = await instance.get("/pendidikans");
  const pendidikans = res.data.data as Pendidikan[];
  return pendidikans;
};
