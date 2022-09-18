import classes from "./Comment.module.css";
import { useState } from "react";
import Button from "../Button/Button";
import Reply from "../Reply/Reply";
import UpdateComment from "../UpdateComment/UpdateComment";
import UserInfos from "../UserInfos/UserInfos";

const Comment = (props) => {
  const [updateOrNot, setUpdateOrNot] = useState(false);
  const [replyOrNot, setReplyNot] = useState(false);
  const [whomReplying, setWhomReplying] = useState("");

  const updateToggleHandler = () => setUpdateOrNot((prevState) => !prevState);
  const replyToggleHandler = (whomReplying) => {
    setWhomReplying(whomReplying);
    return setReplyNot((prevState) => !prevState);
  };
  const {
    score,
    createdAt,
    user: { image, username },
    content,
    replyingTo,
  } = props.comment;
  return (
    <section
      // if replied rendered then props.className otherwise modular className
      className={` ${props.replied && props.className} ${
        !props.replied && classes.section
      }`}
    >
      <article className={classes.article}>
        <div className={classes.sideBtnHolder}>
          <Button>
            <img src={"/assets/images/icon-plus.svg"} alt="add button" />
          </Button>
          <span id="upvote">{score}</span>
          <Button>
            <img src={"/assets/images/icon-minus.svg"} alt="subtract button" />
          </Button>
        </div>
        <div className={classes.cmpHolder}>
          <UserInfos
            updateToggleHandler={updateToggleHandler}
            replyToggleHandler={replyToggleHandler}
            createdAt={createdAt}
            images={image}
            username={username}
            className={props.className}
          />
          {updateOrNot ? (
            <UpdateComment contentToUpdate={`@${replyingTo} ${content}`} />
          ) : // if replied comment then adding "replyingTo" otherwise not"
          // <p>{replyingTo ? (<span>@{replyingTo}</span> {content}) : content}</p>
          replyingTo ? (
            <p className={classes.content}>
              <span className={classes.replyingTo}>@{replyingTo}</span>{" "}
              {content}
            </p>
          ) : (
            <p className={classes.content}>{content}</p>
          )}
        </div>
      </article>
      {replyOrNot && (
        <Reply
          replyingTo={whomReplying}
          replyToggleHandler={replyToggleHandler}
        />
      )}
    </section>
  );
};

export default Comment;
