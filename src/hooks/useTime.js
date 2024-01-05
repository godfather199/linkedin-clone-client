import { differenceInHours, formatDistanceToNow, parseISO } from "date-fns";
import { useEffect, useState } from "react";



function useTime(timestamp) {
    const [timeAgo, setTimeAgo] = useState("");

    useEffect(() => {
      const calculateTimeAgo = () => {
        const createdAt = new Date(timestamp);
        const timeAgoString = formatDistanceToNow(createdAt, {
          addSuffix: true,
        });
        setTimeAgo(timeAgoString);
      };

      calculateTimeAgo();

      // Update time ago every minute (optional)
      const intervalId = setInterval(() => {
        calculateTimeAgo();
      }, 60000);

      return () => clearInterval(intervalId);
    }, [timestamp]);


    return {
        timeAgo
    }
}


export default useTime