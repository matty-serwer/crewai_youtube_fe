import React from 'react';
import {PositionInfo} from "@/hooks/useCrewJob";

interface FinalOutputProps {
  positionInfoList: PositionInfo[];
}

const FinalOutput = ({ positionInfoList }: FinalOutputProps) => {
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold my-2">Final Output</h2>
      <div className="flex-grow overflow-auto border-2 border-gray-300 p-2">
        {
          positionInfoList.length === 0 ? (
            <p>No job results yet.</p>
          ) : (
            positionInfoList.map((positionInfo, index) => (
              <div key={index} className="mb-4">
                <p>
                  <strong>Company: </strong>{" "}
                  {capitalize(positionInfo.company)}
                </p>
                <p>
                  <strong>Position: </strong>{" "}
                  {capitalize(positionInfo.position)}
                </p>
                <p>
                  <strong>Name: </strong>{" "}
                  {capitalize(positionInfo.name)}
                </p>
                {/*Blog Article URLs */}
                <div id="blog-article-urls">
                  <strong>Blog Articles URLs</strong>
                  <ul>
                    {positionInfo.blog_article_urls.length > 0 ? (
                      positionInfo.blog_article_urls.map((url, index) => (
                        <li key={index} >
                          <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-green-500 underline"
                          >
                            {url}
                          </a>
                        </li>
                    ))) : (
                      <p>No blog articles yet.</p>
                    )}
                  </ul>
                </div>
                {/* YouTube Interviews  */}
                <div id="youtube-interviews">
                  <strong>YouTube Interviews: </strong>
                  <ul>
                    {positionInfo.youtube_interview_urls.length > 0 ? (
                      positionInfo.youtube_interview_urls.map((video, index) => (
                        <li key={index} >
                          <a
                            href={video.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-green-500 underline"
                          >
                            {video.name}
                          </a>
                        </li>
                      ))) : (
                      <p>No videos yet.</p>
                    )}
                  </ul>
                </div>
              </div>
            ))
          )
        }
      </div>
    </div>
  );
};

export default FinalOutput;
