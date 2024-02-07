import { getServerSession } from "next-auth";
import authOptions from "@/app/_utils/authOptions";
import { redirect } from "next/navigation";
import LoginTemplate from "./_components/LoginTemplate";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  return <LoginTemplate />;
};

export default LoginPage;
