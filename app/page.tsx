'use client'

import InputItem from "@/components/InputItem";
import {useState} from "react";
import {useCrewJob} from "@/hooks/useCrewJob";
import EventLog from "@/components/EventLog";
import FinalOutput from "@/components/FinalOutput";

export default function Home() {
  // Hooks
  const crewJob = useCrewJob();

  return (
   <div className="bg-white min-h-screen text-black">
     <div className="flex">
       {/* LEFT COLUMN */}
       <div className="w-1/2 p-4">
         <InputItem
           title="Companies"
           placeholder="Add a company"
           data={crewJob.companies}
           setData={crewJob.setCompanies}
         />
         <InputItem
           title="Position"
           placeholder="Add a position"
           data={crewJob.positions}
           setData={crewJob.setPositions}
         />
       </div>
        {/* RIGHT COLUMN */}

       <div className="w-1/2 p-4 flex flex-col">
         <div className="flex justify-between items-center mb-4">
           <h2 className="text-2xl font-bold">Output</h2>
           <button
             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
             onClick={crewJob.startJob}
             disabled={crewJob.running}
           >
             {crewJob.running ? "Running..." : "Start"}
           </button>
         </div>
        <FinalOutput positionInfoList={crewJob.positionInfo} />
        <EventLog events={crewJob.events} />
       </div>
     </div>
   </div>
  );
}
