import { Box, Card, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "../styles/blogs.styles";
import { Layout } from "../components";
import { useSelector } from "react-redux";
import moment from "moment";

const Blogs = () => {
  const classes = useStyles();
  const blogReducer = useSelector((state) => state.blogReducer);
  return (
    <Box className={classes.root}>
      <Layout>
        <Grid
          container
          direction="row"
          justifyContent="center"
          className={classes.root}
        >
          <Grid item lg={8} md={8} sm={10} xs={10}>
            <Typography variant="h5" className={classes.heading}>
              Blogs
            </Typography>
            {blogReducer.approvedBlogs.length > 0 ? (
              blogReducer.approvedBlogs.map((blog) => (
                <Card key={blog._id} className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6" className={classes.title}>
                      {blog.title}
                    </Typography>
                    <Typography variant="body1" className={classes.content}>
                      {blog.content}
                    </Typography>

                    <Typography
                      variant="body2"
                      className={classes.details}
                      align="right"
                    >
                      {`- ${blog.user.name}, `}
                      {moment(blog.created_at).startOf("ss").fromNow()}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography
                    variant="h6"
                    className={classes.title}
                    align="center"
                  >
                    No blogs found yet!
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.content}
                    style={{ marginTop: 20 }}
                    align="center"
                  >
                    Only approved blogs will display here. <br />
                    Blogs will be approved only by the Admin.
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Layout>
    </Box>
  );
};

export default Blogs;
