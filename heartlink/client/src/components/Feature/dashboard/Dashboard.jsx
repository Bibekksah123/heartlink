
import { useState } from "react";
import  "./Dashboard.css"
import { useMutation, useQuery } from "@tanstack/react-query";
import { ConnectionRequest } from "../../../services/Api/user";
import toast from "react-hot-toast";



 function Dashboard() {
  const [index, setIndex] = useState(0);
   const [ animate, setAnimate ] = useState( "" );
   


   const { data: Feeds } = useQuery({
     queryKey: ["feeds"],
     queryFn: ConnectionRequest.getAllFeeds,
     onError: (error) => {
       toast.error(error?.response?.data?.message || "Failed to load profile");
     },
   });

    const { mutate:connectionRequestMutation } = useMutation({
      mutationFn: ConnectionRequest.sentConnectionRequest,
      onSuccess: ( data ) => {
        console.log(data)
        toast.success(data?.message);
      },

      onError: (error) => {
        console.log(error);
        toast.error(error?.response?.data?.message || "Connection failed");
      },
    });
   
  
  //values: ["ignored", "interested", "accepted", "rejected"];

   const swipe = async( direction, requestId ) => {
    setAnimate( direction );
     const status = await direction === "right" ? "interested" : "ignored";
     await connectionRequestMutation( { requestId, status } );
    setTimeout(() => {
      setAnimate("");
      setIndex((prev) => prev + 1);
    }, 300);
  };

  if (index >= Feeds?.data?.length) {
    return (
      <div className=" flex items-center justify-center text-xl font-semibold">
        No more profiles 😅
      </div>
    );
  }

  const user = Feeds?.data[index];

return (
  <div className="dashboard-container">
    <div
      key={user?._id}
      className={`card ${
        animate === "right"
          ? "swipe-right"
          : animate === "left"
            ? "swipe-left"
            : ""
      }`}
    >
      <img src={user?.profileId?.profilePic} alt={user?.name} />

      <div className="card-overlay">
        <h2>
          {user?.name}, {user?.profileId?.age}
        </h2>
      </div>
    </div>

    <div className="button-group">
      <button
        onClick={() => swipe("left", user?._id)}
        className="swipe-btn btn-dislike"
      >
        ❌
      </button>

      <button
        onClick={() => swipe("right", user?._id)}
        className="swipe-btn btn-like"
      >
        ❤️
      </button>
    </div>
  </div>
);
}


export default Dashboard;
