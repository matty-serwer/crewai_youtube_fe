import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

export type EventType = {
  data: string;
  timestamp: string;
}

export type NamedUrl = {
  name: string;
  url: string;
}

export type PositionInfo = {
  company: string;
  position: string;
  name: string;
  blog_article_urls: string[];
  youtube_interview_urls: NamedUrl[];
}

export const useCrewJob = () => {
//   State
  const [running, setRunning] = useState<boolean>(false);
  const [companies, setCompanies] = useState<string[]>([]);
  const [positions, setPositions] = useState<string[]>([]);
  const  [events, setEvents] = useState<EventType[]>([]);
  const [positionInfo, setPositionInfoList] = useState<PositionInfo[]>([]);
  const [currentJobId, setCurrentJobId] = useState<string>("");

//   useEffects
  useEffect(() => {
    let intervalId: number;

    const fetchJobStatus = async () => {
      try {
        const response = await axios.get<{
          status: string;
          result: { positions: PositionInfo[]; }
          events: EventType[];
        }>(`http://localhost:3001/api/crew/${currentJobId}`);

        console.log(response.data);

        const { events: fetchedEvents, result, status} = response.data;

        setEvents(fetchedEvents);

        if(result) {
          console.log(result)
          setPositionInfoList(result.positions ?? []);
        }

        if (status === "COMPLETE" || status === "ERROR") {
          if (intervalId) {
            clearInterval(intervalId);
          }
          setRunning(false);
          toast.success("Job Completed");
        }
      } catch (error) {
        console.error(error);
        setCurrentJobId("");
        toast.error("Job failed to start");
        clearInterval(intervalId);
      }
    }

    if(currentJobId !== "") {
      intervalId = setInterval(fetchJobStatus, 1000) as unknown as number;
    }
  }, [currentJobId])

//   Functions
  const startJob = async () => {
    console.log("start job!");
    // Clean up the old job
    setEvents([]);
    setPositionInfoList([]);
    setRunning(true);

    // Request to our backend
    try {
      const response = await axios.post<{ job_id: string }>(
        "http://localhost:3001/api/crew",
        {
          companies,
          positions,
        });

      toast.success("Job started");

      // Update our state (job_id)
      console.log(response.data);
      setCurrentJobId(response.data.job_id);
    } catch (error) {
      console.error(error);
      setCurrentJobId("");
      toast.error("Job failed to start")
    }
  }

//   Return
  return {
    companies,
    setCompanies,
    positions,
    setPositions,
    startJob,
    running,
    events,
    positionInfo,
  };
}
