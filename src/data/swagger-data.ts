export const getNotificationFeedResponseSuccess = {
  "statusCode": 200,
  "body": {
    "docs": [
      {
        "type": "Like",
        "read": 1,
        "post": {
          "id": "7d78ff348647b782cb3027d836d23e09",
          "title": "How to professionally administrate seamless growth strategies in 10 steps"
        },
        "comment": null,
        "user": {
          "id": "084300a01df3060f41fad4700a70b6fe",
          "name": "Eugenio Bertè"
        }
      }
    ],
    "pages": 3,
    "total": 11,
    "next": 2,
    "prev": null,
    "first": 1,
    "last": 3
  }
};

export const getNotificationFeedResponseFailure = {
  "statusCode": 400,
  "message": "Post with id 7d78ff348647b782cb3027d836d23e0 does not exist",
  "error": "Bad Request"
};

export const addNotificationCommentSuccess = {
  "statusCode": 200,
  "body": {
    "id": "d9b7bbd11b4d4671b91c28ea50b5f295",
    "notificationType": "Comment",
    "postId": "7d78ff348647b782cb3027d836d23e09",
    "userId": "084300a01df3060f41fad4700a70b6fe",
    "isRead": false,
    "comment": {
      "id": "60b9bded945d4f5196f46de20f04c800",
      "commentText": "this is my first comment",
      "postId": "7d78ff348647b782cb3027d836d23e09",
      "userId": "084300a01df3060f41fad4700a70b6fe"
    },
    "updatedAt": "2021-06-14T02:47:21.289Z",
    "createdAt": "2021-06-14T02:47:21.289Z",
    "commentId": "60b9bded945d4f5196f46de20f04c800"
  }
}

export const addNotificationFailure = {
  "statusCode": 400,
  "message": "User with id 084300a01df3060f41fad4700a70b6f does not exist",
  "error": "Not Found"
};

export const addNotificationValidationError = {
  "statusCode": 400,
  "message": [
    "commentText should not be empty",
    "commentText must be a string"
  ],
  "error": "Bad Request"
};

export const markNotificationFeedAsReadError = {
  "statusCode": 400,
  "message": "Post with id 7d78ff348647b782cb3027d836d23e0 does not exist",
  "error": "Bad Request"
};

export const markNotificationFeedAsReadSuccess = {
  "statusCode": 200,
  "body": "all post notifications are now marked as read"
};
