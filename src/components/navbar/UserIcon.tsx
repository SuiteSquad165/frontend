import { RootState } from "@/store";
import { LuUser2 } from "react-icons/lu";
import { useSelector } from "react-redux";
import Image from "next/image";

const UserIcon = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("Hello");
  return (
    <>
      {user?.photoURL ? (
        <div className="relative rounded-full w-6 h-6 overflow-hidden">
          <Image
            src={user.photoURL || "No avatar"}
            fill
            alt={user.displayName || "No avatar"}
            className="rounded-full object-cover"
          />
        </div>
      ) : (
        <LuUser2 className="w-6 h-6 bg-primary rounded-full text-white" />
      )}
    </>
  );
};

export default UserIcon;
