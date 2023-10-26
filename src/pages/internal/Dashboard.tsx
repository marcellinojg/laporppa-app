import { FaHome, FaUserNurse } from "react-icons/fa"
import AdminLayout from "../layouts/AdminLayout"
import { useAuthUser } from "react-auth-kit"
import { UserLogin } from "../../consts/user"
import formatDate from "../../helpers/formatDate"
import Panel from "../../components/internal/Panel"

const Dashboard = () => {
    const userData = useAuthUser()() as UserLogin
    return <AdminLayout>
        <div className="lg:w-10/12 w-11/12 p-4 bg-white floating-shadow-md mx-auto mt-12 rounded-lg">
            <h1 className="font-bold text-2xl text-primary mb-2">Selamat Datang di Dashboard !</h1>
            <div className="flex gap-3 items-center text-lg">
                <FaHome />
                <h2 className="font-bold">Kelurahan Tambakrejo</h2>
            </div>
            <div className="flex gap-3 items-center text-lg">
                <FaUserNurse />
                <h2 className="font-bold">{userData.name}</h2>
            </div>
        </div>
        <div className="lg:w-10/12 w-11/12 p-8 bg-white floating-shadow-md mx-auto mt-6 rounded-lg">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                <Panel
                    title="Total Kasus Masuk"
                    date={new Date().toISOString()}
                    count={99}
                />
                <Panel
                    title="Total Kasus Masuk"
                    date={new Date().toISOString()}
                    count={99}
                />
                <Panel
                    title="Total Kasus Masuk"
                    date={new Date().toISOString()}
                    count={99}
                />
                <Panel
                    title="Total Kasus Masuk"
                    date={new Date().toISOString()}
                    count={99}
                />
                <Panel
                    title="Total Kasus Masuk"
                    date={new Date().toISOString()}
                    count={99}
                />
                <Panel
                    title="Total Kasus Masuk"
                    date={new Date().toISOString()}
                    count={99}
                />
            </div>
        </div>

    </AdminLayout>
}

export default Dashboard