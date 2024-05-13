import { Dispatch, SetStateAction, useState } from "react";
import {
  FaEdit,
  FaUser,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  patchLaporan,
  deleteLaporan,
} from "../../api/laporan";
import { ALERT_TYPE } from "../../consts/alert";
import { DYNAMIC_ROUTES } from "../../consts/routes";
import { STATUS_LAPORAN } from "../../consts/status";
import { useAlert } from "../../hooks/useAlert";
import useLoader from "../../hooks/useLoader";
import { User, UserAccount } from "../../consts/user";
import { patchUser } from "../../api/user";
import { ConfirmationModal } from "../common/Modal";

interface ActionButtonUserProps {
  user: UserAccount;
  setRefetch?: Dispatch<SetStateAction<boolean>>;
}

interface EditButtonUserProps {
  user: UserAccount;
  setCurUserAccount: Dispatch<SetStateAction<UserAccount | null>>;
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
  setRefetch?: Dispatch<SetStateAction<boolean>>;
}

interface UpdatePasswordButtonProps {
  user: UserAccount;
  setCurUserAccount: Dispatch<SetStateAction<UserAccount | null>>;
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
  setRefetch?: Dispatch<SetStateAction<boolean>>;
}

export const EditUserButton = (props: EditButtonUserProps) => {
  const {user, setCurUserAccount, setIsModalActive} = props;
  // const navigate = useNavigate();

  const handleEdit = () => {
    setIsModalActive(true);
    setCurUserAccount(user)
  };

  return (
    <button
      type="button"
      onClick={() => handleEdit()}
      className="text-white bg-yellow-500 hover:bg-yellow-600 transition duration-300 flex justify-center items-center gap-2 p-2 px-4 rounded-full"
    >
      <FaEdit />
      Edit
    </button>
  );
};

export const UpdatePasswordButton = (props: UpdatePasswordButtonProps) => {
  const {user, setCurUserAccount, setIsModalActive} = props;
  // const navigate = useNavigate();

  const handleUpdate = () => {
    setIsModalActive(true);
    setCurUserAccount(user)
  };

  return (
    <button
      type="button"
      onClick={() => handleUpdate()}
      className="text-white bg-yellow-500 hover:bg-yellow-600 transition duration-300 flex justify-center items-center gap-2 p-2 px-4 rounded-full"
    >
      <FaEdit />
      Password
    </button>
  );
};

export const AktifkanButton = (props: ActionButtonUserProps) => {
  const { user, setRefetch } = props;
  const [isModalActive, setIsModalActive] = useState<boolean>();
  const { showLoader, hideLoader } = useLoader();
  const { addAlert } = useAlert();

  const handleAktifkan = async () => {
    try {
      showLoader();
      await patchUser(
        {
          is_active: "1"
        },
        user.id
      );

      addAlert({
        type: ALERT_TYPE.SUCCESS,
        title: "User Berhasil Diaktifkan",
        message: `User ${user.username} berhasil diaktifkan !`,
      });
      setRefetch!(true);
    } catch {
      addAlert({
        type: ALERT_TYPE.ERROR,
        title: "User Gagal Diaktifkan",
        message: `User ${user.username} gagal diaktifkan !`,
      });
    } finally {
      setIsModalActive(false);
      hideLoader();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalActive(true)}
        className="text-white bg-green-500 hover:bg-green-600 transition duration-300 flex justify-center items-center gap-2 p-2 px-4 rounded-full"
      >
        <FaUser />
        Aktifkan
      </button>
      {isModalActive && (
        <ConfirmationModal
          title="Aktifkan User"
          description={`Apakah anda yakin mengaktifkan user ${user.username}?`}
          onSuccess={handleAktifkan}
          onClose={() => setIsModalActive(false)}
          successButtonText="Aktifkan"
        />
      )}
    </>
  );
};

export const NonAktifkanButton = (props: ActionButtonUserProps) => {
  const { user, setRefetch } = props;
  const [isModalActive, setIsModalActive] = useState<boolean>();
  const { showLoader, hideLoader } = useLoader();
  const { addAlert } = useAlert();

  const handleNonAktifkan = async () => {
    try {
      showLoader();
      await patchUser(
        {
          is_active: "0",
        },
        user.id
      );

      addAlert({
        type: ALERT_TYPE.SUCCESS,
        title: "User Berhasil Dinonaktifkan",
        message: `User ${user.username} berhasil dinonaktifkan !`,
      });
      setRefetch!(true);
    } catch {
      addAlert({
        type: ALERT_TYPE.ERROR,
        title: "User Gagal Dinonaktifkan",
        message: `User ${user.username} gagal dinonaktifkan !`,
      });
    } finally {
      setIsModalActive(false);
      hideLoader();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalActive(true)}
        className="text-white bg-red-500 hover:bg-red-600 transition duration-300 flex justify-center items-center gap-2 p-2 px-4 rounded-full"
      >
        <FaUser />
        Nonaktifkan
      </button>
      {isModalActive && (
        <ConfirmationModal
          title="Aktifkan User"
          description={`Apakah anda yakin mengnonaktifkan user ${user.username}?`}
          onSuccess={handleNonAktifkan}
          onClose={() => setIsModalActive(false)}
          successButtonText="Nonktifkan"
        />
      )}
    </>
  );
};