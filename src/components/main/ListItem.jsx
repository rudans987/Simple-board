import React from "react";
import { useDispatch } from "react-redux";
import { __getPostList, __deletePost } from "../../redux/modules/postSlice";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Button from "../common/Button";
import { VscTrash, VscEdit } from "react-icons/vsc";
import styled from "styled-components";
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore";

const useStyles = makeStyles({
  root: {
    width: "60vw",
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  link: {
    textDecoration: "none",
  },
});

function ListItem({ post }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            ID : {post.id}
          </Typography>
          <Link className={classes.link} to={`/detail/${post.id}`}>
            <Typography variant="h5" component="h2">
              {post.title}
            </Typography>
            <Typography variant="body2" component="p">
              {post.contents.length > 15
                ? post.contents.slice(0, 15).concat("...")
                : post.contents}
              <br />
            </Typography>
          </Link>
        </CardContent>
        <CardActions>
          <Button onClick={() => dispatch(__deletePost(post.id))}>
            <VscTrash />
          </Button>
          <Link to={`/update/${post.id}`}>
            <Button>
              <VscEdit />
            </Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
}

export default ListItem;
