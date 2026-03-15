import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Profile, User } from "../services/Api/user";


export const useAuth = () => {
    const {
      data:user,
      isLoading,
    } = useQuery({
      queryKey: ["profile"],
      queryFn: Profile.getUserProfile,
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Failed to load profile");
      },
    });
  
 return {user,isLoading}
};

