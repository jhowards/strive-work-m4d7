import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
import { useState, useEffect } from "react";

function CommentArea(props) {
  //   state = {
  //     comments: [], // comments will go here
  //     isLoading: false,
  //     isError: false,
  //   };

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchComments = async (prevProps) => {
      //   if (prevProps.asin !== this.props.asin) {
      setIsLoading(true);
      try {
        let response = await fetch(
          "https://striveschool-api.herokuapp.com/api/comments/" + props.asin,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFkMmFjZDJkNTI2MjAwMTViNmRlNmUiLCJpYXQiOjE2MzA0MTg4NDUsImV4cCI6MTYzMTYyODQ0NX0.zIMrzOtDkjOPxVI-qkfVrjQbyig4tcBtT3pl-bAMbks",
            },
          }
        );
        console.log(response);
        if (response.ok) {
          let comments = await response.json();
          setIsLoading(false);
          setIsError(false);
          setComments(comments);
        } else {
          console.log("error");
          setIsLoading(false);
          setIsError(true);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsError(true);
      }
    };
    //  };
    fetchComments();
  }, []);

  return (
    <div>
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
}

export default CommentArea;
